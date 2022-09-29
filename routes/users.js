const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../utils/patternUrl');

const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
router.get('/me', getMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).regex(/^https?:\/\/(www\.)?[a-zA-Z\d\\-]+\.[\w\-._~:\\/?#[\]@!$&'()*+,;=]+#?$/),
  }),
}), updateUserAvatar);

module.exports = router;
