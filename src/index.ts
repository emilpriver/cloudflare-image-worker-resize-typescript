import { Router } from 'itty-router'
import ImageResizer from "./routes/resize";
import {IMethods} from "./types";

const router = Router<Request, IMethods>()

router.get("/resize", ImageResizer)

router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle(event.request))
})
