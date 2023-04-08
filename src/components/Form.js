import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const API_KEY = 'f747bce06925a6c795e98a5241e205fd';
// const API_URL = "https://api.themoviedb.org/3/movie/550?api_key=f747bce06925a6c795e98a5241e205fd"

// const API_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=f747bce06925a6c795e98a5241e205fd&language=fr-FR&page=1"

// const API_QUERY = "https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query="

const Form = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [search, setSearch] = useState('code');
    const [sortGoodBad, setSortGoodBad] = useState('');

    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query=${search}`
            )
            .then((res) => {
                setMoviesData(res.data.results);
            });
    }, [search]);

    return (
        <div className="form-component">
            <div className="form-container">
                <form>
                    <input
                        type="text"
                        placeholder="Entrez le titre d'un film"
                        id="search-input"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <input type="submit" value="Rechercher" />
                </form>
                <div className="btn-sort-container">
                    <button
                        className="btn-sort"
                        id="goodToBad"
                        onClick={() => setSortGoodBad('goodToBad')}
                    >
                        Top <span> ➡️ </span>
                    </button>
                    <button
                        className="btn-sort"
                        id="badToGood"
                        onClick={() => setSortGoodBad('badToGood')}
                    >
                        Flop <span> ➡️ </span>
                    </button>
                </div>
            </div>
            <div className="result">
                {moviesData
                    .slice(0, 10)
                    .sort((a, b) => {
                        if (sortGoodBad === 'goodToBad') {
                            return b.vote_average - a.vote_average;
                        } else if (sortGoodBad === 'badToGood') {
                            return a.vote_average - b.vote_average;
                        }
                    })
                    .map((movie) => (
                        <Card movie={movie} key={movie.id} />
                    ))}
            </div>
        </div>
    );
};

export default Form;
