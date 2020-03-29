<template>
  <div>
    <div v-if="!addingSite" id="sites">
      <div class="m-4 row text-center h-100">
        <!-- v-for="item in getData" :key="item.Id" -->
        <div
          v-for="item in items"
          :key="item.url"
          class="col-xs-12 col-md-6 col-lg-4 col-xl-3 text-center mb-3"
        >
          <div
            id="mainCard"
            class="shadow-lg card card-block d-flex rounded-a selectable"
            v-on:click="selectItem(item)"
          >
            <div
              class="card-body align-items-center d-flex justify-content-center rounded-a"
              v-bind:style="getColor(item)"
            >
              <!-- <img :src="item.logo" height="200px" width="300px" alt=""> -->

              <h3>{{item.name}}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <span id="new" class="selectable" v-on:click="toggleAddingSite()">+ Add New Site</span>
        </div>
      </div>
    </div>

    <addSite v-if="addingSite" v-on:toggleAddingSite="toggleAddingSite"></addSite>
  </div>
</template>

<script>
import addSite from "./addSite.vue";
const fb = require("../firebaseConfig.js");

export default {
  name: "sites",
  components: {
    addSite
  },
  data() {
    return {
      items: [],
      addingSite: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      var that = this;
      fb.db
        .collection("sites")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            that.items.push(doc.data());
          });
        });
    },
    getColor(item) {
      return {
        "background-color": item.color
      };
    },

    selectItem(item) {
      this.$store.commit("reset");
      this.$store.commit("set", {
        nameVaribable: "showingRandom",
        value: true
      });
      this.$store.commit("set", {
        nameVaribable: "activeSite",
        value: item
      });
      this.$store.dispatch("getAllList");
    },
    toggleAddingSite(){
      this.addingSite = !this.addingSite;
    }
  }
};
</script>

<style>
div {
  font-family: "Oswald", sans-serif;
}
.rounded-a {
  border-radius: 4% !important;
}
#mainCard {
  width: 18rem;
  height: 15rem;
}
.selectable {
  cursor: pointer;
}
#new {
  text-decoration: none;
  background-color: transparent;
  color: #007bff;
}
#new:hover {
  color: #007bff;
  text-decoration: underline;
}
</style>