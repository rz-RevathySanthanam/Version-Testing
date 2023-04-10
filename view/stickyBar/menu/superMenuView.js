import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { Display18, Display24 } from '@/roanuz/typopgraphy';

import { QuickLinks } from './quickLinks';
import { CategoryMenuTreeColumnView } from '../categoryMenuTree';

export const BaseSuperMenuViewWrapper = styled.div`
  display: flex;
  >div:not(:empty) {
    min-width: ${asRem(250)};
  }
  .link-wrapper {
    padding-bottom: ${asRem(10)};
  }
  .item-label {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  ${(p) => p.toggle && css`
    .left-side {
      display: none;
    }
  `}

  .left-side {
    @media screen and (min-width: ${Breakpoint.md}) {
      display: block;
    }
  }
`;

export const BaseSuperMenuView = ({
  superMenuSettings,
  superMenuTrigger,
  menuContext,
}) => {
  const { items } = superMenuSettings;
  const { quickLinks } = superMenuSettings;

  return (
    <SuperMenuViewWrapper toggle={menuContext.superMenuModalActiveFrame >= 1}>
      <div className="left-side">
        {items && items.map((item, index) => (
          <div
            className="link-wrapper"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {item.menuActionFrame && (
              <div
                className={`
                  ${item.menuActionFrame === menuContext.superMenuModalActiveFrame ? 'active' : ''} item-label
                `}
              >
                <Display24
                  role="presentation"
                  onClick={() => superMenuTrigger(true, false, item.menuActionFrame)}
                  onKeyPress={() => superMenuTrigger(true, false, item.menuActionFrame)}
                  as="p"
                >
                  {item.label}
                </Display24>
              </div>
            )}
            {item.href && (
              <Link href={item.href} prefetch={false}>
                <a alt={item.label} className="plain">
                  <Display18 as="span">{item.label}</Display18>
                </a>
              </Link>
            )}
          </div>
        ))}
        {quickLinks && (<QuickLinks quickLinks={quickLinks} sectionView />)}
      </div>
    </SuperMenuViewWrapper>
  );
};

BaseSuperMenuView.propTypes = {
  superMenuSettings: PropTypes.object,
  superMenuTrigger: PropTypes.func,
  menuContext: PropTypes.object,
};

export const SuperMenuView = withDependencySupport(BaseSuperMenuView, 'SuperMenuView');
export const SuperMenuViewWrapper = withDependencySupport(BaseSuperMenuViewWrapper, 'SuperMenuViewWrapper');

export const BaseSuperMenuFrameWrapper = styled.div`
  display: flex;
  .right-side:not(:empty) {
    min-width: ${asRem(250)};
    width: 100%;
    height: 100%;
    z-index: 3;
    @media screen and (min-width: ${Breakpoint.sm}) {
      width: auto;
    }
  }
  @media screen and (min-width: ${Breakpoint.md}) {
    display: block;
  }
`;

export const BaseSuperMenuFrame = ({
  menuContext,
  categoryTree,
  serviceTree,
  superMenuTrigger,
}) => {
  return (
    <SuperMenuFrameWrapper>
      <div className="right-side">
        {menuContext.superMenuModalActiveFrame === 1 && (
          <CategoryMenuTreeColumnView
            tree={categoryTree.tree}
            loading={categoryTree.treeLoading}
            resetMenu={() => superMenuTrigger(true, false)}
          />
        )}
        {menuContext.superMenuModalActiveFrame === 2 && (
          <CategoryMenuTreeColumnView
            tree={serviceTree}
            loading={false}
            isServiceLinks
            resetMenu={() => superMenuTrigger(true, false)}
          />
        )}
      </div>
    </SuperMenuFrameWrapper>
  );
};

BaseSuperMenuFrame.propTypes = {
  superMenuTrigger: PropTypes.func,
  menuContext: PropTypes.object,
  categoryTree: PropTypes.object,
  serviceTree: PropTypes.object,
};

export const SuperMenuFrame = withDependencySupport(BaseSuperMenuFrame, 'SuperMenuFrame');
export const SuperMenuFrameWrapper = withDependencySupport(BaseSuperMenuFrameWrapper, 'SuperMenuFrameWrapper');
