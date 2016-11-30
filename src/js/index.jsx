import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize';
import '../less/main.less';
import { Router, Route, hashHistory } from 'react-router';
import NavBar from './navBar.jsx';
import Passage from './passage.jsx';
import Comment from './comment.jsx';

class PassageDiv extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            currentPassage: ""
        }
        this.refreshCurrentPassage = this.refreshCurrentPassage.bind(this);
    }

    refreshCurrentPassage(cp) {
        this.setState({
            currentPassage: cp
        });
    }

    render() {
        return (
            <div className="passage">
                <NavBar  refreshCurrentPassage={this.refreshCurrentPassage} />
                <Passage currentPassage={this.state.currentPassage}/>
            </div>
        );
    }
}

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={PassageDiv}>
                <Route path="/passage/:name" component={Passage}>
                
                </Route> 
            </Route>
        </Router>
    ),
    document.querySelector('.passage-content')
);