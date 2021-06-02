<template>
  <v-bottom-navigation class="primary" absolute min-height="80" max-height="85">
    
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
    <a href=https://docs.proceed-labs.org/concepts/capability-description/>
    
    <v-btn class="primary" depressed min-height="80" max-height="85" width="80">
      <span>Proceed</span>
      <v-icon>mdi-library</v-icon>

      
    </v-btn></a>
  </v-bottom-navigation>
</template>

<script>
export default {};
</script>
