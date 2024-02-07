<template>
  <v-container>
    <v-card class="mt-10 pa-4" elevation="12">
      <v-card-title
        >전투화면

        <v-btn text @click="Onclick_battleStartBtn">우선권 계산</v-btn>
        <v-btn text @click="Onclick_battleStartBtn">전투완료</v-btn>
        <v-btn text @click="test">몬스터 추가</v-btn>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="monsters"
        :items-per-page="5"
        :sort-desc="sortDesc"
        :sort-by="sortBy"
        @click:sort="onSort"
      >
        <tr>
          <th>이름</th>
          <th>AC</th>
          <th>HP</th>
        </tr>

        <template v-slot:item="{ item }">
          <tr>
            <td><v-checkbox></v-checkbox></td>
            <td>{{ item.name }}</td>
            <td>{{ item.ac }}</td>
            <td>{{ item.hp }}</td>
            <td>{{ item.nowHp }}</td>
            <td>{{ item.cumulativeDamage }}</td>
            <td>
              <v-text-field
                v-model="item.damageInput"
                @keyup.enter="onDamageInputEnter(item)"
                hide-details="auto"
                class="custom-text-field"
              ></v-text-field>
            </td>
            <td>{{ item.initiative }}</td>
          </tr>
        </template>

        <tr>
          <td>장님</td>
          <td>공포</td>
          <td>투명화</td>
          <td>중독</td>
          <td>매혹</td>
          <td>붙잡힘</td>
        </tr>
        <tr>
          <td>마비</td>
          <td>포박</td>
          <td>귀머거리</td>
          <td>행동불능</td>
          <td>석화</td>
          <td>충격</td>
        </tr>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BattleCmp",
  data() {
    return {
      headers: [
        { text: "", value: "상태이상버튼", sortable: true },
        {
          text: "이름",
          align: "start",
          value: "name",
          sortable: false,
        },
        { text: "AC", value: "ac" },
        { text: "HP", value: "hp" },
        { text: "남은 HP", value: "nowHp" },
        { text: "누적데미지", value: "cumulativeDamage" },
        { text: "데미지 입력", value: "damageInput" },
        { text: "우선권", value: "initiative", sortable: true },
      ],
      sortBy: "initiative", // 초기 정렬 기준
      sortDesc: false, // 초기 정렬 방향 (내림차순)
    };
  },
  computed: {
    ...mapGetters("monster", { monsters: "getMonsters" }),
  },
  created() {},
  methods: {
    Onclick_battleStartBtn() {
      // 전투 시작 버튼 클릭 시 실행될 메서드
      // 각 몬스터의 initiative를 1에서 20까지의 랜덤한 값으로 업데이트
      this.monsters.forEach((monster) => {
        const rand = Math.floor(Math.random() * 20) + 1;

        monster.initiative =
          Number(monster.initiative) +
          rand +
          " (" +
          monster.initiative +
          " + " +
          rand +
          ")";

        monster.nowHp = monster.hp;
      });

      // 전투 시작 버튼 클릭 시 실행될 메서드
      // 정렬 변경 로직 추가
      if (this.sortBy === "initiative") {
        // 현재 정렬 기준이 'initiative'일 경우
        this.sortBy = "name"; // 'name'으로 변경
      } else {
        // 그 외의 경우
        this.sortBy = "initiative"; // 'initiative'로 변경
      }
      this.sortDesc = !this.sortDesc; // 정렬 방향 변경
    },
    onSort({ sortBy, sortDesc }) {
      // 정렬 변경 시 실행될 메서드
      this.sortBy = sortBy;
      this.sortDesc = sortDesc;
    },
    onDamageInputEnter(monster) {
      // 데미지 입력 엔터 시 실행될 메서드
      const input = monster.damageInput.trim(); // 앞뒤 공백 제거
      if (input.startsWith("+")) {
        // 앞에 +를 넣어서 입력한 경우
        const damage = parseInt(input.substring(1)) || 0; // + 뒤에 있는 숫자만큼 값을 더함
        monster.nowHp = Math.min(monster.hp, monster.nowHp + damage); // 최대값은 hp
        monster.cumulativeDamage -= damage;
      } else {
        // 그냥 숫자만 입력한 경우
        const damage = parseInt(input) || 0; // 숫자만큼 값을 빼고 0보다 작아질 수 없음
        monster.nowHp = Math.max(0, monster.nowHp - damage);
        monster.cumulativeDamage += damage;
      }
      monster.damageInput = ""; // 입력 필드 초기화
    },
    test() {
      confirm("해당몬스터의 정보를 공개하시겠습니까?");
    },
  },
};
</script>

<style scoped>
.custom-text-field {
  width: 70px; /* 원하는 너비로 조절 */
  border-bottom: none !important; /* 밑줄 제거 */
}
</style>
