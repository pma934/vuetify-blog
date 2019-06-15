<template>
  <div id="blogContent">
    <v-layout>
      <v-flex xs12  md10 >
        <div class="markdown-body" id="BlogContent" v-html="data"></div>
      </v-flex>
      <v-flex xs0  md2 ></v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "BlogContent",
  data() {
    return {
      blog: null,
      data: null
    };
  },
  computed: {},
  methods: {
    getBlog(x) {
      let blogs = this.$store.state.blog;
      for (let i = 0, len = blogs.length; i < len; i++) {
        if (blogs[i].number == x) {
          return blogs[i];
        }
      }
    }
  },
  components: {},
  created: function() {
    this.blog = this.getBlog(this.$route.params.number);
    this.data = this.$marked(this.blog.body);
  },
  mounted: function() {},
  updated: function() {},
  beforeDestroy: function() {}
};
</script>

<style lang="scss" >
@import "../assets/css/markdown";
/* * >>> code {
  box-shadow: 0 0 !important;
} */
</style>
