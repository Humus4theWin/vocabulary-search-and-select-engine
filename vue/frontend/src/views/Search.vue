<template>
  <div class="search">
    <Header />
    <SearchField />
    <Navigation />
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
import SearchField from "@/components/SearchField.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Search",
  components: {
    Navigation,
    SearchField,
    Header,
  },
};
</script>
