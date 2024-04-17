import { Config, RawOrParsedDelta } from './interfaces';
export declare class PdfExporter {
    private readonly _pdfBuilder;
    constructor();
    generatePdf(delta: RawOrParsedDelta, config?: Config): Promise<Blob>;
}
declare const exposedInstance: PdfExporter;
export default exposedInstance;
//# sourceMappingURL=pdf-exporter.d.ts.map