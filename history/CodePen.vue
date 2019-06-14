<template>
  <div v-if="codePenItems.length">
    <!-- <div>{{res}}</div> -->
    <div class="headline">{{title||'CodePen Popular Pens'}}</div>
    <v-container grid-list-lg>
      <v-layout column>
        <v-layout wrap>
          <v-flex v-for="(codePenItem,index) in showCodePenItems" :key="index" xs12 sm6 md4 lg3>
            <v-card hover class="nopointer">
              <v-card-title class="subheading">
                <span
                  style="text-overflow: ellipsis ;white-space: nowrap;overflow: hidden;"
                >{{codePenItem.title}}</span>
              </v-card-title>
              <a :href="codePenItem.full" target="_blank">
                <v-img
                  :src="codePenItem.url"
                  :lazy-src="codePenItem.lazy"
                  aspect-ratio="1.8"
                  class="grey lighten-2 v-img-box"
                >
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>
              </a>
              <v-card-actions>
                <v-btn flat small color="orange" :href="codePenItem.full" target="_blank">FULL</v-btn>
                <v-btn flat small color="orange" :href="codePenItem.pen" target="_blank">PEN</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-btn flat large @click="show++" v-if="show*imageHeight<codePenItems.length">加载更多…</v-btn>
      </v-layout>
      <br>
      <v-divider/>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CodePen",
  props: {
    title: String,
    url: String
  }, //name:type
  data() {
    return {
      codePenItems: [],
      show: 1,
      panel: 0
      // res:'no',
    };
  },
  computed: {
    showCodePenItems() {
      return this.codePenItems.slice(0, this.imageHeight * this.show);
    },
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "3";
        case "sm":
          return "4";
        case "md":
          return "3";
        case "lg":
          return "4";
        default:
          return "4";
      }
    }
  }, //计算属性
  watch: {},
  methods: {},
  components: {}, //组件componentsName:name
  created() {
    this.$axios({
      method: "get",
      url: this.url || "https://codepen.io/popular/feed" //"https://codepen.io/pma934/public/feed"
    }).then(
      res => {
        // this.res = res
        let xmlhttp = res.request.responseXML.querySelectorAll("item");
        for (let i = 0, len = xmlhttp.length; i < len; i++) {
          let title = xmlhttp[i]
            .querySelector("title")
            .innerHTML.replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&");
          let link = xmlhttp[i].querySelector("link").innerHTML.split("/")[5];
          this.codePenItems.push({
            title: title,
            url: `https://codepen.io/oknoblich/pen/${link}/image/large.png`,
            lazy: `https://codepen.io/oknoblich/pen/${link}/image/large.png`,
            full: xmlhttp[i]
              .querySelector("link")
              .innerHTML.replace(/\/pen\//, "/full/"),
            pen: xmlhttp[i].querySelector("link").innerHTML
          });
        }
      },
      err => {
        // this.res = err
        //console.log("1:" + err);
      }
    );
    // .catch(err => {
    //   console.log("2:" + err);
    // });

    // console.log(this.codePenItems);
    // console.log(document.querySelector(".v-content").outerHTML)
    // let iterator = document.createNodeIterator(
    //   document.querySelector(".v-content"),
    //   NodeFilter.SHOW_ALL,
    //   null,
    //   false
    // );
    // let node = iterator.nextNode();
    // while (node !== null) {
    //   console.log(node.outerHTML);
    //   node = iterator.nextNode();
    // }
  },
  mounted() {
    // console.log(this.codePenItems);
    // console.log(document.querySelector(".v-content").outerHTML)
    // let iterator = document.createNodeIterator(
    //   document.querySelector(".v-content"),
    //   NodeFilter.SHOW_ALL,
    //   null,
    //   false
    // );
    // let node = iterator.nextNode();
    // while (node !== null) {
    //   console.log(node.outerHTML);
    //   node = iterator.nextNode();
    // }
  }
};
</script>

<style scoped>
.nopointer:hover {
  cursor: inherit;
}
* >>> .v-responsive.v-image:hover .v-image__image.v-image__image--cover {
  transform: scale(1.1);
  transition: all 0.6s;
}
</style>