<template>
  <v-app>
    <v-app-bar app color="white" class="pl-6">
      <v-img
        max-height="80"
        max-width="130"
        src="./assets/logo.png"
        class="ml-6"
      ></v-img>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
<style>

</style>
