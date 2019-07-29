import React from 'react';
import { connect } from 'react-redux';
import './slide_info.css';

const SlideInfo = ({ slideset, slide }) =>
	<div className='slide_info'>
		{slideset}.{slide}
	</div>;

export default connect(
	/* mapStateToProps */ ({ slideset, slide }) => ({ slideset, slide })
)(SlideInfo);
