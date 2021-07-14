<template>
  <v-autocomplete
    v-model="selected"
    :items="predicates"
    item-text="predicate"
    dense
    chips
    multiple
    clearable
    deletable-chips
    solo
    return-object
  >
    <template #selection="data">
      <draggable
        :id="data.predicate"
        v-model="selected"
        v-bind="dragOptionsChips"
      >
        <v-chip
          :key="data.item.predicate"
          @mousedown.stop
          @click.stop
          close
          @click:close="remove(data.item)"
        >
          {{ data.item.text }}
        </v-chip>
      </draggable>
    </template>
  </v-autocomplete>
</template>

<script>
//https://stackoverflow.com/questions/63346033/add-drag-and-drop-to-vuetifys-select
import draggable from "vuedraggable";
export default {
  data: () => ({
    values: [],
    value: null,
  }),
  components: {
    draggable,
  },

  computed: {
    dragOptionsChips() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
        sort: true,
      };
    },
    predicates() {
      window.i = this.$store.getters.getVocabTerms;
      if (this.$store.getters.getVocabTerms.length) {
        let predicates = [
          ...new Set(
            this.$store.getters.getVocabTerms.flatMap((term) =>
              Object.keys(term)
            )
          ),
        ];
        return predicates.map((predicate) => {
          return {
            text: predicate.split("/").pop() || predicate,
            predicate: predicate,
          };
        });
      } else {
        return [];
      }
    },
    selected: {
      get: function () {
        let val = this.$store.getters.getFilterCriteria;
        console.log("get");
        console.log(val);
        return val;
      },
      set: function (val) {
        console.log("set");
        console.log(val);

        this.$store.commit("setFilterCriteria", val);
      },
    },
  },
  methods: {
    move(val) {
      console.log("move");
      console.log(val);
    },
    change(val) {
      console.log("change");
      console.log(val);
    },
    remove(item) {
      console.log(item);
      console.log(this.selected);
      let index = -1;
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i].predicate === item.predicate) index = i;
      }
      console.log(index);
      if (index >= 0) this.selected = this.selected.splice(index, 1);
      console.log(this.selected.splice(index, 1));
    },
  },
};
</script>

<style scoped></style>
