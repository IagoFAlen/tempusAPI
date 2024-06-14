const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload')

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const UsersController = require('../controllers/UsersController');
const usersController = new UsersController();

const UserAvatarController = require('../controllers/UserAvatarController.js');
const userAvatarController = new UserAvatarController();


const UsersMiddleware = require('../middlewares/UsersMiddleware.js');
const usersMiddleware = new UsersMiddleware();

const ensureAuthenticated = require('../middlewares/ensureAuthenticated.js');

//usersRoutes.use(usersMiddleware.usersParamCheck);

usersRoutes.post('/', usersMiddleware.userCreateCheck, usersController.create);
usersRoutes.get('/', usersController.index);
usersRoutes.put('/', usersMiddleware.userUpdateCheck, ensureAuthenticated, usersController.update);
usersRoutes.delete('/', ensureAuthenticated, usersController.delete);
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

module.exports = usersRoutes;