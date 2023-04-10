import React from 'react';
import PropTypes from 'prop-types';
import { StoreConfigQuery } from '@/roanuz/store/core/query';
import { CategoryNavQuery } from '@/roanuz/store/category/query';
import { useQuery } from '@apollo/client';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { StoreConfigProvider } from './context';

export const AppData = ({ children }) => {
  const { loading, error, data: storeConfigData } = useQuery(StoreConfigQuery);

  const {
    loading: categoryTreeLoading,
    data: categoryTree,
    error: categoryTreeError,
  } = useQuery(CategoryNavQuery,
    {
      skip: (!storeConfigData || (storeConfigData && !storeConfigData.storeConfig)),
      variables:
        { parentCategory: storeConfigData ? storeConfigData.storeConfig.root_category_uid : null },
    });

  const isLoading = loading || categoryTreeLoading;
  const isError = error || categoryTreeError;
  const hasData = storeConfigData && categoryTree;
  if ((!hasData) && isLoading) return (<PageLoadingView message="Preparing Storeconfig" />);
  if ((!hasData) && isError) return (<PageErrorView error={error} />);

  const { storeConfig } = storeConfigData;

  const categoryTreeData = {
    categoryTreeLoading,
    categoryTreeError,
    categoryTree,
  };

  const config = {
    storeConfig,
    categoryTreeData,
  };
  return (
    <StoreConfigProvider value={config}>
      {children}
    </StoreConfigProvider>
  );
};

AppData.propTypes = {
  children: PropTypes.element,
};
