import { Router } from 'itty-router'

const router = Router()

router.get("/resize", () => {
  return new Response("Hello, world! This is the root page of your Worker template.")
})

router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
