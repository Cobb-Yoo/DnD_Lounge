<template>
  <v-card class="background">
    <div class="title pa-2">
      <div class="name">{{ item.name }}</div>
      <div class="ac pl-5">{{ item.ac }}</div>
      <div class="initiative pl-5">{{ item.initiative }}</div>
      <v-spacer></v-spacer>
      <button class="death-chk-btn" @click="statusVisible = !statusVisible">
        <v-icon>mdi-plus</v-icon>
      </button>
    </div>

    <v-divider class="mx-4"></v-divider>

    <div class="flex-container" v-if="statusVisible">
      <div class="hp ma-2">
        <div class="hp-bar" :style="{ width: hpPercentage + '%' }"></div>

        <div class="hp-text" v-if="tmpHp > 0">
          {{ nowHp }} + {{ tmpHp }} / {{ hp + tmpHp }}
        </div>
        <div class="hp-text" v-else>{{ nowHp }} / {{ hp }}</div>

        <div class="tmp-hp-bar" :style="{ width: tmpHpPercentage + '%' }"></div>
      </div>

      <div class="damage ma-2">
        <v-text-field
          id="damageInput"
          v-model="damageInput"
          type="text"
          class="damage-input ma-0 pa-0"
          height="30px"
          @keyup.enter="onDamageInputEnter()"
        />
      </div>

      <button
        id="buf-chk-btn"
        class="ma-2 buf-chk-btn"
        @click="buffVisible = !buffVisible"
      >
        <v-icon>mdi-plus</v-icon>
      </button>

      <div class="ma-2 buf-chk" id="buf" v-if="buff.length != 0">
        <!-- 버프 아이콘 -->
      </div>
      <div class="ma-2 debuf-chk" id="debuf" v-if="debuff.length != 0"></div>
    </div>

    <div class="flex-container" v-if="buffVisible">
      <v-row>
        <v-col cols="12" class="pb-0"
          ><v-combobox
            v-model="buff"
            :items="items"
            chips
            clearable
            label="버프"
            multiple
            solo
            hide-details
            class="ma-2 pb-0"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox></v-col
        >
        <v-col cols="12" class="pt-0"
          ><v-combobox
            v-model="debuff"
            :items="items"
            chips
            clearable
            label="디버프"
            multiple
            solo
            hide-details
            class="ma-2 pb-0"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox></v-col
        >
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "testBattleSheet",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hp: parseInt(this.item.hp), // 예시로 hp 값 설정
      nowHp: parseInt(this.item.nowHp),
      tmpHp: 0,
      damageInput: "", // 텍스트 입력을 위한 데이터
      statusVisible: true,
      buffVisible: false,
      buff: [],
      debuff: [],
      //name: null,
      //ac: 0,
      //initiative: 0,
    };
  },
  computed: {
    hpPercentage() {
      console.log(
        "hpPercentage " + (this.nowHp / (this.hp + this.tmpHp)) * 100
      );
      console.log("nowHp " + this.nowHp);
      console.log("hp " + this.hp);
      console.log("tmpHp " + this.tmpHp);
      return (this.nowHp / (this.hp + this.tmpHp)) * 100; // hp 비율을 백분율로 계산
    },
    tmpHpPercentage() {
      // console.log((this.tmpHp / this.hp) * 100);

      return (this.tmpHp / this.hp) * 100; // hp 비율을 백분율로 계산
    },
  },
  methods: {
    onDamageInputEnter() {
      const input = this.damageInput.trim(); // 앞뒤 공백 제거

      // HP 회복
      if (input.startsWith("+")) {
        const damage = parseInt(input.substring(1)) || 0; // + 뒤에 있는 숫자만큼 값을 더함

        this.nowHp = Math.min(this.hp, this.nowHp + damage);
      }
      // 최대 체력 감소
      else if (input.startsWith("-")) {
        const damage = parseInt(input.substring(1)) || 0; // + 뒤에 있는 숫자만큼 값을 더함

        this.hp -= damage;
      }
      // 최대 체력 증가
      else if (input.startsWith("*")) {
        const damage = parseInt(input.substring(1)) || 0; // + 뒤에 있는 숫자만큼 값을 더함

        this.hp += damage;
      }
      // 임시체력이 있음에도 hp 감소
      else if (input.startsWith("!")) {
        const damage = parseInt(input.substring(1)) || 0; // + 뒤에 있는 숫자만큼 값을 더함

        this.nowHp = Math.max(0, this.nowHp - damage);
      }
      // 임시체력 부여
      else if (input.startsWith("@")) {
        const tmp = parseInt(input.substring(1)) || 0; // + 뒤에 있는 숫자만큼 값을 더함
        this.tmpHp += tmp;
      }
      // 단순 데미지
      else {
        var damage = input;

        if (this.tmpHp > 0) {
          if (this.tmpHp <= damage) {
            damage -= this.tmpHp;
            this.nowHp = Math.max(0, this.nowHp - damage);
            this.tmpHp = 0;
          } else {
            this.tmpHp -= damage;
          }
        } else {
          this.nowHp = Math.max(0, this.nowHp - damage);
        }
      }

      this.damageInput = "";
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
    },
  },
};
</script>

