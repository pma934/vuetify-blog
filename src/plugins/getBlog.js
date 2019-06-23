export default function (vue) {
    getBlog.call(vue, init, 5)
    getBlog.call(vue, getAll, 100)
    getLabels.call(vue)
}

function getBlog(fn, per_page, page = 1) {
    this.$axios
        .get(
            `https://api.github.com/repos/pma934/pma934.github.io/issues?per_page=${per_page}&page=${page}`
        ) //vuejs/vue           pma934/pma934.github.io &access_token=e11bba32422f9b34868b1f4f1bc724e79cf82f00
        .then(
            res => {
                fn.call(this, res, page);
            },
            err => {}
        );
}

function init(res, page) {
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

function getLabels() {
    this.$axios
        .get(
            `https://api.github.com/repos/pma934/pma934.github.io/labels`
        )
        .then(
            res => {
                this.$store.state.labels = res.data;
                console.log(res.data)
            },
            err => {}
        );
}