const routerForms = require('express').Router();
const { createForm, getForms, getFormId, updateForm } = require('../controllers/forms');

routerForms.post('/api/form', createForm);
routerForms.get('/api/form', getForms);
routerForms.get('/api/form/:formId', getFormId);
routerForms.post('/api/form/:formId', updateForm);

module.exports = routerForms;
