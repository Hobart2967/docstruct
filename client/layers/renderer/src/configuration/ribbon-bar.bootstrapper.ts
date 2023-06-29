import { Bootstrapper } from '../services/composition/bootstrapper.interface';
import { inject, injectable } from 'inversify';
import { RibbonBarService } from '../services/ribbon-bar/ribbon-bar.service';
import { FileMenu } from '../components/file-menu/file-menu';
import { ManageMenu } from '../components/manage-menu/manage-menu';

@injectable()
export class RibbonBarBootstrapper implements Bootstrapper {
  public constructor(
    @inject(RibbonBarService)
    private readonly _ribbonBarService: RibbonBarService) { }

  public async run(): Promise<void> {
    this._ribbonBarService
      .registerRibbonBarSection({
        component: FileMenu,
        title: 'File'
      })
      .registerRibbonBarSection({
        component: ManageMenu,
        title: 'Manage'
      });
  }
}
