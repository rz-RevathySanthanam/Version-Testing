import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { asRem } from '@/roanuz/lib/css';
import { Text16 } from '@/roanuz/typopgraphy';
import Link from 'next/link';

const SocialLinksWrapper = styled.div`
  display: flex;
  a {
    padding-right: 0;
    padding-left: 0;
    margin-right: ${asRem(20)};
    display: inline-block;
    font-weight: normal;
    color: var(--color-text);
    &.block-mode {
      display: block;
    }
    >span {
      display: flex;
      align-items: center;
    }
    .rz-svg-icon {
      padding-right: 0;
      color: #fff;
      &:hover {
        opacity: 0.8;
      }
    }
    svg {
      height: ${asRem(24)};
    }
    .label {
      padding-left: ${asRem(8)};
    }
  }
`;

export const SocialLinks = ({ socialLinks, mode }) => {
  return (
    <SocialLinksWrapper className="social-links" mode={mode}>
      {socialLinks.map((link, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Link href={link.path} prefetch={false} key={index}>
          <a target="_blank" alt={link.alt} title={link.alt} className={link.displayLabel ? 'block-mode' : null}>
            <span>
              {link.icon}
              {link.displayLabel && (<Text16 className="label">{link.displayLabel}</Text16>)}
            </span>
          </a>
        </Link>
      ))}
    </SocialLinksWrapper>
  );
};

SocialLinks.propTypes = {
  socialLinks: PropTypes.array,
  mode: PropTypes.string,
};
