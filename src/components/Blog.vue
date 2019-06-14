<template>
  <div id="Blog">
    <code>{{blog}}</code>
  </div>
</template>

<script>
export default {
  name: "Blog",
  data() {
    return {
      blog: []
    };
  },
  methods: {
    getBlog: function() {
      if (this.$store.state.blog.length) {
        this.blog = this.$store.state.blog;
      } else {
        this.$axios
          .get(`https://api.github.com/repos/pma934/pma934.github.io/issues`)
          .then(
            res => {
              console.log(res);
              this.$store.state.blog = res.data;
              this.blog = res.data;
            },
            err => {
              console.error(err);
            }
          );
      }
    }
  },
  created: function() {
    this.getBlog();
  }
};
</script>

<style scoped>
</style>
