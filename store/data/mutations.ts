import { MutationTree } from 'vuex';
import { DataState } from './state';
import { FetchingStatus } from './types';

const mutations: MutationTree<DataState> = {
  CHANGE_FETCHING_STATUS: (state, fetchingStatus: FetchingStatus) =>
    (state.fetchingStatus = fetchingStatus)
};

export default mutations;
