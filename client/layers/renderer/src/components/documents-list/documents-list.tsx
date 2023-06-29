import { For, createResource } from 'solid-js';
import { useService } from '../../contexts/dependency-injection';
import { DocumentDb } from '../../services/documents/document-db';

export function DocumentsList() {
  const documentDb = useService<DocumentDb>(DocumentDb);

  const documents = () => documentDb.entries();

  return (<div class="documents-list">
    <table>
      <thead>
        <tr>
          <td>State</td>
          <td>Name</td>
          <td>Path</td>
          <td>Size</td>
        </tr>
      </thead>
      <tbody>
        <For each={documents()}>
          {document =>
            <tr>
              <td>{document.state}</td>
              <td>{document.fileName}</td>
              <td>{document.fileName}</td>
              <td>n/a</td>
            </tr>}
        </For>
      </tbody>
    </table>
  </div>)
}