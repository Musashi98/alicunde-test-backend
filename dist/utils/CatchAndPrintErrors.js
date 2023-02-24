"use strict";
module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((e) => {
            console.log(e.message);
            next({ status: 500, message: e.message });
        });
    };
};
