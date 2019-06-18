<template>
  <div id="blogContent">
    <v-container fluid grid-list-sm class="pa-0">
      <v-layout row wrap align-space-around fill-height>
        <v-flex xs12 md10 ref="BlogBody">
          <v-layout column wrap>
            <v-flex>
              <v-card class="pa-1">
                <div v-if="blog">
                  <a :href="blog.html_url" target="_black" id="title">{{blog.title}}</a>
                  <p>{{blog.created_at}}</p>
                  <span>{{blog.labels}}</span>
                </div>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="pa-1">
                <div class="markdown-body" v-html="data"></div>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="pa-1">
                <div id="comments">Comments</div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="hidden-sm-and-down" xs0 md2 v-show="scrollY>120">
          <div class="markdown-directory" ref="BlogDirectory" v-html="directory"></div>
        </v-flex>
      </v-layout>
    </v-container>
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
      scrollY: 0
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
            `https://api.github.com/repos/pma934/pma934.github.io/issues/${x}&access_token=d8b2ddf36b8f3485751c1457d58151b9e2c5c1a4`
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
      selection.removeAllRanges(); //将所有的区域都从选区中移除
      let range = new Range(); //返回新创建的 Range 对象，两个边界点都被设置为文档的开头
      range.selectNode(Node); //把范围边界设置为一个节点的子节点
      selection.addRange(range); //将一个区域（Range）对象加入选区
      document.execCommand("copy");
      alert("复制成功");
      selection.removeAllRanges(); //将所有的区域都从选区中移除
    }
  },
  components: {},
  beforeCreate() {},
  created() {
    //渲染内容
    this.getBlog(this.$route.params.number).then(
      res => {
        this.blog = res;
        let div = document.createElement("div");
        div.innerHTML = this.$marked(res.body);
        //生成文章目录
        let directory = Array.prototype.slice
          .call(div.children)
          .filter(
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
            .join("") +
          "<hr><h1 data-id='comments'>Comments</h1>";
        //添加头部和复制按钮
        Array.prototype.slice
          .call(div.querySelectorAll("pre code"))
          .map(codeNode => this.addHeadAndCopyIcon(codeNode));
        this.data = div.innerHTML;
      },
      err => (this.data = `<h1>${err}<h1>`)
    );
  },
  mounted: function() {
    //注册copy事件
    let that = this;
    this.$refs["BlogBody"].addEventListener("click", function() {
      if (event.target.className === "fa fa-clipboard") {
        // console.log(event.target.parentNode.nextElementSibling.innerText.replace(/\n\n/g,'\n'))
        var textNode = event.target.parentNode.nextElementSibling; //获取要选中的内容
        that.copyNodeText(textNode);
      }
    });
    //绑定滑动事件
    this.$refs["BlogDirectory"].addEventListener("click", function() {
      let id = event.target.getAttribute("data-id");
      that.$refs["BlogBody"].querySelector("#" + id).scrollIntoView();
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
pre:before {
  content: " ";
  position: absolute;
  border-radius: 50%;
  background: #fc625d;
  width: 12px;
  height: 12px;
  margin-top: 8px;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
}
.copy-code {
  color: #fff;
  float: right;
  margin-top: -26px;
  padding-right: 6px;
  font-size: 16px;
}
.copy-code :hover {
  color: #ccc;
}
.markdown-directory {
  position: fixed;
  top: 8%;
  border-left: 1px solid #aaa;
  padding: 4px;
  margin: 4px;
  max-height: 82%;
  overflow-y: auto;
  overflow-x: hidden;
}
.markdown-directory {
  h1,
  h2,
  h3,
  h4 {
    cursor: pointer;
    color: var(--v-primary-base);
    position: relative;
    font-size: 1em;
    line-height: 1.6em;
    font-weight: bold;
  }
  h2 {
    margin-left: 1em;
  }
  h3 {
    margin-left: 2em;
  }
  h4 {
    margin-left: 3em;
  }
  hr {
    width: 50%;
    border: 0;
    border-top: 1px solid #aaa;
  }
}
</style>

