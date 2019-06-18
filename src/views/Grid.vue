<template>
  <div id="grid">
    <NestedGrid/>
    <UniqueLayouts/>
  </div>
</template>
<script>
import NestedGrid from "@/components/NestedGrid";
import UniqueLayouts from "@/components/UniqueLayouts";

export default {
  name: "grid",
  components: {
    NestedGrid,
    UniqueLayouts
  }
};
</script>

