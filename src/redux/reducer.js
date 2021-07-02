import { CHANGEID, CHANGEKEYWORD, CHANGECOOKIE,
        CHANGEEP, CHANGESEASONID
} from "./constant"

const initState = []

export default function Reducer(preState = initState, action) {
    const { type, data } = action
    let result = preState
    switch (type) {
        case CHANGECOOKIE:
            result[0] = data
            return result
        case CHANGEKEYWORD:
            result[1] = data
            return result
        case CHANGEID:
            result[2] = data
            return result
        case CHANGESEASONID:
            result[3] = data
            return result
        case CHANGEEP:
            result[4] = data
            return result
        default:
            return result
    }
}