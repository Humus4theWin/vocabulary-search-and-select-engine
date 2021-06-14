<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Subject</th>
          <th class="text-left">Predicate</th>
          <th class="text-left">Object</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in $store.getters.terms" :key="item.Subject">
          <td>{{ item.Subject }}</td>
          <td>{{ item.Predicate }}</td>
          <td>{{ item.Object }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "TermsTable",
  props: ["terms"],
  data: () => ({}),
};
</script>
