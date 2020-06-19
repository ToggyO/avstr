import { useEffect, useState } from 'react';

import { ERROR_CODES } from '../constants';
import { transformErrorToForm } from './common';

/**
 * Функция пробрасывает обработанные ошибки с API в инстанс формы
 * @return {Array<object>} errorsFromBackend - массив ошибок с API
 * @return {object} formInstance - инстанс формы
 * @return {void}
 */
// eslint-disable-next-line import/prefer-default-export
export const useBackendErrors = (errorsFromBackend = [], formInstance = {}) => {
    useEffect(() => {
        if (errorsFromBackend.length && formInstance) {
            const transformedErrors = transformErrorToForm(errorsFromBackend, ERROR_CODES, formInstance);
            formInstance.setFields(transformedErrors);
        }
    }, [errorsFromBackend, formInstance]);
};

/**
 * Функция позволяет менять статус валидации FormItemWrapper
 * @param {object} form - инстанс формы Ant Design
 * @param {{ [key]: string }} validationRegExObj - объект,
 * где значением ключа является регулярное выражение
 * @param {string} fieldName - имя валидируемого поля
 * @return {object} - возвращаемое значение {
 *     validationStatus: boolean,
 *     setValidationStatus: Function,
 *     checkPatterns: (value) => Function,
 * }
 */
export const useValidationStatus = (form, validationRegExObj, fieldName) => {
    const [validationStatus, setValidationStatus] = useState(undefined);

    const checkPatterns = (value) => {
        let status;
        const validPatternsRulesCount = Object.values(validationRegExObj).reduce((acc, regExp) => {
            const test = regExp.test(value);
            if (test) {
                acc.push(test);
            }
            return acc;
        }, []).length;
        const isFieldTouched = form.isFieldTouched(fieldName);

        switch (validPatternsRulesCount) {
            case !isFieldTouched && 0:
                status = 'success';
                break;
            case isFieldTouched && 0:
                status = 'error';
                break;
            case 1:
            case 2:
                status = 'error';
                break;
            case 3:
            case 4:
                status = 'warning';
                break;
            case 5:
                status = 'success';
                break;
            default:
                status = 'error';
                break;
        }

        setValidationStatus(status);
    };

    return {
        validationStatus,
        setValidationStatus,
        checkPatterns,
    };
};
