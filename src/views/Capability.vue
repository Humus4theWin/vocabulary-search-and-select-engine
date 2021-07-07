<template>
  <v-container fill-height style="background: white">
    <Test />
  </v-container>
</template>
<script>
// @ is an alias to /src
import Test from "@/components/test.vue";

export default {
  name: "Capability",
  components: {
    Test,
  },
};
</script>
