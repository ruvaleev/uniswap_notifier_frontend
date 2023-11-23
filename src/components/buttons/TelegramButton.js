import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TELEGRAM_LINK_SECONDS } from '__constants';
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

  const issueTelegramLink = async () => {
    const link = await getTelegramLink()
    setTgLink(link)
  }

  return (
    tgLink
    ?
      <div className='flex flex-col'>
        <a className='primary' href={tgLink}>Connect Telegram</a>
        <CountdownTimer seconds={TELEGRAM_LINK_SECONDS} title='Valid for' onCompleteCallback={() => setTgLink(null)}/>
      </div>
    :
      <button className="rounded-xl text-base text-center" onClick={issueTelegramLink}>
        Get Telegram Link
      </button>
  )
}

const AuthenticationButton = ({ callback }) => (
  <button className="rounded-xl text-base text-center" onClick={callback}>
    Authenticate
  </button>
)

const TelegramLink = ({ connected, link }) => (
  connected
    ?
      <div className='flex flex-col'>
        <a className='primary' href={link}>Go to Telegram</a>
      </div>
    : <ConnectTgButton/>
)

const TelegramButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
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
  }, [])

  return (
    <div className='relative'>
      {
        isAuthenticated
        ? <TelegramLink connected={connected} link={link}/>
        : <AuthenticationButton callback={authCallback}/>
      }
    </div>
  );
};

export default TelegramButton;

AuthenticationButton.propTypes = {
  callback: PropTypes.func.isRequired,
};

CountdownTimer.propTypes = {
  seconds: PropTypes.number,
  title: PropTypes.string,
  onCompleteCallback: PropTypes.func,
};

TelegramLink.propTypes = {
  connected: PropTypes.bool,
  link: PropTypes.string,
};
