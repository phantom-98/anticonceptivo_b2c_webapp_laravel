import {
    NOTIFIES_GET_LIST,
} from "./types";


export default (state, action) => {
    switch (action.type) {
        case NOTIFIES_GET_LIST:
            return {
                ...state,
                notifies: action.payload,
                notifiesCount: (action.payload).length
            };

        default:
            return state;
    }

}
