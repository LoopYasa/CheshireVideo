import { CHANGEKEYWORD, CHANGEID, CHANGECOOKIE,
        CHANGEEP, CHANGESEASONID
} from "./constant"

export const createKeywordAction = data => ({type: CHANGEKEYWORD, data})
export const createIdAction = data => ({type: CHANGEID, data})
export const createCookie = data => ({type: CHANGECOOKIE, data})
export const createSeasonid = data => ({type: CHANGESEASONID, data})
export const createEp = data => ({type: CHANGEEP, data})