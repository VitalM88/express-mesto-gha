const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const {
    name, link,
  } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректные данные карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка с id не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный id карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка с id не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный id карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка с id не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Некорректный id карточки' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};
