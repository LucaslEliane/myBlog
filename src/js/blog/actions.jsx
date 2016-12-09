import fetch from 'isomorphic-fetch'

export const SELECT_PASSAGE = "SELECT_PASSAGE"
export const REQUEST_PASSAGE_LIST = "REQUEST_PASSAGE_LIST"
export const RECEIVE_PASSAGE_LIST = "RECEIVE_PASSAGE_LIST"
export const REQUEST_PASSAGE = "REQUEST_PASSAGE"
export const RECEIVE_PASSAGE = "RECEIVE_PASSAGE"
export const REQUEST_COMMENT = "REQUEST_COMMENT"
export const RECEIVE_COMMENT = "RECEIVE_COMMENT"
export const PAGE_TURN = "PAGE_TURN"

export function pageTurn(currentPage) {
    return {
        type: PAGE_TURN,
        currentPage
    }
}

export function selectPassage(passageName) {
    return {
        type: SELECT_PASSAGE,
        passageName
    }
}

function requestPassageList(list) {
    return {
        type: REQUEST_PASSAGE_LIST,
        list
    }
}

function requestPassage(content) {
    return {
        type: REQUEST_PASSAGE,
        content,
        lastUpdate: Date.now()
    }
}

function requestComment(content) {
    return {
        type: REQUEST_COMMENT,
        content
    }
}

export function receivePassage(content, json) {
    return {
        type: RECEIVE_PASSAGE,
        content,
        passageContent: json
    }
}

export function receiveComment(content, json) {
    return {
        type: RECEIVE_COMMENT,
        content,
        receivedAt: Date.now(),
        commentContent: json
    }
}

export function receivePassageList(list, json) {
    return {
        type: RECEIVE_PASSAGE_LIST,
        list: json
    }
}

export function fetchPassageList(list) {
    return dispatch => {
        dispatch(requestPassageList(list))
        return fetch('../resources/data/passage.json')
            .then(response => response.json())
            .then(json => dispatch(receivePassageList(list, json)))
    }
}

export function fetchPassage(content) {
    return (dispatch, getState) => {
        dispatch(requestPassage(content))
        content = getState().content
        return fetch('../resources/data/' + content.passageName + '.json')
            .then(response => response.json())
            .then(json => dispatch(receivePassage(content, json)))
    }
}


export function fetchComment(content) {
    return (dispatch, getState) => {
        dispatch(requestComment(content))
        content = getState().content
        return fetch('../resources/comment/' + content.passageName + '.json')
            .then(response => response.json())
            .then(json => dispatch(receiveComment(content, json)))
    }
}

export function initPassage(state) {
    return dispatch => {
        dispatch(requestPassageList(state.list))
        return fetch('../resources/data/passage.json')
            .then(response => response.json())
            .then(json => dispatch(receivePassageList(state.list, json)))
            .then(() => {
                dispatch(fetchPassage(state.content))
                dispatch(fetchComment(state.content))
            })
    }
}

export function changePassage(state) {
    return dispatch => {
        dispatch(fetchPassage(state.content))
        dispatch(fetchComment(state.content))
    }
}