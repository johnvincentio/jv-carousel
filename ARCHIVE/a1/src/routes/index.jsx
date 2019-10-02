
import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import SignedInRoute from './SignedInRoute';

import HomeMain from '../components/containers/HomeMain';

import MemberMain from '../components/containers/MemberMain';

import Logout from '../components/login/Logout';

const AppRoutes = () => (
	<Router>
		<Switch>
			<Route exact path="/" render={props => <HomeMain datatype="home" {...props} />} />

			<SignedInRoute path="/signin" render={props => <HomeMain datatype="login" {...props} />} />
			<Route path="/signout" render={props => <Logout datatype="signout" {...props} />} />

			<Route exact path="/join" render={props => <HomeMain datatype="register" {...props} />} />
			<Route path="/join/:param" render={props => <HomeMain datatype="register" {...props} />} />
			<Route path="/user/register/:param/:param2" render={props => <HomeMain datatype="confirmation" {...props} />} />
			<Route
				path="/user/registered/success"
				render={props => <HomeMain datatype="confirmation-success" {...props} />}
			/>
			<Route path="/user/registered/failed" render={props => <HomeMain datatype="confirmation-failed" {...props} />} />

			<Route exact path="/reset-password" render={props => <HomeMain datatype="reset-password" {...props} />} />
			<Route
				exact
				path="/user/reset/update/:param/:param2"
				render={props => <HomeMain datatype="change-password" {...props} />}
			/>
			<Route
				path="/reset-password-confirmation"
				render={props => <HomeMain datatype="reset-password-confirmation" {...props} />}
			/>
			<Route
				path="/change-password-failed"
				render={props => <HomeMain datatype="change-password-failed" {...props} />}
			/>
			<Route
				exact
				path="/change-password-confirmation-success"
				render={props => <HomeMain datatype="change-password-confirmation-success" {...props} />}
			/>

			<Route path="/privacy-policy" render={props => <HomeMain datatype="privacy" {...props} />} />
			<Route path="/terms-of-service" render={props => <HomeMain datatype="terms" {...props} />} />

			<Route path="/contact" render={props => <HomeMain datatype="contact" {...props} />} />
			<Route path="/contact-confirmation" render={props => <HomeMain datatype="contact-confirmation" {...props} />} />

			<Redirect exact from="/dashboard" to="/starred" />
			<PrivateRoute permission="free" path="/starred" render={props => <MemberMain datatype="starred" {...props} />} />

			<Redirect exact from="/calendar" to="/calendar/all" />
			<PrivateRoute
				permission="free"
				path="/calendar/:param"
				render={props => <MemberMain datatype="calendar" {...props} />}
			/>

			<PrivateRoute permission="free" path="/goals" render={props => <MemberMain datatype="goals" {...props} />} />
			<PrivateRoute permission="free" path="/goal/:param" render={props => <MemberMain datatype="goal" {...props} />} />

			<PrivateRoute
				permission="free"
				path="/projects"
				render={props => <MemberMain datatype="projects" {...props} />}
			/>
			<PrivateRoute
				permission="free"
				path="/project/:param"
				render={props => <MemberMain datatype="project" {...props} />}
			/>

			<Redirect exact from="/tasks" to="/tasks/scheduled" />
			<PrivateRoute
				permission="free"
				path="/tasks/:param"
				render={props => <MemberMain datatype="tasks" {...props} />}
			/>

			<PrivateRoute permission="free" path="/task/:param" render={props => <MemberMain datatype="task" {...props} />} />

			<PrivateRoute permission="free" path="/tags" render={props => <MemberMain datatype="tags" {...props} />} />
			<PrivateRoute permission="free" path="/tag/:param" render={props => <MemberMain datatype="tags" {...props} />} />

			<Redirect exact from="/status" to="/status/started" />
			<PrivateRoute
				permission="free"
				path="/status/:param"
				render={props => <MemberMain datatype="status" {...props} />}
			/>

			<Redirect exact from="/priority" to="/priority/top" />
			<PrivateRoute
				permission="free"
				path="/priority/:param"
				render={props => <MemberMain datatype="priority" {...props} />}
			/>

			<PrivateRoute permission="full" path="/statistics" render={props => <MemberMain datatype="main" {...props} />} />

			<PrivateRoute
				permission="admin"
				path="/admin/users"
				render={props => <MemberMain datatype="admin-users" {...props} />}
			/>
			<PrivateRoute permission="admin" path="/admin/main" render={props => <MemberMain datatype="main" {...props} />} />

			<Redirect to="/" />
		</Switch>
	</Router>
);

export default AppRoutes;
