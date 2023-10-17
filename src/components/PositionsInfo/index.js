import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { WalletContext } from '__contexts/WalletContext';
import ErrorsList from '__components/ErrorsList'
import getPrice from '__services/getPrice';
import fetchPositions from '__services/graph/fetchPositions';
import Position from './Position'
import './styles.css';

const PositionsList = ({ positions }) => {
  useEffect(() => {
    const getData = async () => {
      !positions.errors && await getPrice(positions)
    }

    getData()
  }, [positions])

  return positions.errors
    ? <ErrorsList errors={positions.errors} />
    : <div data-testid='positions-list'>
        {positions && positions.map((position) => (
          <Position key={position.id} position={position} />
        ))}
      </div>
}

const PositionsInfo = () => {
  const { address } = useContext(WalletContext);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (address) {
      const fetchData = async () => {
        const positions = await fetchPositions(address);

        setPositions(positions)
      };
      fetchData();

    }
  }, [address]);

  return address
    ? <PositionsList positions={positions} />
    : <div>Connect wallet</div>;
};

export default PositionsInfo;

PositionsList.propTypes = {
  positions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object).isRequired,
    PropTypes.object
  ])
}
