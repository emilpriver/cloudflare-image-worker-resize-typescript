import {ImageResizeQuery, RequestWithQuery} from "../types";
import sharp from 'sharp'

const ImageResizer = async (req: RequestWithQuery): Promise<Response> => {
  const { query } = req
  const {src, q, w} = query as ImageResizeQuery


  if (!src) {
    return new Response("Missing image src", {
      status: 400
    })
  }

  if (!q) {
    return new Response("Missing image quality", {
      status: 400
    })
  }

  if (!w) {
    return new Response("Missing image width", {
      status: 400
    })
  }

  const response = await fetch(src);

  if(!response.ok) {
    return new Response("Error loading image")
  }

  const imageBuffer = Buffer.from(await response.arrayBuffer())

  const headers = new Headers()
  headers.set("Content-Type", "image/webp");

  const image = await sharp(imageBuffer)
      .resize(Number(w))
      .webp()
      .toBuffer()


  return new Response(image, {
    headers
  })
}

export default  ImageResizer
