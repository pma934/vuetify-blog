<template>
  <div id="Blog">
    <div class="headline">Archive</div>
    <v-container grid-list-lg>
      <v-layout column>
        <v-layout v-for="blog in showBlogs" :key="blog.number" mb-3 class="hover">
          <v-flex>
            <div>
              <p
                class="subheading font-weight-thin font-italic my-0"
              >{{ dateFormat(blog.created_at) }}</p>
              <router-link :to="'/archive/'+blog.number" style="text-decoration:none">
                <span class="title font-weight-light py-1">{{ blog.title }}</span>
              </router-link>
              <div>
                <v-chip
                  class="small-chip"
                  v-for="label in blog.labels"
                  :key="label.node_id"
                  :style="{backgroundColor:'#'+label.color}"
                  text-color="white"
                  disabled
                >{{label.name}}</v-chip>
              </div>
            </div>
          </v-flex>
        </v-layout>
        <v-btn flat large @click="showMore" v-if="btnShow">加载更多…</v-btn>
        <span class="text-md-center">
          <v-progress-circular indeterminate color="primary" v-if="circShow"></v-progress-circular>
        </span>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Blog",
  data() {
    return {
      currentPage: 1,
      blogsNumber:null,
    };
  },
  props: {
    filter: String
  },
  computed: {
    blogs() {
      let blogs = this.$store.state.blog
      this.blogsNumber = blogs.length
      return blogs;
    },
    totalPage() {
      return this.$store.state.per5Pages;
    },
    showBlogs() {
      let blogs = this.blogs;
      if (this.filter) {
        blogs = blogs.filter(blog => {
          for (let label of blog.labels) {
            if (label.name === this.filter) {
              return true;
            }
          }
          return false;
        });
      }
      this.blogsNumber = blogs.length
      return blogs.slice(0, 5 * this.currentPage);
    },
    btnShow() {
      return (
        5 * this.currentPage < this.blogsNumber ||
        (5 * this.currentPage == this.blogsNumber &&
          this.currentPage < this.totalPage)
      );
    },
    circShow() {
      return (
        !this.blogsNumber ||
        (this.currentPage > this.totalPage && this.totalPage != 1)
      );
    }
  },
  watch:{
    filter:function(){
      this.currentPage = 1;
    }
  },
  methods: {
    showMore: function() {
      this.currentPage++;
    },
    dateFormat: function(str) {
      return new Date(str)
        .toString()
        .split(" ")
        .slice(1, 4)
        .join(" ");
    }
  },
  created() {}
};
</script>

<style scoped>
.small-chip {
  height: 1rem !important;
}
</style>
