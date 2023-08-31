import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import './CoinInfo.css';
import { CircularProgress } from '@material-ui/core';
import { Chart, Line } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [loading, setLoading] = useState(true);

  const fetchHistoricData = async () => {
    try {
      const response = await axios.get(HistoricalChart(coin?.id, days, currency), { validateStatus: false });
      if (response.status === 200) {
        const data = response.data.prices;
        if (data.length > 0) {
          setHistoricData(data);
        } else {
          throw new Error('Empty historic data');
        }
      } else {
        throw new Error('Error fetching historic data');
      }
    } catch (error) {
      console.log('Error fetching historic data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  if (loading) {
    return (
      <div className="maint">
        <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
      </div>
    );
  }

  if (historicData.length === 0) {
    return (
      <div className="maint">
        <p>No data available.</p>
      </div>
    );
  }

  return (
    <div className="maint">
      <Chart
        className="nnn"
        type="line"
        data={{
          labels: historicData.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: historicData.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: '#EEBC1D',
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div style={{display:"flex",justifyContent:"space-around" , width:"100%" , backgroundColor:"black"}}>
      {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    // setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
      </div>
    </div>
  );
};

export default CoinInfo;
