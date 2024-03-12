<template>
  <v-app class="background">
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
      :clipped="clipped"
      :mini-variant.sync="mini"
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="navigate(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <button class="scroll-to-top-btn" @click="drawer = !drawer" v-if="open">
      <v-icon>mdi-arrow-up-bold</v-icon>
    </button>
    <button class="scroll-to-top-btn" @click="scrollToTop" v-else>
      <v-icon>mdi-arrow-up-bold</v-icon>
    </button>

    <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    clipped: false,
    mini: false,
    items: [
      { title: "캐릭터", icon: "mdi-home", route: "/character" },
      { title: "몬스터", icon: "mdi-home", route: "/monster" },
      { title: "전투", icon: "mdi-information", route: "/battle" },
      { title: "실험실", icon: "mdi-information", route: "/test" },
      { title: "실험실2", icon: "mdi-information", route: "/battleTest" },
      // Add more items as needed
    ],
    open: true,
  }),

  methods: {
    navigate(route) {
      if (this.$route.path !== route) {
        this.$router.push(route);
      }
      this.drawer = false; // Close the drawer after navigation
      this.open = true;
    },
    scrollToTop() {
      this.open = true;
    },
  },
};
</script>

<style scoped>
.scroll-to-top-btn {
  position: fixed;
  bottom: 20px; /* 조정 가능: 버튼과 화면 하단 간격 */
  left: 20px; /* 조정 가능: 버튼과 화면 우측 간격 */
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

.background {
  background-color: #6a6969;
}
</style>
