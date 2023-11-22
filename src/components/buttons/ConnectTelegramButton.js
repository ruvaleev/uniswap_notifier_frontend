import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TELEGRAM_LINK_SECONDS } from '__constants';
import checkAuth from '__services/backend/checkAuth';
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

const TgLinkButton =() => {
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

const ConnectTelegramButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const authCallback = () => getAuthentication().then((result) => (
    setIsAuthenticated(result)
  ))

  useEffect(() => {
    async function checkAuthentication() {
      await checkAuth().then((result) => setIsAuthenticated(result))
    }
    checkAuthentication()
  }, [])

  return (
    <div className='relative'>
      {
        isAuthenticated
        ? <TgLinkButton/>
        : <AuthenticationButton callback={authCallback}/>
      }
    </div>
  );
};

export default ConnectTelegramButton;

AuthenticationButton.propTypes = {
  callback: PropTypes.func.isRequired,
};

CountdownTimer.propTypes = {
  seconds: PropTypes.number,
  title: PropTypes.string,
  onCompleteCallback: PropTypes.func,
};
