import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { pageTurn, selectPassage, fetchPassageList, fetchPassage, fetchComment, initPassage, changePassage } from '../actions.jsx'
import Navbar from '../components/Navbar.jsx'
import Passage from '../components/Passage.jsx'
import Comment from '../components/Comment.jsx'
import { Router, Route, browserHistory } from 'react-router'


class AsyncApp extends React.Component{
    constructor (props) {
        super(props)
        this.handleSelect = this.handleSelect.bind(this)
        this.handlePageTurn = this.handlePageTurn.bind(this)
    }



    componentDidMount() {
        const { dispatch, list, content, params } = this.props
        dispatch(selectPassage(params.filter))
        dispatch(pageTurn( list.listPage ))
        dispatch(initPassage( { list, content }))
    }


    handleSelect(nextProps) {
        const { dispatch, list, params, content } = this.props
        dispatch(selectPassage(nextProps))
        dispatch(changePassage(content))
    }

    handlePageTurn(nextPage) {
        this.props.dispatch(pageTurn(nextPage))
    }

    render() {
        const {list, content, params} = this.props
        return (
            <div>
                <header>
                    <nav>
                        <div className="logo">
                            <a href="./index.html">
                                <p>Eliane</p>
                            </a>
                        </div>
                        <ul>
                            <li><a href="#">Blog</a></li><li><a href="#">item</a></li><li><a href="#">item</a></li><li><a href="#">item</a></li>
                        </ul>
                        <button></button>
                    </nav>
                </header>

                <div className="item main-title">
                    <hr/>
                    <h1>The Life With Eliane</h1>
                    <h2>Lucas.</h2>
                    <hr/>
                </div>

                <div className="passage">
                    <Navbar onSelect={this.handleSelect}
                            value={list}
                            onPageTurn={this.handlePageTurn}>
                    </Navbar>
                    <Passage value={content} passageName={this.props.params.filter}>
                    
                    </Passage>
                    <Comment value={content}>
                    </Comment>
                </div>

                <footer>
                    <p>&copy MIT License</p>

                </footer>
            </div>
        )
    }
}

AsyncApp.propTypes = {
    list: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    
    const { list, content } = state;

    return {
        list,
        content
    }
}

export default connect(mapStateToProps)(AsyncApp)