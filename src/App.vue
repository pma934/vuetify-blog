<template>
  <v-app id="sandbox" :dark="dark">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      absolute
      overflow
      app
    >
          <v-list-tile>
            <v-list-tile-title class="title">导航</v-list-tile-title>
          </v-list-tile>

      

      <v-list dense class="pt-0">

        <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>


    </v-navigation-drawer>

    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <v-toolbar-side-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Vuetify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn icon @click.stop="dialog=!dialog">
          <v-icon>fa-cog</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>

        <router-view></router-view>  
        <router-view name="a"></router-view>  

        </v-layout>
      </v-container>
    </v-content>
    <v-footer :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <span>Scheme</span>
              <v-switch v-model="dark" primary label="Dark"></v-switch>
            </v-flex>
            <v-flex xs12 md6>
              <span>Drawer</span>
              <v-radio-group v-model="primaryDrawer.type" column>
                <v-radio
                  v-for="drawer in drawers"
                  :key="drawer"
                  :label="drawer"
                  :value="drawer.toLowerCase()"
                  primary
                ></v-radio>
              </v-radio-group>
              <v-switch v-model="primaryDrawer.clipped" label="Clipped" primary></v-switch>
              <v-switch v-model="primaryDrawer.floating" label="Floating" primary></v-switch>
              <v-switch v-model="primaryDrawer.mini" label="Mini" primary></v-switch>
            </v-flex>
            <v-flex xs12 md6>
              <span>Footer</span>
              <v-switch v-model="footer.inset" label="Inset" primary></v-switch>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat>Cancel</v-btn>
          <v-btn flat color="primary">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Home", icon: "fa-home" ,to:"/"},
      { title: "About", icon: "fa-address-card",to:"/about" }
    ],
    dialog: false,
    dark: false,
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: true,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    }
  }),
  computed: {}
};
</script>
