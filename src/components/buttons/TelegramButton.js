import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Telegram from '__assets/icons/Telegram';
import checkTelegram from '__services/backend/checkTelegram';
import getAuthentication from '__services/backend/getAuthentication';
import getTelegramLink from '__services/backend/getTelegramLink';

const CountdownTimer = ({ seconds = 60, title = '', onCompleteCallback = () => {} }) => {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (count === 0) {
      onCompleteCallback();
      return;
    }

    const timerId = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [count]);

  return (
    <span>{title} {count} sec</span>
  );
};

const ConnectTgButton =() => {
  const [tgLink, setTgLink] = useState(null);
  const [timeout, setTimeout] = useState(null);

  const issueTelegramLink = async () => {
    const linkInfo = await getTelegramLink()
    setTgLink(linkInfo.link)
    setTimeout(linkInfo.expires_in_seconds)
  }

  return (
    tgLink
    ?
      <div className='flex flex-col mr-2 items-center'>
        <div className='flex flex-col mr-2'>
          <BlueButton text='Connect Telegram' href={tgLink}/>
        </div>
        <div className='absolute flex flex-col mr-2 top-full'>
          <CountdownTimer
            seconds={timeout}
            title='Valid for'
            onCompleteCallback={() => setTgLink(null)}
          />
        </div>
      </div>
    : <Button callback={issueTelegramLink} classNames='border-green text-green w-48'>Get Telegram Link</Button>
  )
}

const BlueButton = ({ text, href }) => (
  <a
    className='flex items-center border-blue btn cursor-pointer primary px-4 py-2 rounded-xl text-base text-blue text-center'
    target='_blank'
    href={href} rel="noreferrer"
  >
    <span className='mr-2'>
      <Telegram/>
    </span>
    {text}
  </a>
)

const TelegramLink = ({ connected, link }) => (
  connected
    ? <BlueButton text='Go to Telegram' href={link}/>
    : <ConnectTgButton/>
)

const TelegramButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connected, setConnected] = useState(null);
  const [link, setLink] = useState(null);

  const authCallback = () => getAuthentication().then((result) => (
    setIsAuthenticated(result)
  ))

  useEffect(() => {
    async function checkAuthentication() {
      await checkTelegram()
        .then((response) => {
          setIsAuthenticated(true)
          setConnected(response.connected)
          setLink(response.link)
        })
        .catch(() => setIsAuthenticated(false))
    }
    checkAuthentication()
  }, [isAuthenticated])

  return (
    <div className='mr-1 relative'>
      {
        isAuthenticated
        ? <TelegramLink connected={connected} link={link}/>
        : <Button callback={authCallback} classNames='border-green text-green'>Authenticate</Button>
      }
    </div>
  );
};

export default TelegramButton;

CountdownTimer.propTypes = {
  seconds: PropTypes.number,
  title: PropTypes.string,
  onCompleteCallback: PropTypes.func,
};

BlueButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

TelegramLink.propTypes = {
  connected: PropTypes.bool,
  link: PropTypes.string,
};
