import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { streamSSE } from 'hono/streaming'
import fs from 'node:fs/promises'
import path from 'node:path'
import { EventEmitter } from 'node:events'

process.on('uncaughtException', (err) => console.error('CRASH Uncaught Exception:', err))
process.on('unhandledRejection', (err) => console.error('CRASH Unhandled Rejection:', err))

const app = new Hono()

const DB_DIR = process.env.DATA_DIR || process.cwd()
const dbPath = path.join(DB_DIR, 'casualties.json')
const casualtyEvents = new EventEmitter()

async function initDB() {
  try {
    await fs.access(dbPath)
    console.log('Database found at:', dbPath)
  } catch {
    await fs.writeFile(dbPath, JSON.stringify({ totalCasualties: 0 }))
    console.log('Created fresh casualties.json database at:', dbPath)
  }
}
initDB()

app.use('/api/*', cors({ origin: '*' }))

app.get('/api/state', async (c) => {
  try {
    const data = JSON.parse(await fs.readFile(dbPath, 'utf-8'))
    return c.json({ totalCasualties: data.totalCasualties })
  } catch (e) {
    return c.json({ totalCasualties: 0 })
  }
})

app.get('/api/stream', (c) => {
  return streamSSE(c, async (stream) => {
    const listener = async (newTotal: number, increment: number) => {
      await stream.writeSSE({
        data: JSON.stringify({ totalCasualties: newTotal, increment }),
        event: 'casualty'
      })
    }
    
    casualtyEvents.on('update', listener)
    
    c.req.raw.signal.addEventListener('abort', () => {
      casualtyEvents.off('update', listener)
    })
    
    while (!c.req.raw.signal.aborted) {
      await new Promise(resolve => setTimeout(resolve, 15000))
    }
  })
})

app.post('/api/webhook/update', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  const body = await c.req.json()
  const increment = body.count || 1 
  
  let data = { totalCasualties: 0 };
  try {
    data = JSON.parse(await fs.readFile(dbPath, 'utf-8'))
  } catch (e) {
    console.error("DB read error during webhook:", e);
  }
  
  data.totalCasualties += increment
  await fs.writeFile(dbPath, JSON.stringify(data))
  
  casualtyEvents.emit('update', data.totalCasualties, increment)
  
  return c.json({ success: true, newTotal: data.totalCasualties })
})

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001

console.log(`Attempting to bind server to port ${port}...`);

serve({ 
  fetch: app.fetch, 
  port,
  hostname: '0.0.0.0'
}, (info) => {
  console.log(`API listening on ${info.address}:${info.port}`)
})