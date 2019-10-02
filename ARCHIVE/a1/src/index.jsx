
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { appTheme } from './themes/themes';

import Root from './root/Root';
import App from './components/App';

import { register } from './serviceWorker';

import configureStore from './store/configureStore';

// import { authUser } from './redux/actions/user.actions';

const store = configureStore();

// console.log(`NODE_ENV ${process.env.NODE_ENV}`);

/*
const token = localStorage.getItem('token');
if (token) {
	// console.log('*** found a token');
	store.dispatch(authUser(token));
}
*/

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<MuiThemeProvider theme={appTheme}>
			<CssBaseline />
			<Provider store={store}>
				<Root />
			</Provider>
		</MuiThemeProvider>,
		document.getElementById('root')
	);
});

register();

/*
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
*/

/*
document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
});
*/

/*
document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Router>
			<Root store={store} />
		</Router>,
		document.getElementById('root'),
	);
});
*/

/*
document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<Root />
		</Provider>,
		document.getElementById('root')
	);
});
*/

/*
document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
			<div className="devtools">
				<DevTools />
			</div>
		</Provider>,
		document.getElementById('root')
	);
});
*/
