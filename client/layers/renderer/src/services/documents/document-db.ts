import { injectable } from 'inversify';
import PouchDb from 'pouchdb';
import { Bootstrapper } from '../composition/bootstrapper.interface';
import { DocumentInfo } from '../../models/document-info.interface';
import { Accessor, Signal, createSignal, createUniqueId } from 'solid-js';

@injectable()
export class DocumentDb {
  private readonly _database = new PouchDb('documents');

  private _entriesSignal: Signal<DocumentInfo[]> = null;
  public get entries(): Accessor<DocumentInfo[]> {
    if (this._entriesSignal === null) {
      this.startListener();
    }

    const [accessor] = this._entriesSignal;
    return accessor;
  }

  public async getAllDocuments(): Promise<DocumentInfo[]> {
    const docs = await this._database.allDocs<DocumentInfo>({ include_docs: true });
    const pocos = docs.rows.map(x => x.doc as DocumentInfo);
    return pocos;
  }

  public async getDocumentByFileName(fileName: string) {
    return await this._database.find({
      selector: { fileName }
    });
  }

  public async registerDocument(document: DocumentInfo) {
    const response = await this._database.put(document);
    if (response.ok) {
      document._rev = response.rev;
    }
  }

  public async updateDocument(document: DocumentInfo) {
    const response = await this._database.put({ ...document });
    if (response.ok) {
      document._rev = response.rev;
    }
  }

  private async startListener(): Promise<void> {
    const [_, setter] = this._entriesSignal = createSignal([]);

    setter(await this.getAllDocuments());

    this._database
      .changes({
        live: true
      })
      .on('change', async (change) => {
        const document = change.doc as any as DocumentInfo;
        console.log(document);

        setter(await this.getAllDocuments());
      });
  }
}