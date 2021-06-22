<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Source</th>
          <th class="text-left">RDF Type</th>
          <th class="text-left">Number of Quads</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in $store.getters.vocabularies" :key="item.name">
          <td>{{ item.sourceURL }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.numberOfQuads }}</td>
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
