import { Provider } from '../composition/provider.interface';
import { RemoteDialog, FileSystem, RemoteConnection, PathService, PdfExtract } from './tokens';

export const electronProviders: Provider[] = [
  { provide: require('@electron/remote')?.require('electron')?.dialog, as: RemoteDialog, type: 'constant' },
  { provide: require('@electron/remote'), as: RemoteConnection, type: 'constant' },
  { provide: require('@electron/remote')?.require('fs'), as: FileSystem, type: 'constant' },
  { provide: require('@electron/remote')?.require('path'), as: PathService, type: 'constant' },
  { provide: require('@electron/remote')?.require('pdf-extract'), as: PdfExtract, type: 'constant' }
]