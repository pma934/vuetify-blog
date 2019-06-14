<template>
  <div>
    123
    <code>{{weather}}</code>
  </div>
</template>

<script>
export default {
  name: "WeatherForecast",
  data() {
    return {
      weather: null
    };
  },
  mounted() {
    this.$axios.get("https://www.tianqiapi.com/api/").then(res => {
      this.weather = JSON.parse(res.data.split("</b><br />")[1]);
    });
  }
};
</script>
