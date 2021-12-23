"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const annotation_errors_1 = require("./annotation_errors");
const writer_util_1 = require("../writer-util");
var LineEndingStyle;
(function (LineEndingStyle) {
    LineEndingStyle[LineEndingStyle["Square"] = 0] = "Square";
    LineEndingStyle[LineEndingStyle["Circle"] = 1] = "Circle";
    LineEndingStyle[LineEndingStyle["Diamond"] = 2] = "Diamond";
    LineEndingStyle[LineEndingStyle["OpenArrow"] = 3] = "OpenArrow";
    LineEndingStyle[LineEndingStyle["ClosedArrow"] = 4] = "ClosedArrow";
    LineEndingStyle[LineEndingStyle["Butt"] = 5] = "Butt";
    LineEndingStyle[LineEndingStyle["ROpenArrow"] = 6] = "ROpenArrow";
    LineEndingStyle[LineEndingStyle["RClosedArrow"] = 7] = "RClosedArrow";
    LineEndingStyle[LineEndingStyle["Slash"] = 8] = "Slash";
    LineEndingStyle[LineEndingStyle["None"] = 9] = "None";
})(LineEndingStyle = exports.LineEndingStyle || (exports.LineEndingStyle = {}));
var BorderStyles;
(function (BorderStyles) {
    BorderStyles[BorderStyles["Solid"] = 0] = "Solid";
    BorderStyles[BorderStyles["Dashed"] = 1] = "Dashed";
    BorderStyles[BorderStyles["Beveled"] = 2] = "Beveled";
    BorderStyles[BorderStyles["Inset"] = 3] = "Inset";
    BorderStyles[BorderStyles["Underline"] = 4] = "Underline";
})(BorderStyles = exports.BorderStyles || (exports.BorderStyles = {}));
class BaseAnnotationObj {
    constructor() {
        this.object_id = undefined; // an unused object id
        this.is_deleted = false; // internal flag to determine whether the annotation was deleted
        this.page = -1;
        this.pageReference = undefined; // The reference to the page object to which the annotation is added
        this.type = "";
        this.type_encoded = [];
        this.rect = [];
        this.contents = "";
        this.id = ""; // /NM
        this.updateDate = ""; // /M
    }
    writeAnnotationPreamble() {
        let ret = writer_util_1.WriterUtil.writeReferencePointer(this.object_id);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.OBJ);
        ret.push(writer_util_1.WriterUtil.CR);
        ret.push(writer_util_1.WriterUtil.LF);
        ret = ret.concat(writer_util_1.WriterUtil.DICT_START);
        ret = ret.concat(writer_util_1.WriterUtil.TYPE_ANNOT);
        ret.push(writer_util_1.WriterUtil.SPACE);
        return ret;
    }
    writeAnnotationObject(cryptoInterface) {
        let ret = [];
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.PAGE_REFERENCE);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.writeReferencePointer(this.pageReference.object_id, true));
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.SUBTYPE);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(this.type_encoded);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.RECT);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.writeNumberArray(this.rect));
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.CONTENTS);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret.push(writer_util_1.WriterUtil.BRACKET_START);
        ret = ret.concat(Array.from(util_1.Util.escapeString(cryptoInterface.encrypt(new Uint8Array(util_1.Util.convertStringToAscii(this.contents)), this.object_id))));
        ret.push(writer_util_1.WriterUtil.BRACKET_END);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.ID);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret.push(writer_util_1.WriterUtil.BRACKET_START);
        ret = ret.concat(Array.from(util_1.Util.escapeString(cryptoInterface.encrypt(new Uint8Array(util_1.Util.convertStringToAscii(this.id)), this.object_id))));
        ret.push(writer_util_1.WriterUtil.BRACKET_END);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.UPDATE_DATE);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret.push(writer_util_1.WriterUtil.BRACKET_START);
        ret = ret.concat(Array.from(util_1.Util.escapeString(cryptoInterface.encrypt(new Uint8Array(util_1.Util.convertStringToAscii(this.updateDate)), this.object_id))));
        ret.push(writer_util_1.WriterUtil.BRACKET_END);
        ret.push(writer_util_1.WriterUtil.SPACE);
        if (this.annotationFlags) {
            let flags_value = this.encodeAnnotationFlags();
            ret = ret.concat(writer_util_1.WriterUtil.FLAG);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(util_1.Util.convertNumberToCharArray(flags_value));
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        if (this.border) {
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(writer_util_1.WriterUtil.BORDER);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(writer_util_1.WriterUtil.writeNumberArray([this.border.horizontal_corner_radius || 0, this.border.vertical_corner_radius || 0, this.border.border_width || 1]));
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        if (this.color) {
            if (this.color.r > 1)
                this.color.r /= 255;
            if (this.color.g > 1)
                this.color.g /= 255;
            if (this.color.b > 1)
                this.color.b /= 255;
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(writer_util_1.WriterUtil.COLOR);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(writer_util_1.WriterUtil.writeNumberArray([this.color.r, this.color.g, this.color.b]));
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        if (this.raw_parameters && this.raw_parameters.length > 0) {
            for (let i of this.raw_parameters) {
                ret.push(writer_util_1.WriterUtil.SPACE);
                ret = ret.concat(i);
                ret.push(writer_util_1.WriterUtil.SPACE);
            }
        }
        return ret;
    }
    convertLineEndingStyle(lne) {
        switch (lne) {
            case LineEndingStyle.Square:
                return util_1.Util.convertStringToAscii("/Square");
            case LineEndingStyle.Circle:
                return util_1.Util.convertStringToAscii("/Circle");
            case LineEndingStyle.Diamond:
                return util_1.Util.convertStringToAscii("/Diamond");
            case LineEndingStyle.OpenArrow:
                return util_1.Util.convertStringToAscii("/OpenArrow");
            case LineEndingStyle.ClosedArrow:
                return util_1.Util.convertStringToAscii("/ClosedArrow");
            case LineEndingStyle.Butt:
                return util_1.Util.convertStringToAscii("/Butt");
            case LineEndingStyle.ROpenArrow:
                return util_1.Util.convertStringToAscii("/ROpenArrow");
            case LineEndingStyle.RClosedArrow:
                return util_1.Util.convertStringToAscii("/RClosedArrow");
            case LineEndingStyle.Slash:
                return util_1.Util.convertStringToAscii("/Slash");
            default:
                return util_1.Util.convertStringToAscii("/None");
        }
    }
    writeAnnotationPostamble() {
        let ret = writer_util_1.WriterUtil.DICT_END;
        ret.push(writer_util_1.WriterUtil.CR);
        ret.push(writer_util_1.WriterUtil.LF);
        ret = ret.concat(writer_util_1.WriterUtil.ENDOBJ);
        ret.push(writer_util_1.WriterUtil.CR);
        ret.push(writer_util_1.WriterUtil.LF);
        return ret;
    }
    encodeAnnotationFlags() {
        if (!this.annotationFlags) {
            return 0;
        }
        let val = 0;
        if (this.annotationFlags.invisible) {
            val |= 1;
        }
        if (this.annotationFlags.hidden) {
            val |= 2;
        }
        if (this.annotationFlags.print) {
            val |= 4;
        }
        if (this.annotationFlags.noZoom) {
            val |= 8;
        }
        if (this.annotationFlags.noRotate) {
            val |= 16;
        }
        if (this.annotationFlags.noView) {
            val |= 32;
        }
        if (this.annotationFlags.readOnly) {
            val |= 64;
        }
        if (this.annotationFlags.locked) {
            val |= 128;
        }
        if (this.annotationFlags.toggleNoView) {
            val |= 256;
        }
        if (this.annotationFlags.lockedContents) {
            val |= 512;
        }
        return val;
    }
    /**
     * If enact is true, the error will be thrown directly, otherwise the errors are collected
     * and returned as error list.
     * */
    validate(enact = true) {
        let errorList = this.checkRect(4, this.rect);
        errorList = errorList.concat(this.checkReferencePointer(this.object_id));
        if (!this.pageReference || typeof this.pageReference !== 'object') {
            errorList.push(new annotation_errors_1.InvalidReferencePointerError("Inalid page reference"));
        }
        let res = this.checkDate(this.updateDate);
        if (res[1]) {
            this.updateDate = res[1];
        }
        errorList = errorList.concat(res[0]);
        errorList = errorList.concat(this.checkColor(this.color));
        if (!this.id || this.id === "") {
            errorList.push(new annotation_errors_1.InvalidIDError("Invalid ID provided"));
        }
        if (enact) {
            for (let error of errorList) {
                throw error;
            }
        }
        return errorList;
    }
    checkColor(color) {
        let errorList = [];
        if (!color) {
            return errorList;
        }
        if (!(color && "r" in color && "g" in color && "b" in color)) {
            errorList.push(new annotation_errors_1.InvalidColorError("Not {r: <r>, g: <g>, b: <b>}"));
        }
        if (color.r > 255 || color.r < 0) {
            errorList.push(new annotation_errors_1.ColorOutOfRangeError("Red value out of range"));
        }
        if (color.g > 255 || color.g < 0) {
            errorList.push(new annotation_errors_1.ColorOutOfRangeError("Green value out of range"));
        }
        if (color.b > 255 && color.b < 0) {
            errorList.push(new annotation_errors_1.ColorOutOfRangeError("Blue value out of range"));
        }
        return errorList;
    }
    checkReferencePointer(ptr) {
        let errorList = [];
        if (!(ptr && "obj" in ptr && ptr.obj >= 0 && "generation" in ptr && ptr.generation >= 0)) {
            errorList.push(new annotation_errors_1.InvalidReferencePointerError("Invalid reference pointer"));
        }
        return errorList;
    }
    checkDate(date) {
        if (typeof date === 'string') {
            return [[], date];
        }
        let errorList = [];
        let ret_val = undefined;
        try {
            ret_val = util_1.Util.convertDateToPDFDate(date);
        }
        catch (e) {
            errorList.push(new annotation_errors_1.InvalidDateError("Invalid update date provided"));
        }
        return [errorList, ret_val];
    }
    checkRect(nr, rect) {
        let errorList = [];
        if (!Array.isArray(rect)) {
            errorList.push(new annotation_errors_1.InvalidRectError("invalid rect parameter"));
        }
        if (rect.length !== nr) {
            errorList.push(new annotation_errors_1.InvalidRectError("Rect has invalid number of entries: " + rect + " has " + rect.length + " entries, but should have " + nr + " entries"));
        }
        rect.forEach((a) => {
            if ('number' !== typeof a) {
                errorList.push(new annotation_errors_1.InvalidRectError("Rect " + rect + " has invalid entry: " + a));
            }
        });
        return errorList;
    }
}
exports.BaseAnnotationObj = BaseAnnotationObj;
var ReplyTypes;
(function (ReplyTypes) {
    ReplyTypes[ReplyTypes["Reply"] = 0] = "Reply";
    ReplyTypes[ReplyTypes["Group"] = 1] = "Group";
})(ReplyTypes = exports.ReplyTypes || (exports.ReplyTypes = {}));
class MarkupAnnotationObj extends BaseAnnotationObj {
    constructor() {
        super();
        this.author = "";
        this.opacity = 1; // /CA
        this.subject = "";
    }
    writeAnnotationObject(cryptoInterface) {
        let ret = super.writeAnnotationObject(cryptoInterface);
        ret = ret.concat(writer_util_1.WriterUtil.AUTHOR);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret.push(writer_util_1.WriterUtil.BRACKET_START);
        ret = ret.concat(Array.from(util_1.Util.escapeString(cryptoInterface.encrypt(new Uint8Array(util_1.Util.convertStringToAscii(this.author)), this.object_id))));
        ret.push(writer_util_1.WriterUtil.BRACKET_END);
        ret.push(writer_util_1.WriterUtil.SPACE);
        if (this.opacity) {
            ret = ret.concat(writer_util_1.WriterUtil.OPACITY);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(util_1.Util.convertNumberToCharArray(this.opacity));
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        if (this.creationDate) {
            ret = ret.concat(writer_util_1.WriterUtil.CREATION_DATE);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret.push(writer_util_1.WriterUtil.BRACKET_START);
            ret = ret.concat(Array.from(util_1.Util.escapeString(cryptoInterface.encrypt(new Uint8Array(util_1.Util.convertStringToAscii(this.creationDate)), this.object_id))));
            ret.push(writer_util_1.WriterUtil.BRACKET_END);
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        if (this.subject !== "") {
            ret = ret.concat(writer_util_1.WriterUtil.SUBJ);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret.push(writer_util_1.WriterUtil.BRACKET_START);
            ret = ret.concat(Array.from(util_1.Util.escapeString(cryptoInterface.encrypt(new Uint8Array(util_1.Util.convertStringToAscii(this.subject)), this.object_id))));
            ret.push(writer_util_1.WriterUtil.BRACKET_END);
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        if (this.richtextString) {
            ret = ret.concat(writer_util_1.WriterUtil.RC);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret.push(writer_util_1.WriterUtil.BRACKET_START);
            ret = ret.concat(Array.from(util_1.Util.escapeString(cryptoInterface.encrypt(new Uint8Array(util_1.Util.convertStringToAscii(this.richtextString)), this.object_id))));
            ret.push(writer_util_1.WriterUtil.BRACKET_END);
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        return ret;
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.opacity) {
            try {
                this.opacity = +this.opacity;
            }
            catch (e) {
                errorList.push(new annotation_errors_1.InvalidOpacityError("Opacity no numerical value"));
            }
            if (this.opacity < 0 || this.opacity > 255) {
                errorList.push(new annotation_errors_1.InvalidOpacityError("Opacity out of range"));
            }
        }
        if (this.creationDate) {
            let res = this.checkDate(this.creationDate);
            this.creationDate = res[1];
            errorList = errorList.concat(res[0]);
        }
        if (enact) {
            for (let error of errorList) {
                throw error;
            }
        }
        return errorList;
    }
}
exports.MarkupAnnotationObj = MarkupAnnotationObj;
//# sourceMappingURL=annotation_types.js.map