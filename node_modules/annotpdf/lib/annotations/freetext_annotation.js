"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotation_types_1 = require("./annotation_types");
const annotation_errors_1 = require("./annotation_errors");
const writer_util_1 = require("../writer-util");
const util_1 = require("../util");
var TextJustification;
(function (TextJustification) {
    TextJustification[TextJustification["Left"] = 0] = "Left";
    TextJustification[TextJustification["Centered"] = 1] = "Centered";
    TextJustification[TextJustification["Right"] = 2] = "Right";
})(TextJustification = exports.TextJustification || (exports.TextJustification = {}));
var FreeTextType;
(function (FreeTextType) {
    FreeTextType[FreeTextType["FreeText"] = 0] = "FreeText";
    FreeTextType[FreeTextType["FreeTextCallout"] = 1] = "FreeTextCallout";
    FreeTextType[FreeTextType["FreeTextTypeWriter"] = 2] = "FreeTextTypeWriter";
})(FreeTextType = exports.FreeTextType || (exports.FreeTextType = {}));
class FreeTextAnnotationObj extends annotation_types_1.MarkupAnnotationObj {
    constructor() {
        super();
        this.defaultAppearance = "/Invalid_font 9 Tf"; // /DA
        this.differenceRectangle = [];
        this.textJustification = TextJustification.Left; // /Q
        this.calloutLine = [];
        this.freeTextType = FreeTextType.FreeText;
        this.lineEndingStyle = annotation_types_1.LineEndingStyle.None;
        this.type = "/FreeText";
        this.type_encoded = [47, 70, 114, 101, 101, 84, 101, 120, 116]; // = '/FreeText'
    }
    convertJustification(just) {
        switch (just) {
            case TextJustification.Left:
                return 0;
            case TextJustification.Centered:
                return 1;
            case TextJustification.Right:
                return 2;
            default:
                return 0;
        }
    }
    convertFreeTextType(ft) {
        switch (ft) {
            case FreeTextType.FreeText:
                return util_1.Util.convertStringToAscii("/FreeText");
            case FreeTextType.FreeTextCallout:
                return util_1.Util.convertStringToAscii("/FreeTextCallout");
            case FreeTextType.FreeTextTypeWriter:
                return util_1.Util.convertStringToAscii("/FreeTextTypeWriter");
            default:
                return util_1.Util.convertStringToAscii("/FreeText");
        }
    }
    writeAnnotationObject(cryptoInterface) {
        let ret = super.writeAnnotationObject(cryptoInterface);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.DEFAULT_APPEARANCE);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret.push(writer_util_1.WriterUtil.BRACKET_START);
        ret = ret.concat(util_1.Util.convertStringToAscii(this.defaultAppearance));
        ret.push(writer_util_1.WriterUtil.BRACKET_END);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.TEXT_JUSTIFICATION);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(util_1.Util.convertNumberToCharArray(this.convertJustification(this.textJustification)));
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.IT);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(this.convertFreeTextType(this.freeTextType));
        ret.push(writer_util_1.WriterUtil.SPACE);
        if (this.calloutLine.length > 0) {
            ret = ret.concat(writer_util_1.WriterUtil.CALLOUT_LINE);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(writer_util_1.WriterUtil.writeNumberArray(this.calloutLine));
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        if (this.lineEndingStyle !== annotation_types_1.LineEndingStyle.None) {
            ret = ret.concat(writer_util_1.WriterUtil.LINE_ENDING);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(this.convertLineEndingStyle(this.lineEndingStyle));
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        if (this.defaultStyleString && this.defaultStyleString !== "") {
            ret = ret.concat(writer_util_1.WriterUtil.DEFAULT_STYLE_STRING);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret.push(writer_util_1.WriterUtil.BRACKET_START);
            ret = ret.concat(util_1.Util.convertStringToAscii(this.defaultStyleString));
            ret.push(writer_util_1.WriterUtil.BRACKET_END);
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        if (this.differenceRectangle && this.differenceRectangle.length > 0) {
            ret = ret.concat(writer_util_1.WriterUtil.DIFFERENCE_RECTANGLE);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(writer_util_1.WriterUtil.writeNumberArray(this.differenceRectangle));
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        return ret;
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/FreeText") {
            errorList.push(new annotation_errors_1.InvalidAnnotationTypeError(`Invalid annotation type ${this.type}`));
        }
        if (this.calloutLine && this.calloutLine.length > 0 && this.freeTextType !== FreeTextType.FreeTextCallout) {
            console.log("Warning: Callout line only relevant for free text type: 'Callout'");
        }
        if (enact) {
            for (let error of errorList) {
                throw error;
            }
        }
        return errorList;
    }
}
exports.FreeTextAnnotationObj = FreeTextAnnotationObj;
//# sourceMappingURL=freetext_annotation.js.map