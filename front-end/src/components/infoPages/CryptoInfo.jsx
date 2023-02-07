import { useParams } from "react-router-dom";
import useCryptoData from "../../hooks/useCryptoData";
import "../../styles/infoPage.scss";
import CryptoChart from "../charts/CryptoChart";
import { formatNumber, trendingDown, trendingUp } from "../../helpers/table_helpers";
import { useState } from "react";

export default function CryptoInfo(props) {
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const { cryptoData } = useCryptoData(
    `coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&sparkline=false`
  );

  console.log(cryptoData);
  const handleClick = () => {
    setFavorite(!favorite);
  };

  return (
    <div className="infos">
      {cryptoData ? (
        <>
          <h1>
            <img src={cryptoData.image.small} alt={cryptoData.name} />
            {cryptoData.name}
          </h1>
          <div className="chart-info-container">
            <CryptoChart />
            <div className="info-details">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col"><button className="btn btn-outline-light">1 day</button></th>
                    <th scope="col"><button className="btn btn-outline-light">7 day</button></th>
                    <th scope="col"><button className="btn btn-outline-light">14 day</button></th>
                    <th scope="col"><button className="btn btn-outline-light">30 day</button></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={cryptoData.market_data.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                      {cryptoData.market_data.price_change_percentage_24h >= 0 ? trendingUp : trendingDown}<br/> 
                      %{formatNumber(cryptoData.market_data.price_change_percentage_24h)}
                    </td>
                    <td className={cryptoData.market_data.price_change_percentage_7d >= 0 ? 'positive' : 'negative'}>
                      {cryptoData.market_data.price_change_percentage_7d >= 0 ? trendingUp : trendingDown}<br/>
                      %{formatNumber(cryptoData.market_data.price_change_percentage_7d)}
                    </td>
                    <td className={cryptoData.market_data.price_change_percentage_14d >= 0 ? 'positive' : 'negative'}>
                      {cryptoData.market_data.price_change_percentage_14d >= 0 ? trendingUp : trendingDown}<br/>  
                      %{formatNumber(cryptoData.market_data.price_change_percentage_14d)}
                    </td>
                    <td className={cryptoData.market_data.price_change_percentage_30d >= 0 ? 'positive' : 'negative'}>
                      {cryptoData.market_data.price_change_percentage_30d >= 0 ? trendingUp : trendingDown}<br/>  
                      %{formatNumber(cryptoData.market_data.price_change_percentage_30d)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                Current Price: <strong>${formatNumber(cryptoData.market_data.current_price.usd)}</strong>
                <br />
                Market Cap: <strong>${formatNumber(cryptoData.market_data.market_cap.usd)}</strong> 
                <br />
                24hr volume: <strong>${formatNumber(cryptoData.market_data.total_volume.usd)}</strong>
                <br />
                24hr High: <strong>${formatNumber(cryptoData.market_data.high_24h.usd)}</strong>
                <br />
                24hr Low: <strong>${formatNumber(cryptoData.market_data.low_24h.usd)}</strong>
                <br/>
                Total Supply (<img src={cryptoData.image.thumb} alt="logo"/>): <strong>{formatNumber(cryptoData.market_data.total_supply)}</strong>
              </div>
              <button onClick={handleClick} className="btn btn-light add-to-watchlist">
                <i className={ favorite ? "fa-solid fa-star favorited" : "fa-regular fa-star"}></i> Add to Watchlist
              </button>
            </div>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: cryptoData.description.en }}
          ></p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
