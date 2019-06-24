<template>
  <div id="home">
    <CodePen title="My Pens" url="https://codepen.io/pma934/public/feed"/>
    <CodePen title="CodePen Popular Pens" url="https://codepen.io/popular/feed"/>
    <Blog/>
  </div>
</template>

<script>
import CodePen from "@/components/CodePen";
import Blog from "@/components/Blog";

export default {
  name: "home",
  components: {
    CodePen,
    Blog
  }
};
</script>
