import React from 'react';
import PropTypes from 'prop-types';
import { CategoryAutoContentController } from './autoContent';

export const CategoryPageController = ({
  category,
  widgets,
}) => {
  if (category.showAutoContent) {
    return (
      <>
        -CategoryAutoContent
        <CategoryAutoContentController
          category={category}
          widgets={widgets}
        />
      </>
    );
  }

  if (category.showProducts) {
    return (<p>Show Prods</p>);
  }

  return (<p>Others</p>);
};

CategoryPageController.propTypes = {
  category: PropTypes.object.isRequired,
  widgets: PropTypes.arrayOf(PropTypes.object),
};
