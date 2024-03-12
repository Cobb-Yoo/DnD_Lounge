<template>
  <v-container>
    <v-card class="mt-10 pa-4" elevation="12">
      <v-card-title>
        <v-btn class="primary mr-3" @click="fetchMonstersData()"
          >데이터 가져오기</v-btn
        >
        몬스터 입력

        <v-col>
          <v-row>
            <v-col cols="3">
              <v-text-field
                ref="nameInput"
                v-model="name"
                label="몬스터 이름"
                @keyup.enter="$refs.initiativeInput.focus()"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                ref="initiativeInput"
                v-model="initiative"
                label="우선권 보정치"
                @keyup.enter="$refs.acInput.focus()"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                ref="acInput"
                v-model="ac"
                label="AC"
                @keyup.enter="$refs.hpInput.focus()"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                ref="hpInput"
                v-model="hp"
                label="HP"
                @keyup.enter="enter"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-card-title>

      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">몬스터 이름</th>
                  <th class="text-left">AC</th>
                  <th class="text-left">우선권</th>
                  <th class="text-left">HP</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in monsters" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.ac }}</td>
                  <td>{{ item.initiative }}</td>
                  <td>{{ item.hp }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MonsterStatusInsertCmp",

  data() {
    return {
      monsters: [], // 초기에 하나의 몬스터를 갖고 시작
      name: "",
      ac: "",
      hp: "",
      initiative: "",
    };
  },
  methods: {
    ...mapActions("monster", ["saveMonsters"]),
    enter() {
      const data = {
        type: "m", // monster type
        name: this.name,
        ac: this.ac,
        hp: this.hp,
        hp_tmp: "",
        initiative: this.initiative,
        initiative_tmp: "",
        initiative_cal: "",
      };

      this.monsters.push(data);

      this.saveMonsters(this.monsters);

      console.log(this.monsters);

      this.init_input();

      this.$refs.nameInput.focus(); // 입력 필드로 포커스 이동
    },
    init_input() {
      this.name = "";
      this.ac = "";
      this.hp = "";
      this.initiative = "";
    },
    async fetchMonstersData() {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/Cobb-Yoo/D-D_Monsters_Status/main/monsters.json"
        );

        // 이미 JSON 형식으로 제공되기 때문에 추가적인 파싱이 필요하지 않습니다.
        //this.monsters = response.data;

        response.data.forEach((item) => {
          const data = {
            type: "m", // monster type
            name: item.NAME,
            ac: item.AC,
            hp: item.HP,
            hp_tmp: "",
            initiative: item.INITIATIVE,
            initiative_tmp: "",
            initiative_cal: "",
          };

          this.monsters.push(data);

          this.saveMonsters(this.monsters);

          this.$refs.nameInput.focus(); // 입력 필드로 포커스 이동
        });

        // console.log(this.monsters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  computed: {
    ...mapGetters("monster", ["getMonsters"]),
  },
  created() {
    this.monsters = this.getMonsters;
  },
};
</script>
