export const DEFAULT_TABLE_QUERY_PARAMS = {
    PAGE: 1,
    SIZE: 10,
};

export const ADVERTISEMENT_STATUS = {
    1: 'Ожидает показа',
    2: 'Активно',
    4: 'Приостановлено',
    8: 'Завершено',
};

export const ADVERTISEMENT_TAG = {
    1: 'warning',
    2: 'success',
    4: 'error',
    8: 'default',
};

export const USER_ROLES = {
    ADMINISTRATOR: 'Administrator',
    AD_MANAGER: 'AdManager',
    DEVICE_MANAGER: 'DeviceManager',
    ADVERTISER: 'Advertiser',
};

export const REDIRECT_PATH_BY_ROLE = {
    Administrator: '/ad-manager',
    AdManager: '/ad-manager',
    DeviceManager: '/devices/main/list',
    Advertiser: '/advertiser',
};
