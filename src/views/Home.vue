<template>
  <!-- <v-container fluid grid-list-sm> -->
  <div id="home">
    <CodePen title="My Pens" url="https://codepen.io/pma934/public/feed"/>
    <CodePen title="CodePen Popular Pens" url="https://codepen.io/popular/feed"/>
    <Blog/>
  </div>
  <!-- </v-container> -->
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
