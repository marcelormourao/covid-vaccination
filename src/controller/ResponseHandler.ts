import express = require("express");

export default (promise: Promise<any>, response: express.Response) => {
    promise
    .then(res => response.json(res))
    .catch(err => {
        response.status(400);
        response.json({"message":err.message});
    });
}