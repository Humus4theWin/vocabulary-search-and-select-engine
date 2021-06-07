<template>
  <v-bottom-navigation class="primary" height="80">
    <!-- absolute min-height="80" max-height="85"-->
    <v-btn
      class="primary"
      :to="{ name: 'Home' }"
      depressed
      min-height="80"
      max-height="85"
      width="80"
    >
      <span>Capability</span>
      <v-icon>mdi-hammer-wrench</v-icon>
    </v-btn>

        <v-btn
      class="primary"
      to="/Vocabs"
      depressed
      min-height="80"
      max-height="85"
      width="80"
    >
      <span>Vocabs</span>
      <v-icon>mdi-book-open-blank-variant</v-icon>
    </v-btn>

        <v-btn
      class="primary"
      to='/create'
      depressed
      min-height="80"
      max-height="85"
      width="80"
    >
      <span>Create Term</span>
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    

    <v-divider></v-divider>


    <v-btn
        class="primary mr-10"
        href=https://docs.proceed-labs.org/concepts/capability-description/
        target="_blank"
        depressed min-height="80"
        max-height="85"
        width="80">
      <span>Proceed</span>
      <v-icon>mdi-link</v-icon>
    </v-btn>

    <p class="text--secondary text-center mt-8 yearLicense">{{ new Date().getFullYear() }} - <a href="https://www.gnu.org/licenses/agpl-3.0.de.html" target="_blank" class="text--secondary">GNU Affero General Public License</a></p>

  </v-bottom-navigation>
</template>

<script>
export default {};
</script>
<style>
.yearLicense{
  font-size: 80%;
}
</style>
