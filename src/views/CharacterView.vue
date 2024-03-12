<template>
  <v-app>
    <v-main>
      <PlayerStatusInsertCmp />

      <!-- <TestCmp /> -->
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import PlayerStatusInsertCmp from "@/components/PlayerStatusInsertCmp.vue";
// import TestCmp from "@/components/TestCmp.vue";

export default {
  name: "CharacterView",
  components: {
    PlayerStatusInsertCmp,
    // TestCmp,
  },
};
</script>
