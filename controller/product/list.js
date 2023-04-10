import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ProductCardListQuery } from '@/roanuz/store/product/product.graphql';
import React, { useEffect, useContext } from 'react';
import { UserContext, StoreConfigContext } from '@/roanuz/store/core/context';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { ProductCardDisplayMode } from '@/roanuz/layout/product/product';
import { SweetSlider } from '@/roanuz/view/sweetSlider/sweetSlider';
import { useWaitForClientSide } from '@/roanuz/hooks/core';
import { ProductCard } from './card';
import Config from '../../../config';

function fetchWebSiteCode(config) {
  if (Config.RestrictProductByWebsiteEnable && config.attributeMeta.rzVisibleProdcutOnWebsiteCode) {
    return config.attributeMeta.rzVisibleProdcutOnWebsiteCode;
  }
  return null;
}

function preserveURLOrder(urlKeys, loadedProducts) {
  const sorted = [];
  urlKeys.forEach((url) => {
    const item = loadedProducts.find((x) => x.url_key === url);
    if (item) {
      sorted.push(item);
    }
  });
  return sorted;
}

export const ProductSlider = ({
  products,
  displayMode,
  showShortDesc,
}) => {
  let responsive = {
    xs: { columns: 2, showPageArrows: false, space: '15px' },
    sm: { columns: 3, showPageArrows: false, space: '25px' },
    md: { columns: 4, showPageArrows: false, space: '25px' },
    lg: { columns: 5, showPageArrows: true, space: '25px' },
  };

  if (displayMode === ProductCardDisplayMode.OneByThree) {
    responsive = {
      xs: { columns: 1, showPageArrows: false },
      sm: { columns: 2, showPageArrows: false },
      md: { columns: 3, showPageArrows: false },
      lg: { columns: 3, showPageArrows: true },
    };
  }

  const items = products.map((product) => (
    <ProductCard
      key={product.url_key}
      product={product}
      displayMode={displayMode}
      showShortDesc={showShortDesc}
    />
  ));

  return (
    <SweetSlider
      items={items}
      responsive={responsive}
      space="25px"
    />
  );
};

ProductSlider.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  showShortDesc: PropTypes.bool,
  displayMode: PropTypes.oneOf(Object.values(ProductCardDisplayMode)),
};

export const ProductSliderWithLoader = ({
  products,
  ...options
}) => {
  const urlKeys = products.map((p) => p.url_key);
  const clientReady = useWaitForClientSide();
  const userContext = useContext(UserContext);
  const storeConfigInstance = useContext(StoreConfigContext);
  const webSiteCode = fetchWebSiteCode(storeConfigInstance);

  const {
    loading, error, data: productData, refetch,
  } = useQuery(ProductCardListQuery, {
    variables: { urlKeys, webSiteCode },
    skip: !urlKeys.length,
  });

  useEffect(() => {
    if (clientReady && userContext.token && Config.EnableClientSideRefresh) {
      refetch();
    }
  }, [clientReady, refetch]);

  if ((!productData) && loading) return (<LoadingView />);
  if (error) return (<ErrorView error={error} />);

  if (!productData) {
    return null;
  }
  const loadedProducts = preserveURLOrder(urlKeys, productData.products.items);

  return (
    <ProductSlider
      {...options}
      products={loadedProducts}
    />
  );
};

ProductSliderWithLoader.propTypes = {
  ...ProductSlider.propTypes,
};
