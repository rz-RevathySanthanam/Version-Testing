import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row } from '@/roanuz/layout';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { SVGIcon } from '@/roanuz/view/icon';
import { ReactComponent as BaseSearchIcon } from '@/roanuz/view/imgs/SearchIcon.svg';
import { SideBarView } from '@/roanuz/view/sideBar';

export const SearchIcon = withDependencySupport(BaseSearchIcon, 'SearchIcon');

const SearchActionViewWrapper = styled(Row)`
  justify-content: space-between;
`;

export const BaseSearchActionView = ({
  searchView,
}) => {
  // TODO: Need to work on this.
  const [showSearchView, setShowSearchView] = useState(false);
  return (
    <SearchActionViewWrapper>
      <div className="seach-icon-wrapper">
        <SVGIcon
          heightPx={24}
        >
          <SearchIcon
            onClick={() => setShowSearchView(true)}
          />
        </SVGIcon>
      </div>
      <SideBarView
        show={showSearchView}
        onClose={() => setShowSearchView(false)}
      >
        {searchView}
      </SideBarView>
    </SearchActionViewWrapper>
  );
};

BaseSearchActionView.propTypes = {
  searchView: PropTypes.element,
};

export const SearchActionView = withDependencySupport(BaseSearchActionView, 'SearchActionView');
