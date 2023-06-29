import type { BrowserWindow } from 'electron';
import { inject, injectable } from 'inversify';
import { RemoteConnection } from '../electron/tokens';

@injectable()
export class WindowService {
  public constructor(
    @inject(RemoteConnection)
    private readonly _remote: any) { }

  public getCurrentWindow(): BrowserWindow  {
    return this._remote.getCurrentWindow();
  }
}