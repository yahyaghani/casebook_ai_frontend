export declare class InvalidAnnotationTypeError extends Error {
    message: string;
    constructor(message: string);
}
export declare class InvalidOpacityError extends Error {
    message: string;
    constructor(message: string);
}
export declare class InvalidColorError extends Error {
    message: string;
    constructor(message: string);
}
export declare class ColorOutOfRangeError extends Error {
    message: string;
    constructor(message: string);
}
export declare class InvalidReferencePointerError extends Error {
    message: string;
    constructor(message: string);
}
export declare class InvalidDateError extends Error {
    message: string;
    constructor(message: string);
}
export declare class InvalidRectError extends Error {
    message: string;
    constructor(message: string);
}
export declare class InvalidIDError extends Error {
    message: string;
    constructor(message: string);
}
export declare class InvalidStateError extends Error {
    message: string;
    constructor(message: string);
}
export declare class InvalidQuadPointError extends Error {
    message: string;
    constructor(message: string);
}
export declare class InvalidVerticesError extends Error {
    message: string;
    constructor(message: string);
}
export declare type ErrorList = (Error | ColorOutOfRangeError | InvalidReferencePointerError | InvalidDateError | InvalidRectError | InvalidIDError | InvalidColorError | InvalidOpacityError | InvalidAnnotationTypeError | InvalidStateError | InvalidQuadPointError | InvalidVerticesError)[];
