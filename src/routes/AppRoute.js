import App from '../components/App';
import AdminRoute from './AdminRoute';
import CreateRoute from './CreateRoute';
import ViewerRoute from './ViewerRoute';

export default {
  path: '/',
  component: App,
  indexRoute: ViewerRoute,
  childRoutes: [
    AdminRoute,
    CreateRoute
  ]
};
