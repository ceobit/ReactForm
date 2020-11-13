const routerForms = require('express').Router();
const { createForm, getForms, getFormId, updateForm } = require('../controllers/forms');

routerForms.post('/form', createForm);
routerForms.get('/form', getForms);
routerForms.get('/form/:formId', getFormId);
routerForms.post('/form/:formId', updateForm);

module.exports = routerForms;
