import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import getFees from '__services/getFees';
import getPool from '__services/getPool';

const FeesInfo = ({position}) => {
  const [fees, setFees] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await getPool(position.pool.id, position.tickLower, position.tickUpper)
      const fees = getFees(
        BigNumber(res.feeGrowthGlobal0X128.toString()),
        BigNumber(res.feeGrowthGlobal1X128.toString()),
        BigNumber(res.lowTickFeeGrowthOutside0X128.toString()),
        BigNumber(res.highTickFeeGrowthOutside0X128.toString()),
        BigNumber(position.feeGrowthInside0LastX128),
        BigNumber(res.lowTickFeeGrowthOutside1X128.toString()),
        BigNumber(res.highTickFeeGrowthOutside1X128.toString()),
        BigNumber(position.feeGrowthInside1LastX128),
        BigNumber(position.liquidity),
        position.token0.decimals,
        position.token1.decimals,
        Number(position.tickLower),
        Number(position.tickUpper),
        Number(position.pool.tick)
      )

      setFees(fees)
    }
    fetchData()
  }, []);



  return (
    <>
      <div className="grid-item">Earned Fees:</div>
      {
        Object.keys(fees).length === 0
        ? <div className="grid-item">No info</div>
        : <>
            <div className="grid-item">{fees.fees0} of {position.token0.symbol}</div>
            <div className="grid-item">{fees.fees1} of {position.token1.symbol}</div>
          </>
      }
    </>
  )
};

export default FeesInfo;

FeesInfo.propTypes = {
  position: PropTypes.object.isRequired
}
