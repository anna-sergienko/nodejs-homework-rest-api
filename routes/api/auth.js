const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, checkBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", checkBody, validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", checkBody, validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
