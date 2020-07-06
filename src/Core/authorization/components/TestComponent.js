import React, { useState } from 'react';
import api from '../../api';

const TestComponent = () => {
    const [movies, setMovies] = useState([]);

    const handleGetClick = async () => {
        const res = await api.get('API/movies');
        setMovies(res.models);
    };

    const handlePostClick = async () => {
        await api.post('API/movies', {
            name: 'Star Wars',
            year: 1974,
        });
    };

    const handlePutClick = async () => {
        await api.put('API/movies/1', {
            name: 'qwerty',
            year: 9999,
        });
    };

    const handleDeleteClick = async () => {
        await api.delete('API/movies/2');
    };

    // Errors
    const handle400Click = async () => {
        await api.post('API/400');
    };

    const handle401Click = async () => {
        await api.post('API/401');
    };

    const handle403Click = async () => {
        await api.post('API/403');
    };

    const handle404Click = async () => {
        await api.post('API/404');
    };

    const handle500Click = async () => {
        await api.post('API/500');
    };

    const handleSomeCodeClick = async () => {
        await api.post('API/204');
    };

    return (
        <div>
            <ul>
                {movies.map(({ id, name, year }) => (
                    <li key={id}>
                        {`${name}: ${year}`}
                    </li>
                ))}
            </ul>

            <button type="button" onClick={handleGetClick}>GET</button>
            <button type="button" onClick={handlePostClick}>POST</button>
            <button type="button" onClick={handlePutClick}>PUT</button>
            <button type="button" onClick={handleDeleteClick}>DELETE</button>

            <h3>Errors</h3>

            <button type="button" onClick={handle400Click}>400</button>
            <button type="button" onClick={handle401Click}>401</button>
            <button type="button" onClick={handle403Click}>403</button>
            <button type="button" onClick={handle404Click}>404</button>
            <button type="button" onClick={handle500Click}>500</button>
            <button type="button" onClick={handleSomeCodeClick}>204</button>
        </div>
    );
};

export default TestComponent;
