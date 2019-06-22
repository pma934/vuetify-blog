<template>
  <div id="archive">
    <v-layout wrap column>
      <v-flex>
        <v-chip
          color="primary"
          outline
          small
          label
          :class="{'v-chip--selected':!selectLabel}"
          @click="selectLabel=undefined"
        >ALL</v-chip>
        <v-chip
          v-for="label in labels"
          :key="label.name"
          :color="'#'+label.color"
          :class="{'v-chip--selected':selectLabel===label.name}"
          @click="selectLabel=label.name"
          outline
          small
          label
        >{{label.name}}</v-chip>
      </v-flex>
      <v-divider class="my-3"/>
      <v-flex>
        <Blog :filter="selectLabel"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Blog from "@/components/Blog";

export default {
  name: "archive",
  data() {
    return {
      selectLabel: null
    };
  },
  computed: {
    labels() {
      return this.$store.state.labels;
    }
  },
  components: {
    Blog
  }
};
</script>