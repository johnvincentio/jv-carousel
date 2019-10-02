
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ permission, authenticated, full, admin, path, render, location }) => {
	// console.log('PrivateRoute, path ', path, ' authenticated ', authenticated, ' location ', location);
	// console.log('permission :', permission, ': full ', full, ' admin ', admin);
	if (authenticated) {
		let allowed = false;
		switch (permission) {
			case 'full':
				if (full || admin) {
					allowed = true;
				}
				break;
			case 'admin':
				if (admin) {
					allowed = true;
				}
				break;
			case 'free':
				allowed = true;
				break;
			default:
		}
		return allowed ? (
			<Route path={path} render={render} />
		) : (
			<Route path={path} render={() => <Redirect to={{ pathname: '/dashboard', state: { from: location } }} />} />
		);
	}
	return <Route path={path} render={() => <Redirect to={{ pathname: '/signin', state: { from: location } }} />} />;
};

PrivateRoute.propTypes = {
	permission: PropTypes.oneOf(['free', 'full', 'admin']).isRequired,
	authenticated: PropTypes.bool.isRequired,
	render: PropTypes.func.isRequired,
	path: PropTypes.string.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired,
	full: PropTypes.bool.isRequired,
	admin: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	// console.log('mapStateToProps; state ', state);
	return {
		authenticated: state.user.authenticated,
		full: state.user.full,
		admin: state.user.admin
	};
}

export default connect(mapStateToProps)(PrivateRoute);
