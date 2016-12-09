import { Router, Route, browserHistory } from 'react-router'
import React from 'react'
import { Provider } from 'react-redux'
import { Component} from 'react'
import configureStore from '../configureStore.jsx'
import AsyncApp from './AsyncApp.jsx'
import Passage from '../components/Passage.jsx'
import Comment from '../components/Comment.jsx'



export default class Root extends React.Component {

    constructor(props) {
        super(props)
        this.store = configureStore();
    }

    render() {
        return (
            <Provider store={ this.store }>
                <Router history={browserHistory}>
                    <Route path="/(:filter)" component={AsyncApp}>
                    </Route>
                </Router>
            </Provider>            
        )
    }
}
