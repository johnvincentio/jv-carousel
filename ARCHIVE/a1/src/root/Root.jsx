
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from '../components/App';
import NotFoundPage from '../components/NotFoundPage';

const PageOne = () => (<div>PageOne</div>);
const PageTwo = () => (
	<div>PageTwo</div>
);

const Root = () => (
	<div>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/one" component={PageOne} />
				<Route exact path="/two" component={PageTwo} />
				<Route component={NotFoundPage} />
			</Switch>
		</BrowserRouter>
	</div>
);

export default Root;
