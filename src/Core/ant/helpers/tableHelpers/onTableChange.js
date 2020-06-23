import { stringify } from 'qs';

const onTableChange = (
    paginationParams,
    filters,
    sorter,
    history,
) => {
    console.log('Various parameters', paginationParams, filters, sorter);
    const { location } = history;

    const params = {};

    // sort
    // TODO: modify
    let sorterResult;
    if (Array.isArray(sorter)) {
    // eslint-disable-next-line prefer-destructuring
        sorterResult = sorter[0];
    } else {
        sorterResult = sorter;
    }
    const { field, order } = sorterResult;
    if (field) params.sort = `${field}${order}`; // FIXME: change order literal, when will be done on backend

    // pagination
    const { current, pageSize } = paginationParams;
    params.page = current;
    params.pageSize = pageSize;

    // filters

    history.push(`${location.pathname}?${stringify(params)}`);
};

export default onTableChange;
