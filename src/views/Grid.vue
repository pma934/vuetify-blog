<template>
  <v-container>
    <NestedGrid/>
    <UniqueLayouts/>
  </v-container>
</template>
<script>
import NestedGrid from "@/components/NestedGrid";
import UniqueLayouts from "@/components/UniqueLayouts";

export default {
  components: {
    NestedGrid,
    UniqueLayouts
  }
};
</script>

