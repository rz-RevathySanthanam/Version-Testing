import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { FooterLayout } from '@/roanuz/layout/footer';
import { LogoView } from '@/roanuz/view/brand';
import { PrivacyLinksView } from './privacyLinks';
import { SiteLinks } from './siteLinks';
import { StoreInformation } from './storeInformation';
import { CertifyMarksView } from './certifyMarks';

const BaseFooterViewWrapper = styled.div`
`;

export const BaseFooterView = ({
  newsLetter,
}) => {
  return (
    <FooterViewWrapper>
      <FooterLayout
        className="footer-view"
        leftItems={(
          <>
            <LogoView className="logo" />
            <br />
            <StoreInformation displayBasedOnSelection />
          </>
        )}
        centerItems={(<SiteLinks />)}
        rightItems={(
          <>
            {newsLetter}
            <CertifyMarksView />
          </>
        )}
        secondaryRowItems={(<PrivacyLinksView />)}
      />
    </FooterViewWrapper>
  );
};

BaseFooterView.propTypes = {
  newsLetter: PropTypes.element,
};

export const FooterView = withDependencySupport(BaseFooterView, 'FooterView');
export const FooterViewWrapper = withDependencySupport(BaseFooterViewWrapper, 'FooterViewWrapper');
