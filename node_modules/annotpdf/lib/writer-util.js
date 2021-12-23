"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class WriterUtil {
    /**
     * Writes a reference pointer
     *
     * <obj_id> <generation> R
     *
     * The 'R' and the preceding space is only written in case 'referenced' is true
     * */
    static writeReferencePointer(ref, referenced = false) {
        let ret = util_1.Util.convertNumberToCharArray(ref.obj);
        ret.push(util_1.Util.SPACE);
        ret = ret.concat(util_1.Util.convertNumberToCharArray(ref.generation));
        if (referenced) {
            ret.push(util_1.Util.SPACE);
            ret.push(...util_1.Util.R);
        }
        return ret;
    }
    /**
     * Adds preceding zeros (0) in front of the 'value' to match the length
     * */
    static pad(length, value) {
        value = String(value);
        let ret = [];
        for (let i = 0; i < length - value.length; ++i) {
            ret.push(48);
        }
        ret = ret.concat(util_1.Util.convertNumberToCharArray(value));
        return ret;
    }
    /**
     * Writes a nested number array
     * */
    static writeNestedNumberArray(array) {
        let ret = util_1.Util.ARRAY_START;
        for (let subArray of array) {
            ret = ret.concat(WriterUtil.writeNumberArray(subArray));
            ret.push(util_1.Util.SPACE);
        }
        ret.push(...util_1.Util.ARRAY_END);
        return ret;
    }
    /**
     * Writes a javascript number array to a PDF number array
     * */
    static writeNumberArray(array) {
        let ret = util_1.Util.ARRAY_START;
        for (let i of array) {
            ret = ret.concat(util_1.Util.convertNumberToCharArray(i));
            ret.push(util_1.Util.SPACE);
        }
        ret.push(...util_1.Util.ARRAY_END);
        return ret;
    }
    /**
     * Replaces the /Annots field in an page object
     *
     * ptr : Pointer to the page object
     * annot_array_reference : The reference to the annotation array
     * */
    static replaceAnnotsFieldInPageObject(data, page, page_ptr, annot_array_reference) {
        let ptr_objend = util_1.Util.locateSequence(util_1.Util.ENDOBJ, data, page_ptr, true);
        let complete_page_object_data = data.slice(page_ptr, ptr_objend + util_1.Util.ENDOBJ.length);
        let ret = [];
        if (page.hasAnnotsField) {
            // in this case the page object directly contains an array of references and
            // does not point to an array array object -- we replace the array of references with a pointer
            // to the reference array
            let ptr_annots = util_1.Util.locateSequence(util_1.Util.ANNOTS, complete_page_object_data, 0, true);
            ret = Array.from(complete_page_object_data.slice(0, ptr_annots + util_1.Util.ANNOTS.length));
            ret.push(util_1.Util.SPACE);
            ret = ret.concat(WriterUtil.writeReferencePointer(annot_array_reference, true));
            ret.push(util_1.Util.SPACE);
            let ptr_annots_array_end = util_1.Util.locateSequence(util_1.Util.ARRAY_END, complete_page_object_data, ptr_annots, true) + util_1.Util.ARRAY_END.length;
            ret = ret.concat(Array.from(complete_page_object_data.slice(ptr_annots_array_end, complete_page_object_data.length)));
        }
        else {
            let ptr_dict_end = util_1.Util.locateSequenceReversed(util_1.Util.DICT_END, complete_page_object_data, complete_page_object_data.length - 1);
            if (-1 === ptr_dict_end)
                throw Error("Could not identify dictionary end");
            ret = Array.from(complete_page_object_data.slice(0, ptr_dict_end));
            ret = ret.concat(util_1.Util.ANNOTS);
            ret.push(util_1.Util.SPACE);
            ret = ret.concat(WriterUtil.writeReferencePointer(annot_array_reference, true));
            ret.push(util_1.Util.SPACE);
            ret = ret.concat(Array.from(complete_page_object_data.slice(ptr_dict_end, complete_page_object_data.length)));
        }
        ret.push(util_1.Util.CR);
        ret.push(util_1.Util.LF);
        return ret;
    }
}
exports.WriterUtil = WriterUtil;
WriterUtil.N = 110;
WriterUtil.F = 102;
WriterUtil.SPACE = 32;
WriterUtil.CR = 13;
WriterUtil.LF = 10;
WriterUtil.OBJ = [111, 98, 106];
WriterUtil.ENDOBJ = [101, 110, 100, 111, 98, 106];
WriterUtil.ENCRYPT = [47, 69, 110, 99, 114, 121, 112, 116];
WriterUtil.ARRAY_START = 91;
WriterUtil.OPEN = [47, 79, 112, 101, 110];
WriterUtil.ARRAY_END = 93;
WriterUtil.DICT_START = [60, 60];
WriterUtil.HEX_STRING_START = [60];
WriterUtil.HEX_STRING_END = [62];
WriterUtil.DICT_END = [62, 62];
WriterUtil.TYPE_ANNOT = [47, 84, 121, 112, 101, WriterUtil.SPACE, 47, 65, 110, 110, 111, 116];
WriterUtil.RECT = [47, 82, 101, 99, 116];
WriterUtil.SUBTYPE = [47, 83, 117, 98, 116, 121, 112, 101];
WriterUtil.UPDATE_DATE = [47, 77]; // = '/M'
WriterUtil.AUTHOR = [47, 84]; // = '/T'
WriterUtil.CONTENTS = [47, 67, 111, 110, 116, 101, 110, 116, 115]; // = '/Contents'
WriterUtil.BRACKET_START = 40;
WriterUtil.BRACKET_END = 41;
WriterUtil.FLAG = [47, 70]; // = '/F'
WriterUtil.ID = [47, 78, 77]; // = '/NM'
WriterUtil.DOCUMENT_ID = [47, 73, 68]; // = '/ID'
WriterUtil.COLOR = [47, 67]; // = '/C'
WriterUtil.FILL = [47, 73, 67]; // = '/IC'
WriterUtil.STATE = [47, 83, 116, 97, 116, 101]; // = '/State'
WriterUtil.STATEMODEL = [47, 83, 116, 97, 116, 101, 77, 111, 100, 101, 108]; // = '/StateModel'
WriterUtil.OPACITY = [47, 67, 65]; // = '/CA'
WriterUtil.BORDER = [47, 66, 111, 114, 100, 101, 114]; // = '/Border'
WriterUtil.PAGE_REFERENCE = [47, 80]; // = '/P'
WriterUtil.DEFAULT_APPEARANCE = [47, 68, 65]; // = '/DA'
WriterUtil.INKLIST = [47, 73, 110, 107, 76, 105, 115, 116]; // = '/InkList'
WriterUtil.RC = [47, 82, 67]; // = '/RC'
WriterUtil.CREATION_DATE = [47, 67, 114, 101, 97, 116, 105, 111, 110, 68, 97, 116, 101]; // = '/CreationDate'
WriterUtil.SUBJ = [47, 83, 117, 98, 106]; // = '/Subj'
WriterUtil.TRAILER = [116, 114, 97, 105, 108, 101, 114]; // = 'trailer'
WriterUtil.SIZE = [47, 83, 105, 122, 101]; // = '/Size'
WriterUtil.ROOT = [47, 82, 111, 111, 116]; // = '/Root'
WriterUtil.PREV = [47, 80, 114, 101, 118]; // ='/Prev'
WriterUtil.STARTXREF = [115, 116, 97, 114, 116, 120, 114, 101, 102]; // = 'startxref'
WriterUtil.EOF = [37, 37, 69, 79, 70]; // = '%%EOF'
WriterUtil.TRUE = [116, 114, 117, 101]; // = 'true'
WriterUtil.XREF = [120, 114, 101, 102]; // = 'xref'
WriterUtil.TEXT_JUSTIFICATION = [47, 81]; // = '/Q'
WriterUtil.DEFAULT_STYLE_STRING = [47, 68, 83]; // = '/DS'
WriterUtil.DIFFERENCE_RECTANGLE = [47, 82, 68]; // = '/RD'
WriterUtil.IT = [47, 73, 84]; // = '/IT'
WriterUtil.LINE_ENDING = [47, 76, 69]; // = '/LE'
WriterUtil.CALLOUT_LINE = [47, 67, 76]; // = '/CL'
WriterUtil.QUADPOINTS = [47, 81, 117, 97, 100, 80, 111, 105, 110, 116, 115]; // = '/QuadPoints'
WriterUtil.VERTICES = [47, 86, 101, 114, 116, 105, 99, 101, 115]; // = '/Vertices'
WriterUtil.NAME = [47, 78, 97, 109, 101]; // = '/Name'
WriterUtil.DRAFT = [47, 68, 114, 97, 102, 116]; // = '/Draft'
WriterUtil.SY = [47, 83, 121]; // = '/Sy'
WriterUtil.P = 80;
//# sourceMappingURL=writer-util.js.map