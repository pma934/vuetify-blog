export default function (vue) {
    getBlog.call(vue, init, 5)
    getBlog.call(vue, getAll, 100)
    getLabels.call(vue)
}

function getBlog(fn, per_page, page = 1) {
    this.$axios
        .get(
            `https://api.github.com/repos/pma934/pma934.github.io/issues?per_page=${per_page}&page=${page}`
        ) 
        .then(
            res => {
                fn.call(this, res, page);
            }
        );
}

function init(res, page) {
    this.$store.commit("setBlog", [res.data, page]);
    let headers = res.headers;
    if (headers.hasOwnProperty("link")) {
        let re = /&page=(\d+)[&\w/_=]*>; rel="last"/;
        let totalPage = Number(re.exec(headers.link)[1]);
        this.$store.commit("setPer5Pages", totalPage);
    }
}

function getAll(res, page) {
    this.$store.commit("setBlog", [res.data, page]);
    if (page < this.$store.getters.per100Pages) {
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
            },
        );
}