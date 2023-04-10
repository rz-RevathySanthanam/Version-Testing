import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageViewWrapper = styled.div`
  img {
    text-indent: -9999px;
    font-size: 0;
  }
`;

export const ImageView = ({
  src, alt,
  className = null, width, height,
}) => {
  const [showImage, setShowImage] = useState(true);
  const classes = [];
  if (!showImage) {
    classes.push('rz-hide');
  }

  if (className) {
    classes.push(className);
  }
  return (
    <ImageViewWrapper
      className="rz-image-view"
    >
      {showImage ? (
        <img
          src={src}
          className={classes.join(' ')}
          alt={alt}
          width={width}
          height={height}
          onError={() => setShowImage(false)}
          onLoad={() => setShowImage(true)}
        />
      ) : (
        <img
          src="/DefaultImage.png"
          alt="Missing Placeholder"
          className={`${className} placeholder`}
        />
      )}
    </ImageViewWrapper>
  );
};

ImageView.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export const NoImageView = ({ alt, className }) => {
  return (
    <ImageView
      src="/DefaultImage.png"
      alt={alt || 'Image Missing'}
      className={className}
    />
  );
};

NoImageView.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
};
