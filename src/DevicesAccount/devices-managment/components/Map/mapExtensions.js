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
        balloonShadow: false,
        balloonLayout,
        balloonContentLayout: balloonContent,
        balloonPanelMaxMapArea: 0,
        hideIconOnBalloonOpen: false,
        balloonOffset: [-44, -10],
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
        },
    )
);

export const createBalloonContentTemplate = (ymaps) => (
    ymaps.templateLayoutFactory.createClass(
        `<div class=${styles.info}>
            <div class=${styles.name}>Белая Lada Granta</div>
            <div class=${styles.id}>12i3jhdasdgasdt8321321347234723471</div>
            <a href="#" class=${styles.link}>
                Мониторинг устройства
                <i class=${styles.arrow} style="background-image: url(${iconArrow})"></i>
            </a>
        </div>`,
    )
);
