import React, {useState, useEffect} from 'react';
import axios from "axios";
import './PokeCard.css';

function PokeCard({url}) {
  const [pokeData, setPokeData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      setLoading(true);
      try {
        const result = await axios.get(url);
        setPokeData(result.data);
      } catch(e) {
        setError(true);
        console.error(e);
      }
      setLoading(false);
    }

    if (url) {
      fetchData();
    }
  }, [url]);

  return (
    <article className="poke-card">
      {error && (
        <div className="poke-api-error">
          <h4>Er ging iets mis!</h4>
        </div>
      )}
      {loading && !error && (
        <div className="poke-loading">
          <h4>Loading...</h4>
        </div>
      )}
      {pokeData && !error && (
        <div className="poke-card">
          <h3>{pokeData.name}</h3>
          <img src={pokeData.sprites.front_default} alt={pokeData.name} />
          <p><b>Moves</b>: {pokeData.moves.length}</p>
          <p><b>Weight</b>: {pokeData.weight}</p>
          <h4>Abilities:</h4>
          <ul>
          {pokeData.abilities.map((ability, index) => {
            return (
            <li key={index}>
              {ability.ability.name}
            </li>
          )})}
          </ul>
        </div>)
      }
    </article>
  );
}

export default PokeCard;
