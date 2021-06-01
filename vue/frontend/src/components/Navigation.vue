<template>
  <v-bottom-navigation class="primary" absolute min-height="80" max-height="85">
    <v-btn
      class="primary"
      :to="{ name: 'Home' }"
      depressed
      min-height="80"
      max-height="85"
    >
      <span>Home</span>

      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn
      class="primary"
      :to="{ name: 'Search' }"
      depressed
      min-height="80"
      max-height="85"
    >
      <span>Search</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {};
</script>
