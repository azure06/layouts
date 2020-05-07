import { GetterTree } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import { CanvasState } from '../canvas/state';
import { RootState } from '../../store';

const getters: GetterTree<CanvasState, RootState> = {
  tool: state => state.tool,
  canvas: state => state.canvas,
  sheet: state => state.sheet,
  focus: state => state.focus,
  components: state => Object.values(state.components),
  componentsPlusNext: state => [
    ...Object.values(state.components),
    { id: uuidv4() }
  ],
  componentById: state => (id: string) => {
    return state.components[id];
  }
};

export default getters;
