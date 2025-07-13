// apiClient.ts
import { RestfulApi } from "./api";

export const devBaseUrl = "http://api.xstudio-mclub.url.tw/";
export const prodBaseUrl = "http://api.xstudio-mclub.url.tw/";
//https://xstoryline.com/
const api = new RestfulApi({
  devBaseUrl,
  prodBaseUrl,
  isDev: __DEV__,
});

export default api;
