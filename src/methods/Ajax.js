import { setPromiseByReqParams, } from "../helpers";

export default class Ajax {
  constructor(options) {
    this.options = options;
  }

  get(path) {
    return setPromiseByReqParams.call(this, path, "GET");
  }

  post(path) {
    return setPromiseByReqParams.call(this, path, "POST");
  }

  put(path) {
    return setPromiseByReqParams.call(this, path, "PUT");
  }

  delete(path) {
    return setPromiseByReqParams.call(this, path, "DELETE");
  }
}