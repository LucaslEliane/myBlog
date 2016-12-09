import React from 'react';
import ReactDOM from 'react-dom';

class Comment extends React.Component {
    constructor (props) {
        super (props);
    }
    render () {
        return (
            <div className="comment"></div>
        );
    }
}

module.exports = Comment;