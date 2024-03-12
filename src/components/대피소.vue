<template>
  <v-container>
    <v-card class="pa-1" elevation="12">
      <v-card-title>
        <span v-if="combat">전투 중</span>
        <span v-else @click="hideInitiative">전투 준비</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="round++" id="roundBtn">{{
          round
        }}</v-btn>
        <button class="scroll-to-top-btn" @click="scrollToTop">
          <v-icon>mdi-arrow-up-bold</v-icon>
        </button>
        <v-spacer></v-spacer>

        <v-btn
          class="ml-3"
          color="primary"
          @click="Onclick_battleEndBtn"
          v-if="combat"
          >전투완료</v-btn
        >
        <v-btn
          class="ml-3"
          color="primary"
          @click="Onclick_battleStartBtn"
          v-else
          >우선권 계산</v-btn
        >
        <!-- <v-btn text @click="test">몬스터 추가</v-btn> -->
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="lists"
        :items-per-page="100"
        :sort-desc="sortDesc"
        :sort-by="sortBy"
        @click:sort="onSort"
        hide-default-footer
      >
        <template v-slot:item="{ item }">
          <tr :class="getRowClass(item)">
            <td>
              <v-checkbox
                :v-model="item.statusEffect"
                @change="onStatusEffectChange(item)"
              ></v-checkbox>
            </td>
            <td
              @mousedown="startLongPress($event, item, 'name')"
              @mouseup="cancelLongPress"
            >
              {{ item.name }}
            </td>
            <td
              @mousedown="startLongPress($event, item, 'ac')"
              @mouseup="cancelLongPress"
            >
              {{ item.ac }}
            </td>
            <td
              @mousedown="startLongPress($event, item, 'hp')"
              @mouseup="cancelLongPress"
            >
              {{ item.hp }}
            </td>
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
            <td>{{ item.initiative }} {{ item.initiative_cal }}</td>
          </tr>
          <!-- <tr>
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
            </tr> -->
        </template>

        <template v-slot:footer>
          <!-- 원하는 컴포넌트 추가 -->
          <v-row align="center" class="ma-0">
            <v-checkbox
              v-model="isMonsterInfoHidden"
              class="ml-7"
              id="monsterInfoHide"
            ></v-checkbox>
            <v-col cols="3">
              <v-autocomplete
                v-model="selectedMonster"
                :items="getMonsters"
                label="몬스터 선택"
                item-text="name"
                :search="search"
              ></v-autocomplete>
            </v-col>
            <v-col cols="1" class="mb-5">
              <v-text-field
                hide-details="auto"
                class="custom-text-field"
                v-model="monsterCnt"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn color="primary" @click="addMonsterToList"
                >몬스터 추가</v-btn
              >
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
//import statusEffectCmp from "./statusEffectCmp.vue";

