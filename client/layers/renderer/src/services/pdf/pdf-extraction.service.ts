import { inject, injectable } from 'inversify';
import { PathService, PdfExtract } from '../electron/tokens';
import { PdfExtraction } from './pdf-extraction.interface';

@injectable()
export class PdfExtractionService {
  public constructor(
    @inject(PathService) private readonly _pathService: any,
    @inject(PdfExtract) private readonly _pdfExtract: any) { }

  public async readFile(filePath: string): Promise<PdfExtraction> {
    const absolutePathToPpdf = this._pathService.resolve(filePath)
    if (absolutePathToPpdf.includes(" ")) {
      throw new Error("will fail for paths w spaces like " + absolutePathToPpdf)
    }

    const options = {
      type: 'ocr', // perform ocr to get the text within the scanned image
      ocr_flags: ['--psm 1'], // automatically detect page orientation
    }

    return new Promise((resolve, reject) => {
      const processor = this._pdfExtract(
        absolutePathToPpdf,
        options,
        () => console.log("Starting..."));

      processor
        .on('complete', data => resolve({
          Hash: data.hash,
          PageTexts: data.text_pages,
          PdfPath: data.pdf_path,
          PagePdfPaths: data.single_page_pdf_file_paths,
        }));

      processor
        .on('error', reject);
    });
  }
}