/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styled from 'styled-components';
import categoryTreeData from '@/stories/sample-data/categoryTree.json';
import { ServicesTree } from '@/roanuz/lib/servicesTree';
import stickyBarSettings from '@/data/stickyBar/settings';
import { SuperMenuView } from './superMenuView';

export default {
  title: 'Omni Shop / View / Menu',
  component: SuperMenuView,
};

const Wrapper = styled.div`
  > div {
    padding: 10px;
    max-width: 320px;
  }
`;

const Template = (args) => {
  const [superMenuModalActiveFrame, setSuperMenuModalActiveFrame] = useState(-1);
  const updateFrame = () => {
    setSuperMenuModalActiveFrame(1);
  };
  return (
    <Wrapper>
      <SuperMenuView
        superMenuSettings={args.superMenuSettings}
        superMenuTrigger={() => updateFrame()}
        menuContext={{
          superMenuModalActiveFrame,
        }}
        categoryTree={{
          treeLoading: false,
          tree: categoryTreeData.data,
        }}
        serviceTree={ServicesTree}
      />
    </Wrapper>
  );
};

export const SuperMenu = Template.bind({});
SuperMenu.args = {
  superMenuSettings: stickyBarSettings.features.menu.superMenuSettings,
};
