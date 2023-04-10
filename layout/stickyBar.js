import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseStickBarLayoutWrapper = styled.div`
  >.rz-stickybar-primary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-top: ${asRem(20)};
    transition: padding 0.3s ease-in-out;
    padding-bottom: ${asRem(20)};
    @media screen and (min-width: ${Breakpoint.sm}) {
      padding-top: ${asRem(10)};
      padding-bottom: ${asRem(10)};
    }
    @media screen and (min-width: ${Breakpoint.md}) {
      padding-top: ${asRem(15)};
      padding-bottom: ${asRem(15)};
    }
  }
  >.rz-stickybar-secondary-row {
    padding: 0 ${asRem(20)} ${asRem(20)};
    @media screen and (min-width: ${Breakpoint.sm}) {
      padding-bottom: 0;
    }
  }
`;

export const StickBarLayout = ({
  scroll,
  className,
  leftItems,
  centerItems,
  rightItems,
  secondaryRowCenterItems,
  menuView,
}) => {
  return (
    <StickBarLayoutWrapper className={className} scroll={scroll}>
      <div className="rz-stickybar-primary-row rz-page-content">
        {leftItems && (
          <div className="rz-stickybar-left">{leftItems}</div>
        )}
        {centerItems && (
          <div className="rz-stickybar-center">{centerItems}</div>
        )}
        {rightItems && (
          <div className="rz-stickybar-right">{rightItems}</div>
        )}
      </div>
      {secondaryRowCenterItems && (
        <div className="rz-stickybar-secondary-row">{secondaryRowCenterItems}</div>
      )}
      {menuView && (
        <div className="rz-stickybar-menu-view">{menuView}</div>
      )}
    </StickBarLayoutWrapper>
  );
};

StickBarLayout.propTypes = {
  scroll: PropTypes.number,
  className: PropTypes.string,
  leftItems: PropTypes.element,
  centerItems: PropTypes.element,
  rightItems: PropTypes.element,
  secondaryRowCenterItems: PropTypes.element,
  menuView: PropTypes.element,
};

export const StickBarLayoutWrapper = withDependencySupport(BaseStickBarLayoutWrapper, 'StickBarLayoutWrapper');
