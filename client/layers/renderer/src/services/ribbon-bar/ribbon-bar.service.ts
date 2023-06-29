import { injectable } from 'inversify';
import { RibbonBarMenuInfo } from '../../partials/ribbon-bar/ribbon-bar-menu-info';
import { BehaviorSubject, Observable } from 'rxjs';

@injectable()
export class RibbonBarService {
  private _menus = new BehaviorSubject<RibbonBarMenuInfo[]>([]);
  public get menus(): Observable<RibbonBarMenuInfo[]> {
    return this._menus.asObservable();
  }

  public registerRibbonBarSection(menuInfo: RibbonBarMenuInfo): RibbonBarService {
    this._menus.next([
      ...this._menus.value,
      menuInfo
    ]);

    return this;
  }
}