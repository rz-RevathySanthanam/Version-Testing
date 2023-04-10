import React from 'react';
import PropTypes from 'prop-types';

const LoadingView = ({ message, style }) => (
  <div className="container">
    <div className="row" style={style}>
      <div className="text-center">
        {message || 'Hleð...'}
      </div>
    </div>
  </div>
);

LoadingView.propTypes = {
  message: PropTypes.string,
  style: PropTypes.object,
};

export default LoadingView;
