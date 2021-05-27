<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Subjekt</th>
          <th class="text-left">Prädikat</th>
          <th class="text-left">Objekt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in results" :key="item.id">
          <td>{{ item.subject.value }}</td>
          <td>{{ item.predicate.value }}</td>
          <td>{{ item.object.value }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "resultsTable",
  props: ["results"],
  data: () => ({}),
};
</script>
