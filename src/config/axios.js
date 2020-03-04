import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://starlord.hackerearth.com"
});
export default axios;
