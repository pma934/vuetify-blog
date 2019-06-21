export default function (vue) {
    getBlog.call(vue, init, 5)
    getBlog.call(vue, getAll, 100)
}

function getBlog(fn, per_page, page = 1) {
    this.$axios
        .get(
            `https://api.github.com/repos/vuejs/vue/issues?per_page=${per_page}&page=${page}&access_token=ef1539f92765d49d0196257f861a59872993a4c5`
        )//vuejs/vue           pma934/pma934.github.io
        .then(
            res => {
                fn.call(this, res, page);
            },
            err => {}
        );
}

function init(res,page) {
    //初始化，先获取5个展示，和设置总页数
    // console.log("init");
    this.$store.commit("setBlog", [res.data, page]);
    let headers = res.headers;
    if (headers.hasOwnProperty("link")) {
        let re = /&page=(\d+)[&\w/_=]*>; rel="last"/;
        let totalPage = Number(re.exec(headers.link)[1]);
        this.$store.commit("setPer5Pages", totalPage);
    }
}

function getAll(res, page) {
    //获取全部内容
    // console.log("getAll");
    // console.log(page);
    this.$store.commit("setBlog", [res.data, page]);
    // this.blogs = this.$store.state.blog;
    if (page < this.$store.getters.per100Pages) {
        //每页100个，从第一页获取到最后一页当前页数
        getBlog.call(this, getAll, 100, page + 1);
    }
}