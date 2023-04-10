import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { StickBarFeaturesPicker } from './featurePicker';

export const BaseStickBarRightFeaturesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div[class^="right-item-"]:not(:empty) {
    margin-left: ${asRem(5)}; 
    &.spacious-icon {
      padding: ${asRem(6)};
      border-radius: 50%;
      &:hover {
        background-color: var(--color-sticky-icons-hover);
        cursor: pointer;
      }
      @media screen and (min-width: ${Breakpoint.md}) {
        padding: ${asRem(10)};
        margin-left: ${asRem(10)};
      }
    }
  }
`;

export const BaseStickBarRightSideFeatures = ({
  features,
  searchView,
  cart,
  CartMiniType,
  wishList,
  WishListMiniType,
}) => {
  return (
    <StickBarRightFeaturesWrapper>
      {features && features.map((feature, fIndex) => (
        <div
          className={
            [`right-item-${fIndex}`,
              `${feature.class_name ? feature.class_name : ''}`,
            ].join(' ')
          }
          // eslint-disable-next-line react/no-array-index-key
          key={fIndex}
        >
          <StickBarFeaturesPicker
            feature={feature}
            searchView={searchView}
            cart={cart}
            CartMiniType={CartMiniType}
            wishList={wishList}
            WishListMiniType={WishListMiniType}
          />
        </div>
      ))}
    </StickBarRightFeaturesWrapper>
  );
};

BaseStickBarRightSideFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object),
  searchView: PropTypes.element,
  cart: PropTypes.element,
  CartMiniType: PropTypes.elementType,
  WishListMiniType: PropTypes.elementType,
  wishList: PropTypes.object,
};

export const StickBarRightSideFeatures = withDependencySupport(BaseStickBarRightSideFeatures, 'StickBarRightSideFeatures');
export const StickBarRightFeaturesWrapper = withDependencySupport(BaseStickBarRightFeaturesWrapper, 'StickBarRightFeaturesWrapper');
