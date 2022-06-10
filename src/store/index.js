import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  //state - storamo data
  state: {},
  //mutations - mijenjaju data iz stata, kad commitamo mutaciju od bilo gdje iz app (ne mozemo kroistiti async)
  mutations: {},
  //actions - ne mogu mijenjati data iz state, ali mozemo async (ovo zovemo dispatching)
  actions: {},
  //get data iz state - mozemo filtrirat podatke kao recimo ako hocemo samo zadatke koji sugotovi
  getters: {},
  //modules - razbijanje podataka iz vuexa, imaju svoj state, actions, mutatuons.., koristi se za kompleksnije app
  modules: {},
});
