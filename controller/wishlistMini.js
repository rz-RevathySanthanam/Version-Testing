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

export const BaseWishListMiniController = ({ show }) => {
  return (
    <Wrapper show={show}>
      Hi wishlist.
    </Wrapper>
  );
};

BaseWishListMiniController.propTypes = {
  show: PropTypes.bool,
};

export const WishListMiniController = withDependencySupport(BaseWishListMiniController, 'WishListMiniController');
export const ClientWishListMiniController = onClient(WishListMiniController);
