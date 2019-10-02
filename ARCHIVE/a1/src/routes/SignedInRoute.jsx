
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const SignedInRoute = ({ authenticated, path, render, location }) => {
	// console.log('SignedInRoute, path ', path, ' authenticated ', authenticated, ' location ', location);
	if (!authenticated) {
		return <Route path={path} render={render} />;
	}
	return <Route path={path} render={() => <Redirect to={{ pathname: '/dashboard', state: { from: location } }} />} />;
};

SignedInRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	render: PropTypes.func.isRequired,
	path: PropTypes.string.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

function mapStateToProps(state) {
	// console.log('mapStateToProps; state ', state);
	return {
		authenticated: state.user.authenticated
	};
}

export default connect(mapStateToProps)(SignedInRoute);
