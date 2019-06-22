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
        :src="drawerImages[drawerImageIndex]"
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
      <v-toolbar-items>
        <v-btn icon @click.stop="themeDialog=!themeDialog">
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
    <v-dialog v-model="themeDialog" max-width="800" scrollable lazy>
      <v-card>
        <v-card-title class="title primary" primary-title>主题设置</v-card-title>
        <v-card-text>
          主题色:
          <input type="color" v-model="primaryColor">
          <v-layout row wrap>
            <v-flex v-for="(url,index) in drawerImages" :key="url" xs6 sm4 md2 d-flex>
              <v-card hover flat tile class="d-flex ma-1" @click.stop="drawerImageIndex=index">
                <v-img :src="url" class="grey lighten-2"></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="themeDialog=false">Cancel</v-btn>
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
  data() {
    return {
      themeDialog: false,
      primaryColor: this.$vuetify.theme.primary,
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
      drawerImageIndex: 0,
      drawerImages: [
        "https://s2.ax1x.com/2019/06/16/VToxQH.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9z7DK.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9zHHO.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9zLUe.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9zO4H.jpg",
        "https://s2.ax1x.com/2019/06/23/Z9zqED.jpg"
      ]
    };
  },

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
  watch: {
    primaryColor: function(newColor) {
      // console.log(newColor, oldColor)
      this.$vuetify.theme.primary = newColor;
      //document.documentElement.style.setProperty("--v-primary-base", newColor);
    }
  },
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

