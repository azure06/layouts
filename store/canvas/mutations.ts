import { MutationTree } from 'vuex';
import { CanvasState } from './state';
import { Tool } from './types';
import { RxComponent, RxHandler } from '~/rx-component/src/main';
import { ComponentOptions } from '~/rx-component/src/internal/types';

type ComponentOptionsEx = ComponentOptions & { focused?: boolean };

const mutations: MutationTree<CanvasState> = {
  CHANGE_TOOL(state, tool: Tool) {
    state.tool = tool;
  },
  SET_FOCUS(state, id: string | null) {
    state.focus = id;
  },
  UPDATE_COMPONENT_OPTIONS(
    state,
    { id, options }: { id: string; options: ComponentOptionsEx }
  ) {
    const [rxComponent, rxHandler] = state.components[id].handlers;
    const { focused, ...rest } = options;
    if (focused !== undefined) rxComponent.setFocus(focused);
    rxHandler.updateOptions(rest);
  },
  UPDATE_SHEET_OPTIONS(state, { focused, ...options }: ComponentOptionsEx) {
    if (state.sheet) {
      const [rxComponent, rxHandler] = state.sheet;
      if (focused !== undefined) rxComponent.setFocus(focused);
      rxHandler.updateOptions(options);
    }
  },
  UPDATE_CANVAS_OPTIONS(state, { focused, ...options }: ComponentOptionsEx) {
    if (state.canvas) {
      const [rxComponent, rxHandler] = state.canvas;
      if (focused !== undefined) rxComponent.setFocus(focused);
      rxHandler.updateOptions(options);
    }
  },
  CREATE_COMPONENT(state, target: HTMLElement) {
    const rxComponent = new RxComponent(target, {
      width: '600px',
      height: '240px'
    });
    const rxHandler = new RxHandler(rxComponent, {
      draggable: false,
      rotable: false,
      scalable: false,
      interactive: false
    })
      .onFocus(() => rxComponent.focused)
      .onBlur(() => rxComponent.focused);

    const id = '' + Object.values(state.components).length;

    state.components = {
      ...state.components,
      [id]: {
        id,
        name: `Element ${id}`,
        handlers: [rxComponent, rxHandler] as [RxComponent, RxHandler]
      }
    };
  },
  CREATE_SHEET(state, target: HTMLElement) {
    const rxComponent = new RxComponent(target, {
      width: '1000px',
      height: '1414px'
    });
    const rxHandler = new RxHandler(rxComponent, {
      interactive: false,
      draggable: false,
      rotable: false,
      scalable: false
    });

    state.sheet = [rxComponent, rxHandler];
  },
  CREATE_CANVAS(state, target: HTMLElement) {
    const rxComponent = new RxComponent(target, {});
    const rxHandler = new RxHandler(rxComponent, {
      interactive: false,
      draggable: false,
      rotable: false,
      scalable: false
    });
    state.canvas = [rxComponent, rxHandler];
  }
};

export default mutations;
