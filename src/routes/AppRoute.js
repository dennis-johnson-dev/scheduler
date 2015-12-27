import App from '../components/App';
import ViewerRoute from './ViewerRoute';
import AdminRoute from './AdminRoute';

export default {
  path: '/',
  component: App,
  childRoutes: [
    AdminRoute,
    ViewerRoute
  ]
};
