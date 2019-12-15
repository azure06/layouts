import { FetchingStatus } from './types';

const state = (): DataState => ({
  fetchingStatus: 'idle'
});

export interface DataState {
  fetchingStatus: FetchingStatus;
}

export default state;
