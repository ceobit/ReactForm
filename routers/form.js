const routerForms = require('express').Router();
const { createForm, getForms, getFormId } = require('../controllers/forms');

routerForms.post('/form', createForm);
routerForms.get('/form', getForms);
routerForms.get('/form/:formId', getFormId);

module.exports = routerForms;
