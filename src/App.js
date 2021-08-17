import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import logo from './assets/pokeapi_256.png';
import PokeCard from './pokeCard/PokeCard';

function App() {
  const [offset, setOffset] = useState(0);
  const [maximum, setMaximum] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pokeData, setPokeData] = useState(null);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        setPokeData(result.data);
        setMaximum(result.data.count);
        setLastPage(Math.floor(result.data.count / 20));
      } catch(e) {
        setError(true);
        console.error(e);
      }
      setLoading(false);
    }

    fetchData();
  }, [offset]);

  function handlePrev() {
    if (offset > 0) {
      setOffset(offset - 20);
    }
  }
  function handleNext() {
    if (offset + 20 < maximum) {
      setOffset(offset + 20);
    }
  }
  function gotoFirstPage() {
    setOffset(0);
  }
  function gotoLastPage() {
    setOffset(20 * lastPage);
  }

  return (
    <main role="main" className="main-container">
      <div className="poke-logo">
        <img id="poke-logo" src={logo} alt="PokeAPI logo" />
      </div>
      <section className="poke-nav">
        <div>
          <p>Pagina {Math.ceil(offset / 20) + 1} van {lastPage + 1}</p>
        </div>
        <div>
          <button type="button" onClick={gotoFirstPage} disabled={offset === 0}>&lt;&lt; Eerste</button>
          <button type="button" onClick={handlePrev} disabled={offset === 0}>&lt; Vorige</button>
          <button type="button" onClick={handleNext} disabled={offset + 20 > maximum}>Volgende &gt;</button>
          <button type="button" onClick={gotoLastPage} disabled={offset + 20 > maximum}>Laatste &gt;&gt;</button>
        </div>
      </section>
      {error && !loading && (
        <section className="poke-api-error">
          <h4>Er ging iets mis!</h4>
        </section>
      )}
      {loading && !error && (
        <section className="poke-loading">
          <h4>Loading...</h4>
        </section>
      )}
      {pokeData && !error && !loading && (
        <section className="poke-content">
          {pokeData.results.map((pokemon, index) => {
            return (
              <PokeCard url={pokemon.url} key={index} />
            );
          })}
        </section>
      )}
    </main>
  );
};

export default App;
