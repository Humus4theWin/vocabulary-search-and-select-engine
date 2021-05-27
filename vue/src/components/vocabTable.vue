<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Source</th>
          <th class="text-left">RDF Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in vocabs" :key="item.name">
          <td>{{ item.baseURL }}</td>
          <td>{{ item.type }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "vocabTable",
  props: ["vocabs"],
  data: () => ({}),
};
</script>
