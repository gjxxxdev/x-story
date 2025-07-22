// apiClient.ts
import { RestfulApi } from "./api";

export const devBaseUrl = "http://api.xstudio-mclub.url.tw/";
export const prodBaseUrl = "https://xstoryline.com/";
//https://xstoryline.com/
const api = new RestfulApi({
  devBaseUrl,
  prodBaseUrl,
  isDev: __DEV__,
});

export default api;
