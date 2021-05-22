<template>
  <v-app>
    <v-main>
      <Header />
      <v-container fluid fill-height>
        <v-layout justify-center align-center> </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "App",

  components: { Header },
};
</script>
