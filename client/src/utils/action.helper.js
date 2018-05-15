export const createActionSet = actionName => ({
    PENDING: `${actionName}_PENDING`,
    FULFILLED: `${actionName}_FULFILLED`,
    REJECTED: `${actionName}_REJECTED`,
    BASE: `${actionName}`
});
