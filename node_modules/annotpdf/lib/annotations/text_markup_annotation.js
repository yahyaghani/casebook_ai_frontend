"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotation_types_1 = require("./annotation_types");
const annotation_errors_1 = require("./annotation_errors");
const writer_util_1 = require("../writer-util");
class TextMarkupAnnotationObj extends annotation_types_1.MarkupAnnotationObj {
    constructor() {
        super(...arguments);
        this.quadPoints = [];
    }
    writeAnnotationObject(cryptoInterface) {
        let ret = super.writeAnnotationObject(cryptoInterface);
        ret = ret.concat(writer_util_1.WriterUtil.QUADPOINTS);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.writeNumberArray(this.quadPoints));
        ret.push(writer_util_1.WriterUtil.SPACE);
        return ret;
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (errorList.length === 1 && errorList[0] instanceof annotation_errors_1.InvalidRectError) {
            if (this.quadPoints && this.quadPoints.length > 0) {
                this.rect = this.extractRectFromQuadPoints(this.quadPoints);
                errorList = this.checkRect(4, this.rect);
            }
        }
        if (!this.quadPoints || this.quadPoints.length === 0) {
            let rect = this.rect;
            this.quadPoints = [rect[0], rect[3], rect[2], rect[3], rect[0], rect[1], rect[2], rect[1]];
        }
        errorList = errorList.concat(this.checkQuadPoints(this.quadPoints));
        if (enact) {
            for (let error of errorList) {
                throw error;
            }
        }
        return errorList;
    }
    /**
     * Extracts the rectangular hull from a quadPoint definition
     * */
    extractRectFromQuadPoints(quadPoints) {
        let x_values = quadPoints.filter((element, index) => index % 2 === 0);
        let y_values = quadPoints.filter((element, index) => index % 2 !== 0);
        return [Math.min(...x_values), Math.min(...y_values), Math.max(...x_values), Math.max(...y_values)];
    }
    /**
     * Checks the 'quadPoints' parameter
     * */
    checkQuadPoints(quadPoints) {
        let errorList = [];
        if (quadPoints.length % 8 !== 0)
            errorList.push(new annotation_errors_1.InvalidQuadPointError(`Quadpoints array has length ${quadPoints.length} but must be a multiple of 8`));
        quadPoints.forEach((a) => {
            if ('number' !== typeof a)
                errorList.push(new annotation_errors_1.InvalidQuadPointError("Quadpoint " + quadPoints + " has invalid entry: " + a));
        });
        return errorList;
    }
}
exports.TextMarkupAnnotationObj = TextMarkupAnnotationObj;
class HighlightAnnotationObj extends TextMarkupAnnotationObj {
    constructor() {
        super();
        this.type = "/Highlight";
        this.type_encoded = [47, 72, 105, 103, 104, 108, 105, 103, 104, 116]; // = '/Highlight'
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/Highlight") {
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
exports.HighlightAnnotationObj = HighlightAnnotationObj;
class UnderlineAnnotationObj extends TextMarkupAnnotationObj {
    constructor() {
        super();
        this.type = "/Underline";
        this.type_encoded = [47, 85, 110, 100, 101, 114, 108, 105, 110, 101]; // = '/Underline'
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/Underline") {
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
exports.UnderlineAnnotationObj = UnderlineAnnotationObj;
class SquigglyAnnotationObj extends TextMarkupAnnotationObj {
    constructor() {
        super();
        this.type = "/Squiggly";
        this.type_encoded = [47, 83, 113, 117, 105, 103, 103, 108, 121]; // = '/Squiggly'
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/Squiggly") {
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
exports.SquigglyAnnotationObj = SquigglyAnnotationObj;
class StrikeOutAnnotationObj extends TextMarkupAnnotationObj {
    constructor() {
        super();
        this.type = "/StrikeOut";
        this.type_encoded = [47, 83, 116, 114, 105, 107, 101, 79, 117, 116]; // = '/StrikeOut'
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/StrikeOut") {
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
exports.StrikeOutAnnotationObj = StrikeOutAnnotationObj;
//# sourceMappingURL=text_markup_annotation.js.map