import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { withDependencySupport } from '@/roanuz/lib/dep';
import RoanuzLogo from '@/roanuz/view/imgs/RoanuzLogo.svg';
import { ImageView } from '@/roanuz/view/image';

export const BaseLogoView = ({ logo = RoanuzLogo, href = '/', className }) => {
  return (
    <Link href={href}>
      <a alt="Goto Home" className="plain">
        <ImageView
          src={logo}
          alt="Logo"
          className={className}
        />
      </a>
    </Link>
  );
};

BaseLogoView.propTypes = {
  logo: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
};

export const LogoView = withDependencySupport(BaseLogoView, 'LogoView');
