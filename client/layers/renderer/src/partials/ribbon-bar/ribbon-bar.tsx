import { useService } from '../../contexts/dependency-injection';
import { RibbonBarService } from '../../services/ribbon-bar/ribbon-bar.service';
import { RxJsAdapterService } from '../../services/rxjs/rxjs-adapter.service';
import { RibbonBarMenu } from '../ribbon-bar-menu/ribbon-bar-menu';
import './ribbon-bar.scss';
import { For, createSignal } from 'solid-js';

export function RibbonBar() {
  const ribbonBarService = useService<RibbonBarService>(RibbonBarService);
  const rxJsAdapterService = useService<RxJsAdapterService>(RxJsAdapterService);

  const [menus] = rxJsAdapterService.createSignalFrom(ribbonBarService.menus);
  const [selectedIndex, setSelectedIndex] = createSignal(0);

  function select(index: number) {
    setSelectedIndex(Math.max(index, 0));
  }

  return (<div class="ribbon-bar">
    <div class="headers">
      <For each={menus()}>
        {(menu, index) => (<div
          classList={{
            ["ribbon-bar__header"]: true,
            ["ribbon-bar__header--selected"]: index() === selectedIndex()
          }}
          onClick={() => select(index())}>
            {menu.title}
          </div>)}
      </For>
    </div>
    <div class="ribbon-bar__content">
      <For each={menus()}>
        {(menu, index) =>
          <RibbonBarMenu
            menu={menu}
            index={index()}
            selectedIndex={selectedIndex()}></RibbonBarMenu>}
      </For>
    </div>
  </div>)
}