import { GetterTree } from 'vuex';
import { CanvasState } from '../canvas/state';
import { RootState } from '../../store';

const getters: GetterTree<CanvasState, RootState> = {
  tool: state => state.tool,
  canvas: state => state.canvas,
  sheet: state => state.sheet,
  components: state => Object.values(state.components),
  componentById: state => (id: string) => {
    return state.components[id];
  }
};

export default getters;
