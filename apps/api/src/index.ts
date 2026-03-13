import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { streamSSE } from 'hono/streaming'
import fs from 'node:fs/promises'
import path from 'node:path'
import { EventEmitter } from 'node:events'

const app = new Hono()
const dbPath = path.join(process.cwd(), 'casualties.json')
const casualtyEvents = new EventEmitter()

async function initDB() {
  try {
    await fs.access(dbPath)
  } catch {
    await fs.writeFile(dbPath, JSON.stringify({ totalCasualties: 0 }))
    console.log('Created fresh casualties.json database.')
  }
}
initDB()

app.use('/api/*', cors({ origin: '*' }))

app.get('/api/state', async (c) => {
  const data = JSON.parse(await fs.readFile(dbPath, 'utf-8'))
  return c.json({ totalCasualties: data.totalCasualties })
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
  
  const data = JSON.parse(await fs.readFile(dbPath, 'utf-8'))
  data.totalCasualties += increment
  
  await fs.writeFile(dbPath, JSON.stringify(data))
  
  casualtyEvents.emit('update', data.totalCasualties, increment)
  
  return c.json({ success: true, newTotal: data.totalCasualties })
})

const port = 3001
serve({ fetch: app.fetch, port })
console.log(`Persistent API running on port ${port}`)

