import Vips from 'wasm-vips';
import {Buffer} from "buffer";

async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const headers = new Headers()

  const src = url.searchParams.get("src")
  const w = Number(url.searchParams.get("w"))
  const q = Number(url.searchParams.get("q"))

  if (!src) {
    return new Response("Missing image src", {
      status: 400
    })
  }

  const {pathname} = new URL(src)

  if (!/\.(jpe?g|png|gif|webp)$/i.test(pathname)) {
    return new Response('Disallowed file extension', {status: 400})
  }

  const response = await fetch(src)

  if (!response.ok) {
    return new Response("Error resizing image", {
      status: 400
    })
  }

  const bufferImage = Buffer.from(await response.arrayBuffer())

  const vips = await Vips()

  const image = vips
      .newFromBuffer(bufferImage)
      .thumbnailImage(w)
      .writeToBuffer(".webp", {
        q
      })

  headers.set("Content-Type", "image/webp")

  return new Response(image, {
    headers
  })
}

addEventListener('fetch', (event: FetchEvent) => {
  if (event?.request?.headers?.get("via") && /image-resizing/.test(event.request.headers.get("via") as string)) {
    return fetch(event.request)
  }

  event.respondWith(handleRequest(event.request))
})
