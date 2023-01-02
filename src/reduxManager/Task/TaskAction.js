import { getStore } from '../store/store';
store = getStore();
export const ActionTypes = {
    SET_TASK_DETAILS: 'SET_TASK_DETAILS',
    RESET_TASK_DETAILS: 'RESET_TASK_DETAILS'
}

const setTaskDetails = (userDetails) => {
    store.dispatch({ type: ActionTypes.SET_TASK_DETAILS, payload: userDetails });
}

const resetTaskDetails = () => {
    store.dispatch({ type: ActionTypes.RESET_TASK_DETAILS });
}
export default {
    setTaskDetails,
    resetTaskDetails,
}