import React from 'react';
import { withDependencySupport } from '@/roanuz/lib/dep';
import { FooterView } from '@/roanuz/view/footer/footer';
import { NewsLetterSubscriptionController } from './newsLetterSubscription';

export const BaseFooterController = () => {
  return (
    <FooterView
      newsLetter={(<NewsLetterSubscriptionController />)}
    />
  );
};

BaseFooterController.propTypes = {
};

export const FooterController = withDependencySupport(BaseFooterController, 'FooterController');
