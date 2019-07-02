import Dashboard from './views/Dashboard/dashboard';
import { ProfilePage } from './views/Profile';
import { AppsPage } from './views/Apps';
import { Login } from './views/Login';
import DummyDataComponent from './components/dummyDataComponent';
import TestNet from './views/Testnet/testnetPage';
import checkAuth from './components/Require_auth';

const routes = [
	{ path: '/', exact: true, name: 'Dashboard', component: checkAuth(Login) },
	{ path: '/dashboard', exact: true, name: 'Dashboard', component: checkAuth(Dashboard) },
	{ path: '/profile', exact: true, name: 'Profile', component: checkAuth(ProfilePage) },
	{ path: '/app/user-facebook-data', exact: true, name: 'Encrypted Chat', component: checkAuth(DummyDataComponent) },
	{ path: '/app/my-social', exact: true, name: 'My Social', component: checkAuth(AppsPage) },
	{ path: '/testnet', exact: true, name: 'Testnet', component: checkAuth(TestNet) },
	{ path: '/app/wholesome', exact: true, name: 'Wholesome', component: checkAuth(Dashboard) },
	{ path: '/app/my-collections', exact: true, name: 'My Collections', component: checkAuth(Dashboard) },
	{ path: '/app/content-mutual', exact: true, name: 'Content Mutual', component: checkAuth(Dashboard) },
	{ path: '/app/recommendations', exact: true, name: 'Recommendations', component: checkAuth(Dashboard) },
	{ path: '/personal-files/my-uploads', exact: true, name: 'My Uploads', component: checkAuth(Dashboard) },
	{ path: '/personal-files/media', exact: true, name: 'Media', component: checkAuth(Dashboard) },
	{ path: '/digital-assets/e-wallet', exact: true, name: 'E Wallet', component: checkAuth(Dashboard) },
	{ path: '/digital-assets/transaction-history', exact: true, name: 'Transaction History', component: checkAuth(Dashboard) },
	{ path: '/digital-assets/application-items', exact: true, name: 'Application Items', component: checkAuth(Dashboard) },
	{ path: '/digital-assets/non-fungible-items', exact: true, name: 'Non Fungible Items', component: checkAuth(Dashboard) },
];

export default routes;
