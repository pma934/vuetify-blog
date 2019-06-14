<template>
  <v-container grid-list-lg>
    <v-layout  wrap>
      <v-flex>
        <code>Other</code>
      </v-flex>
      <v-flex>
        <Blog/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Blog from "@/components/Blog";

export default {
  name: "Other",
  components: {
    Blog
  }
};
</script>