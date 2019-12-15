import { GetterTree } from 'vuex';
import { DataState } from '../data/state';
import { RootState } from '../../store';

const getters: GetterTree<DataState, RootState> = {
  fetchingStatus: state => state.fetchingStatus,
  isLoading: state =>
    state.fetchingStatus === 'idle' || state.fetchingStatus === 'pending',
  isResolved: state => state.fetchingStatus === 'resolved',
  isRejected: state => state.fetchingStatus === 'rejected'
};

export default getters;
