import { RxComponent, RxHandler } from '~/rx-component/src/main';

export type Tool = 'scale' | 'warp' | 'resize' | 'zoom' | 'none';

export type RxHandlers = [RxComponent, RxHandler];

export interface CanvasComponent {
  id: string;
  name: string;
  handlers: RxHandlers;
}
