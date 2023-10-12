export class Request {
  protected _headers: { [key: string]: string } = {}

  public headers (headers: { [key: string]: string }): Request {
    this._headers = headers
    return this
  }
}