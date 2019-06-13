<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script>
let Parser = require("rss-parser");
let parser = new Parser();

export default {
  data(){
    return{
      msg:'msg'
    }
  },
  mounted() {
    (async () => {
      let feed = await parser.parseURL("https://codepen.io/popular/feed");
      this.msg = feed.title
      console.log(feed.title);

      feed.items.forEach(item => {
        console.log(item.title + ":" + item.link);
      });
    })();
  }
};
</script>

