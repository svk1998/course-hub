require('dotenv').config();
const express = require('express');
const { userRouter } = require('./src/router/user.route');
const { courseRouter } = require('./src/router/course.route');
const { adminRouter } = require('./src/router/admin.route');
const { authRouter } = require('./src/router/auth.route');
const { auth } = require("./src/middleware/auth.middleware");
const config = require('./src/config');

const app = express();
app.use(express.json());

const API_PREFIX = '/api/v1'

app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/user`, auth, userRouter);
app.use(`${API_PREFIX}/admin`, auth, adminRouter);
app.use(`${API_PREFIX}/course`, auth, courseRouter);

app.listen(config.SERVER_PORT, () => {
    console.log(`App listening on ${config.SERVER_PORT}`);
});