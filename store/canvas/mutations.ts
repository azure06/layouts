import { MutationTree } from 'vuex';
import { CanvasState } from './state';
import { Tool } from './types';

const mutations: MutationTree<CanvasState> = {
  CHANGE_TOOL: (state, toolIndex: number) => {
    const tool = ((): Tool => {
      switch (toolIndex) {
        case 0:
          return 'scale';
        case 1:
          return 'warp';
        case 2:
          return 'resize';
        default:
          return 'none';
      }
    })();
    state.tool = tool;
  }
};

export default mutations;
