import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { filterCategoryWidgets } from '@/store/layout/widget';
import { BreadcrumbView, buildCategoryBreadcrumbLinks } from '@/roanuz/view/breadcrumb';
import { DisplayBold30 } from '@/roanuz/typopgraphy';
import { CategoryPageLayout } from '@/roanuz/layout/category/page';
import { ImageView } from '@/roanuz/view/image';
// import { BlockView } from '@/components/layout/Block';
// import MagentoHtml from '@/components/layout/MagentoHtml';
import { CategoryAutoContentView } from './autoContent';

const CategoryPageViewWrapper = styled.div`
.category-banner-image {
  >.rz-image-view {
    max-width: 100%;
    img {
      max-width: 100%;
    }
  }
}
`;

export const CategoryPageView = ({
  category,
  // widgets,
  categoryTree,
  featuredCategories,
}) => {
  const breadcrumbLinks = buildCategoryBreadcrumbLinks({ category });

  // Todo: Search page widgets missing. May be this comp shoudl recive filtered widgets
  // const pageWidgets = category ? filterCategoryWidgets({ widgets, category }) : [];

  const breadcrumb = (
    <BreadcrumbView links={breadcrumbLinks} />
  );

  let titleStr = 'Products';
  if (category) {
    titleStr = category.name;
  }

  const title = (
    <DisplayBold30 as="h1">{titleStr}</DisplayBold30>
  );

  const topWidgets = <></>;
  // const topWidgets = (
  //   <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentTop} />
  // );
  let topContent = null;

  const bottomWidgets = <></>;
  // const bottomWidgets = (
  //   <ContainerWidgets widgets={pageWidgets} container={LayoutContainer.ContentBottom} />
  // );
  let bottomContent = bottomWidgets;

  let cmsContent = null;
  if (
    // (!forceFilterView) &&
    category && category.showStaticContent) {
    cmsContent = (
      <>
        {category.description && (
          // <MagentoHtml html={category.description} />
          <p>TODO: Integrate Magento HTMl </p>
        )}
        {category.cms_block && category.cms_block.content && (
          // <BlockView content={category.cms_block} />
          <p>TODO: Do the Block view</p>
        )}
      </>
    );
  }

  let imageView = null;
  if (
    // (!forceFilterView) &&
    category
    && category.image
    // Cateogry level 3 images is used in Root catgory page
    && category.level !== 3
  ) {
    imageView = (
      <div className="category-banner-image">
        <ImageView
          src={category.image}
          alt="Banner Image"
        />
      </div>
    );
  }

  let mainContent = null;
  if (
    // (!forceFilterView) &&
    category && category.showAutoContent) {
    mainContent = (
      <CategoryAutoContentView
        contentTopWidgets={topWidgets}
        contentBottomWidgets={bottomWidgets}
        imageView={imageView}
        cmsContentView={cmsContent}
        categoryTree={categoryTree}
        featuredCategories={featuredCategories}
      />
    );

    topContent = null;
    bottomContent = null;
  } else if (
    // (!forceFilterView) &&
    category && !category.showProducts) {
    console.log('TODO: Handle Case for prods');
  } else {
    console.log('TODO: Handle Case');
  }

  return (
    <CategoryPageViewWrapper>
      --CategoryLayout
      <CategoryPageLayout
        breadcrumb={breadcrumb}
        title={title}
        topContent={topContent}
        content={mainContent}
        bottomContent={bottomContent}
      />
    </CategoryPageViewWrapper>
  );
};

CategoryPageView.propTypes = {
  category: PropTypes.object.isRequired,
  // widgets: PropTypes.element,
  categoryTree: PropTypes.arrayOf(PropTypes.object),
  featuredCategories: PropTypes.arrayOf(PropTypes.element),
};
