const nav = [
	{ path: '/', index: 1, icon: 'dashboard.svg', exact: false, name: 'Login' },
	{ path: '/dashboard', index: 1, icon: 'dashboard.svg', exact: true, name: 'Dashboard' },
	{ path: '/app/my-social', index: 2, icon: 'folder.svg', exact: true, name: 'Apps' },
	{ path: '/app/user-facebook-data', index: 3, icon: 'app.svg', exact: true, name: 'Facebook Data' },
	{ path: '/testnet', index: 4, icon: 'testnet.svg', exact: true, name: 'Testnet' },
	{ path: '/profile', index: 4, icon: 'app.svg', exact: false, name: 'Profile' },

	// {
	//     path: '/app',
	//     icon: 'app.svg',
	//     name: "Apps",
	//     index: "sub1",
	//     childrens: [
	//         { path: '/app/encrypted-chat', index: 2, exact: true, name: "Encrypted Chat" },
	//         { path: '/app/my-social', index: 3, exact: true, name: "My Social" },
	//         { path: '/app/wholesome', index: 4, exact: true, name: "Wholesome" },
	//         { path: '/app/my-collections', index: 5, exact: true, name: "My Collections" },
	//         { path: '/app/content-mutual', index: 6, exact: true, name: "Content Mutual" },
	//         { path: '/app/recommendations', index: 7, exact: true, name: "Recommendations" }
	//     ]
	// },
	// {
	//     path: '/app',
	//     icon: 'folder.svg',
	//     name: "Personal Files",
	//     index: "sub2",
	//     childrens: [
	//         { path: '/personal-files/my-uploads', index: 8, exact: true, name: "My Uploads" },
	//         { path: '/personal-files/media', index: 9, exact: true, name: "Media" },
	//     ]
	// },
	// {
	//     path: '/digital-assets',
	//     icon: 'monitor.svg',
	//     name: "Digital Assets",
	//     index: "sub3",
	//     childrens: [
	//         { path: '/digital-assets/e-wallet', index: 10, exact: true, name: "E Wallet" },
	//         { path: '/digital-assets/transaction-history', index: 11, exact: true, name: "Transaction History" },
	//         { path: '/digital-assets/application-items', index: 12, exact: true, name: "Application Items" },
	//         { path: '/digital-assets/non-fungible-items', index: 13, exact: true, name: "Non Fungible Items" }
	//     ]
	// }
];

export default nav;
