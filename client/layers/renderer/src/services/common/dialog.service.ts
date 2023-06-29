import { inject, injectable } from 'inversify';
import { RemoteDialog } from '../electron/tokens';
import type { Dialog } from 'electron';
import { WindowService } from './window.service';

@injectable()
export class DialogService {
  public constructor(
    @inject(RemoteDialog)
    private readonly _remoteDialog: Dialog,

    @inject(WindowService)
    private readonly _windowService: WindowService) { }

  public async askUserForDirectory(): Promise<string> {
    const result = await this._remoteDialog.showOpenDialog(this._windowService.getCurrentWindow(), {
      properties: ['openDirectory', 'createDirectory']
    });

    if (result.canceled) {
      return null;
    }

    return result.filePaths[0];
  }
}