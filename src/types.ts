import {Obj, Route} from "itty-router";

export type MethodType = 'GET'

export interface RequestWithQuery extends Request {
  method: MethodType // method is required to be on the interface
  url: string // url is required to be on the interface
  optional?: string
  query: Obj | undefined
}

export interface IMethods {
  get: Route
}

export type ImageResizeQuery = Obj & {
  src: string
  q: number
  w: number
}
