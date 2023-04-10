import React, { useContext } from 'react';
import { withDependencySupport } from '@/roanuz/lib/dep';
import styled from 'styled-components';
import { ReactComponent as BaseAccountIcon } from '@/roanuz/view/imgs/AccountIcon.svg';
import { QuickLinkItem } from '@/roanuz/components/quickLinkView';
import { UserContext } from '@/roanuz/store/core/context';

export const UserSessionViewWrapper = styled.div`
`;

export const BaseUserSessionView = () => {
  const userContext = useContext(UserContext);
  const isUserLoggedIn = userContext.token;
  return (
    <UserSessionViewWrapper>
      <QuickLinkItem
        name={isUserLoggedIn ? 'Logout' : 'Innskráning'}
        href="/customer/account/"
      >
        <AccountIcon />
      </QuickLinkItem>
    </UserSessionViewWrapper>
  );
};

BaseUserSessionView.propTypes = {};

export const UserSessionView = withDependencySupport(BaseUserSessionView, 'UserSessionView');
export const AccountIcon = withDependencySupport(BaseAccountIcon, 'AccountIcon');
