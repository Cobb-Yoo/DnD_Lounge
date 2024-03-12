<template>
  <v-app>
    <v-main>
      <v-row class="pa-0" style="height: 100vh">
        <v-col cols="10" class="pa-0">
          <TestCmp1 />
        </v-col>
        <v-col cols="2" class="">
          <TestCmp2 />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import TestCmp1 from "@/components/BattleMapCmp.vue";
import TestCmp2 from "@/components/BattleSheet.vue";

export default {
  name: "TestView",
  components: {
    TestCmp1,
    TestCmp2,
  },
};
</script>

<style scoped>
/* 기존 스타일 */
.pa-0 {
  padding: 0 !important;
}
</style>
