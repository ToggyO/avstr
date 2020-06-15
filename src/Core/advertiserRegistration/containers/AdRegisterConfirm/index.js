import React, { useEffect } from 'react';

const AdRegisterConfirm = () => {
    const url = new URL(window.location);
    const user = url.searchParams.get('user');
    const code = url.searchParams.get('code');

    console.log(user);
    console.log(code);

    useEffect(() => {
        // api
    });

    return (
        <div>
            Загрузка
        </div>
    );
};

AdRegisterConfirm.propTypes = {

};

export default AdRegisterConfirm;
