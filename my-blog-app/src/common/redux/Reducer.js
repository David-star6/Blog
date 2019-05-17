const initiaState = {
    status: '点击',
    inSuccess: false,
    user: null,
}

export default function loginIn(state = initiaState, action) {
    switch (action.type) {
        case '1':
            return {
                ...state,
                status: 'longni',
                isSuccess: false,
                user: null
            }
            break;
        default:
            return state;
    }
}