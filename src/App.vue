<template>
  <div id="app" class="container-fluid">
    <h1 style="font-family: 'Baloo 2', cursive;">RANDOMNESS</h1>
    <sites v-show="!getShowingRandom"></sites>
    <randomLink v-if="getShowingRandom"></randomLink>
    <div v-bind:class="{ 'footer-site': !getShowingRandom, 'footer-everywhere': getShowingRandom }">
      <p>
        All the links in this app are added by the user, we are not responsible for any of the links of this app,
        if you want to erase something go to the source page, we do not storage any content anymore than the provided links
      </p>
    </div>
  </div>
</template>

<script>
import sites from "./components/sites.vue";
import randomLink from "./components/randomLink.vue";

export default {
  name: "App",
  components: {
    sites,
    randomLink
  },
  computed: {
    getShowingRandom() {
      return this.$store.state.showingRandom;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.footer-site {
  /* position: fixed; */
  left: 0;
  bottom: 0;
  width: 100%;
  color: black;
  text-align: center;
}
.footer-everywhere{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: black;
  text-align: center;
}
</style>
