import { DocumentAnalysisState } from './document-analysis-state.enum';

export interface DocumentInfo {
  _rev: string;
  _id: string;
  fileName: string;
  hash: string;
  state: DocumentAnalysisState;
  pages: string[];
  categories: string[];
}
