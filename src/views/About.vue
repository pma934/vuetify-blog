<template>
  <div class="about">
    <rotateCard
      :cards-url="cardsUrl"
      :radius="400"
      :cardWidth="240"
      :cardHeight="340"
      :clockwise="true"
      :cycle="30"
      :isDrag="true"
    ></rotateCard>
    <h1>This is an about page</h1>
    <p>blog.length:{{$store.state.blog.length}}</p>
    <p>per5Pages:{{$store.state.per5Pages}}</p>
    <p>per100Pages:{{$store.getters.per100Pages}}</p>
    <p>{{imageHeight}}</p>
  </div>
</template>

<script>
import WeatherForecast from "@/components/WeatherForecast";
import rotateCard from "vue-zxz-components"

export default {
  name: "about",
  data() {
    return {
      cardsUrl: [
        "https://images.pokemontcg.io/xyp/XY62_hires.png",
        "https://images.pokemontcg.io/xyp/XY158_hires.png",
        "https://images.pokemontcg.io/xy7/68_hires.png",
        "https://images.pokemontcg.io/xy5/105_hires.png",
        "https://images.pokemontcg.io/xyp/XY103_hires.png",
        "https://images.pokemontcg.io/xy2/107_hires.png",
        "https://images.pokemontcg.io/smp/SM126_hires.png"
      ]
    };
  },
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "xs";
        case "sm":
          return "sm";
        case "md":
          return "md";
        case "lg":
          return "lg";
        case "xl":
          return "xl";
      }
    }
  },
  components: {
    WeatherForecast,
    rotateCard
  },
  mounted() {}
};
</script>

