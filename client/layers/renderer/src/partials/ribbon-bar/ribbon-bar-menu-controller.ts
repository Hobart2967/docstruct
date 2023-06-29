import { JSXElement, Signal } from 'solid-js';
import { RibbonBarMenuInfo } from './ribbon-bar-menu-info';

export interface RibbonBarMenuController {
  info: RibbonBarMenuInfo;

  visibility: Signal<boolean>;
}