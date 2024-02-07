<template>
  <v-container>
    <v-card class="mt-10 pa-4" elevation="12">
      <v-card-title>
        캐릭터 초기 입력
        <v-btn class="ml-5" @click="addMonsterRow">+</v-btn>
        <v-btn class="ml-5" @click="save">저장</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="ml-5" @click="move">전투화면</v-btn>
      </v-card-title>
      <v-row v-for="(monster, index) in monsters" :key="index" justify="center">
        <v-col cols="3">
          <v-text-field v-model="monster.name" label="이름"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="monster.initiative"
            label="우선권 보정치"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="monster.ac" label="AC"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="monster.hp" label="HP"></v-text-field>
        </v-col>
      </v-row>

      <!-- + 버튼 -->
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MonsterStatusInsertCmp",

  data() {
    return {
      monsters: [
        { name: "", initiative: "", ac: "", hp: "", cumulativeDamage: 0 },
      ], // 초기에 하나의 몬스터를 갖고 시작
    };
  },
  methods: {
    ...mapActions("monster", ["saveMonsters"]),
    enter() {
      alert("hello");
    },
    addMonsterRow() {
      // + 버튼을 누를 때마다 새로운 몬스터 행을 추가
      this.monsters.push({ name: "", initiative: "", ac: "", hp: "" });
    },
    save() {
      console.log(this.monsters);
      this.saveMonsters(this.monsters);
      // alert("몬스터 정보가 저장되었습니다.");
    },
    move() {
      this.$router.push("/battle");
    },
  },
};
</script>
