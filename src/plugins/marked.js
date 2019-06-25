import Vue from 'vue'
import marked from "marked";

import '../assets/css/markdown.scss';

Vue.prototype.$marked = marked

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: true
});