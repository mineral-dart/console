import Axios, {AxiosResponse} from 'axios'
import {Request} from "./request";

type Field = { [key: string]: any }

export class ApiClient {
  private readonly baseURL: string
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }
  public get<T>(url: string): GetRequest<T> {
    return new GetRequest<T>(this.baseURL + url)
  }
}

class GetRequest<T> extends Request {
  constructor(private url: string) {
    super()
  }

  public async build (): Promise<AxiosResponse<T>> {
    return Axios.get(this.url, {
      headers: this._headers,
      withCredentials: true
    })
  }
}

class PostRequest extends Request {
  private fields: FormData = new FormData()

  constructor(private url: string) { super() }

  public payload (fields: Field): PostRequest {
    Object.entries(fields).forEach(([key, value]) => {
      this.fields.set(key, value)
    })

    return this
  }

  public build () {
    return Axios.post(this.url, this.fields, {
      headers: this._headers,
      withCredentials: true
    })
  }
}

class PutRequest extends Request {
  private fields: FormData = new FormData()

  constructor(private url: string) {
    super()
  }

  public payload (fields: Field): PutRequest {
    Object.entries(fields).forEach(([key, value]) => {
      this.fields.set(key, value)
    })

    return this
  }

  public async build (): Promise<AxiosResponse> {
    return Axios.put(this.url, this.fields, {
      headers: this._headers,
      withCredentials: true
    })
  }
}
export const apiClient = new ApiClient('http://localhost:4444')