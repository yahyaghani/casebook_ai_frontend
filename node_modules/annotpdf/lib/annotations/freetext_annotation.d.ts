import { MarkupAnnotation, MarkupAnnotationObj, LineEndingStyle } from './annotation_types';
import { ErrorList } from './annotation_errors';
import { CryptoInterface } from '../parser';
export declare enum TextJustification {
    Left = 0,
    Centered = 1,
    Right = 2
}
export declare enum FreeTextType {
    FreeText = 0,
    FreeTextCallout = 1,
    FreeTextTypeWriter = 2
}
export interface FreeTextAnnotation extends MarkupAnnotation {
    textJustification?: TextJustification;
    defaultAppearance: string;
    defaultStyleString?: string;
    calloutLine?: number[];
    freeTextType?: FreeTextType;
    borderEffect?: any;
    borderStyle?: any;
    differenceRectangle?: number[];
    lineEndingStyle?: LineEndingStyle;
}
export declare class FreeTextAnnotationObj extends MarkupAnnotationObj implements FreeTextAnnotation {
    defaultAppearance: string;
    defaultStyleString: string | undefined;
    differenceRectangle: number[];
    textJustification: TextJustification;
    calloutLine: number[];
    freeTextType: FreeTextType;
    lineEndingStyle: LineEndingStyle;
    constructor();
    private convertJustification;
    private convertFreeTextType;
    writeAnnotationObject(cryptoInterface: CryptoInterface): number[];
    validate(enact?: boolean): ErrorList;
}
