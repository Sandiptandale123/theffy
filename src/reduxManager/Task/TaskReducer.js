const initialState = null;
const userReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'SET_TASK_DETAILS':
            // if (Array.isArray(action.payload) && action.payload.length > 0) {
            //     return action.payload
            // }
            if (action.payload) {
                return action.payload
            }
            return state;
        case 'RESET_TASK_DETAILS':
            return initialState
        default:
            return state;
    }
}

export default userReducer;
