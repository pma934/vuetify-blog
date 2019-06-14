<template>
  <v-container fluid grid-list-sm>
    <CodePen title="My Pens" url="https://codepen.io/pma934/public/feed"/>
    <CodePen title="CodePen Popular Pens" url="https://codepen.io/popular/feed"/>
  </v-container>
</template>

<script>
import CodePen from "@/components/CodePen";

export default {
  components: {
    CodePen
  }
};
</script>
