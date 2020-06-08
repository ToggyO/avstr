// TODO(toleg): добавить prop-types
import React, { useState, useEffect } from 'react';

const restAnimationPropsToString = animProps => {
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

export const AnimationWrapper = ({
    show,
    showAnimName = 'fadeIn',
    hideAnimName = 'fadeOut',
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
