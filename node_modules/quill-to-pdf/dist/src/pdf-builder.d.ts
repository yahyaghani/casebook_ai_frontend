import { Config, LineAttr, QParagraph, RawOrParsedDelta, Runs, Style, TextBase } from "./interfaces";
import { InsertEmbed, ParsedQuillDelta, RunAttributes } from 'quilljs-parser';
declare class PdfBuilder {
    listIndicators: string[][];
    levelTrackers: number[];
    style: Style;
    constructor();
    getPdfStream(doc: any, delta: RawOrParsedDelta, config?: Config): any;
    buildPdf(parsedDeltas: ParsedQuillDelta[], doc: any): void;
    buildParagraph(paragraph: QParagraph, doc: any): void;
    buildEmbed(embed: InsertEmbed, doc: any): void;
    buildSimpleParagraphs(paragraph: QParagraph, doc: any): void;
    buildFormattedParagraphs(paragraph: QParagraph, doc: any): void;
    buildHeader(textRuns: Runs, level: number, doc: any): void;
    buildBlockQuote(textRuns: Runs, doc: any): void;
    buildCodeBlock(textRuns: Runs, doc: any): void;
    buildList(textRuns: Runs, lineAttributes: LineAttr, doc: any): void;
    buildOrderedList(textRuns: Runs, lineAttributes: LineAttr, doc: any): void;
    buildBulletList(textRuns: Runs, lineAttributes: LineAttr, doc: any): void;
    buildCitation(textRuns: Runs, lineAttributes: LineAttr, doc: any): void;
    buildRuns(textRuns: Runs, base: TextBase, doc: any): void;
    setPreRunAttributes(runAttributes: RunAttributes | undefined, base: TextBase, doc: any): void;
    setRunAttributes(attributes: RunAttributes | undefined, lastRun: boolean): object;
    setRunSize(size: 'small' | 'large' | 'huge', baseSize: number, doc: any): void;
    setBoldFont(baseFont: string, doc: any): void;
    prepareInput(delta: RawOrParsedDelta): ParsedQuillDelta[];
    configureStyles(config: Config): void;
    resetStyles(): void;
    resetLevelTrackers(): void;
    updateLevelTrackers(level: number): void;
    getListIndicator(level: number): string;
}
export default PdfBuilder;
//# sourceMappingURL=pdf-builder.d.ts.map