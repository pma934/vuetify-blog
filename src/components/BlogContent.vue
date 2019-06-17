<template>
  <div id="blogContent">
    <div v-if="blog">
      <a :href="blog.html_url" target="_black">{{blog.title}}</a>
      <p>{{blog.created_at}}</p>
      <code>{{blog.labels}}</code>
    </div>
    <textarea name id="ttt" cols="30" rows="10" value="121331"></textarea>
    <v-layout>
      <v-flex xs12 md10>
        <div class="markdown-body" ref="BlogContent" id="BlogContent" v-html="data"></div>
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
            `https://api.github.com/repos/pma934/pma934.github.io/issues/${x}&access_token=f2a465b11fd5cdc79c5edd1e5ec2abc6b4ed88ce`
          )
          .then(res => resolve(res.data), err => reject(err));
      });
    }
  },
  components: {},
  beforeCreate() {},
  created() {
    //渲染内容
    this.getBlog(this.$route.params.number).then(
      res => {
        // console.log(res)
        this.blog = res;
        let div = document.createElement("div");
        div.innerHTML = this.$marked(this.blog.body);
        Array.prototype.slice
          .call(div.querySelectorAll("pre code"))
          .map(codeNode => {
            let headName = codeNode.className
              .split(/\s+/g)
              .filter(_ => _.match("language-"))[0];
            headName = headName ? headName.replace("language-", "") : " ";
            let head =
              "<div class='highlight-code-head'>" + headName + "</div>";
            let copy =
              "<a class='copy-code' href='javascript:' data-clipboard-target='#hljs-0' title='拷贝代码'><i class='fa fa-clipboard'></i></a>";
            codeNode.innerHTML =
              head +
              copy +
              "<ol><li>" +
              codeNode.innerHTML.replace(/\n/g, "\n</li><li>") +
              "\n</li></ol>";
          });

        this.data = div.innerHTML;
      },
      err => (this.data = `<h1>${err}<h1>`)
    );
  },
  mounted: function() {
    //注册copy事件
    let that = this;
    this.$refs["BlogContent"].addEventListener("click", function() {
      if (event.target.className === "fa fa-clipboard") {
        // console.log(event.target.parentNode.nextElementSibling.innerText.replace(/\n\n/g,'\n'))

        var text = event.target.parentNode.nextElementSibling; //获取要选中的内容

        var selection = window.getSelection();
        selection.removeAllRanges(); //将所有的区域都从选区中移除
        var range = document.createRange(); //返回新创建的 Range 对象，两个边界点都被设置为文档的开头
        range.selectNodeContents(text); //把范围边界设置为一个节点的子节点
        selection.addRange(range); //将一个区域（Range）对象加入选区
        document.execCommand('copy')
        alert("复制成功")
      }
    });
  },
  updated: function() {},
  beforeDestroy: function() {}
};
</script>


<style>
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
</style>

