"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJsonSuccess = exports.httpStatus = void 0;
exports.httpStatus = {
    OK: { statusCode: 200, message: 'Success' },
    CREATED: { statusCode: 201, message: 'Resource created successfully' },
    BAD_REQUEST: { statusCode: 400, message: 'Bad request' },
    UNAUTHORIZED: { statusCode: 401, message: 'Unauthorized' },
    FORBIDDEN: { statusCode: 403, message: 'Forbidden' },
    NOT_FOUND: { statusCode: 404, message: 'Resource not found' },
    SERVER_ERROR: { statusCode: 500, message: 'Internal server error' },
};
const sendJsonSuccess = (res, data, statusCode = 200, message = 'Success') => {
    res.status(200).json({
        statusCode,
        message,
        data
    });
};
exports.sendJsonSuccess = sendJsonSuccess;
//# sourceMappingURL=response.helper.js.map