import 'reflect-metadata';
import './main.scss';

import { FileService } from './services/common/file.service';
import { DialogService } from './services/common/dialog.service';
import { AppService } from './services/composition/app.service';
import { AppBootstrapper } from './configuration/app.bootstrapper';
import { Bootstrapper } from './services/composition/tokens';
import { electronProviders } from './services/electron/electron-providers';
import { RibbonBarService } from './services/ribbon-bar/ribbon-bar.service';
import { RxJsAdapterService } from './services/rxjs/rxjs-adapter.service';
import { RibbonBarBootstrapper } from './configuration/ribbon-bar.bootstrapper';
import { WindowService } from './services/common/window.service';
import { PdfExtractionService } from './services/pdf/pdf-extraction.service';
import { DocumentDb } from './services/documents/document-db';
import { DocumentImporterService } from './services/documents/document-importer.service';

const app = AppService.create([
  ...electronProviders,

  { provide: RibbonBarBootstrapper, as: Bootstrapper },
  { provide: AppBootstrapper, as: Bootstrapper },

  { provide: DocumentDb },
  { provide: DocumentImporterService },
  { provide: PdfExtractionService },
  { provide: WindowService },
  { provide: RxJsAdapterService },
  { provide: RibbonBarService },
  { provide: FileService },
  { provide: DialogService }
]);

app.run();
