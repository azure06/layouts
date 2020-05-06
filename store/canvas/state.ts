import { Tool, CanvasComponent, RxHandlers } from './types';

const state = (): CanvasState => ({
  tool: 'none',
  focus: null,
  components: {}
});

export interface CanvasState {
  tool: Tool;
  focus: string | null;
  canvas?: RxHandlers;
  sheet?: RxHandlers;
  components: { [id: string]: CanvasComponent };
}

export default state;
