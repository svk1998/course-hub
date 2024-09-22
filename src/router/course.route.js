const { Router } = require("express");
const courseRouter = Router();
const { z } = require("zod");
const { courseModel, purchaseModel } = require("../db/modals");

courseRouter.post("/register", async function (req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const creatorId = req.userId;

    const zodSchema = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        imageUrl: z.string().url(),
    })

    try {
        const parsedData = await zodSchema.safeParse(req.body);

        if (parsedData.success) {
            await courseModel.create({
                title: title,
                description: description,
                price: price,
                imageUrl: imageUrl,
                creatorId: creatorId
            })
            res.status(200).json({
                message: "Course registered successfully"
            })
        }
        else {
            throw new Error("Some issue in registering new courses");
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

courseRouter.post("/purchase", async function (req, res) {
    // you would expect the user to pay you money
    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        await purchaseModel.create({
            userId: userId,
            courseId: courseId
        })
        res.status(200).json({
            message: "Course purchaged successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

courseRouter.get("/preview", async function (req, res) {
    try {
        const resp = await courseModel.find();
        res.status(200).json({
            data: resp
        })
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

module.exports = {
    courseRouter: courseRouter
}