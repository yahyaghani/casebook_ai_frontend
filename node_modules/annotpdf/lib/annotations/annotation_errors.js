"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidAnnotationTypeError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidAnnotationTypeError";
    }
}
exports.InvalidAnnotationTypeError = InvalidAnnotationTypeError;
class InvalidOpacityError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidOpacityError";
    }
}
exports.InvalidOpacityError = InvalidOpacityError;
class InvalidColorError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidColorError";
    }
}
exports.InvalidColorError = InvalidColorError;
class ColorOutOfRangeError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "ColorOutOfRangeError";
    }
}
exports.ColorOutOfRangeError = ColorOutOfRangeError;
class InvalidReferencePointerError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidReferencePointerError";
    }
}
exports.InvalidReferencePointerError = InvalidReferencePointerError;
class InvalidDateError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidDateError";
    }
}
exports.InvalidDateError = InvalidDateError;
class InvalidRectError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidRectError";
    }
}
exports.InvalidRectError = InvalidRectError;
class InvalidIDError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidIDError";
    }
}
exports.InvalidIDError = InvalidIDError;
class InvalidStateError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidStateError";
    }
}
exports.InvalidStateError = InvalidStateError;
class InvalidQuadPointError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidQuadPointError";
    }
}
exports.InvalidQuadPointError = InvalidQuadPointError;
class InvalidVerticesError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "InvalidVerticesError";
    }
}
exports.InvalidVerticesError = InvalidVerticesError;
//# sourceMappingURL=annotation_errors.js.map