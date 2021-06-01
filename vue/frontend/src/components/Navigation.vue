<template>
  <v-bottom-navigation class="primary" absolute min-height="80" max-height="85">
    <v-btn
      class="primary"
      :to="{ name: 'Home' }"
      depressed
      min-height="80"
      max-height="85"
      width="80"
    >
      <span>Home</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn
      class="primary"
      :to="{ name: 'Search' }"
      depressed
      min-height="80"
      max-height="85"
      width="80"
    >
      <span>Search</span>

      <v-icon>mdi-library</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {};
</script>
