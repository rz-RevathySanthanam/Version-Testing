import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '@/roanuz/layout';
import Link from 'next/link';
import { withDependencySupport } from '@/roanuz/lib/dep';

const CartActionViewWrapper = styled(Row)`
  justify-content: space-between;
`;

export const BaseCartActionView = ({
  featureConfig,
  cart,
  CartMiniType,
}) => {
  const [cartMiniVisible, setCartMiniVisible] = useState(false);
  if (featureConfig.modalView) {
    // TODO: Need to work on this.
    return (
      <CartActionViewWrapper>
        <div>
          {cart}
        </div>
      </CartActionViewWrapper>
    );
  }
  const showCartMini = () => {
    setCartMiniVisible(true);
  };
  const hideCartMini = () => {
    setCartMiniVisible(false);
  };
  return (
    <CartActionViewWrapper>
      {CartMiniType
        ? (
          <>
            <div
              onMouseOver={showCartMini}
              onMouseOut={hideCartMini}
              onFocus={showCartMini}
              onBlur={hideCartMini}
              className="cart-item"
            >
              <Link href="/cart/">
                <a alt="Goto Cart">
                  {cart}
                </a>
              </Link>
              {featureConfig.showMiniView && (
                <CartMiniType show={cartMiniVisible} />
              )}
            </div>
          </>
        ) : (
          <></>
        )}
    </CartActionViewWrapper>
  );
};

BaseCartActionView.propTypes = {
  featureConfig: PropTypes.object,
  cart: PropTypes.element,
  CartMiniType: PropTypes.elementType,
};

export const CartActionView = withDependencySupport(BaseCartActionView, 'CartActionView');
