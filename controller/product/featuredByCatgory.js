import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import LoadingView from '@/roanuz/components/LoadingView';
import ErrorView from '@/roanuz/components/ErrorView';
import { ProductsFilterQuery } from '@/roanuz/store/product/product.graphql';
import { ProductCardDisplayMode } from '@/roanuz/layout/product/product';
import { useQuery } from '@apollo/client';
import { FeaturedByCategoryView } from '@/roanuz/view/product/featuredByCategory';
import { categoryLink } from '@/roanuz/view/category/model';
import { useWaitForClientSide } from '@/roanuz/hooks/core';
import { UserContext } from '@/roanuz/store/core/context';
import Config from '../../../config';

function featuredProductsQuery({ items, displayMode, carousel } = {}) {
  let pageSize = items;

  if (!items) {
    const pages = 3;
    let itemsPerPage = 5;
    if (displayMode === ProductCardDisplayMode.OneByThree) {
      itemsPerPage = 3;
    } else if (displayMode === ProductCardDisplayMode.OneByTwo) {
      itemsPerPage = 2;
    }

    if (carousel) {
      pageSize = pages * itemsPerPage;
    } else {
      pageSize = itemsPerPage;
    }
  }

  return {
    filterQuery: {},
    sortQuery: { position: 'ASC' },
    pageSize,
  };
}

export const ProductsFeaturedByCategoryController = ({
  category,
  displayMode,
  showMoreLinks,
  carousel,
}) => {
  const query = featuredProductsQuery({
    // items, // TODO
    displayMode,
    carousel,
  });
  const basedOnUid = category && category.uid !== null && category.uid !== undefined;

  if (basedOnUid) {
    query.filterQuery.category_uid = { eq: category.uid };
  // } else {
  //   query.filterQuery.category_id = { eq: categoryId };
  }

  const {
    loading, data, error, refetch,
  } = useQuery(ProductsFilterQuery, { variables: query });

  const clientReady = useWaitForClientSide();
  const userContext = useContext(UserContext);
  const { isB2B } = userContext;

  useEffect(() => {
    if (clientReady
      && userContext.token
      && Config.ClientSideReFetchingEnable
      && !carousel
      && isB2B) {
      refetch();
    }
  }, [clientReady, refetch, isB2B]);

  if ((!data) && loading) return (<LoadingView message="Fetching Category Products" />);
  if ((!data) && error) return (<ErrorView error={error} />);

  const name = basedOnUid ? category.name : '<Empty>';
  const title = name;
  let link = '';
  const linkText = 'Sjá allt';

  link = categoryLink(category);

  return (
    <FeaturedByCategoryView
      title={title}
      link={link}
      linkText={showMoreLinks ? linkText : ''}
      products={data && data.products.items}
      displayMode={displayMode}
      carousel={carousel}
    />
  );
};

ProductsFeaturedByCategoryController.propTypes = {
  category: PropTypes.object,
  displayMode: PropTypes.oneOf(Object.values(ProductCardDisplayMode)),
  showMoreLinks: PropTypes.bool,
  carousel: PropTypes.bool,
};
