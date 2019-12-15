import { ActionTree } from 'vuex';
import { DataState } from './state';
import { RootState } from '..';

const actions: ActionTree<DataState, RootState> = {
  fetchItems({ commit }) {
    commit('CHANGE_FETCHING_STATUS', 'pending');
    return Promise.resolve([])
      .then(() => {
        commit('CHANGE_FETCHING_STATUS', 'resolved');
      })
      .catch(e => {
        commit('CHANGE_FETCHING_STATUS', 'rejected');
        throw e;
      });
  }
};

export default actions;
