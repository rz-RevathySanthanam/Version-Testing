import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { asRem } from '@/roanuz/lib/css';
import { withDependencySupport } from '@/roanuz/lib/dep';

const PrivacyLinksViewWrapper = styled.div`
  border-top: ${asRem(1)} solid var(--color-disabled-4);
  padding: ${asRem(20)} 0;
  padding-bottom: ${asRem(100)};
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    li {
      &:last-child {
        span {
          display: none;
        }
      }
    }
  }
`;

export const BasePrivacyLinksView = () => {
  const links = [
    { name: 'Viðskiptaskilmálar', href: '/vidskiptaskilmalar', alt: 'Links to Viðskiptaskilmálar' },
    { name: 'Vafrakökur', href: '/vafrakokur', alt: 'Links to Vafrakökur' },
  ];
  return (
    <PrivacyLinksViewWrapper className="rz-page-content">
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} prefetch={false}>
              <a alt={link.alt} className="plain">{link.name}</a>
            </Link>
            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          </li>
        ))}
      </ul>
    </PrivacyLinksViewWrapper>
  );
};

BasePrivacyLinksView.propTypes = {
};

export const PrivacyLinksView = withDependencySupport(BasePrivacyLinksView, 'PrivacyLinksView');
