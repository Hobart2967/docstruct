import { inject, injectable } from 'inversify';
import { DialogService } from './dialog.service';
import { FileSystem, PathService } from '../electron/tokens';

@injectable()
export class FileService {
  private _pendingDirectory: string = null;

  public constructor(
    @inject(DialogService) private readonly _dialogService: DialogService,
    @inject(FileSystem) private readonly _fs: any,
    @inject(PathService) private readonly _path: any) { }

  public async getPendingFiles(): Promise<string[]> {
    if (!this._pendingDirectory) {
      this._pendingDirectory = await this._dialogService.askUserForDirectory();
    }

    if (!this._pendingDirectory) {
      return;
    }

    return this._fs
      .readdirSync(this._pendingDirectory)
      .map(x =>
        this._path.join(this._pendingDirectory, x));
  }
}