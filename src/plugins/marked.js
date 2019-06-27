import Vue from 'vue'
import marked from "marked";

import '../assets/css/markdown.scss';

Vue.prototype.$marked = marked

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: true
});