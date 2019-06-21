<template>
  <v-app id="app" class="app-background">
    <!-- 抽屉 -->
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      width="200"
      floating
      fixed
      app
      dark
      style="overflow: hidden;"
    >
      <v-img
        src="https://s2.ax1x.com/2019/06/16/VToxQH.jpg"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        height="100%"
      >
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar color="white">
              <v-img src="https://s2.ax1x.com/2019/06/16/V7QVCn.jpg" height="34"/>
            </v-list-tile-avatar>
            <v-list-tile-title class="title">导航</v-list-tile-title>
          </v-list-tile>
        </v-list>

        <v-divider class="mx-3"/>

        <v-list class="pt-0">
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            class="py-2 px-3 my-v-list-tile"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="font-weight-light">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-img>
    </v-navigation-drawer>

    <!-- 顶部工具栏 -->
    <v-toolbar scroll-off-screen absolute dense fixed app color="#ffffff66">
      <v-toolbar-side-icon @click.stop="primaryDrawer.model = !primaryDrawer.model"></v-toolbar-side-icon>
      <v-toolbar-title>围巾落地冻成狗</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn icon @click.stop="dialog=!dialog">
          <v-icon>fa-cog</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- 内容 -->

    <v-content :class="{'pt-0':!xsSize}">
      <div class="hidden-xs-only">
        <div id="mask-box">
          <v-img src="https://s2.ax1x.com/2019/06/16/VTTAfS.png" height="120"></v-img>
        </div>
        <v-img src="https://s2.ax1x.com/2019/06/16/VTTAfS.png" height="120"></v-img>
      </div>
      <v-container fluid>
        <keep-alive include="home,archive">
          <router-view style="border:0px solid"></router-view>
        </keep-alive>
      </v-container>
    </v-content>

    <!--对话框  -->
    <v-dialog v-model="dialog" max-width="500" scrollable lazy>
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <span>Scheme</span>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog=false">Cancel</v-btn>
          <v-btn flat color="primary">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import GetBlog from "./plugins/getBlog.js";

export default {
  name: "app",
  data: () => ({
    dialog: false,
    items: [
      { title: "首页", icon: "fa-home", to: "/" },
      { title: "归档", icon: "fa-check-circle", to: "/archive" },
      { title: "About", icon: "fa-address-card", to: "/about" },
      { title: "Grid", icon: "fa-th-large", to: "/grid" },
      { title: "Theme", icon: "fa-check-circle", to: "/theme" }
    ],
    primaryDrawer: {
      model: null
    },
    canvasTimeCallBack: null
  }),
  computed: {
    xsSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return true;
        default:
          return false;
      }
    }
  },
  watch: {},
  components: {},
  beforeCreate() {
    GetBlog(this);
  },
  mounted() {}
};
</script>

<style scoped>
.app-background {
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
}
.my-v-list-tile >>> .v-list__tile--active {
  background-color: var(--v-primary-base) !important;
  border-radius: 4px;
}
.my-v-list-tile >>> a {
  color: inherit !important;
}
#mask-box {
  height: 48px;
  margin-bottom: 72px;
  filter: blur(4px);
  overflow: hidden;
  position: absolute;
  width: 100%;
  z-index: 1;
}
</style>

