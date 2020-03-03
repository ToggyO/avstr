import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.App}>
            <header className="App-header">
                <Button
                    className={styles.btn}
                    type="button"
                    onClick={() => {}}
                >
                    click me
                </Button>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
