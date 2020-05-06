import { ActionTree } from 'vuex';
import { CanvasState } from './state';
import { Tool } from './types';
import { RootState } from '..';

const actions: ActionTree<CanvasState, RootState> = {
  changeTool({ commit, state }, tool: Tool) {
    // If previous state was draggable, disable it
    switch (state.tool) {
      case 'zoom':
        if (state.canvas) {
          commit('UPDATE_CANVAS_OPTIONS', { draggable: false });
        }
    }

    Object.values(state.components).forEach(component => {
      switch (tool) {
        case 'scale':
          commit('UPDATE_COMPONENT_OPTIONS', {
            id: component.id,
            options: { scalable: true }
          });
          break;
        case 'warp':
          commit('UPDATE_COMPONENT_OPTIONS', {
            id: component.id,
            options: { warpable: true }
          });
          break;
        case 'resize':
          commit('UPDATE_COMPONENT_OPTIONS', {
            id: component.id,
            options: { resizable: true }
          });
          break;
        default:
          commit('UPDATE_COMPONENT_OPTIONS', {
            id: component.id,
            options: { scalable: false }
          });
      }
    });

    switch (tool) {
      case 'zoom':
        if (state.canvas) {
          commit('UPDATE_CANVAS_OPTIONS', { draggable: true });
          commit('CHANGE_TOOL', tool);
        } else {
          commit('CHANGE_TOOL', 'none');
        }
        break;
      default:
        commit('CHANGE_TOOL', tool);
    }
  },
  setFocus() {},
  createComponent() {}
};

export default actions;
