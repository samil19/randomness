<template>
  <div>
    <!-- cards -->
    <div class="m-4 row text-center h-100">
      <!-- v-for="item in getData" :key="item.Id" -->
      <div
        v-for="item in items"
        :key="item.url"
        class="col-xs-12 col-md-6 col-lg-4 col-xl-3 text-center mb-3"
        v-on:click="selectItem(item)"
      >
        <div class="card card-block d-flex" style="width: 18rem; height: 15rem;">
          <div
            class="card-body align-items-center d-flex justify-content-center"
            v-bind:style="getColor(item)"
          >
            <!-- <img :src="item.logo" height="200px" width="300px" alt=""> -->

            <h3>{{item.name}}</h3>
          </div>
          <!-- <div v-if="footer" class="card-footer text-muted">{{item[footer.atributo]}}</div> -->
        </div>
      </div>
      <!-- <div class="col-sm-10 align-items-center d-flex justify-content-center mb-3">
        <button class="btn btn-warning">
          Add a new site?
        </button>
      </div>-->
    </div>
    <div class="row">
      <div class="col-12">
        <a href="">+ Add New Site</a>
      </div>
    </div>
  </div>
</template>

<script>
const fb = require("../firebaseConfig.js");

export default {
  name: "sites",
  data() {
    return {
      items: []
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
    }
  }
};
</script>

<style>
div {
  font-family: "Oswald", sans-serif;
}
</style>