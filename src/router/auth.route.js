const { Router } = require("express");
const { userModel, adminModel } = require("../db/modals");
const authRouter = Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { generateToken } = require("../services/token.service");

authRouter.post("/user/signup", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const zodSchema = z.object({
        email: z.string().min(5).email(),
        password: z.string().min(4, { message: "Password must be minimum 4 length" }),
        firstName: z.string(),
        lastName: z.string()
    })

    try {
        const parsedData = await zodSchema.safeParse(req.body);
        if (parsedData.success) {
            const hashedPassword = await bcrypt.hash(password, 5);

            const resp = await userModel.create({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName
            });

            if (resp) {
                res.status(200).json({
                    message: "You are signed up"
                })
            }
            else {
                throw new Error("Issue in signup")
            }
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

authRouter.post("/user/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const resp = await userModel.findOne({
            email: email
        })

        const isValidPassword = await bcrypt.compare(password, resp.password);

        if (isValidPassword) {
            const token = generateToken({
                userId: resp._id.toString()
            });

            res.status(200).json({
                message: "Sucessfully Signed In",
                token: token
            })
        } else {
            throw new Error("Password Invalid");
        }

    } catch (err) {
        res.status(403).json({
            error: err.message
        })
    }
})

authRouter.post("/admin/signup", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const zodSchema = z.object({
        email: z.string().min(5).email(),
        password: z.string().min(4, { message: "Password must be minimum 4 length" }),
        firstName: z.string(),
        lastName: z.string()
    })

    try {
        const parsedData = await zodSchema.safeParse(req.body);
        if (parsedData.success) {
            const hashedPassword = await bcrypt.hash(password, 5);

            const resp = await adminModel.create({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName
            });

            if (resp) {
                res.status(200).json({
                    message: "You are signed up"
                })
            }
            else {
                throw new Error("Issue in signup")
            }
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

authRouter.post("/admin/signin", async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const resp = await adminModel.findOne({
            email: email
        })

        const isValidPassword = await bcrypt.compare(password, resp.password);

        if (isValidPassword) {
            const token = generateToken({
                userId: resp._id.toString()
            });

            res.status(200).json({
                message: "Sucessfully Signed In",
                token: token
            })
        } else {
            throw new Error("Password Invalid");
        }

    } catch (err) {
        res.status(403).json({
            error: err.message
        })
    }
})

module.exports = {
    authRouter: authRouter
}