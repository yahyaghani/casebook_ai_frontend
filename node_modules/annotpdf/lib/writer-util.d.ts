import { Page, ReferencePointer } from './parser';
export declare class WriterUtil {
    static N: number;
    static F: number;
    static SPACE: number;
    static CR: number;
    static LF: number;
    static OBJ: number[];
    static ENDOBJ: number[];
    static ENCRYPT: number[];
    static ARRAY_START: number;
    static OPEN: number[];
    static ARRAY_END: number;
    static DICT_START: number[];
    static HEX_STRING_START: number[];
    static HEX_STRING_END: number[];
    static DICT_END: number[];
    static TYPE_ANNOT: number[];
    static RECT: number[];
    static SUBTYPE: number[];
    static UPDATE_DATE: number[];
    static AUTHOR: number[];
    static CONTENTS: number[];
    static BRACKET_START: number;
    static BRACKET_END: number;
    static FLAG: number[];
    static ID: number[];
    static DOCUMENT_ID: number[];
    static COLOR: number[];
    static FILL: number[];
    static STATE: number[];
    static STATEMODEL: number[];
    static OPACITY: number[];
    static BORDER: number[];
    static PAGE_REFERENCE: number[];
    static DEFAULT_APPEARANCE: number[];
    static INKLIST: number[];
    static RC: number[];
    static CREATION_DATE: number[];
    static SUBJ: number[];
    static TRAILER: number[];
    static SIZE: number[];
    static ROOT: number[];
    static PREV: number[];
    static STARTXREF: number[];
    static EOF: number[];
    static TRUE: number[];
    static XREF: number[];
    static TEXT_JUSTIFICATION: number[];
    static DEFAULT_STYLE_STRING: number[];
    static DIFFERENCE_RECTANGLE: number[];
    static IT: number[];
    static LINE_ENDING: number[];
    static CALLOUT_LINE: number[];
    static QUADPOINTS: number[];
    static VERTICES: number[];
    static NAME: number[];
    static DRAFT: number[];
    static SY: number[];
    static P: number;
    /**
     * Writes a reference pointer
     *
     * <obj_id> <generation> R
     *
     * The 'R' and the preceding space is only written in case 'referenced' is true
     * */
    static writeReferencePointer(ref: ReferencePointer, referenced?: boolean): number[];
    /**
     * Adds preceding zeros (0) in front of the 'value' to match the length
     * */
    static pad(length: number, value: string | number): number[];
    /**
     * Writes a nested number array
     * */
    static writeNestedNumberArray(array: number[][]): number[];
    /**
     * Writes a javascript number array to a PDF number array
     * */
    static writeNumberArray(array: number[]): number[];
    /**
     * Replaces the /Annots field in an page object
     *
     * ptr : Pointer to the page object
     * annot_array_reference : The reference to the annotation array
     * */
    static replaceAnnotsFieldInPageObject(data: Uint8Array, page: Page, page_ptr: number, annot_array_reference: ReferencePointer): number[];
}
