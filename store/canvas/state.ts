import { Tool } from './types';

const state = (): { tool: Tool } => ({
  tool: 'none'
});

export type CanvasState = ReturnType<typeof state>;

export default state;
