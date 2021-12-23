"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotation_types_1 = require("./annotation_types");
const annotation_errors_1 = require("./annotation_errors");
const writer_util_1 = require("../writer-util");
var PolygonPolyLineIntent;
(function (PolygonPolyLineIntent) {
    PolygonPolyLineIntent[PolygonPolyLineIntent["PolygonCloud"] = 0] = "PolygonCloud";
    PolygonPolyLineIntent[PolygonPolyLineIntent["PolyLineDimension"] = 1] = "PolyLineDimension";
    PolygonPolyLineIntent[PolygonPolyLineIntent["PolygonDimension"] = 2] = "PolygonDimension";
})(PolygonPolyLineIntent = exports.PolygonPolyLineIntent || (exports.PolygonPolyLineIntent = {}));
class PolygonPolyLineAnnotationObj extends annotation_types_1.MarkupAnnotationObj {
    constructor() {
        super();
        this.vertices = [];
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
        ret = ret.concat(writer_util_1.WriterUtil.VERTICES);
        ret.push(writer_util_1.WriterUtil.SPACE);
        ret = ret.concat(writer_util_1.WriterUtil.writeNumberArray(this.vertices));
        ret.push(writer_util_1.WriterUtil.SPACE);
        return ret;
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.fill) {
            errorList = errorList.concat(this.checkColor(this.fill));
        }
        if (!this.vertices || this.vertices.length == 0) {
            errorList.push(new annotation_errors_1.InvalidVerticesError("No vertices provided"));
        }
        if (this.vertices.length % 2 !== 0) {
            errorList.push(new annotation_errors_1.InvalidVerticesError("number of vertices must be an even number"));
        }
        if (enact) {
            for (let error of errorList) {
                throw error;
            }
        }
        return errorList;
    }
}
exports.PolygonPolyLineAnnotationObj = PolygonPolyLineAnnotationObj;
class PolyLineAnnotationObj extends PolygonPolyLineAnnotationObj {
    constructor() {
        super();
        this.lineEndingStyles = [];
        this.type = "/PolyLine";
        this.type_encoded = [47, 80, 111, 108, 121, 76, 105, 110, 101]; // '/PolyLine
    }
    writeAnnotationObject(cryptoInterface) {
        let ret = super.writeAnnotationObject(cryptoInterface);
        if (this.lineEndingStyles && this.lineEndingStyles.length >= 2) {
            ret = ret.concat(writer_util_1.WriterUtil.LINE_ENDING);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret.push(writer_util_1.WriterUtil.ARRAY_START);
            ret = ret.concat(this.convertLineEndingStyle(this.lineEndingStyles[0]));
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(this.convertLineEndingStyle(this.lineEndingStyles[1]));
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret.push(writer_util_1.WriterUtil.ARRAY_END);
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        return ret;
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/PolyLine") {
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
exports.PolyLineAnnotationObj = PolyLineAnnotationObj;
class PolygonAnnotationObj extends PolygonPolyLineAnnotationObj {
    constructor() {
        super();
        this.type = "/Polygon";
        this.type_encoded = [47, 80, 111, 108, 121, 103, 111, 110]; // = '/Polygon
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/Polygon") {
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
exports.PolygonAnnotationObj = PolygonAnnotationObj;
//# sourceMappingURL=polygon_polyline_annotation.js.map