<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{imageHeight}}</p>
    <WeatherForecast/>
  </div>
</template>

<script>
import WeatherForecast from "@/components/WeatherForecast";

export default {
  data() {
    return {};
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
    WeatherForecast
  },
  mounted() {}
};
</script>

