import React from 'react';
import { Loader as Load } from 'semantic-ui-react';
import styles from './index.module.scss';

const Loader = () => (
    <div className={styles.loader}>
        <Load
            active
            inline="centered"
            size="huge"
        />
    </div>
);


export default Loader;
