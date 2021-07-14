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
        :id="data.index"
        :list="selected"
        v-bind="dragOptionsChips"
        :move="move"
        @change="change"
      >
        <v-chip
          :key="data.item.index"
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
    dragged: {},
    value: null,
  }),
  components: {
    draggable,
  },
  //7watch: {},
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
      get() {
        return this.$store.getters.getFilterCriteria;
      },
      set(val) {
        console.log("set");
        //     console.log(val);
        this.$store.commit("setFilterCriteria", val);
      },
    },
  },
  methods: {
    updateSelectedPredicates(selected) {
      console.log(selected);
      this.$store.commit("setFilterCriteria", selected);
    },
    move: function (value) {
      this.dragged = {
        from: parseInt(value.from.id),
        to: parseInt(value.to.id),
        newIndex: value.draggedContext.futureIndex,
      };
    },
    change: function (value) {
      console.log(value);
      let selected = this.selected;
      if (value.removed) {
        // insert
        selected.splice(
          this.dragged.to + this.dragged.newIndex,
          0,
          selected[this.dragged.from]
        );
        // delete
        if (this.dragged.from < this.dragged.to)
          // LTR
          selected.splice(this.dragged.from, 1);
        // RTL
        else selected.splice(this.dragged.from + 1, 1);
      }
      this.selected = selected;
    },
    remove(item) {
      let selected = this.selected;
      console.log("remove");
      console.log(item);
      console.log(selected);

      let index = -1;
      for (let i = 0; i < selected.length; i++) {
        if (selected[i].predicate === item.predicate) index = i;
      }
      console.log(index);
      if (index >= 0) selected.splice(index, 1);
      this.selected = selected;
    },
  },
};
</script>

<style scoped></style>
