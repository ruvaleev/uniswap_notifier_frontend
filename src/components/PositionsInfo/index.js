import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import BigNumber from 'bignumber.js';
import { WalletContext } from '__contexts/WalletContext';
import getPrice from '__services/getPrice';
import fetchPositions from '__services/graph/fetchPositions';
import Dashboard from './Dashboard';
import PositionsList from './PositionsList';
import PricesList from './PricesList';

const gettingPositionsStatus = 'gettingPositions'
const gettingPricesStatus = 'gettingPrices'
const doneStatus = 'done'

const statusMessage = {
  [gettingPositionsStatus]: 'Search for positions...',
  [gettingPricesStatus]: 'Getting actual rates...'
}

const Status = ({ status }) => {
  const message = statusMessage[status]
  return message && (
    <div className="flex justify-center" data-testid='dashboard'>
      <div className="my-2">
        <div className="secondary">{message}</div>
      </div>
    </div>
  )
}

const PositionsInfo = () => {
  const { address } = useContext(WalletContext);
  const [positions, setPositions] = useState([]);
  const [prices, setPrices] = useState({});
  const [status, setStatus] = useState(gettingPositionsStatus)
  const [totalResults, setTotalResults] = useState({
    totalUsdValue: BigNumber('0'),
    totalUnclaimedUsdFees: BigNumber('0'),
    totalClaimedUsdFees: BigNumber('0'),
  })

  useEffect(() => {
    if (!address) { return }

    async function fetchPositionsData() {
      await fetchPositions(address)
        .then((positions) => (
          setPositions(positions),
          setStatus(gettingPricesStatus)
        ))
    }

    async function fetchPriceData() {
      if (!positions.errors) {
        const tokens = positions.map((pos) => [pos.token0.symbol, pos.token1.symbol]).flat()
        const prices = await getPrice(tokens);

        setPrices(prices);
        setStatus(doneStatus)
      }
    }

    if (status === gettingPositionsStatus) {
      fetchPositionsData();
    } else if (status === gettingPricesStatus) {
      fetchPriceData()
    }
  }, [address && status])

  const claimedFees = (pos) => (
    pos.feesClaims.reduce((acc, ob) => acc.plus(ob.usdAmount0).plus(ob.usdAmount1), BigNumber('0'))
  )

  const completionCallback = (pos) => {
    setTotalResults(prevTotalResults => ({
      totalUsdValue: prevTotalResults.totalUsdValue.plus(pos.totalUsdValue),
      totalUnclaimedUsdFees: prevTotalResults.totalUnclaimedUsdFees.plus(
        pos.token0.usdFees.plus(pos.token1.usdFees)
      ),
      totalClaimedUsdFees: prevTotalResults.totalClaimedUsdFees.plus(claimedFees(pos)),
    }));
  };

  const { totalUsdValue, totalUnclaimedUsdFees, totalClaimedUsdFees } = totalResults

  return address
    &&
      <>
        <Status status={status} />
        <div className='flex px-6'>
          <div className='flex flex-col min-width-30 mr-7'>
            <Dashboard totalUsdValue={totalUsdValue} totalUnclaimedUsdFees={totalUnclaimedUsdFees} totalClaimedUsdFees={totalClaimedUsdFees}/>
            <PricesList prices={prices} />
          </div>
          {status === doneStatus && <PositionsList positions={positions} prices={prices} completionCallback={(pos) => completionCallback(pos)}/> }
        </div>
      </>
};

export default PositionsInfo;

Status.propTypes = {
  status: PropTypes.string.isRequired
}
