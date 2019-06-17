import Vue from 'vue'
import marked from "marked";

import 'highlight.js/styles/a11y-dark.css';
import '../assets/css/markdown.scss';

import hljs from 'highlight.js';

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