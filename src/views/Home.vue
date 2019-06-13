<template>
  <v-container fluid grid-list-sm>
    <CodePen title="My Pens" url="https://codepen.io/pma934/public/feed"/>
    <CodePen/>
  </v-container>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import CodePen from "../components/CodePen";

export default {
  components: {
    HelloWorld,
    CodePen
  }
};
</script>
