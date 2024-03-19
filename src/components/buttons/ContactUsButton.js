import React from 'react';

import BlueTgButton from './BlueTgButton';

const ContactUsButton = () => (
  <BlueTgButton
    text='Contact Us'
    href={`https://t.me/${process.env.TELEGRAM_SUPPORT_USERNAME}`}
    addClassName='mr-1'
  />
)

export default ContactUsButton;
