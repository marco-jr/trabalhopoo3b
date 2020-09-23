import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import PlaceController from '../controllers/PlaceController';
import uploads from '../upload';

const routes = Router();

routes.post('/sessions', AuthController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post(
  '/events/picture',
  uploads.single('picture'),
  PlaceController.upload,
);
routes.post('/events', PlaceController.store);
routes.get('/events', PlaceController.index);
routes.delete('/events/:id', PlaceController.delete);

export default routes;
