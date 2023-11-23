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
      <div className='flex flex-col mr-2'>
        <a className='primary' href={tgLink}>Connect Telegram</a>
        <CountdownTimer
          seconds={timeout}
          title='Valid for'
          onCompleteCallback={() => setTgLink(null)}
        />
      </div>
    : <Button callback={issueTelegramLink}>Get Telegram Link</Button>
  )
}

const TelegramLink = ({ connected, link }) => (
  connected
    ?
      <a className='primary' href={link} target='_blank' rel="noreferrer">
        <Telegram size={'2rem'}/>
      </a>
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
        : <Button callback={authCallback}>Authenticate</Button>
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

TelegramLink.propTypes = {
  connected: PropTypes.bool,
  link: PropTypes.string,
};
