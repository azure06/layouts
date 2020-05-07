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
            options: { scalable: true, interactive: true }
          });
          break;
        case 'warp':
          commit('UPDATE_COMPONENT_OPTIONS', {
            id: component.id,
            options: { warpable: true, interactive: true }
          });
          break;
        case 'resize':
          commit('UPDATE_COMPONENT_OPTIONS', {
            id: component.id,
            options: { resizable: true, interactive: true }
          });
          break;
        case 'zoom':
          commit('UPDATE_COMPONENT_OPTIONS', {
            id: component.id,
            options: { interactive: false }
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
  setFocus({ commit, state }, id: string | null) {
    if (id === null && state.focus !== null) {
      commit('UPDATE_COMPONENT_OPTIONS', {
        id: state.focus,
        options: { interactive: false, focused: false }
      });
    } else if (id !== null && state.focus === null) {
      commit('UPDATE_COMPONENT_OPTIONS', {
        id,
        options: { interactive: true, focused: true }
      });
    } else if (id !== null && state.focus !== null) {
      commit('UPDATE_COMPONENT_OPTIONS', {
        id: state.focus,
        options: { interactive: false, focused: false }
      });
      commit('UPDATE_COMPONENT_OPTIONS', {
        id,
        options: { interactive: true, focused: true }
      });
    }

    commit('SET_FOCUS', id);
  },
  createComponent() {}
};

export default actions;
