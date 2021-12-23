"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotation_types_1 = require("./annotation_types");
const annotation_errors_1 = require("./annotation_errors");
const writer_util_1 = require("../writer-util");
class InkAnnotationObj extends annotation_types_1.MarkupAnnotationObj {
    constructor() {
        super();
        this.inkList = [];
        this.type = "/Ink";
        this.type_encoded = [47, 73, 110, 107]; // = '/Ink'
    }
    writeAnnotationObject(cryptoInterface) {
        let ret = super.writeAnnotationObject(cryptoInterface);
        if (this.inkList && this.inkList.length > 0) {
            ret = ret.concat(writer_util_1.WriterUtil.INKLIST);
            ret.push(writer_util_1.WriterUtil.SPACE);
            ret = ret.concat(writer_util_1.WriterUtil.writeNestedNumberArray(this.inkList));
            ret.push(writer_util_1.WriterUtil.SPACE);
        }
        return ret;
    }
    validate(enact = true) {
        let errorList = super.validate(false);
        if (this.type !== "/Ink") {
            errorList.push(new annotation_errors_1.InvalidAnnotationTypeError(`Invalid annotation type ${this.type}`));
        }
        if ('number' === typeof this.inkList[0]) {
            this.inkList = [this.inkList];
        }
        if (enact) {
            for (let error of errorList) {
                throw error;
            }
        }
        return errorList;
    }
}
exports.InkAnnotationObj = InkAnnotationObj;
//# sourceMappingURL=ink_annotation.js.map