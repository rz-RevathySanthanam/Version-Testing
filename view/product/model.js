import Config from '@/config';
import { LabelKind } from './label';
// import { makeStockStatusV2, AvailableStatus, StockStatus } from './models/stock';
import { formatCurrency, formatNumber } from '../../lib/cart';

// We are doing this because the last sub category is missing in breadcrumbs.
// And we can't use the product.category.url_path since wrong data coming from magento.
// Wrong data in sense, if same product available in two stores, dats is structured wrongly.
function fixBreadcrumbs(category) {
  const breadcrumbRef = [...category.breadcrumbs];
  const { preferredCategory } = category;
  const preferredCategoryInfo = {
    category_level: 4, // For safe side, no need but.
    category_name: preferredCategory.name,
    category_uid: preferredCategory.uid,
    category_url_key: preferredCategory.url_key,
    category_url_path: preferredCategory.url_path,
  };
  breadcrumbRef.push(preferredCategoryInfo);
  return breadcrumbRef;
}

export function parseProduct(product) {
  const maxPrice = product.price_range.maximum_price;
  const minPriceBase = product.price_range.minimum_price;
  const isPriceFromTier = false;

  // For B2B price change Begin
  const hasPriceTiers = product.price_tiers && product.price_tiers.length;
  // TODO
  // if (hasPriceTiers) {
  //   const priceTiers = { ...product.price_tiers[0] };
  //   if (priceTiers.final_price.value <= minPriceBase.final_price.value) {
  //     priceTiers.regular_price = product.price_range.minimum_price.regular_price;
  //     minPriceBase = priceTiers;
  //     isPriceFromTier = isB2B && true;
  //   }
  // }
  // For B2B End
  const minPrice = minPriceBase;

  const hasVariablePrice = (
    (maxPrice.final_price.value !== minPrice.final_price.value)
    && !hasPriceTiers
  );
  const onSale = product.sale === 1;
  const hasDiscountAmount = minPrice.discount.amount_off !== 0
    && (minPrice.discount.amount_off > Config.ShowPercentageForDiscountUnder);
  const hasDiscountPerc = minPrice.discount.percent_off !== 0;
  const onDiscount = hasDiscountAmount || hasDiscountPerc;
  const isNew = product.new === 1;
  const shortDesc = product.short_description ? product.short_description.html : null;
  const detailDesc = product.description ? product.description.html : null;
  const upsellProducts = product.upsell_products;
  const crosssellProducts = product.crosssell_products;
  const relatedProducts = product.related_products;
  const configOptions = [...(product.configurable_options || [])]
    .sort((x, y) => x.position - y.position);
  const options = [...(product.options || [])];
  let bundledItemOptions = [];
  // eslint-disable-next-line no-underscore-dangle
  if (product.__typename === 'BundleProduct') {
    bundledItemOptions = [...(product.items || [])];
  }

  let groupedProducts = [];
  // eslint-disable-next-line no-underscore-dangle
  if (product.__typename === 'GroupedProduct') {
    groupedProducts = [...(product.items || [])];
  }

  const available = product.stock_status === 'IN_STOCK';

  let category = null;
  const hasImage = (product.image && (product.image.disabled !== true));
  const productLink = `/${product.url_key}${product.url_suffix}`;

  const {
    name, sku, image,
  } = product;

  // TODO: const manufacturer = product.rz_manufacturer;

  const { value: price, currency } = minPrice.final_price;
  const priceText = formatCurrency(price, currency);
  let regPriceText = null;
  let discountText = null;
  const hasPrice = price > 0.1;

  // TODO
  // const isRefurbished = product.rz_b_product === 1;
  // const refurbishedNotes = product.rz_b_product_description;
  // const { rzEnergeyLabels } = storeConfig.attributeMeta;
  // const energyLabel = rzEnergeyLabels[product.rz_energy_label];
  // const energyLabelIcon = createEnergyLabelIconUrl(product.rz_energy_label, rzEnergeyLabels);

  const productUrlKey = product.url_key;

  let label = null;
  let labelKind = LabelKind.Label;

  if (!label) {
    if (onDiscount || onSale) {
      label = 'Tilboð';
      labelKind = LabelKind.Discount;
      if (isPriceFromTier) {
        label = 'Sérkjör';
        labelKind = LabelKind.B2BPrice;
      }

      if (isNew) {
        label = 'Kynningartilboð';
        labelKind = LabelKind.Sale;
      }

      // if (isRefurbished && isCard) {
      //   label = 'B-vörur';
      //   labelKind = LabelKind.Refurbished;
      // }
    // } else if (isRefurbished) {
    //   label = 'B-vörur';
    //   labelKind = LabelKind.Refurbished;
    } else if (isNew) {
      label = 'Nýtt';
      labelKind = LabelKind.New;
    }
  }

  if (onDiscount) {
    regPriceText = formatCurrency(minPrice.regular_price.value, minPrice.regular_price.currency);
    if (hasDiscountAmount) {
      // Since rounding off for reg and final price, So here taking floor.
      const discountAmontOff = Math.floor(minPrice.discount.amount_off);
      const amount = formatCurrency(discountAmontOff, minPrice.regular_price.currency);
      discountText = `${amount}`;
    } else {
      discountText = `${formatNumber(minPrice.discount.percent_off, true)}%`;
    }
  }

  // const stockStatus = Config.Features.EnableDatoCMS
  //   ? makeStockStatusV2(product, hasPrice, attributeMeta, storeConfig)
  //   : makeStockStatus(product, hasPrice, attributeMeta);

  let categories = [...(product.categories || [])];
  categories = categories.reverse();

  let preferredCategory = null;

  // TODO: Refer HT: const { listOfAllChildCategories } = storeConfig.categoryTreeData;
  categories.forEach((possibleCat) => {
    if (!category) {
      category = { ...possibleCat };
      preferredCategory = category;
      category.breadcrumbs = possibleCat.breadcrumbs || [];
      return;
    }

    if (possibleCat.breadcrumbs
      && possibleCat.breadcrumbs.length >= category.breadcrumbs.length) {
      preferredCategory = possibleCat;
      category.breadcrumbs = possibleCat.breadcrumbs;
    }
  });

  if (preferredCategory) {
    category.preferredCategory = preferredCategory;
    category.breadcrumbs = fixBreadcrumbs(category);
  }
  // TODO
  // const gallery = prepareGalleryData(product, false);
  // const volume = product.rz_volume ? parseFloat(product.rz_volume) : null;
  // const assembleDays = product.rz_assembly_days ? parseInt(product.rz_assembly_days, 10) : null;

  return {
    // ...product,
    id: product.id,
    price,
    hasPrice,
    currency,
    maxPrice,
    minPrice,
    hasVariablePrice,
    hasDiscountAmount,
    hasDiscountPerc,
    onSale,
    onDiscount,
    isNew,
    // isRefurbished,
    // refurbishedNotes,
    // energyLabel,
    // energyLabelIcon,
    label,
    labelKind,
    name,
    sku,
    priceText,
    regPriceText,
    discountText,
    available,
    // stockStatus,
    hasImage,
    productLink,
    category,
    // brandId: manufacturer,
    shortDesc,
    detailDesc,
    image,
    // gallery,
    upsellProducts,
    crosssellProducts,
    relatedProducts,
    configOptions,
    options,
    groupedProducts,
    bundledItemOptions,
    productUrlKey,
    // volume,
    // assembleDays,
    hasB2BPrice: isPriceFromTier,
  };
}
