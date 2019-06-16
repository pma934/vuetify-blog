<template>
  <div id="blogContent">
    <v-layout>
      <v-flex xs12 md10>
        <div class="markdown-body" id="BlogContent" v-html="data"></div>
      </v-flex>
      <v-flex xs0 md2></v-flex>
    </v-layout>
  </div>
</template>

<script>
import { Promise } from "q";
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
      return new Promise((resolve, reject) => {
        let blogs = this.$store.state.blog;
        for (let i = 0, len = blogs.length; i < len; i++) {
          if (blogs[i].number == x) {
            resolve(blogs[i]);
            return;
          }
        }
        this.$axios
          .get(
            `https://api.github.com/repos/pma934/pma934.github.io/issues/${x}&access_token=52e662b1e39da538702548b9644f10e39b40b6ca`
          )
          .then(res => resolve(res.data), err => reject(err));
      });
    }
  },
  components: {},
  beforeCreate() {},
  created() {
    this.getBlog(this.$route.params.number).then(
      res => {
        this.blog = res;
        let div = document.createElement('div');
        div.innerHTML = this.$marked(this.blog.body);
        Array.prototype.slice.call(div.querySelectorAll('pre code')).map(codeNode=>{
          codeNode.innerHTML = "<ol><li>" + codeNode.innerHTML.replace(/\n/g,"\n</li><li>") +"\n</li></ol>"
        })

        this.data = div.innerHTML
      },
      err => (this.data = `<h1>${err}<h1>`)
    );
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
