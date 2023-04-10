import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ProductCardView } from '@/roanuz/view/product/product';
import { ProductCardDisplayMode } from '@/roanuz/layout/product/product';
import { parseProduct } from '@/roanuz/view/product/model';
import { StoreConfigContext, UserContext } from '@/roanuz/store/core/context';

export const ProductCard = ({
  product,
  displayMode,
  showShortDesc,
  className,
}) => {
  const storeConfig = useContext(StoreConfigContext);
  const userContext = useContext(UserContext);
  const { isB2B } = userContext;
  const parsedProduct = parseProduct(product, null, storeConfig, isB2B);

  // const acButton = (
  //   <AddToCart options={{}} product={parsedProduct} />
  // );
  // const awButton = (
  //   <AddToWishList product={parsedProduct} />
  // );

  return (
    <ProductCardView
      product={parsedProduct}
      displayMode={displayMode}
      showShortDesc={showShortDesc}
      className={className}
    />
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  displayMode: PropTypes.oneOf(Object.values(ProductCardDisplayMode)),
  showShortDesc: PropTypes.bool,
  className: PropTypes.string,
};
