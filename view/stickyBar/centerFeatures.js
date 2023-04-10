import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { StickBarFeaturesPicker } from './featurePicker';

export const BaseStickBarCenterFeaturesWrapper = styled.div`
`;

export const BaseStickBarCenterViewFeatures = ({
  features,
  searchView,
}) => {
  return (
    <StickBarCenterFeaturesWrapper>
      {features && features.map((feature, fIndex) => (
        <div
          className={
            [`center-item-${fIndex}`,
              `${feature.class_name ? feature.class_name : ''}`,
            ].join(' ')
          }
          // eslint-disable-next-line react/no-array-index-key
          key={fIndex}
        >
          <StickBarFeaturesPicker
            feature={feature}
            searchView={searchView}
          />
        </div>
      ))}
    </StickBarCenterFeaturesWrapper>
  );
};

BaseStickBarCenterViewFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object),
  searchView: PropTypes.element,
};

export const StickBarCenterViewFeatures = withDependencySupport(BaseStickBarCenterViewFeatures, 'StickBarCenterViewFeatures');
export const StickBarCenterFeaturesWrapper = withDependencySupport(BaseStickBarCenterFeaturesWrapper, 'StickBarCenterFeaturesWrapper');
