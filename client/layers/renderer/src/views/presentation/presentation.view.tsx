import { DocumentsList } from '../../components/documents-list/documents-list';
import { RibbonBar } from '../../partials/ribbon-bar/ribbon-bar';

export function Presentation() {
  return (<div>
    <div class="head">
      <RibbonBar></RibbonBar>
    </div>
    <div class="content">
      <DocumentsList></DocumentsList>
    </div>
  </div>);
}