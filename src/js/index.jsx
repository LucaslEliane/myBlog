import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize';
import '../less/main.less';
import NavBar from './navBar.jsx';
import Passage from './passage.jsx';

class PassageDiv extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className="passage">
                <NavBar />
                <Passage />
            </div>
        );
    }
}

ReactDOM.render(
    <PassageDiv />,
    document.querySelector('.passage')
);