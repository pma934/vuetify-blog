<template>
  <div id="hot">
    <v-container grid-list-lg>
      <v-layout wrap>
        <v-flex xs12 md9 order-md1>
          <p class="text-md-center" v-if="!trend">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </p>
          <v-layout column v-if="trend">
            <v-card class="pa-3">
              <!-- <v-layout wrap> -->
              <!-- <v-flex sm3> -->
              <span class="display-1 font-weight-bold">热门项目</span>
              <!-- </v-flex> -->

              <!-- <v-flex sm5> -->
              <!-- <v-layout wrap style="width:250px"> -->
              <!-- <v-flex xs6> -->
              <div class="menu-box">
                <v-menu>
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" class="menu-btn" v-on="on">{{since.title}}</v-btn>
                  </template>
                  <v-list>
                    <v-list-tile v-for="s in sinces" :key="s.title" @click="since=s">
                      <v-list-tile-title>{{s.title}}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <!-- </v-flex>
                <v-flex xs6>-->
                <v-menu>
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" class="menu-btn" v-on="on">{{lang}}</v-btn>
                  </template>
                  <v-list>
                    <v-list-tile v-for="l in langs" :key="l" @click="lang=l">
                      <v-list-tile-title>{{l}}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </div>
              <!-- </v-flex> -->
              <!-- </v-layout> -->
              <!-- </v-flex> -->
              <!-- </v-layout> -->
            </v-card>
            <v-flex v-for="t in trend" :key="t.repo" class="pa-0">
              <v-card class="pa-3">
                <a class="title" :href="t.repo_link" target="_blank">
                  <v-icon class="mr-1" small>fa-book</v-icon>
                  <span class="font-weight-light">{{t.repo.split('/')[0]}}</span>/
                  <span class="font-weight-bold">{{t.repo.split('/')[1]}}</span>
                </a>
                <div style="min-height: 1em;">
                  <p class="body-2 my-1 pr-4">{{t.desc}}</p>
                </div>
                <div class="caption mt-2">
                  <span class="ml-0 mr-3">
                    <v-icon class="mr-1" small>fa-language</v-icon>
                    <span itemprop="programmingLanguage">{{t.lang}}</span>
                  </span>
                  <span class="mr-3">
                    <v-icon class="mr-1" small>fa-star</v-icon>
                    {{t.stars}}
                  </span>
                  <span class="mr-3">
                    <v-icon class="mr-1" small>fork</v-icon>
                    {{t.forks}}
                  </span>
                  <span class="mr-3">
                    贡献者：
                    <a>
                      <img
                        v-for="avatar in t.avatars"
                        :key="avatar"
                        :src="avatar"
                        class="avatar mb-1 mx-1"
                        height="20"
                        width="20"
                      >
                    </a>
                  </span>
                  <span style="float:right;">
                    <v-icon class="mr-1" small>fa-star</v-icon>
                    {{t.added_stars}}
                  </span>
                </div>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
export default {
  name: "hot",
  data() {
    return {
      trend: null,
      langs: [
        "All",
        "C++",
        "HTML",
        "Java",
        "JavaScript",
        "PHP",
        "Python",
        "Ruby"
      ],
      lang: "javascript",
      sinces: [
        { title: "今日", value: "daily" },
        { title: "本周", value: "weekly" },
        { title: "本月", value: "monthly" }
      ],
      since: { title: "本周", value: "weekly" }
    };
  },
  watch: {
    lang: function() {
      this.getTrend();
    },
    since: function() {
      this.getTrend();
    }
  },
  methods: {
    getTrend() {
      let lang = "";
      if (this.lang !== "All") {
        lang = `&lang=${this.lang}`;
      }
      this.$axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://trendings.herokuapp.com/repo?since=${
            this.since.value
          }${lang}`
        )
        .then(res => {
          console.log(res);
          this.trend = res.data.items;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {},
  mounted() {
    this.getTrend();
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none !important;
}
.menu-box {
  float: right;
  width: 264px;
  display: flex;
}
.menu-btn {
  width: 120px;
}
.avatar {
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  overflow: hidden;
  vertical-align: middle;
}
</style>


