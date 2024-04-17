export declare class FakeStream {
    onRecord: any;
    blobArg: string;
    constructor();
    on(event: string, callback: any): void;
    toBlob(app: string): string;
}
export declare enum DocMethods {
    TEXT = "TEXT",
    FONT = "FONT",
    FONTSIZE = "FONTSIZE",
    FILLCOLOR = "FILLCOLOR",
    MOVEUP = "MOVEUP",
    MOVEDOWN = "MOVEDOWN",
    IMAGE = "IMAGE",
    END = "END",
    PIPE = "PIPE"
}
export interface DocRecord {
    method: DocMethods;
    arguments: any[];
}
export declare class MockPDFDocument {
    endCalled: boolean;
    docRecord: DocRecord[];
    constructor();
    text(text: string, x: number, y: number, options: any): this;
    pipe(arg: any): FakeStream;
    end(): this;
    image(data: string, options: any): void;
    font(fontName: string): void;
    fontSize(size: number): void;
    moveDown(lines?: number): void;
    moveUp(lines?: number): void;
    fillColor(color: string): void;
}
//# sourceMappingURL=test-utilities.d.ts.map