import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const restAnimationPropsToString = (animProps) => {
    let animPropsArray = [];
    const values = Object.values(animProps);
    if (values.length) {
        animPropsArray = values.reduce((acc, currentValue) => {
            acc.push(currentValue);
            return acc;
        }, []);
        return animPropsArray.join(' ');
    }
    return '';
};

const AnimationWrapper = ({
    show,
    showAnimName,
    hideAnimName,
    restAnimationProps = {},
    style = {},
    children,
}) => {
    const [render, setRender] = useState(show);

    useEffect(() => {
        if (show) setRender(true);
    }, [show]);

    const onAnimationEnd = () => {
        if (!show) setRender(false);
    };

    return render ? (
        <div
            style={{
                animation: `${show ? showAnimName : hideAnimName} ${restAnimationPropsToString(
                    restAnimationProps,
                )}`,
                ...style,
            }}
            onAnimationEnd={onAnimationEnd}
        >
            {children}
        </div>
    ) : null;
};

AnimationWrapper.propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool.isRequired,
    showAnimName: PropTypes.string,
    hideAnimName: PropTypes.string,
    restAnimationProps: PropTypes.objectOf(PropTypes.any),
    style: PropTypes.objectOf(PropTypes.any),
};

AnimationWrapper.defaultProps = {
    children: null,
    showAnimName: 'fadeIn',
    hideAnimName: 'fadeOut',
    restAnimationProps: {},
    style: {},
};

export default AnimationWrapper;
