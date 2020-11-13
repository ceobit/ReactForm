const { NotFoundError, Forbidden } = require("../errors/errors");
const {
  DataNotFoundMessage,
  NotAccessMessage,
  DataDeletedMessage,
} = require("../errors/errorsMessages");

const Forms = require("../models/form");
const { keys } = require("../data");

module.exports.createForm = (req, res, next) => {
  const { ...keys } = req.body;

  Forms.create({ ...keys, owner: req.user._id })
    .then((form) => res.send({ data: form }))
    .catch(next);
};

module.exports.getForms = (req, res, next) => {
  Forms.find({ owner: req.user._id })
    .orFail(() => new NotFoundError(DataNotFoundMessage))
    .then((form) => res.send({ data: form }))
    .catch(next);
};

module.exports.getFormId = (req, res, next) => {
  const { formId } = req.params;

  Forms.findOne({ formNumber: formId })
    .orFail(() => new NotFoundError(DataNotFoundMessage))
    .then((form) => res.send({ data: form }))
    .catch(next);
};

module.exports.updateForm = (req, res, next) => {
  const { formId } = req.params;
  const { ...keys } = req.body;

  Forms.findOneAndUpdate({formNumber:formId},{ ...keys})
      .then((form) => res.send({ data: form }))
      .catch(next);
};
