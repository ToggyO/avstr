import history from 'Core/history';

import styles from './index.module.scss';

const { PUBLIC_URL } = process.env;

const iconPlacemark = `${PUBLIC_URL}/placemark.svg`;
const iconClose = `${PUBLIC_URL}/close-cross.svg`;
const iconArrow = `${PUBLIC_URL}/arrow-right-keyboard.svg`;

export const createPlaceMark = (ymaps, point, balloonLayout, balloonContent) => (
    new ymaps.Placemark(point.coords, {}, {
        iconLayout: 'default#image',
        iconImageHref: iconPlacemark,
        iconImageSize: [22, 22],
        iconImageOffset: [-11, -11],
        balloonShadow: false,
        balloonLayout,
        balloonContentLayout: balloonContent,
        balloonPanelMaxMapArea: 0,
        hideIconOnBalloonOpen: false,
        balloonOffset: [-44, 18],
    })
);

const templateMethodBuild = (self) => {
    const newSelf = self;

    newSelf.constructor.superclass.build.call(newSelf);
    newSelf.element = newSelf.getParentElement().querySelector('[data-block="balloon"]');

    newSelf.element.querySelector('[data-icon="close-balloon"]')
        .addEventListener('click', newSelf.onCloseClick.bind(newSelf));
};

const templateMethodClear = (self) => {
    self.element.querySelector('[data-icon="close-balloon"]')
        .removeEventListener('click', self.onCloseClick.bind(self));

    self.constructor.superclass.clear.call(self);
};

const templateMethodClose = (self) => {
    self.events.fire('userclose');
};

const templateGetShape = (self, ymaps) => {
    const {
        element: {
            offsetTop,
            offsetLeft,
            offsetWidth,
            offsetHeight,
        },
    } = self;

    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
        [offsetLeft, offsetTop], [
            offsetLeft + offsetWidth,
            offsetTop + offsetHeight + 40,
        ],
    ]));
};

export const createBalloonLayoutTemplate = (ymaps) => (
    ymaps.templateLayoutFactory.createClass(
        `<div data-block="balloon" class=${styles.balloon}>
            <i
                data-icon="close-balloon"
                class=${styles.close}
                style="background-image: url(${iconClose})"
            >
            </i>
            <div>$[[options.contentLayout observeSize minWidth=235 maxWidth=330 maxHeight=230]]</div>
        </div>`, {
            build() {
                templateMethodBuild(this);
            },

            clear() {
                templateMethodClear(this);
            },

            onCloseClick() {
                templateMethodClose(this);
            },

            getShape() {
                return templateGetShape(this, ymaps);
            },
        },
    )
);

export const toDeviceMonitoring = ({ target }) => {
    if (target.hasAttribute('data-device-id')) {
        const { deviceId } = target.dataset;
        const linkUrl = `/devices/monitoring/${deviceId}`;
        if (target.id === `balloon-link-${deviceId}`) {
            history.push(linkUrl, { goBackPath: '/devices/main/map' });
        }
    }
};

export const createBalloonContentTemplate = (ymaps, { title, descr, deviceId }) => {
    const id = `balloon-link-${deviceId}`;

    return (
        ymaps.templateLayoutFactory.createClass(
            `<div class=${styles.info}>
                <div class=${styles.name}>${title}</div>
                <div class=${styles.id}>${descr}</div>
                <div id=${id} class=${styles.link} data-device-id=${deviceId}>
                    Мониторинг устройства
                    <i class=${styles.arrow} style="background-image: url(${iconArrow})"></i>
                </div>
            </div>`,
        )
    );
};
