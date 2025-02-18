const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, checkBody, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", checkBody, validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", checkBody, validateBody(schemas.loginSchema), ctrl.login);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
