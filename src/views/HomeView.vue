<template>
  <v-app>
    <v-main>
      <!-- <testCmp /> -->
      <!-- <MonsterStatusInsertCmp /> -->
      <PlayerStatusInsertCmp />
      <!-- <TestCmp /> -->
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import testCmp from "@/components/test2cmp.vue";
import PlayerStatusInsertCmp from "@/components/PlayerStatusInsertCmp.vue";
// import TestCmp from "@/components/TestCmp.vue";

export default {
  name: "HomeView",
  components: {
    PlayerStatusInsertCmp,
    // testCmp,
    // TestCmp,
  },
};
</script>
