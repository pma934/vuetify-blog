import Vue from 'vue'
import marked from "marked";

Vue.prototype.$marked = marked

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true
});