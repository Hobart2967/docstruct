import { inject, injectable } from 'inversify';
import { Bootstrapper } from '../services/composition/bootstrapper.interface';
import { DocumentDb } from '../services/documents/document-db';

@injectable()
export class DatabaseBootstrapper implements Bootstrapper {
  public constructor(
    @inject(DocumentDb)
    private readonly _documentDb: DocumentDb) { }

  public run(): void {
    this._documentDb
  }
}