<template>
  <v-container>
    <v-card class="mt-10 pa-4" elevation="12">
      <v-card-title>
        캐릭터 입력
        <v-row>
          <v-col cols="3">
            <v-text-field
              ref="nameInput"
              v-model="name"
              label="캐릭터 이름"
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
      </v-card-title>

      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">캐릭터 이름</th>
                  <th class="text-left">AC</th>
                  <th class="text-left">우선권</th>
                  <th class="text-left">HP</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in players"
                  :key="index"
                  @click="editRow(index)"
                >
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

    <!-- 수정모달 -->
    <v-dialog v-model="editDialog" max-width="500">
      <v-card>
        <v-card-title>캐릭터 수정</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedItem.name"
            label="캐릭터 이름"
          ></v-text-field>
          <v-text-field v-model="editedItem.ac" label="AC"></v-text-field>
          <v-text-field
            v-model="editedItem.initiative"
            label="우선권"
          ></v-text-field>
          <v-text-field v-model="editedItem.hp" label="HP"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="editDialog = false"
            >취소</v-btn
          >
          <v-btn color="blue darken-1" text @click="saveEdit">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PlayerStatusInsertCmp",
  data() {
    return {
      players: [],
      name: "",
      ac: "",
      hp: "",
      initiative: "",
      editDialog: false,
      editedItem: {
        name: "",
        ac: "",
        initiative: "",
        hp: "",
      },
    };
  },
  methods: {
    ...mapActions("player", ["savePlayers"]),

    enter() {
      const data = {
        type: "p", // player type
        name: this.name,
        ac: this.ac,
        hp: this.hp,
        hp_tmp: "",
        initiative: this.initiative,
        initiative_tmp: "",
        initiative_cal: "",
      };

      this.players.push(data);

      this.savePlayers(this.players);

      console.log(this.players);

      this.init_input();

      this.$refs.nameInput.focus(); // 입력 필드로 포커스 이동
    },
    init_input() {
      this.name = "";
      this.ac = "";
      this.hp = "";
      this.initiative = "";
    },

    // 모달에서 수정된 데이터 저장
    saveEdit() {
      const index = this.players.findIndex(
        (item) => item.name === this.editedItem.name
      );
      if (index !== -1) {
        this.$set(this.players, index, { ...this.editedItem });
      }
      this.editDialog = false;
    },

    // 각 행을 클릭하여 모달로 수정할 데이터 전달
    editRow(item) {
      this.editedItem = { ...item };
      this.editDialog = true;
    },
  },
  computed: {
    ...mapGetters("player", ["getPlayers"]),
  },
  created() {
    this.players = this.getPlayers;
  },
};
</script>
