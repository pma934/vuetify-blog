<template>
  <div id="blogContent">
    <v-container fluid grid-list-sm class="pa-0">
      <v-layout row wrap align-space-around fill-height>
        <v-flex xs12 md10 ref="BlogBody">
          <v-layout column wrap v-if="blog">
            <v-flex>
              <v-card class="pa-2">
                <div>
                  <a :href="blog.html_url" id="title" style="text-decoration:none" target="_blank">
                    <span class="display-1 font-weight-light py-1">{{ blog.title }}</span>
                  </a>
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
                  <p
                    class="subheading font-weight-thin font-italic my-0"
                  >{{ dateFormat(blog.created_at) }}</p>
                </div>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="pa-2 my-2">
                <div class="markdown-body" v-html="data"></div>
              </v-card>
            </v-flex>
          </v-layout>
          <p class="text-md-center" v-if="!blog">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </p>
        </v-flex>
        <v-flex class="hidden-sm-and-down" xs0 md2 v-show="scrollY>120">
          <div class="markdown-directory" ref="BlogDirectory" v-html="directory"></div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="copyMsg" :timeout="2000" top right>
      复制成功
      <v-btn flat @click="copyMsg = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { Promise } from "q";
export default {
  name: "blogContent",
  data() {
    return {
      blog: null,
      data: null,
      directory: null,
      comments: null,
      scrollY: 0,
      imgEnBig: false,
      copyMsg: false
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
            `https://api.github.com/repos/pma934/pma934.github.io/issues/${x}`
          )
          .then(res => resolve(res.data), err => reject(err));
      });
    },
    addHeadAndCopyIcon(codeNode) {
      let headName = codeNode.className
        .split(/\s+/g)
        .filter(_ => _.match("language-"))[0];
      headName = headName ? headName.replace("language-", "") : " ";
      let head = "<div class='highlight-code-head'>" + headName + "</div>";
      let copy =
        "<a class='copy-code' href='javascript:' data-clipboard-target='#hljs-0' title='拷贝代码'><i class='fa fa-clipboard'></i></a>";
      codeNode.innerHTML =
        head +
        copy +
        "<ol><li>" +
        codeNode.innerHTML.replace(/\n/g, "\n</li><li>") +
        "\n</li></ol>";
      return codeNode;
    },
    copyNodeText(Node) {
      let selection = window.getSelection();
      selection.removeAllRanges();
      let range = new Range();
      range.selectNode(Node);
      selection.addRange(range);
      document.execCommand("copy");
      this.copyMsg = true;
      selection.removeAllRanges();
    },
    dateFormat: function(str) {
      return new Date(str).toLocaleDateString().replace(/\//g, "-");
    }
  },
  components: {},
  beforeCreate() {},
  created() {
    this.getBlog(this.$route.params.number).then(
      res => {
        document.title = res.title;
        this.blog = res;
        this.data = res.body;
        let div = document.createElement("div");
        div.innerHTML = this.$marked(res.body);
        let directory = Array.from(div.children).filter(
          node => ["H1", "H2", "H3", "H4"].indexOf(node.tagName) !== -1
        );
        this.directory =
          "<h1 data-id='title'>Title</h1><hr>" +
          directory
            .map(node => {
              let newNode = node.cloneNode(true);
              newNode.setAttribute("data-id", newNode.getAttribute("id"));
              newNode.removeAttribute("id");
              return newNode.outerHTML;
            })
            .join("");
        Array.prototype.slice
          .call(div.querySelectorAll("pre code"))
          .map(codeNode => this.addHeadAndCopyIcon(codeNode));
        this.data = div.innerHTML;
      },
      err => (this.data = `<h1>${err}<h1>`)
    );
  },
  mounted: function() {
    let that = this;
    this.$refs["BlogBody"].addEventListener("click", function() {
      if (event.target.className === "fa fa-clipboard") {
        let textNode = event.target.parentNode.nextElementSibling; //获取要选中的内容
        that.copyNodeText(textNode);
      }
    });
    //绑定滑动事件
    this.$refs["BlogDirectory"].addEventListener("click", function() {
      let id = event.target.getAttribute("data-id");
      document.getElementById(id).scrollIntoView();
    });
    //绑定滑动显示事件
    window.onscroll = function() {
      that.scrollY = window.scrollY;
    };
  },
  updated: function() {},
  beforeDestroy: function() {
    window.onscroll = null;
  }
};
</script>


<style lang="scss">
.small-chip {
  height: 1rem !important;
}
</style>

