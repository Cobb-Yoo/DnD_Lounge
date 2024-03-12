<template>
  <v-container>
    <v-card class="mt-10" elevation="12">
      <v-card-title> 데이터 체크 </v-card-title>

      <v-row v-for="monster in 10" :key="monster.NAME" justify="center">
        <v-col cols="3">
          <div>
            <p>Name: {{ monster.NAME }}</p>
            <p>AC: {{ monster.AC }}</p>
            <p>HP: {{ monster.HP }}</p>
          </div>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn text color="teal accent-4" @click="enter"> 적용하기 </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "TestCmp",
  data() {
    return {
      monsters: [],
    };
  },
  created() {
    this.fetchMonstersData();
  },
  methods: {
    async fetchMonstersData() {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/Cobb-Yoo/D-D_Monsters_Status/main/monsters.json"
        );

        // 이미 JSON 형식으로 제공되기 때문에 추가적인 파싱이 필요하지 않습니다.
        this.monsters = response.data;

        console.log(this.monsters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
