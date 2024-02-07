<template>
  <v-container>
    <v-card class="mt-10" elevation="12">
      <v-card-title> 플레이어 캐릭터 초기 입력 </v-card-title>
      <v-row justify="center">
        <v-col cols="3">
          <v-text-field
            v-model="inputText"
            label="플레이어 캐릭터 이름"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputText" label="AC 보정치"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputText" label="HP"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="3">
          <v-text-field
            v-model="inputText"
            label="플레이어 캐릭터 이름"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputText" label="AC 보정치"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputText" label="HP"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="3">
          <v-text-field
            v-model="inputText"
            label="플레이어 캐릭터 이름"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputText" label="AC 보정치"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputText" label="HP"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="3">
          <v-text-field
            v-model="inputText"
            label="플레이어 캐릭터 이름"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputText" label="AC 보정치"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="inputText" label="HP"></v-text-field>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="teal accent-4" @click="enter"> 적용하기 </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PlayerStatusInsertCmp",
  data() {
    return {};
  },
  methods: {
    enter() {
      alert("hello");
    },
  },
};
</script>
