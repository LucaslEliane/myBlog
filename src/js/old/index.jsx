import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize';
import '../less/main.less';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';
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
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    (
        <Router path="/" history={hashHistory}>
            <Route path="/blog/" component={PassageDiv}>
                <IndexRedirect to="/blog/index"></IndexRedirect>      
                <Route path="/blog/:name" component={Passage}></Route>
            </Route>
        </Router>    
    ),
    document.querySelector('.passage-content')
);