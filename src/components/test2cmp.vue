<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="desserts"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-text-field v-model="item.protein" label="Protein (g)"></v-text-field>
        <v-btn @click="saveChanges(item)">Save</v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Test2Cmp",
  data() {
    return {
      expanded: [],
      singleExpand: false,
      dessertHeaders: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
        { text: "", value: "data-table-expand" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        // Other dessert items...
      ],
    };
  },
  methods: {
    saveChanges(item) {
      // Save changes logic for the item
      console.log("Saving changes for item:", item);
      // You can perform additional logic here to handle the changes made to the item
    },
  },
};
</script>
