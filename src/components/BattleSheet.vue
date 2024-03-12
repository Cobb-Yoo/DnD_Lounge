<template>
  <div class="background">
    <v-container>
      <v-card>
        <v-row>
          <v-col cols="10">
            <v-row>
              <v-col>이름</v-col>
              <v-col>종족</v-col>
              <v-col>클래스</v-col>
            </v-row>

            <v-row>
              <v-col class="red">
                <v-row>
                  <v-col> hp </v-col>
                </v-row>
                <v-row>
                  <v-col> 임시체력 </v-col>
                </v-row>
              </v-col>

              <v-col>
                <v-row>
                  <v-col>사망</v-col>
                </v-row>
                <v-row>
                  <v-col>저항</v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="blue">
              <v-col>
                <v-row>상태이상</v-row>
                <v-row>버프</v-row>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="2" class="pink">
            <v-row> 이동속도 </v-row>
            <v-row> 우선권 </v-row>
            <v-row> AC </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "BattleSheet",
};
</script>

<style scoped>
.background {
  background-color: #6a6969; /* 회색빛 배경색 설정 */
  width: 100%; /* 전체 너비를 채우도록 설정 */
  height: 100%; /* 전체 높이를 채우도록 설정 */
  display: flex; /* 플렉스 컨테이너로 설정 */
}
</style>