<style scoped>
.background {
  background-color: #ffffff; /* 회색빛 배경색 설정 */
}

.title {
  display: flex; /* 자식 요소를 수평으로 배치하기 위해 플렉스 컨테이너로 설정 */
  justify-content: space-between; /* 자식 요소 사이의 간격을 최대한 넓게 설정하여 수평으로 배치 */
  align-items: center; /* 자식 요소를 수직으로 가운데 정렬 */
}

.flex-container {
  display: flex; /* 자식 요소를 수평으로 배치하기 위해 플렉스 컨테이너로 설정 */
}

.hp {
  position: relative; /* hp 바와 텍스트를 상대적 위치로 설정 */
  height: 30px; /* hp 바의 높이 */
  width: 70%; /* hp 바의 너비 */
  background-color: #ffffff; /* hp 바의 배경색 */
  border-radius: 5px; /* hp 바의 모서리를 둥글게 만듦 */
  margin-top: 10px; /* hp 바와 상단 요소 사이의 간격 */
  display: flex; /* 자식 요소를 수평으로 배치하기 위해 플렉스 컨테이너로 설정 */
}

.hp-bar {
  position: relative; /* 게이지 바를 상대적 위치로 설정하여 하위 요소의 절대 위치를 상대적으로 지정할 수 있게 합니다. */
  height: 100%; /* hp 바의 높이를 최대로 설정 */
  background: linear-gradient(to bottom, #ff0000, #d73b0b);
  border-top-left-radius: 5px; /* hp 바의 왼쪽 모서리를 둥글게 만듦 */
  border-bottom-left-radius: 5px; /* hp 바의 왼쪽 모서리를 둥글게 만듦 */
}

.tmp-hp-bar {
  position: relative; /* 게이지 바를 상대적 위치로 설정하여 하위 요소의 절대 위치를 상대적으로 지정할 수 있게 합니다. */
  height: 100%; /* hp 바의 높이를 최대로 설정 */
  background-color: #ff9500; /* hp 바의 색상 */
  border-top-right-radius: 5px; /* hp 바의 왼쪽 모서리를 둥글게 만듦 */
  border-bottom-right-radius: 5px; /* hp 바의 왼쪽 모서리를 둥글게 만듦 */
}

.hp-text {
  position: absolute; /* 절대 위치로 설정하여 hp 바 위에 텍스트를 표시 */
  top: 0;
  left: 50%; /* 가운데 정렬 */
  transform: translateX(-50%); /* 수평 가운데 정렬 */
  line-height: 30px; /* 수직 가운데 정렬 */
  color: rgb(0, 0, 0) 000; /* 텍스트 색상 */
  font-weight: bold; /* 글자를 두껍게 만듭니다. */
  z-index: 10;
}

.damage {
  position: relative; /* hp 바와 텍스트를 상대적 위치로 설정 */
  height: 30px; /* hp 바의 높이 */
  width: 10%; /* hp 바의 너비 */
  background-color: #ddd; /* hp 바의 배경색 */
  border-radius: 5px; /* hp 바의 모서리를 둥글게 만듦 */
  margin-top: 10px; /* hp 바와 상단 요소 사이의 간격 */
  display: flex; /* 자식 요소를 수평으로 배치하기 위해 플렉스 컨테이너로 설정 */
}

.damage-input {
  margin-top: 5px; /* 텍스트 입력란과 상단 요소 사이의 간격 */
  padding: 5px; /* 텍스트 입력란의 여백 */
  border: 1px solid #ccc; /* 텍스트 입력란의 테두리 */
  border-radius: 3px; /* 텍스트 입력란의 모서리를 둥글게 만듦 */
}

.death-chk-btn {
  border-radius: 50%;
  border: none;
  outline: none;
  width: 40px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  height: 40px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  background-color: #292d30; /* 버튼 배경색 */
}

.buf-chk-btn {
  border-radius: 50%;
  border: none;
  outline: none;
  width: 30px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  height: 30px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  background-color: #292d30; /* 버튼 배경색 */
}

.buf-chk {
  border-radius: 50%;
  border: none;
  outline: none;
  width: 30px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  height: 30px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  background-color: #0dff00; /* 버튼 배경색 */
}

.debuf-chk {
  border-radius: 50%;
  border: none;
  outline: none;
  width: 30px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  height: 30px; /* 버튼의 너비와 높이를 같게 설정합니다. */
  background-color: #f700ff; /* 버튼 배경색 */
}
</style>
