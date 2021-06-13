<template>
  <v-container fill-height>
    <v-layout justify-center>
      <v-row align-content="center">
        <v-col cols="12">
          <h2>
            404 Sorry, the page you are looking for doesn't exist. <br />
            Go back to
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </h2>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
