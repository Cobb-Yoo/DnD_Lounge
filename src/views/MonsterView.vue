<template>
  <v-app>
    <v-main>
      <MonsterStatusInsertCmp />

      <!-- <TestCmp /> -->
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import MonsterStatusInsertCmp from "@/components/MonsterStatusInsertCmp.vue";
// import TestCmp from "@/components/TestCmp.vue";

export default {
  name: "HomeView",
  components: {
    MonsterStatusInsertCmp,
    // TestCmp,
  },
};
</script>
