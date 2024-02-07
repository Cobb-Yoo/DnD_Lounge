<template>
  <v-app>
    <v-main>
      <!-- <MonsterStatusInsertCmp /> -->
      <BattleCmp />
    </v-main>
  </v-app>
</template>

<script>
import BattleCmp from "@/components/BattleCmp.vue";

export default {
  name: "BattleView",
  components: {
    //MonsterStatusInsertCmp,
    BattleCmp,
  },
};
</script>
