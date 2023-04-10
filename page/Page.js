import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Config from '@/config';

// import { LayoutContainer } from '@/roanuz/store/layout/layout';
// import ContainerWidgets from '@/components/layout/ContainerWidgets';

import { StoreConfigConsumer, UserConsumer } from '@/roanuz/store/core/context';
import { UrlResolverQuery } from '@/roanuz/store/cms/query';
import PageLoadingView from '@/roanuz/components/PageLoadingView';
import PageErrorView from '@/roanuz/components/PageErrorView';
import { NotFound } from '@/roanuz/page/404';
import CategoryPage from './CategoryPage';

export const Page = ({ reqPath }) => {
  let reqPathRef = reqPath;
  if (reqPathRef.includes(Config.FiltersQueryPrefix)) {
    [reqPathRef] = reqPathRef.split(Config.FiltersQueryPrefix);
  }
  const {
    loading: urlMetaLoading,
    error: urlMetaError,
    data: urlMetaData,
  } = useQuery(UrlResolverQuery, { variables: { url: reqPathRef } });

  if ((!urlMetaData) && urlMetaLoading) return (<PageLoadingView message="Hleð síðu" />);
  if ((!urlMetaData) && urlMetaError) return (<PageErrorView error={urlMetaError} />);
  if (!urlMetaData) return (<PageErrorView error={{ message: 'Meta Missing' }} />);
  // console.log('Resolved', urlMetaData);
  const urlMeta = urlMetaData.urlResolver || {};
  const pageType = urlMeta.type;

  let pageView = null;
  switch (pageType) {
    case 'CATEGORY':
      pageView = (userContext, storeConfig, storeWidgets, defaultWidgets) => {
        return (
          <CategoryPage
            urlMeta={urlMeta}
            userContext={userContext}
            defaultWidgets={defaultWidgets}
            widgets={storeWidgets}
            storeConfig={storeConfig}
          />
        );
      };
      break;
    default:
      pageView = null;
  }

  return (
    <UserConsumer>
      {(userContext) => (
        <StoreConfigConsumer>
          {({
            storeConfig,
            storeWidgets,
            defaultWidgets,
            attributeMeta,
          }) => (
            <div>
              <main>
                {pageView ? pageView(
                  userContext, storeConfig, storeWidgets,
                  defaultWidgets, attributeMeta,
                ) : (
                  <div>
                    <NotFound />
                  </div>
                )}
              </main>

              {/* Load Widgets */}
              {/* <footer>
                <ContainerWidgets
                  widgets={defaultWidgets}
                  container={LayoutContainer.FooterLinks}
                />
              </footer> */}
            </div>
          )}
        </StoreConfigConsumer>
      )}
    </UserConsumer>

  );
};

Page.propTypes = {
  reqPath: PropTypes.string.isRequired,
};

export default Page;
