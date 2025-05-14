import { body } from "express-validator";

export const registerValidator = [
  body("email").isEmail().withMessage("이메일 형식이 올바르지 않습니다."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("비밀번호는 최소 6자리 이상이어야 합니다."),
  body("name").notEmpty().withMessage("이름은 필수입니다."),
];

export const loginValidator = [
  body("email").isEmail().withMessage("이메일 형식이 올바르지 않습니다."),
  body("password").notEmpty().withMessage("비밀번호는 필수입니다."),
];

export const requestPasswordResetValidator = [
  body("email")
    .notEmpty()
    .withMessage("이메일은 필수입니다.")
    .isEmail()
    .withMessage("이메일 형식이 올바르지 않습니다."),
];

export const applyPasswordResetValidator = [
  body("email").notEmpty().withMessage("이메일은 필수입니다."),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("비밀번호는 최소 6자 이상이어야 합니다."),
];
