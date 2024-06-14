const { Router } = require('express');

const notesRoutes = Router();

const NotesController = require('../controllers/NotesController.js');
const notesController = new NotesController();

const NotesMiddleware = require('../middlewares/NotesMiddleware.js');
const notesMiddleware = new NotesMiddleware();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated.js');

notesRoutes.use(ensureAuthenticated);

notesRoutes.get('/', notesController.index);
notesRoutes.get('/:id', notesMiddleware.singleNoteCheck, notesController.show);
notesRoutes.post('/', notesMiddleware.noteCreateCheck, notesController.create);
notesRoutes.delete('/:id', notesMiddleware.singleNoteCheck, notesController.delete);
module.exports = notesRoutes;