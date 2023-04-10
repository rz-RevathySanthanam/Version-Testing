import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { StickBarLayout } from '@/roanuz/layout/stickyBar';
import { WishListIndicatorView } from '@/roanuz/view/wishListIndicator';
import stickyBarSettings from '@/data/stickyBar/settings';
import { StickBarLeftSideFeatures } from './leftFeatures';
import { StickBarCenterViewFeatures } from './centerFeatures';
import { StickBarRightSideFeatures } from './rightFeatures';
import { StickBarMenuView } from './menu/menuView';

export const BaseStickBarViewWrapper = styled.div`
  background-color: var(--color-sticky-bg);
  color: var(--color-text-rev);
  a {
    color: var(--color-text-rev);
  }
  .menu-icon {
    cursor: pointer;
  }
`;

const settings = stickyBarSettings;

export const BaseStickBarView = ({
  scrollPosition,
  categoryTree,
  searchView,
  cart,
  CartMiniType,
  wishList,
  WishListMiniType,
}) => {
  return (
    <StickBarViewWrapper scrollPosition={scrollPosition}>
      <StickBarLayout
        className={settings.class_name}
        leftItems={(
          <StickBarLeftSideFeatures
            features={settings.features.left}
            menuMode={settings.features.menu.menu_mode}
            scrollPosition={scrollPosition}
            categoryTree={categoryTree}
          />
        )}
        centerItems={(
          <StickBarCenterViewFeatures
            features={settings.features.center}
            scrollPosition={scrollPosition}
          />
        )}
        rightItems={(
          <StickBarRightSideFeatures
            features={settings.features.right}
            searchView={searchView}
            cart={cart}
            CartMiniType={CartMiniType}
            wishList={wishList}
            WishListMiniType={WishListMiniType}
          />
        )}
        secondaryRowCenterItems={(
          <StickBarCenterViewFeatures
            features={settings.features.secondaryCenter}
            searchView={searchView}
          />
        )}
        menuView={(
          <StickBarMenuView
            menuSettings={settings.features.menu}
            categoryTree={categoryTree}
          />
        )}
      />
    </StickBarViewWrapper>
  );
};

BaseStickBarView.propTypes = {
  scrollPosition: PropTypes.number,
  categoryTree: PropTypes.object,
  searchView: PropTypes.element,
  cart: PropTypes.element,
  CartMiniType: PropTypes.elementType,
  WishListMiniType: PropTypes.elementType,
  wishList: PropTypes.shape(WishListIndicatorView.propTypes),
};

export const StickBarView = withDependencySupport(BaseStickBarView, 'StickBarView');
export const StickBarViewWrapper = withDependencySupport(BaseStickBarViewWrapper, 'StickBarViewWrapper');
