<template>
  <div id="theme">
    <v-container grid-list-md>
      <v-layout column>
        <v-layout>
          <v-flex>
            <v-card
              :dark="!switch1"
              :color="'primary '+(switch1?'lighten-':'darken-')+slider"
            >primary</v-card>
          </v-flex>
          <v-flex>
            <v-card
              :dark="!switch1"
              :color="'secondary '+(switch1?'lighten-':'darken-')+slider"
            >secondary</v-card>
          </v-flex>
          <v-flex>
            <v-card :dark="!switch1" :color="'accent '+(switch1?'lighten-':'darken-')+slider">accent</v-card>
          </v-flex>
          <v-flex>
            <v-card :dark="!switch1" :color="'error '+(switch1?'lighten-':'darken-')+slider">error</v-card>
          </v-flex>
          <v-flex>
            <v-card :dark="!switch1" :color="'info '+(switch1?'lighten-':'darken-')+slider">info</v-card>
          </v-flex>
          <v-flex>
            <v-card
              :dark="!switch1"
              :color="'success '+(switch1?'lighten-':'darken-')+slider"
            >success</v-card>
          </v-flex>
          <v-flex>
            <v-card
              :dark="!switch1"
              :color="'warning '+(switch1?'lighten-':'darken-')+slider"
            >warning</v-card>
          </v-flex>
        </v-layout>

        <v-layout wrap>
          <v-flex xs12 sm6 md4 offset-md2>
            <v-card>
              <v-card-text>
                <v-slider v-model="slider" max="5" min="0" :label="slider.toString()"></v-slider>
                <v-switch v-model="switch1" :label="`色彩: ${switch1?'light':'dark'}`"></v-switch>
                <input type="color" v-model="color">
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm6 md4>
            <v-card>
              <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                  <div>{{ card_text }}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "theme",
  data() {
    return {
      color: this.$vuetify.theme.primary,
      slider: 0,
      switch1: true,
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    };
  },
  computed: {},
  watch: {
    color: function(newColor) {
      // console.log(newColor, oldColor)
      this.$vuetify.theme.primary = newColor;
      document.documentElement.style.setProperty("--v-primary-base", newColor);
    }
  },
  methods: {},
  mounted() {
    // console.log(this.$vuetify);
  }
};
</script>
