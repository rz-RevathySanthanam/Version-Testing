import React from 'react';
import PropTypes from 'prop-types';
import { onClient } from '@/roanuz/clientSide';
import { withDependencySupport } from '@/roanuz/lib/dep';
import styled, { css } from 'styled-components';

const Wrapper = styled.p`
  position: absolute;
  display: none;
  ${(p) => p.show && css`
    display: block;
  `}
`;

export const BaseCartMiniController = ({ show }) => {
  return (
    <Wrapper show={show}>
      Hi cart.
    </Wrapper>
  );
};

BaseCartMiniController.propTypes = {
  show: PropTypes.bool,
};

export const CartMiniController = withDependencySupport(BaseCartMiniController, 'CartMiniController');
export const ClientCartMiniController = onClient(CartMiniController);
