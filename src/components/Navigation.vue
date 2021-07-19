<template>
  <v-bottom-navigation class="primary" height="70" app="true">
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

