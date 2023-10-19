import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { WalletContext } from '__contexts/WalletContext';
import getPrice from '__services/getPrice';
import fetchPositions from '__services/graph/fetchPositions';
import PositionsList from './PositionsList';
import PricesList from './PricesList';
import './styles.css';

const PositionsInfo = () => {
  const { address } = useContext(WalletContext);
  const [positions, setPositions] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    if (address) {
      const fetchData = async () => {
        const positions = await fetchPositions(address);

        setPositions(positions)
      };
      fetchData();

    }
  }, [address]);

  useEffect(() => {
    async function getData() {
      if (!positions.errors) {
        const tokens = positions.map((pos) => [pos.token0.symbol, pos.token1.symbol]).flat()

        const prices = await getPrice(tokens);
        setPrices(prices);
      }
    }
    getData()
  }, [positions])

  return address
    ?
      <>
        <PricesList prices={prices} />
        <PositionsList positions={positions} prices={prices} />
      </>
    : <div>Connect wallet</div>;
};

export default PositionsInfo;

PositionsList.propTypes = {
  positions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.object
  ])
}
