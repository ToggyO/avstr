import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as IconArrowDown } from './iconTypes/arrow-down.svg';
import { ReactComponent as IconArrowDownMini } from './iconTypes/arrow-down-mini.svg';
import { ReactComponent as IconArrowLeft } from './iconTypes/arrow-left.svg';
import { ReactComponent as IconArrowLeftDouble } from './iconTypes/arrow-left-double.svg';
import { ReactComponent as IconArrowLeftKeyboard } from './iconTypes/arrow-left-keyboard.svg';
import { ReactComponent as IconArrowRight } from './iconTypes/arrow-right.svg';
import { ReactComponent as IconArrowRightDouble } from './iconTypes/arrow-right-double.svg';
import { ReactComponent as IconArrowRightKeyboard } from './iconTypes/arrow-right-keyboard.svg';
import { ReactComponent as IconArrowUp } from './iconTypes/arrow-up.svg';
import { ReactComponent as IconArrowUpMini } from './iconTypes/arrow-up-mini.svg';
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
    arrowDown: IconArrowDown,
    arrowDownMini: IconArrowDownMini,
    arrowLeft: IconArrowLeft,
    arrowLeftDouble: IconArrowLeftDouble,
    arrowLeftKeyboard: IconArrowLeftKeyboard,
    arrowRight: IconArrowRight,
    arrowRightDouble: IconArrowRightDouble,
    arrowRightKeyboard: IconArrowRightKeyboard,
    arrowUp: IconArrowUp,
    arrowUpMini: IconArrowUpMini,
    attention: IconAttention,
    ban: IconBan,
    car: IconCar,
    checkMark: IconCheckMark,
    closeCross: IconCloseCross,
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

const Icon = ({
    name,
    color,
    className,
    ...attrs
}) => {
    const Component = iconsTypes[name];
    if (!Component) return null;

    return (
        <Component
            className={
                cn(
                    styles.icon,
                    className,
                )
            }
            name={name}
            {...attrs}
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
