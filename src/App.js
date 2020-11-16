import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';


const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'


function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      axios.get(apiURL).then(res => {
        res.data.filter((el => el.id != null))
        setCoins(res.data.filter((el => el.name != 'Aave ETH'))) // Bad Data pt in API
        console.log("coins: ", coins);
        //setCoins(res.data);
      })
    } catch (error) {
      return error;
    }
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coins => 
    coins.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        )
      })}
    </div>
  );
}

export default App;
