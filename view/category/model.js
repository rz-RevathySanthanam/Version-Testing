export function categoryLink(category) {
  let path = category.url_path;
  if (path && !path.startsWith('/')) {
    path = `/${path}`;
  }
  return `${path}${category.url_suffix || '.html'}`;
}

export function parseCategory(category) {
  if (!category) { return category; }
  const showStaticContent = (
    category.display_mode === null
    || category.display_mode === 'PRODUCTS_AND_PAGE'
    || category.display_mode === 'PAGE'
  )
  && (
    category.description
    || (category.cms_block && category.cms_block.content)
  );

  const showProducts = (
    category.display_mode === null
    || category.display_mode === 'PRODUCTS_AND_PAGE'
    || category.display_mode === 'PRODUCTS'
  );

  const showFilter = showProducts;
  const showAutoContent = (!showProducts) && category.level < 3;

  return {
    ...category,
    showStaticContent,
    showFilter,
    showProducts,
    showAutoContent,
  };
}
