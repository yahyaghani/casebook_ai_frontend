import { Page, ReferencePointer, CryptoInterface } from '../parser';
import { ErrorList } from './annotation_errors';
export declare enum LineEndingStyle {
    Square = 0,
    Circle = 1,
    Diamond = 2,
    OpenArrow = 3,
    ClosedArrow = 4,
    Butt = 5,
    ROpenArrow = 6,
    RClosedArrow = 7,
    Slash = 8,
    None = 9
}
export interface Color {
    r: number;
    g: number;
    b: number;
}
export declare enum BorderStyles {
    Solid = 0,
    Dashed = 1,
    Beveled = 2,
    Inset = 3,
    Underline = 4
}
export interface Border {
    horizontal_corner_radius?: number;
    vertical_corner_radius?: number;
    border_width?: number;
    dash_pattern?: number[];
    border_style?: BorderStyles;
    cloudy?: boolean;
    cloud_intensity?: number;
}
export interface AnnotationFlags {
    invisible?: boolean;
    hidden?: boolean;
    print?: boolean;
    noZoom?: boolean;
    noRotate?: boolean;
    noView?: boolean;
    readOnly?: boolean;
    locked?: boolean;
    toggleNoView?: boolean;
    lockedContents?: boolean;
}
export interface AppearanceStream {
}
export interface OptionalContent {
}
export interface BaseAnnotation {
    page: number;
    pageReference: Page | undefined;
    object_id: ReferencePointer | undefined;
    type?: string;
    rect: number[];
    contents?: string | undefined;
    id: string;
    updateDate: string | Date;
    annotationFlags?: AnnotationFlags | undefined;
    appearanceStream?: AppearanceStream | undefined;
    appearanceStreamSelector?: string | undefined;
    border?: Border | undefined;
    color?: Color | undefined;
    structParent?: number | undefined;
    optionalContent?: OptionalContent | undefined;
    is_deleted?: boolean;
}
export declare class BaseAnnotationObj implements BaseAnnotation {
    object_id: ReferencePointer | undefined;
    is_deleted: boolean;
    raw_parameters: number[][] | undefined;
    page: number;
    pageReference: Page | undefined;
    type: string;
    type_encoded: number[];
    rect: number[];
    contents: string;
    id: string;
    updateDate: string | Date;
    annotationFlags: AnnotationFlags | undefined;
    border: Border | undefined;
    color: Color | undefined;
    optionalContent: OptionalContent | undefined;
    structParent: number | undefined;
    appearanceStream: AppearanceStream | undefined;
    appearanceStreamSelector: string | undefined;
    constructor();
    writeAnnotationPreamble(): number[];
    writeAnnotationObject(cryptoInterface: CryptoInterface): number[];
    protected convertLineEndingStyle(lne: LineEndingStyle): number[];
    writeAnnotationPostamble(): number[];
    encodeAnnotationFlags(): number;
    /**
     * If enact is true, the error will be thrown directly, otherwise the errors are collected
     * and returned as error list.
     * */
    validate(enact?: boolean): ErrorList;
    protected checkColor(color: Color | undefined): ErrorList;
    protected checkReferencePointer(ptr: ReferencePointer | undefined): ErrorList;
    protected checkDate(date: string | Date): [ErrorList, string | undefined];
    protected checkRect(nr: number, rect: number[]): ErrorList;
}
export declare enum ReplyTypes {
    Reply = 0,
    Group = 1
}
export interface InReplyTo {
}
export interface MarkupAnnotation extends BaseAnnotation {
    author?: string;
    opacity?: number;
    richtextString?: string;
    creationDate?: string | Date;
    inReplyTo?: InReplyTo;
    subject?: string;
    replyType?: ReplyTypes;
}
export declare class MarkupAnnotationObj extends BaseAnnotationObj implements MarkupAnnotation {
    author: string;
    opacity?: number;
    creationDate?: string | Date;
    subject: string;
    richtextString?: string;
    constructor();
    writeAnnotationObject(cryptoInterface: CryptoInterface): number[];
    validate(enact?: boolean): ErrorList;
}
