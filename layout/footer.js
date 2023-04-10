import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

export const BaseFooterLayoutWrapper = styled.div`
  padding-top: ${asRem(40)};
  >.rz-footer-primary-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .rz-footer-left {
      flex: 0 0 100%;
      @media screen and (min-width: ${Breakpoint.md}) {
        flex: initial;
      }
    }
    .rz-footer-left,
    .rz-footer-right,
    .rz-footer-center {
      padding-bottom: ${asRem(10)};
    }
  }
  >.rz-stickybar-secondary-row {
    padding: 0 ${asRem(20)} ${asRem(20)};
  }
`;

export const FooterLayout = ({
  className,
  leftItems,
  centerItems,
  rightItems,
  secondaryRowItems,
}) => {
  return (
    <FooterLayoutWrapper className={className}>
      <div className="rz-footer-primary-row rz-page-content">
        {leftItems && (
          <div className="rz-footer-left">{leftItems}</div>
        )}
        {centerItems && (
          <div className="rz-footer-center">{centerItems}</div>
        )}
        {rightItems && (
          <div className="rz-footer-right">{rightItems}</div>
        )}
      </div>
      {secondaryRowItems && (
        <div className="rz-footer-secondary-row rz-page-content">{secondaryRowItems}</div>
      )}
    </FooterLayoutWrapper>
  );
};

FooterLayout.propTypes = {
  className: PropTypes.string,
  leftItems: PropTypes.element,
  centerItems: PropTypes.element,
  rightItems: PropTypes.element,
  secondaryRowItems: PropTypes.element,
};

export const FooterLayoutWrapper = withDependencySupport(BaseFooterLayoutWrapper, 'FooterLayoutWrapper');
