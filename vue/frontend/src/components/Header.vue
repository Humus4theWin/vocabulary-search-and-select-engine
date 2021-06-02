<template>
  <v-bottom-navigation class="primary" height="60">
    <v-row>
      <v-col cols="1">
        <v-btn
          class="primary"
          :to="{ name: 'Home' }"
          depressed
          height="60"
          block
        >
          <v-icon size="30">mdi-home</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-bottom-navigation>
</template>
     

<script>
export default {};
</script>