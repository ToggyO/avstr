import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as IconAttention } from './iconTypes/attention.svg';
import { ReactComponent as IconBan } from './iconTypes/ban.svg';
import { ReactComponent as IconCar } from './iconTypes/car.svg';
import { ReactComponent as IconCheckMark } from './iconTypes/check-mark.svg';
import { ReactComponent as IconCloseCross } from './iconTypes/close-cross.svg';
import { ReactComponent as IconCollapse } from './iconTypes/collapse.svg';
import { ReactComponent as IconErrorTriangle } from './iconTypes/error-triangle.svg';
import { ReactComponent as IconEye } from './iconTypes/eye.svg';
import { ReactComponent as IconEyeHide } from './iconTypes/eye-hide.svg';
import { ReactComponent as IconFullScreen } from './iconTypes/full-screen.svg';
import { ReactComponent as IconImg } from './iconTypes/img.svg';
import { ReactComponent as IconMapMark } from './iconTypes/map-mark.svg';
import { ReactComponent as IconMoreVertical } from './iconTypes/more-vertical.svg';
import { ReactComponent as IconPause } from './iconTypes/pause.svg';
import { ReactComponent as IconPen } from './iconTypes/pen.svg';
import { ReactComponent as IconPlay } from './iconTypes/play.svg';
import { ReactComponent as IconPlus } from './iconTypes/plus.svg';
import { ReactComponent as IconPreloader } from './iconTypes/preloader.svg';
import { ReactComponent as IconTrashCan } from './iconTypes/trash-can.svg';
import { ReactComponent as IconTrashCanFilled } from './iconTypes/trash-can-filled.svg';
import { ReactComponent as IconUser } from './iconTypes/user.svg';


import styles from './index.module.scss';

const iconsTypes = {
    attention: IconAttention,
    ban: IconBan,
    car: IconCar,
    check: IconCheckMark,
    close: IconCloseCross,
    collapse: IconCollapse,
    errorTriangle: IconErrorTriangle,
    eye: IconEye,
    eyeHide: IconEyeHide,
    fullScreen: IconFullScreen,
    img: IconImg,
    map: IconMapMark,
    moreVertical: IconMoreVertical,
    pause: IconPause,
    pen: IconPen,
    play: IconPlay,
    plus: IconPlus,
    preloader: IconPreloader,
    trashCan: IconTrashCan,
    trashCanFilled: IconTrashCanFilled,
    user: IconUser,
};

const Icon = ({ name, color, className }) => {
    const Component = iconsTypes[name];
    if (!Component) return null;

    return (
        <Component
            className={
                cn(
                    styles.icon,
                    styles[name],
                    className,
                )
            }
            style={{ color }}
        />
    );
};

Icon.defaultProps = {
    name: '',
    color: '',
    className: '',
};

Icon.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
};

export default Icon;
