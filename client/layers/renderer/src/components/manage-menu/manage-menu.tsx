import { useService } from '../../contexts/dependency-injection';
import { FileService } from '../../services/common/file.service';
import { DocumentImporterService } from '../../services/documents/document-importer.service';
import { PdfExtractionService } from '../../services/pdf/pdf-extraction.service';

import './manage-menu.scss';

export function ManageMenu() {
  const fileService = useService<FileService>(FileService);
  const documentImporterService = useService<DocumentImporterService>(DocumentImporterService);

  async function importFiles() {
    const pendingFiles = (await fileService.getPendingFiles())
      .filter(x => x.endsWith('.pdf'));

    for (const filePath of pendingFiles) {
      await documentImporterService.importDocumentFromPdf(filePath);
    }
  }

  return (<div class="manage-menu">
    <button onClick={() => importFiles()}>
      Import pending Files
    </button>
  </div>);
}