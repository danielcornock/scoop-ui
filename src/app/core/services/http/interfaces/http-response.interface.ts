export interface IHttpResponse<T = any, TMeta = any> {
  data: T;
  meta: TMeta;
}
