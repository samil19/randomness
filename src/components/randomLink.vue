<template>
  <div class="container">
    <div v-show="!addingLink" class="row text-center h-100">
      <div class="col-sm align-items-center d-flex justify-content-center mb-3 breakWords">
        <h2>
          <a :href="getLink" target="_blank">{{getLink}}</a>
        </h2>
      </div>
      <div class="col-sm-12 align-items-center d-flex justify-content-center">
        <button class="btn btn-success mr-3" v-on:click="getRandom()">Generate Random Link</button>
        <button class="btn btn-warning mr-3" v-on:click="addingLink = true">Add New Link</button>
        <button class="btn btn-primary" v-on:click="goBack()">Go back!</button>
      </div>
    </div>
    <add-link v-if="addingLink" v-on:goBack="addingLink = false;"></add-link>
  </div>
</template>

<script>
import addLink from "./addLink.vue";
export default {
  name: "randomLink",
  components: {
    addLink
  },
  data() {
    return {
      addingLink: false
    };
  },
  methods: {
    goBack() {
      this.$store.commit("set", {
        nameVaribable: "showingRandom",
        value: false
      });
    },
    getRandom() {
      this.$store.dispatch("getRandom");
    }
  },
  computed: {
    getLink() {
      return this.$store.state.randomLink;
    }
  }
};
</script>

<style>
.breakWords {
  word-break: break-all;
}
</style>