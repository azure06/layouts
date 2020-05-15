import { RxComponent, RxHandler } from '~/rx-component/src/main';

export type Tool = 'scale' | 'warp' | 'resize' | 'zoom' | 'none';

export type RxHandlers = [RxComponent, RxHandler];

export interface CanvasComponent {
  id: string;
  title: string;
  subtitle: string;
  handlers: RxHandlers;
  style: {
    fontSize: number;
    fontColor: string;
    fontWeight: number;
    fontStyle: 'normal' | 'italic';
    textDecoration:
      | 'unset'
      | 'overline'
      | 'line-through'
      | 'underline'
      | 'underline overline';
  };
}
