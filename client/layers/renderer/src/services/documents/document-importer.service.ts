import { inject, injectable } from 'inversify';
import { DocumentDb } from './document-db';
import { DocumentAnalysisState } from '../../models/document-analysis-state.enum';
import { PdfExtractionService } from '../pdf/pdf-extraction.service';
import { DocumentInfo } from '../../models/document-info.interface';

interface QueueEntry {
  operation: () => Promise<void>;
  document: DocumentInfo;
}

@injectable()
export class DocumentImporterService {
  private readonly _queue: Array<QueueEntry> = [];
  private _queueRunner: Promise<void>;

  public constructor(
    @inject(DocumentDb)
    private readonly _documentDb: DocumentDb,

    @inject(PdfExtractionService)
    private readonly _pdfExtractionService: PdfExtractionService) { }

  public async importDocumentFromPdf(filePath: string): Promise<void> {
    const _id = crypto.randomUUID();
    console.log(_id);
    const document = {
      _id,
      fileName: filePath,
      state: DocumentAnalysisState.Pending,
      hash: null,
      categories: [],
      pages: []
    };

    await this._documentDb.registerDocument(document);

    this.queueImport(document);
  }

  private queueImport(document: DocumentInfo) {
    this._queue.push({
      operation: async () => this.importFile(document),
      document
    });

    this._queueRunner = this._queueRunner || this.ensureQueueProcessorRunning();
  }

  private async ensureQueueProcessorRunning(): Promise<void> {
    for (const queueEntry of this._queue) {
      const { document, operation } = queueEntry;
      document.state = DocumentAnalysisState.Done;
      await this._documentDb.updateDocument(document);
      await operation();
    }

    this._queueRunner = null;
  }

  private async importFile(document: DocumentInfo): Promise<void> {
    const data = await this._pdfExtractionService.readFile(document.fileName);
    document.state = DocumentAnalysisState.Done;
    await this._documentDb.updateDocument(document);
  }
}