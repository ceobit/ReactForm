const router = require('express').Router();

const routerUsers = require('./users');
const routerAuth = require('./auth');
const routerForm = require('./form');

const auth = require('../middlewares/auth');

router.use(routerAuth);
router.use(auth, routerUsers);
router.use(auth, routerForm);

module.exports = router;
