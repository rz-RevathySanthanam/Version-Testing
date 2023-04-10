import React, { useContext } from 'react';
import { withDependencySupport } from '@/roanuz/lib/dep';
import Config from '@/config';
import { useRouter } from 'next/router';
import { SearchBarView } from '@/roanuz/view/searchBar';
import { useScrollHandler } from '@/roanuz/components/scrollHandler';
import { StoreConfigContext } from '@/roanuz/store/core/context';
import { StickBarView } from '../view/stickyBar/stickyBar';
import { ClientCartIndicatorController } from './cart';
import { ClientCartMiniController } from './cartMini';
import { ClientWishListMiniController } from './wishlistMini';

export const BaseStickyBarController = () => {
  const storeConfig = useContext(StoreConfigContext);
  const scrollPosition = useScrollHandler();
  const router = useRouter();
  const { AlgoliaIndexNamePrefix } = Config.AlgoliaConfiguration;
  let indexPrefix = `${AlgoliaIndexNamePrefix}`;
  if (Config.StoreViewCode) {
    indexPrefix = `${indexPrefix}${Config.StoreViewCode}_`;
  }

  const { q: searchQuery } = router.query;
  const onSearchSubmit = (text) => {
    if (text.trim() !== '') {
      const etext = encodeURIComponent(text);
      router.push(`/catalogsearch/result?q=${etext}`);
    }
  };

  const { categoryTree, categoryTreeLoading } = storeConfig.categoryTreeData;

  return (
    <StickBarView
      scrollPosition={scrollPosition}
      categoryTree={{
        tree: categoryTree,
        treeLoading: categoryTreeLoading,
      }}
      cart={(<ClientCartIndicatorController />)}
      CartMiniType={ClientCartMiniController}
      wishList={{}}
      WishListMiniType={ClientWishListMiniController}
      searchView={
        (
          <SearchBarView
            productIndexName={`${indexPrefix}products`}
            categoryIndexName={`${indexPrefix}categories`}
            searchText={searchQuery}
            onSubmit={onSearchSubmit}
          />
        )
      }
    />
  );
};

BaseStickyBarController.propTypes = {
};

export const StickyBarController = withDependencySupport(BaseStickyBarController, 'StickyBarController');
