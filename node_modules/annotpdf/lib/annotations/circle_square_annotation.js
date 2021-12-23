"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotation_types_1 = require("./annotation_types");
const annotation_errors_1 = require("./annotation_errors");
const writer_util_1 = require("../writer-util");
class CircleSquareAnnotationObj extends annotation_types_1.MarkupAnnotationObj {
    constructor() {
        super();
        this.differenceRectangle = [];
    }
    writeAnnotationObject(cryptoInterface) {
        let ret = super.writeAnnotationObject(cryptoInterface);
        if (this.fill) {
            let fill = this.fill;
            if (fill.r > 1)
                fill.r /= 255;
            if (fill.g > 1)
                fill.g /= 255;
            if (fill.b > 1)
                fill.b /= 255;
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(writer_util_1.WriterUtil.FILL);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(writer_util_1.WriterUtil.writeNumberArray([fill.r, fill.g, fill.b]));
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
        if (this.fill) {
            errorList = errorList.concat(this.checkColor(this.fill));
        }
        if (enact) {
            for (let error of errorList) {
                throw error;
            }
        }
        return errorList;
    }
}
exports.CircleSquareAnnotationObj = CircleSquareAnnotationObj;
class CircleAnnotationObj extends CircleSquareAnnotationObj {
    constructor() {
        super();
        this.type = "/Circle";
        this.type_encoded = [47, 67, 105, 114, 99, 108, 101]; // = '/Circle'
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/Circle") {
            errorList.push(new annotation_errors_1.InvalidAnnotationTypeError(`Invalid annotation type ${this.type}`));
        }
        if (enact) {
            for (let error of errorList) {
                throw error;
            }
        }
        return errorList;
    }
}
exports.CircleAnnotationObj = CircleAnnotationObj;
class SquareAnnotationObj extends CircleSquareAnnotationObj {
    constructor() {
        super();
        this.type = "/Square";
        this.type_encoded = [47, 83, 113, 117, 97, 114, 101]; // = '/Square'
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/Square") {
            errorList.push(new annotation_errors_1.InvalidAnnotationTypeError(`Invalid annotation type ${this.type}`));
        }
        if (enact) {
            for (let error of errorList) {
                throw error;
            }
        }
        return errorList;
    }
}
exports.SquareAnnotationObj = SquareAnnotationObj;
//# sourceMappingURL=circle_square_annotation.js.map