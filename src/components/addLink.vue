<template>
  <div>
    <div v-if="!isMassiveAdd" class="row justify-content-center">
      <div class="col-sm-10 d-flex justify-content-center mb-3">
        <input type="text" class="form-control" v-model="newLink" required />
      </div>
      <div class="col-sm-10 d-flex justify-content-center mb-3">
        <button class="btn btn-success mr-3" v-on:click="validate(newLink)">Save</button>
        <button class="btn btn-warning mr-3" v-on:click="isMassiveAdd = true">Massive Add?</button>
        <button class="btn btn-primary" v-on:click="$emit('goBack')">Go back!</button>
      </div>
      <div class="col-sm-10 d-flex justify-content-center mb-3">
        <h4 v-if="message">{{message}}</h4>
      </div>
    </div>
    <massiveAdd
      v-on:add="massiveAdding(value)"
      v-on:toggleMassiveAdd="toggleMassiveAdd()"
      :isMassiveAdd="isMassiveAdd"
      :message="message"
    ></massiveAdd>
  </div>
</template>

<script>
import massiveAdd from "./massiveAdd.vue";
const fb = require("../firebaseConfig.js");

export default {
  name: "addLink",
  components: {
    massiveAdd
  },
  data: () => {
    return {
      newLink: "",
      message: "",
      isMassiveAdd: false,
      massiveList: []
    };
  },
  methods: {
    validate(link) {
      debugger;
      const site = this.$store.state.activeSite;
      if (link.indexOf(site.url) > -1) {
        const result = this.$store.state.activeList.indexOf(link);
        if (result > -1) {
          this.message = "This link already exist, but Thank You!";
        } else if (result <= -1) {
          fb.db
            .collection(this.$store.state.activeSite.collection)
            .add({
              url: link
            })
            .then(() => {
              link = "";
              this.newLink = "";
              this.message = "Thank You!";
              this.$store.dispatch("getAllList");
            })
            .catch(() => {
              this.message = "Houston we had a problem!, Try Again!";
            });
        }
      } else {
        this.message = "Looks like that's not a valid link!";
      }
    },
    massiveAdding: function(massiveAddLinks) {
      debugger;
      let result = [];
      if (massiveAddLinks.search("\n") > -1) {
        let another = massiveAddLinks.search(/[,]/);
        result = massiveAddLinks.split("\n");
        if (another > -1) {
          result.map(x => {
            x.replace(/[,]/, "");
          });
        }
      } else if (massiveAddLinks.search(/[,]/) > -1) {
        let another = massiveAddLinks.search("\n");
        result = massiveAddLinks.split(/[,]/);
        if (another > -1) {
          result.map(x => {
            x.replace("\n", "");
          });
        }
      }
      result.forEach(element => {
        this.validate(element);
      });
    },
    toggleMassiveAdd() {
      this.isMassiveAdd = !this.isMassiveAdd;
      this.message = "";
      this.massiveList = [];
    }
  }
};
</script>

<style>
</style>