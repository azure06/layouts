import { GetterTree, ActionTree, MutationTree } from 'vuex';
export const strict = false;

export const state = () => ({
  commit: '',
  version: '0.1.0'
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  version: state => state.version
};

export const mutations: MutationTree<RootState> = {};

export const actions: ActionTree<RootState, RootState> = {};
