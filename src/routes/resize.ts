import {ImageResizeQuery, RequestWithQuery} from "../types";

type CloudflareImageOptions = {
  cf: {
    image: {
      width:  number
      quality: number
      format: "avif" | "webp" | "json" | undefined
    }
  }
}

const ImageResizer = async (req: RequestWithQuery): Promise<Response> => {
  const {query} = req
  const {src, q, w} = query as ImageResizeQuery

  if (!src) {
    return new Response("Missing image src", {
      status: 400
    })
  }

  const options: CloudflareImageOptions = {
    cf: {
      image: {
        width: w ? Number(w) : 100,
        quality: q ? Number(q) : 70,
        format: undefined
      }
    }
  }

  const accept = req.headers.get("Accept");
  if (accept) {
    if (/image\/avif/.test(accept)) {
      options.cf.image.format = 'avif';
    } else if (/image\/webp/.test(accept)) {
      options.cf.image.format = 'webp';
    }
  }

  const {pathname} = new URL(src)

  if (!/\.(jpe?g|png|gif|webp)$/i.test(pathname)) {
    return new Response('Disallowed file extension', {status: 400})
  }

  return fetch(src, options)
}

export default ImageResizer
