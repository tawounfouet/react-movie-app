import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Card from '../components/Card';

const API_KEY = 'f747bce06925a6c795e98a5241e205fd';

const LikePage = () => {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        let moviesId = window.localStorage.movies
            ? window.localStorage.movies.split(',')
            : [];

        for (let i = 0; i < moviesId.length; i++) {
            axios
                .get(
                    `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=${API_KEY}&language=fr-FR`
                )
                .then((res) => setListData((listData) => [...listData, res.data]));
        }
        
    }, []);

    return (
        <div className="user-list-page">
            <Header />
            <h2>
                Coups de coeur ❤️‍🔥 <span></span>
            </h2>
            <div className="result">
                {listData.length > 0 ? (
                    listData.map((movie) => (
                        <Card movie={movie} key={movie.id} />
                    ))
                ) : (
                    <p>Vous n'avez pas encore de coup de coeur</p>
                )}
            </div>
        </div>
    );
};

export default LikePage;
