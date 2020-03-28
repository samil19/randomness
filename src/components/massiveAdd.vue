<template>
  <div v-if="isMassiveAdd" class="row justify-content-center">
    <div class="col-sm-10 align-items-center d-flex justify-content-center mb-3">You are a hero!</div>
    <div class="col-sm-10 align-items-center d-flex justify-content-center mb-3">
      <textarea class="form-control" name="massiveAdd" id="massiveAdding" cols="70" rows="10" v-model="massiveAddLinks"></textarea>
    </div>
    <div class="col-sm-10 align-items-center d-flex justify-content-center mb-3">
      <button class="btn btn-success mr-3" v-on:click="$emit('add',massiveAddLinks)">Save</button>
      <button
        class="btn btn-primary"
        v-on:click="$emit('toggleMassiveAdd'); massiveAddLinks=''"
      >Go back!</button>
    </div>
    <div class="col-sm-10 align-items-center d-flex justify-content-center mb-3">
      <h4 v-if="message">{{message}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "massiveAdd",
  data() {
    return {
      massiveAddLinks: ""
    };
  },
  props: {
    isMassiveAdd: Boolean,
    message: String
  }
};
</script>

<style>
</style>