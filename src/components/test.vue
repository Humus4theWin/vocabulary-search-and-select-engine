<template>
  <v-row>
    <CustomTree :value="treeData" draggable droppable> </CustomTree>
    <v-btn v-on:click="updateStructure">add Vocab</v-btn>
  </v-row>
</template>
<script>
import "he-tree-vue/dist/he-tree-vue.css";
import CustomTree from "@/components/CustomTree.vue";

export default {
  components: { CustomTree },
  data() {
    return {
      treeData: [
        {
          text: "node 1",
          children: [{ text: "node 1-1" }, { text: "node 1-2" }],
        },
      ],
    };
  },
  methods: {
    updateStructure() {
      let node = this.treeData;
      while (node.children !== undefined) {
        console.log(node.text);
        node = node.children;
      }
    },
  },
};
</script>
