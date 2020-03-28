import Vue from 'vue';
import Vuex from 'vuex';

const fb = require("../firebaseConfig.js");
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        randomLink: "",
        section: "",
        showingRandom: false,
        activeSite: {},
        activeList: []
    },
    mutations: {
        toggleShowingRandom: state => state.showingRandom = !state.showingRandom,
        set: (state, payload) => {
            state[payload.nameVaribable] = payload.value;
        },
        reset: (state) => {
            state.randomLink = "";
            state.section = "";
            state.showingRandom = false;
            state.activeSite = {};
            state.activeList = [];
        }
    },
    actions: {
        getAllList() {
            var that = this;
            const site = this.state.activeSite.collection;
            if (site)
                fb.db
                    .collection(site)
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            that.state.activeList.push(doc.data().url);
                        });
                        this.dispatch("getRandom");
                    });
        },
        getRandom() {
            const count = this.state.activeList.length;
            const randomIndex = Math.floor(Math.random() * Math.floor(count));
            this.commit("set", { nameVaribable: 'randomLink', value: this.state.activeList[randomIndex] });
        }
    }
});