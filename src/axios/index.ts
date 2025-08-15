import axios from "axios";

const instance = axios.create({
  baseURL: "https://note-bookly-server.vercel.app/",
  headers: { "Content-Type": "application/json" }
});

export { instance };