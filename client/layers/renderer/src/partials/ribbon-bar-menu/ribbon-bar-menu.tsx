import { RibbonBarMenuInfo } from '../ribbon-bar/ribbon-bar-menu-info';

import './ribbon-bar-menu.scss';
import { Dynamic } from 'solid-js/web';

export interface RibbonBarMenuProps {
  menu: RibbonBarMenuInfo,
  index: number,
  selectedIndex: number
}

export function RibbonBarMenu(props: RibbonBarMenuProps) {
  const isVisible = () => props.selectedIndex === props.index;

  return (<div classList={{
    ['ribbon-bar__menu']: true,
    ['ribbon-bar__menu--visible']: isVisible()
  }}>
    <Dynamic component={props.menu.component}></Dynamic>
  </div>)
}