import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import { Server, Model, Response } from 'miragejs';

import './App.scss';

import store from './store';
import RootRouter from './root/RootRouter';

// eslint-disable-next-line no-new
new Server({
    models: {
        movie: Model,
    },

    routes() {
        this.namespace = 'API';

        this.get('/movies', (schema) => JSON.stringify(schema.movies.all()));

        this.get('/movies/:id', (schema, request) => {
            const { id } = request.params;
            return JSON.stringify(schema.movies.find(id));
        });

        this.post('/movies', (schema, request) => {
            const attrs = JSON.parse(request.requestBody);
            return schema.movies.create(attrs);
        });

        this.put('/movies/:id', (schema, request) => {
            const newAttrs = JSON.parse(request.requestBody);
            const { id } = request.params;
            const movie = schema.movies.find(id);
            return movie.update(newAttrs);
        });

        this.delete('/movies/:id', (schema, request) => {
            const { id } = request.params;
            return schema.movies.find(id).destroy();
        });


        // errors
        this.post('/400', () => {
            const headers = {};
            const data = { errors: ['Error'] };
            return new Response(400, headers, data);
        });

        this.post('/401', () => {
            const headers = {};
            const data = { errors: ['Error'] };
            return new Response(401, headers, data);
        });

        this.post('/403', () => {
            const headers = {};
            const data = { errors: ['Error'] };
            return new Response(403, headers, data);
        });

        this.post('/404', () => {
            const headers = {};
            const data = { errors: ['Error'] };
            return new Response(404, headers, data);
        });

        this.post('/500', () => {
            const headers = {};
            const data = { errors: ['Error'] };
            return new Response(500, headers, data);
        });

        // some code
        this.post('/204', () => {
            const headers = {};
            const data = { errors: ['Error'] };
            return new Response(204, headers, data);
        });
    },

    seeds(server) {
        server.create('movie', { name: 'Inception', year: 2010 });
        server.create('movie', { name: 'Interstellar', year: 2014 });
        server.create('movie', { name: 'Dunkirk', year: 2017 });
    },
});

const App = () => (
    <Provider store={store}>
        <RootRouter />
    </Provider>
);


export default process.env.NODE_ENV === 'development' ? hot(App) : App;
