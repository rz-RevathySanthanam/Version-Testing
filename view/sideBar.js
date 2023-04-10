import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { asRem, Breakpoint } from '@/roanuz/lib/css';
import { ReactComponent as CloseIcon } from '@/roanuz/view/imgs/CloseIcon.svg';
import ClientOnlyPortal from '@/roanuz/view/clientOnlyPortal';
import { DisplayBold20 } from '@/roanuz/typopgraphy';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { Row } from '@/roanuz/layout';
import { MenuAnimationModeTypes } from '@/roanuz/view/stickyBar/featureTypes';
import { Button } from './button';

export const BaseSideBarViewWrapper = styled.div`
  position:fixed;
  left: 0;
  top: 0;
  z-index: 999;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  transition: height 0.2s ease-in;

  >.sidebar-bg {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    display: block;
    transition: all 0.4s ease-out;
  }

  >.sidebar-container-wrapper {
    width: ${asRem(320)};
    height: 100%;
    filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.25));
    overflow-y: scroll;
    transform: translateX(-100%);
    transition: all 0.5s ease-out;
    background-color: #fff;

    ${(p) => p.animationMode === 'SlideInRight' && css`
      position: fixed;
      right: 0;
      transform: translateX(100%);
    `}

    ${(p) => p.animationMode === 'SplitScreen' && css`
      width: 100%;
    `}

    @media screen and (min-width: ${Breakpoint.sm}) {
      min-width: ${asRem(320)};
      max-width: initial;
      width: fit-content;
      background-color: transparent;
      overflow-y: unset;
      transform: none;
    }

    >.sidebar-container {
      width: 100%;
      transition: all 0.5s ease-out;
      background: var(--color-text-rev);
      padding: ${asRem(15)};
      display: flex;
      height: auto;
      flex-direction: column;
      overflow-y: auto;
      position: relative;
      z-index: 3;
      @media screen and (min-width: ${Breakpoint.sm}) {
        padding: ${asRem(20)};
        height: 100%;
      }

      .sidebar-content {
        margin-top: ${asRem(30)};
      }
    }

    .sidebar-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    @media screen and (min-width: ${Breakpoint.sm}) {
      .default-left-wrapper {
        height: 100vh;
        background-color: #fff;
        transform: translateX(-100%);
        transition: all .5s ease-in-out;

        ${(p) => p.containerWidth && css`
          width: ${p.containerWidth};
          transform: translateX(-${p.containerWidth});
        `}

        ${(p) => p.animationMode === 'SlideInRight' && css`
          transform: translateX(100%);
        `}

        ${(p) => p.animationMode === 'SlideInRight' && p.containerWidth && css`
          transform: translateX(${p.containerWidth});
        `}
      }
    }

    .right-wrapper {
      ${(p) => p.animationMode === 'SplitScreen' && css`
        position: fixed;
        top: 0;
        height: 100%;
        left: 0;
        transition: all .5s ease-in-out;
        background-color: #fff;
        padding: ${asRem(20)} 0;
        z-index: 3;

        @media screen and (min-width: ${Breakpoint.sm}) {
          left: ${asRem(320)};
          width: calc(100vw - ${asRem(320)});
          transform: translateX(100%);
        }

      `}

      ${(p) => p.containerWidth && css`
        left: ${p.containerWidth};
        width: calc(100vw - ${p.containerWidth});
        transform: translateX(${p.containerWidth});
      `}
    }
  }

  ${(p) => p.show && css`
    >.sidebar-bg {
      background-color: rgba(51, 51, 51, 0.48);
    }
    .sidebar-container-wrapper {
      &, .default-left-wrapper, .right-wrapper {
        transform: translateX(0);
      }
    }
  `}
`;

export const SideBarView = ({
  show, children,
  showClose,
  containerWidth,
  onClose, titleText,
  titleSection,
  rightSection,
  animationMode = MenuAnimationModeTypes.SlideInLeft,
  className,
}) => {
  const onViewClose = (event) => {
    if (onClose) {
      onClose(event);
    }
  };

  const onBgKeyPress = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Esc' || event.key === 'Escape') {
      onViewClose();
    }

    event.preventDefault();
  };

  // To wait for animation to finish while closing
  const [confirmedState, setConfirmedState] = useState(show);
  const [softState, setSoftState] = useState(show);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setSoftState(show);
    }, 10);
  }, [show]);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const newTimerId = setTimeout(() => {
      setConfirmedState(softState);
    }, 510);
    setTimerId(newTimerId);

  // Don't listen to timerId
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [softState]);

  if ((!confirmedState) && (!softState) && (!show)) {
    return null;
  }

  return (
    <ClientOnlyPortal>
      <SideBarViewWrapper
        show={softState}
        containerWidth={containerWidth}
        animationMode={animationMode}
        className={className}
      >
        <div
          className="sidebar-bg"
          onClick={onViewClose}
          onKeyDown={onBgKeyPress}
          role="presentation"
        />
        <div className="sidebar-container-wrapper">
          <div className="sidebar-container default-left-wrapper">
            <div className="sidebar-title">
              {titleSection}
              {titleText && (
                <DisplayBold20>{titleText}</DisplayBold20>
              )}
              {showClose && onClose && (
                <Button
                  icon={<CloseIcon />}
                  noborder
                  onClick={onViewClose}
                  ariaLabel="Close Button"
                />
              )}
            </div>
            <Row className="sidebar-content">
              {children}
            </Row>
          </div>
          {animationMode === 'SplitScreen' && (
            <div className="right-wrapper">
              {rightSection}
            </div>
          )}
        </div>
      </SideBarViewWrapper>
    </ClientOnlyPortal>
  );
};

SideBarView.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.element.isRequired,
  showClose: PropTypes.bool,
  containerWidth: PropTypes.string,
  onClose: PropTypes.func,
  titleText: PropTypes.string,
  titleSection: PropTypes.element,
  rightSection: PropTypes.element,
  animationMode: PropTypes.string,
  className: PropTypes.string,
};

export const SideBarViewWrapper = withDependencySupport(BaseSideBarViewWrapper, 'SideBarViewWrapper');