export default {
  name: "BattleCmp",
  components: {
    // statusEffectCmp,
  },
  data() {
    return {
      lists: [],
      headers: [
        { text: "", value: "statusEffect", sortable: false },
        {
          text: "이름",
          align: "start",
          value: "name",
          sortable: false,
        },
        { text: "AC", value: "ac", sortable: false },
        { text: "HP", value: "hp", sortable: false },
        { text: "남은 HP", value: "nowHp", sortable: false },
        { text: "누적데미지", value: "cumulativeDamage" },
        { text: "데미지 입력", value: "damageInput", sortable: false },
        { text: "우선권", value: "initiative", sortable: true },
      ],
      sortBy: "initiative", // 초기 정렬 기준
      sortDesc: false, // 초기 정렬 방향 (내림차순)
      combat: false,
      selectedMonster: true,
      isMonsterInfoHidden: false,
      round: 0,
      editStatus: false,
      editStatusData: [],
      monsterCnt: 1,
      hideInitiativeFlag: false,
      longPressTimer: 0,
      search: null,
    };
  },
  computed: {
    ...mapGetters("monster", ["getMonsters"]),
    ...mapGetters("player", ["getPlayers"]),
  },
  created() {
    //this.lists = this.getPlayers;

    this.getPlayers.forEach((item) => {
      this.lists.push(item);
      item.statusEffect = false;
      item.nowHp = item.hp;
      item.cumulativeDamage = 0;
      console.log(item);
    });
  },
  methods: {
    /**
     *전투시작버튼
     *   */
    Onclick_battleStartBtn() {
      this.combat = !this.combat;
      // 전투 시작 버튼 클릭 시 실행될 메서드
      // 각 몬스터의 initiative를 1에서 20까지의 랜덤한 값으로 업데이트
      this.lists.forEach((item) => {
        const rand = Math.floor(Math.random() * 20) + 1;

        item.initiative_tmp = item.initiative;

        item.initiative = Number(item.initiative) + rand;
        item.initiative_cal = " (" + item.initiative_tmp + " + " + rand + ")";

        //item.nowHp = item.hp;
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
    /**
     *정렬기준
     *   */
    onSort({ sortBy, sortDesc }) {
      // 정렬 변경 시 실행될 메서드
      this.sortBy = sortBy;
      this.sortDesc = sortDesc;
    },
    /**
     * 데미지 계산
     *   */
    onDamageInputEnter(idx) {
      const input = idx.damageInput.trim(); // 앞뒤 공백 제거

      if (input.startsWith("+")) {
        // 앞에 +를 넣어서 입력한 경우
        const damage = parseInt(input.substring(1)) || 0; // + 뒤에 있는 숫자만큼 값을 더함

        idx.nowHp = Math.min(idx.hp, idx.nowHp + damage); // 최대값은 hp
        idx.cumulativeDamage -= damage;
      } else if (input.startsWith("*")) {
        // 임시 HP를 깍지 않고 hp 만 깍는 경우
        const damage = parseInt(input) || 0; // 숫자만큼 값을 빼고 0보다 작아질 수 없음

        idx.nowHp = Math.max(0, idx.nowHp - damage);
        idx.cumulativeDamage -= damage;
      } else {
        // 그냥 숫자만 입력한 경우
        // 임시체력이 있다면 임시체력을 먼저 깍고 그 다음에 hp 깍기
        const damage = parseInt(input) || 0; // 숫자만큼 값을 빼고 0보다 작아질 수 없음

        idx.nowHp = Math.max(0, idx.nowHp - damage);
        idx.cumulativeDamage += damage;
      }

      if (idx.nowHp == 0) {
        this.onStatusEffectChange(idx);
      }

      idx.damageInput = ""; // 입력 필드 초기화
    },
    Onclick_battleEndBtn() {
      this.combat = !this.combat;

      // 새로운 배열을 만들어서 몬스터가 아닌 요소를 복사합니다.
      const updatedLists = this.lists.filter((item) => item.type !== "m");

      // 몬스터가 아닌 요소는 초기 initiative로 되돌립니다.
      updatedLists.forEach((item) => {
        item.initiative = item.initiative_tmp;
        item.initiative_cal = "";
      });

      // lists를 업데이트합니다.
      this.lists = updatedLists;
      this.round = 0;
    },
    /**
     * 몬스터 추가
     */
    addMonsterToList() {
      if (this.selectedMonster) {
        const selectedMonster = this.getMonsters.find(
          (monster) => monster.name === this.selectedMonster
        );
        for (let i = 0; i < this.monsterCnt; i++) {
          if (selectedMonster) {
            const rand = Math.floor(Math.random() * 20 + 1);

            const initiative_cal = this.combat
              ? " (" + selectedMonster.initiative + " + " + rand + ")"
              : "";

            const initiative = this.combat
              ? selectedMonster.initiative + rand
              : selectedMonster.initiative;

            if (!this.isMonsterInfoHidden) {
              let nameTmp = "";

              if (1 < this.monsterCnt) {
                nameTmp = selectedMonster.name + "_" + (i + 1);
              } else {
                nameTmp = selectedMonster.name;
              }

              this.lists.push({
                name: nameTmp,
                ac: "???",
                ac_tmp: selectedMonster.ac,
                hp: "???",
                hp_tmp: selectedMonster.hp,
                nowHp: "???",
                nowHp_tmp: selectedMonster.hp,
                cumulativeDamage: 0,
                initiative: initiative,
                initiative_tmp: selectedMonster.initiative,
                initiative_cal: initiative_cal,
                damageInput: "",
                type: "m",
              });
            } else {
              this.lists.push({
                name: "???",
                name_tmp: selectedMonster.name,
                ac: "???",
                ac_tmp: selectedMonster.ac,
                hp: "???",
                hp_tmp: selectedMonster.hp,
                nowHp: "???",
                nowHp_tmp: selectedMonster.hp,
                cumulativeDamage: 0,
                initiative: initiative,
                initiative_tmp: selectedMonster.initiative,
                initiative_cal: initiative_cal,
                damageInput: "",
                type: "m",
              });
            }
          }
        }
      }

      // 몬스터 추가 후에 선택한 몬스터를 초기화합니다.
      this.selectedMonster = null;

      this.monsterCnt = 1;
    },
    hideInitiative() {
      //this.hideInitiativeFlag = !this.hideInitiativeFlag;

      this.showInitiative = !this.showInitiative;
    },
    handleTableCellClick(item, field) {
      // ??? 인 값을 클릭했을 때만 tmp의 값으로 변경합니다.

      if (item[field] === "???") {
        item[field] = item[`${field}_tmp`];
      }
    },
    startLongPress(event, item, field) {
      console.log("startLongPress " + this.longPressTimer);

      this.longPressTimer = setTimeout(() => {
        // 3초 동안 눌린 상태를 유지한 경우
        this.handleTableCellClick(item, field);
      }, 1000); // 3초 (3000 밀리초)
    },

    cancelLongPress() {
      console.log("cancelLongPress " + this.longPressTimer);
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 부드러운 스크롤
      });
    },
    move_init() {},
    getRowClass(item) {
      return {
        "red-background": item.type === "m", // 'm' 타입의 row에 빨간색 배경 클래스 추가
        "green-background": item.type === "p", // 'p' 타입의 row에 초록색 배경 클래스 추가
        "gray-background": item.statusEffect, // statusEffect가 true이면 회색 배경 클래스 추가
      };
    },
    onStatusEffectChange(item) {
      // statusEffect 변경 시 호출되는 메서드
      // item의 statusEffect에 따라 배경 클래스를 동적으로 변경합니다.
      // statusEffect가 true이면 회색 배경, 그렇지 않으면 없음

      item.statusEffect = !item.statusEffect;

      item.statusEffect
        ? this.$set(item, "backgroundClass", "gray-background")
        : this.$delete(item, "backgroundClass");
    },
  },
  destroyed() {
    this.move_init();
  },
};
</script>

<style scoped>
.custom-text-field {
  width: 70px; /* 원하는 너비로 조절 */
  border-bottom: none !important; /* 밑줄 제거 */
}

.scroll-to-top-btn {
  position: fixed;
  bottom: 20px; /* 조정 가능: 버튼과 화면 하단 간격 */
  right: 20px; /* 조정 가능: 버튼과 화면 우측 간격 */
  z-index: 1000;
  padding: 10px 20px;
  background-color: #007bff; /* 버튼 배경색 */
  color: white; /* 버튼 텍스트 색상 */
  border: none;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  width: 40px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  height: 40px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  display: flex;
  justify-content: center; /* 아이콘을 수평 중앙에 정렬 */
  align-items: center; /* 아이콘을 수직 중앙에 정렬 */
}

.v-data-table {
  font-size: 20px; /* 테이블의 글자 크기를 조절합니다. */
}

.v-data-table th,
.v-data-table td {
  font-size: 20px; /* 테이블 셀의 글자 크기를 조절합니다. */
}

.red-background {
  background-color: rgba(255, 0, 0, 0.502) !important;
}

.green-background {
  background-color: rgba(144, 238, 144, 0.464) !important;
}

.gray-background {
  background-color: rgba(0, 0, 0, 0.525) !important;
}
</style>
