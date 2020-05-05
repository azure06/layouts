import { GetterTree } from 'vuex';
import { CanvasState } from '../canvas/state';
import { RootState } from '../../store';

const getters: GetterTree<CanvasState, RootState> = {
  tool: state => state.tool
};

export default getters;
