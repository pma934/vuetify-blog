<template>
  <div id="archive">
    123
    <v-layout wrap column>
      <v-flex>
        <code>Other</code>
      </v-flex>
      <v-flex>
        <Blog/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Blog from "@/components/Blog";

export default {
  name: "archive",
  components: {
    Blog,
  }
};
</script>