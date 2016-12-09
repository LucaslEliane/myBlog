import { combineReducers } from 'redux'
import {
    SELECT_PASSAGE, REQUEST_PASSAGE_LIST, RECEIVE_PASSAGE_LIST,
    REQUEST_PASSAGE, RECEIVE_PASSAGE, REQUEST_COMMENT,
    RECEIVE_COMMENT, PAGE_TURN
} from './actions.jsx'

function pageTurn(state = 1, action) {
    switch (action.type) {
        case PAGE_TURN:
            return action.currentPage ? action.currentPage: state
        default:
            return state
    }
}

function postPassageList(state, action) {
    switch (action.type) {
        case REQUEST_PASSAGE_LIST:
            return Object.assign({}, state, {
                listIsFetching: false
            })
        case RECEIVE_PASSAGE_LIST:
            return Object.assign({}, state, {
                listContent: action.list.listContent,
                lastPage: Math.ceil(action.list.listContent.length / 8)
            })
        default:
            return state
    }
}

function list(state = {}, action) {
    switch (action.type) {
        case REQUEST_PASSAGE_LIST:
        case RECEIVE_PASSAGE_LIST:
            return Object.assign({}, state, postPassageList(state, action))
        case PAGE_TURN:
            return Object.assign({}, state, {
                listPage: pageTurn(state.listPage, action)
            })
        default:
            return state
    }
}

function selectPassage(state = "index", action) {
    switch (action.type) {
        case SELECT_PASSAGE:
            return action.passageName
        default:
            return state
    }
}

function postPassage(state, action) {
    switch (action.type) {
        case REQUEST_PASSAGE:
            return Object.assign({}, state, {
                contentIsFetching: true,
                lastUpdate: action.lastUpdate
            })
        case RECEIVE_PASSAGE:
            return Object.assign({}, state, {
                passageContent: action.passageContent
            })
        default:
            return state
    }
}

function postComment(state, action) {
    switch (action.type) {
        case REQUEST_COMMENT:
            return Object.assign({}, state)
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {
                commentContent: action.commentContent,
                receivedAt: action.receivedAt
            })
        default:
            return state
    }
}

function content(state = {}, action) {
    switch (action.type) {
        case REQUEST_PASSAGE:
        case RECEIVE_PASSAGE:
            return Object.assign({}, state, postPassage(state, action))
        case REQUEST_COMMENT:
        case RECEIVE_COMMENT:
            return Object.assign({}, state, postComment(state, action))
        case SELECT_PASSAGE:
            return Object.assign({}, state, {
                passageName: selectPassage(state.passageName, action)
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    list,
    content
})

export default rootReducer
