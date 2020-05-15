import { MutationTree } from 'vuex';
import { CanvasState } from './state';
import { Tool, CanvasComponent } from './types';
import { RxComponent, RxHandler } from '~/rx-component/src/main';
import { ComponentOptions } from '~/rx-component/src/internal/types';

type ComponentOptionsEx = ComponentOptions & { focused?: boolean };

type Id = { id: string };

type ComponentContent = Id &
  (
    | Pick<CanvasComponent, 'title' | 'subtitle'>
    | Pick<CanvasComponent, 'title'>
    | Pick<CanvasComponent, 'subtitle'>
  );

type ComponentStyle = Id & Pick<CanvasComponent, 'style'>;

const mutations: MutationTree<CanvasState> = {
  CHANGE_TOOL(state, tool: Tool) {
    state.tool = tool;
  },
  SET_FOCUS(state, id: string | null) {
    state.focus = id;
  },
  UPDATE_COMPONENT(state, { id, ...rest }: ComponentContent) {
    state.components[id].title =
      'title' in rest ? rest.title : state.components[id].title;
    state.components[id].subtitle =
      'subtitle' in rest ? rest.subtitle : state.components[id].subtitle;
  },
  UPDATE_COMPONENT_STYLE(state, { id, style }: ComponentStyle) {
    state.components[id].style = style;
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
  REMOVE_COMPONENT(state, id: string) {
    state.components = Object.values(state.components)
      .filter(component => component.id !== id)
      .reduce((acc, value) => {
        acc[value.id] = value;
        return acc;
      }, {} as { [id: string]: CanvasComponent });
  },
  CREATE_COMPONENT(state, { id, target }: { id: string; target: HTMLElement }) {
    const rxComponent = new RxComponent(target, {
      width: '160px',
      height: '40px'
    });
    const rxHandler = new RxHandler(rxComponent, {
      draggable: true,
      rotable: false,
      scalable: false,
      interactive: false
    })
      .onFocus(() => rxComponent.focused)
      .onBlur(() => rxComponent.focused);

    state.components = {
      ...state.components,
      [id]: {
        id,
        title: `Text ${Object.values(state.components).length + 1}`,
        subtitle: '',
        handlers: [rxComponent, rxHandler] as [RxComponent, RxHandler],
        style: {
          fontColor: 'unset',
          fontStyle: 'normal',
          textDecoration: 'unset',
          fontSize: 16,
          fontWeight: 400
        }
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
