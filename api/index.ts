import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import chat from './chat'
import { MainHtml } from './html'

const app = new Hono()

if (import.meta.env.PROD) {
  app.use('/assets/*', serveStatic({ root: '/dist/static/' }))
}

app.get('/', async (c) => {
  return c.html(await MainHtml.fetch())
})

app.route('/api', chat)

export default app

if (import.meta.env.PROD) {
  serve({ ...app, port: 4000 }, (info) => {
    // eslint-disable-next-line no-console
    console.log(`Listening on http://localhost:${info.port}`)
  })
}
