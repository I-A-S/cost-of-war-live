import { useEffect, useRef, useState } from 'react';

function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

const BASE_GOALS = [
  "studying for their final university exams.",
  "saving up to open a small business.",
  "teaching their child to read.",
  "planning to travel the world next year.",
  "finally building their dream home.",
  "looking forward to retirement.",
  "about to get married.",
  "learning to play a new instrument.",
  "recovering from a long illness.",
  "hoping to see their grandchildren grow up."
];

const CELESTIAL_COLORS = [
  { core: '#ffd9e8', glow: 'rgba(255, 180, 210, 0.15)' },
  { core: '#d9e8ff', glow: 'rgba(180, 210, 255, 0.15)' },
  { core: '#ffebd9', glow: 'rgba(255, 220, 180, 0.15)' },
  { core: '#ffffff', glow: 'rgba(255, 255, 255, 0.10)' },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  radius: number;
  colorData: typeof CELESTIAL_COLORS[0];
  isAlive: boolean;
  goal: string;
}

export default function DarkeningCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; text: string }>({
    visible: false, x: 0, y: 0, text: ''
  });
  const [totalDead, setTotalDead] = useState(0);
  
  const particlesRef = useRef<Particle[]>([]);
  const deathSequenceRef = useRef<number[]>([]);
  const animationRef = useRef<number>();

  const cameraRef = useRef({ x: 0, y: 0, zoom: 1 });
  const dragRef = useRef({ isDragging: false, lastX: 0, lastY: 0 });

  const TOTAL_LIVES = 20000;
  const WORLD_SIZE = 8000; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const initParticles = () => {
      const rng = mulberry32(9999); 
      const p: Particle[] = [];
      
      const spacing = Math.sqrt((WORLD_SIZE * WORLD_SIZE) / TOTAL_LIVES);
      
      let idCounter = 0;
      const halfWorld = WORLD_SIZE / 2;
      
      for (let y = -halfWorld; y < halfWorld; y += spacing) {
        for (let x = -halfWorld; x < halfWorld; x += spacing) {
          if (idCounter >= TOTAL_LIVES) break;
          
          p.push({
            id: idCounter,
            x: x + (rng() - 0.5) * spacing * 1.5,
            y: y + (rng() - 0.5) * spacing * 1.5,
            radius: rng() * 1.5 + 1.5,
            colorData: CELESTIAL_COLORS[Math.floor(rng() * CELESTIAL_COLORS.length)],
            isAlive: true,
            goal: BASE_GOALS[Math.floor(rng() * BASE_GOALS.length)]
          });
          idCounter++;
        }
      }
      particlesRef.current = p;

      const sequenceRng = mulberry32(12345);
      const sequence = Array.from({length: TOTAL_LIVES}, (_, i) => i);
      for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(sequenceRng() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
      }
      deathSequenceRef.current = sequence;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    initParticles();

    const applyDeaths = (deadCount: number) => {
      const p = particlesRef.current;
      const seq = deathSequenceRef.current;
      p.forEach(part => part.isAlive = true);
      const limit = Math.min(deadCount, TOTAL_LIVES);
      for(let i = 0; i < limit; i++) {
        const particleIndex = seq[i];
        if (p[particleIndex]) {
          p[particleIndex].isAlive = false;
        }
      }
    };
    const API_BASE = import.meta.env.PUBLIC_API_URL || 'http://localhost:3001';
    fetch(`${API_BASE}/api/state`)
      .then(res => res.json())
      .then(data => {
        setTotalDead(data.totalCasualties);
        applyDeaths(data.totalCasualties);
      }).catch(() => {});

    const eventSource = new EventSource(`${API_BASE}/api/stream`);
    eventSource.addEventListener('casualty', (e) => {
      const data = JSON.parse(e.data);
      setTotalDead(data.totalCasualties);
      applyDeaths(data.totalCasualties);
    });

    const render = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cam = cameraRef.current;
      const p = particlesRef.current;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(cam.zoom, cam.zoom);
      ctx.translate(-cam.x, -cam.y);

      const viewWidth = canvas.width / cam.zoom;
      const viewHeight = canvas.height / cam.zoom;
      const left = cam.x - viewWidth / 2;
      const right = cam.x + viewWidth / 2;
      const top = cam.y - viewHeight / 2;
      const bottom = cam.y + viewHeight / 2;

      for (let i = 0; i < p.length; i++) {
        const orb = p[i];
        const cullPadding = orb.radius * 4;

        if (
          orb.x < left - cullPadding || 
          orb.x > right + cullPadding || 
          orb.y < top - cullPadding || 
          orb.y > bottom + cullPadding
        ) {
          continue; 
        }

        if (orb.isAlive) {
          const time = performance.now() * 0.002;
          const twinkle = 1 + 0.25 * Math.sin(time + orb.id);

          ctx.fillStyle = orb.colorData.glow;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius * 3.5 * twinkle, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = orb.colorData.core;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#ff0000a0';
          ctx.strokeStyle = '#ff0000a0';
          ctx.lineWidth = 1.5 / cam.zoom;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();
      animationRef.current = requestAnimationFrame(render);
    };
    render();

    const handleMouseDown = (e: MouseEvent) => {
      dragRef.current = { isDragging: true, lastX: e.clientX, lastY: e.clientY };
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
      canvas.style.cursor = 'grab';
    };

    const clampCamera = () => {
      const cam = cameraRef.current;
      const minZoom = Math.max(canvas.width / WORLD_SIZE, canvas.height / WORLD_SIZE);
      cam.zoom = Math.max(minZoom, Math.min(cam.zoom, 10));

      const viewWidth = canvas.width / cam.zoom;
      const viewHeight = canvas.height / cam.zoom;
      const halfWorld = WORLD_SIZE / 2;

      const maxX = halfWorld - viewWidth / 2;
      const minX = -halfWorld + viewWidth / 2;
      cam.x = Math.max(minX, Math.min(cam.x, maxX));

      const maxY = halfWorld - viewHeight / 2;
      const minY = -halfWorld + viewHeight / 2;
      cam.y = Math.max(minY, Math.min(cam.y, maxY));
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (dragRef.current.isDragging) {
        const dx = e.clientX - dragRef.current.lastX;
        const dy = e.clientY - dragRef.current.lastY;
        
        cameraRef.current.x -= dx / cameraRef.current.zoom;
        cameraRef.current.y -= dy / cameraRef.current.zoom;
        
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastY = e.clientY;
        
        setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
        clampCamera();
        return;
      }

      const cam = cameraRef.current;
      const worldX = (mouseX - canvas.width / 2) / cam.zoom + cam.x;
      const worldY = (mouseY - canvas.height / 2) / cam.zoom + cam.y;

      let found = false;
      const p = particlesRef.current;
      
      for (let i = 0; i < p.length; i++) {
          const dx = worldX - p[i].x;
          const dy = worldY - p[i].y;
          const interactionRadius = 250 / cam.zoom; 
          
          if (dx * dx + dy * dy < interactionRadius) { 
            const prefix = p[i].isAlive ? "Is " : "Was ";

            setTooltip({
              visible: true,
              x: e.clientX,
              y: e.clientY,
              text: prefix + p[i].goal
            });
            found = true;
            break;
          }
      }
      if (!found) setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSensitivity = 0.001;
      const cam = cameraRef.current;
      
      const mouseX = e.clientX - canvas.width / 2;
      const mouseY = e.clientY - canvas.height / 2;
      const worldXBeforeZoom = mouseX / cam.zoom + cam.x;
      const worldYBeforeZoom = mouseY / cam.zoom + cam.y;

      cam.zoom *= Math.exp(-e.deltaY * zoomSensitivity);
      cam.zoom = Math.max(0.2, Math.min(cam.zoom, 10)); 

      cam.x = worldXBeforeZoom - mouseX / cam.zoom;
      cam.y = worldYBeforeZoom - mouseY / cam.zoom;

      clampCamera();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.style.cursor = 'grab';

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('wheel', handleWheel);
      eventSource.close();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-sans">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {tooltip.visible && (
        <div 
          className="fixed z-[100] p-4 w-64 bg-zinc-900/95 border border-zinc-700 text-zinc-300 rounded-lg shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-[calc(100%+20px)] backdrop-blur-md transition-opacity duration-150"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="text-sm italic font-light leading-relaxed">
            "{tooltip.text}"
          </p>
        </div>
      )}

      <div className="fixed top-8 left-8 pointer-events-none z-50 flex flex-col gap-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg backdrop-blur-md w-fit mt-4">
        <div>
          <h1 className="text-zinc-400 text-2xl font-light tracking-widest uppercase">The Cost of War 2026</h1>
          <p className="text-zinc-500 text-sm mt-2 max-w-sm leading-relaxed">
            Every light represents a human trajectory. <br/>
            Each red trace represents a lost life. <br/>
            Hover over the red traces to see what was lost. <br/>
            Click and drag to pan. Scroll to zoom.
          </p>
        </div>
        
        <p className="text-zinc-500 text-xs uppercase tracking-wider mt-2">Lives Extinguished</p>
        <p className="text-red-400/90 text-4xl font-mono font-light tracking-tight">
          {totalDead.toLocaleString()}
        </p>
      </div>
    </div>
  );
}