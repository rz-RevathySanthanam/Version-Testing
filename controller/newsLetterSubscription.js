import React, { useState } from 'react';
import { NewsLetterSubscription } from '@/roanuz/view/footer/newsLetterSubscription';

export const NewsLetterSubscriptionController = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formInitValue, setFormInitValue] = useState('');

  const onSave = () => {
    // Write Mutation.
    setShowPopup(true);
    setFormInitValue('');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const buildSaveInput = {
      email: formInitValue,
    };

    if (onSave) {
      onSave(buildSaveInput);
    }
  };

  return (
    <NewsLetterSubscription
      roundedCorners
      pointerIcon
      showPopup={showPopup}
      submitHandler={submitHandler}
      error={{}} // Add error here
      onClosePopup={() => setShowPopup(false)}
      formInitValue={formInitValue}
      setFormInitValue={setFormInitValue}
    />
  );
};
