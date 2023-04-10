/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Config from '@/config';
import { SearchBarView } from '@/roanuz/view/searchBar';
import { ClientCartIndicatorController } from '@/roanuz/controller/cart';
import categoryTreeData from '@/stories/sample-data/categoryTree.json';
import { StickBarView } from './stickyBar';

export default {
  title: 'Omni Shop / View / Header',
  component: StickBarView,
};

const Template = (args) => (
  <>
    <div id="portalmodal" />
    <StickBarView
      cart={<ClientCartIndicatorController />}
      wishList={args.wishList}
      categoryTree={args.categoryTree}
      CartMiniType="Cart"
      searchView={
        (
          <SearchBarView
            productIndexName={`${Config.AlgoliaIndexNamePrefix}products`}
            categoryIndexName={`${Config.AlgoliaIndexNamePrefix}categories`}
          />
        )
      }
    />
  </>
);

export const StickyBar = Template.bind({});
StickyBar.args = {
  cart: {
    loading: false,
    error: null,
    cart: {
      total_quantity: 0,
    },
  },
  wishList: {
    loading: false,
    error: null,
    item: {
      total_quantity: 0,
    },
  },
  categoryTree: {
    tree: categoryTreeData.data,
    treeLoading: true,
  },
};
