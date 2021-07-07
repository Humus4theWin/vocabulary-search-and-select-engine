<template>
  <CustomTree :value="treeData">
    <span slot-scope="{ node, path, tree }">
      <input
        type="checkbox"
        :checked="node.$checked"
        @change="tree.toggleCheck(node, path)"
      />
      {{ node.text }}
    </span>
  </CustomTree>
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
};
</script>
