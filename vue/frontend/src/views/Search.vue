<template>
  <div class="search">
    <h1>Search for your URI</h1>
    <SearchField />
    <Navigation />
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
import SearchField from "@/components/SearchField.vue";

export default {
  name: "Search",
  components: {
    Navigation,
    SearchField,
  },
};
</script>
