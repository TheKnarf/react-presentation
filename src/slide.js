import React, { cloneElement } from 'react';
import { connect } from 'react-redux';

const Slideset_ = ({ children, i, slideset }) => {
	return <div className="slideset" style={{ display: i === slideset ? 'block' : 'none' }}>
	{
		React.Children.toArray(children).map((child, i) => cloneElement(child, { key: i, i }))
	}
	</div>;
};

export const Slideset = connect(
	/* mapStateToProps */ ({ slideset }) => ({ slideset })
)(Slideset_);

const Slide_ = ({ children, i, slide }) =>
	<div className="slide" style={{ display: i === slide ? 'block' : 'none' }}>
	{ children }
	</div>;

export const Slide = connect(
	/* mapStateToProps */ ({ slide }) => ({ slide })
)(Slide_);
