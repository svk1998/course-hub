const { Router } = require("express");
const { userModel } = require("../db/modals");
const userRouter = Router();
// const { z } = require("zod");
// const bcrypt = require("bcrypt");
// const { generateToken } = require("../services/token.service");

userRouter.get("/purchases", function (req, res) {
    res.json({
        message: "purchages endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}