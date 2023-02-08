import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { trendingDown, trendingUp } from "../../helpers/table_helpers";
import { formatNumber } from "../../helpers/table_helpers";
import percentChangedHelper from "../../helpers/percentChange";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";

export default function StockItems(props) {


  const [dropdown, setDropdown] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const {user} = useAuth0();

  const percentChange = classNames({
    "positive": props.change >= 0,
    "negative": props.change < 0
  });

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:8080/checkIfFavorite', {
        params: {
          email: user.email,
          apiId: props.id,
          category: 'stocks'
        }
      })
      .then(result => {
        setFavorite(result.data.isFavorite);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [user]);

  const handleClick = () => {
    setFavorite(!favorite);
    const payload = {
      email: user.email,
      apiId: props.id,
      category: 'stocks'
    }
    if (favorite) {
      axios.post('http://localhost:8080/favoriteDelete', payload)
        .then(result => {
          console.log('RESULT: ', result);
        })
        .catch(ex => {
          console.log(ex);
        });
    } else {
      axios.post('http://localhost:8080/favoriteInsert', payload)
        .then(result => {
          console.log('RESULT: ', result);
        })
        .catch(ex => {
          console.log(ex);
        });
    }
  };

  return (
    <>
      <tr>
        <td onClick={handleClick}>
          <i className={ favorite ? "fa-solid fa-star favorited" : "fa-regular fa-star"}></i>
        </td>

        <td className="symbol-data">
         <Link to={`/stocks/${props.stock}`}>
          {props.stock} 
         </Link> 
        </td>

        <td>{formatNumber(props.price)}</td>

        <td>{formatNumber(props.prevClose)}</td>
        
        <td className={percentChange}>{props.change >= 0 ? trendingUp : trendingDown} {props.change}%</td>

        <td onClick={() => setDropdown(!dropdown)} ><button className="btn btn-outline-warning"><FontAwesomeIcon icon={faCaretDown} /></button></td>
      </tr>
      {dropdown && <tr><td colSpan={10}>Chart</td></tr>}
    </>
  );
};