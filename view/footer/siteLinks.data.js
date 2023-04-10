import React from 'react';
import { ReactComponent as FacebookIcon } from '@/roanuz/view/imgs/FacebookIcon.svg';
import { ReactComponent as TwitterIcon } from '@/roanuz/view/imgs/TwitterIcon.svg';

export const SiteLinksData = {
  column1: {
    header: 'Þjónusta',
    links: [
      {
        path: 'greioslumatar',
        title: 'Greiðslumátar',
      },
      {
        path: 'afhendingarmatar',
        title: 'Afhendingarmátar',
      },
      {
        path: 'verkstaedi',
        title: 'Verkstæði',
      },
      {
        path: 'fyrirtaekjapjonusta',
        title: 'Fyrirtækjaþjónusta',
      },
      {
        path: 'abyrg',
        title: 'Ábyrgð',
      },
      {
        path: 'vi-botartrygging',
        title: 'Viðbótartrygging',
      },
      {
        path: 'skilarettur',
        title: 'Skilaréttur',
      },
    ],
  },
  column2: {
    header: 'Um Heimilistæki',
    links: [
      {
        path: 'um-tolvulistann',
        title: 'Um okkur',
      },
      {
        path: 'atvinna',
        title: 'Atvinna',
      },
      {
        path: 'netklubbur',
        title: 'Netklúbbur',
      },
      {
        path: 'contact',
        title: 'Hafðu samband',
      },
      {
        path: null,
        title: null,
        socialLinksList: [
          {
            alt: 'Facebook',
            path: 'https://www.facebook.com/roanuz/',
            icon: <FacebookIcon />,
          },
          {
            alt: 'Twitter',
            path: 'https://twitter.com/theroanuz',
            icon: <TwitterIcon />,
          },
        ],
      },
    ],
  },
};
