import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const url = "http://localhost:5173/reviews";
const headers = {Accept: "application/json"};

export default new Vuex.Store({
    state: {
        currentName: 'jaja',
        currentMail:'',
        allForms:[]
    },
    mutations: {
        setcurrentName(state,payload) {
            state.currentName = payload;
            state.allForms.push(payload);
        }
    },
    actions:{        async setcurrentName(state) {
            const name = await fetch(url, {headers});
            const n = await name.json();
            state.commit("setcurrentName",n.name);
        }
    },
    modules:{},
    getters:{

        getcurrentName: state => state.currentName
    }
});