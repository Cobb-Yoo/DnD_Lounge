<template>
  <div class="background" ref="container">
    <v-container>
      <div class="">
        <v-img src="../maps/leon.png"></v-img>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "BattleMapCmp",
  data() {
    return {
      containerHeight: 0,
    };
  },
  mounted() {
    this.setContainerHeight();
    window.addEventListener("resize", this.setContainerHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setContainerHeight);
  },
  methods: {
    setContainerHeight() {
      this.containerHeight = window.innerHeight / 2;
      console.log(window.innerHeight);
      console.log(this.containerHeight);
    },
  },
};
</script>

<style scoped>
.background {
  background-color: #6a6969;
  width: 100%;
  height: 100%;
}
</style>
