import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router';

class NavUl extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            passage: [],
            currentPage: 0,
            pageCount: 0
        }
        this.handleDropClick = this.handleDropClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: "../resources/data/passage.json",
            success: (data) => {
                this.setState({
                    passage: data.passages,
                    currentPage: 0,
                    pageCount: data.passages.length
                });
                this.props.refreshCurrentPassage(data.passages[0].passageName);
            }
        });
    }

    handleDropClick (event) {
        this.setState((preState) => ({
            currentPage: preState.currentPage + 1
        })) 
    }

    handlePrevClick (event) {
        this.setState((preState) => ({
            currentPage: preState.currentPage - 1
        }))
    }

    render() {
        let liArray = [];
        let start = this.state.currentPage * 10;
        let end = (this.state.currentPage * 10 + 10) > this.state.pageCount 
            ? this.state.pageCount
            : this.state.currentPage * 10 + 10; 
        let currentPagePassage = this.state.passage.slice(
            start, end
        );
        let liEle;
        if (this.state.currentPage !== 0) {
            liArray.push(
                <li className="prev" key="prevUp" onClick={this.handlePrevClick}>Previous</li>
            )
        }
        currentPagePassage.forEach((value,index) => {
            if (index < 9) {
                liEle = <li key={value.passageName.toString() + index} onClick={
                    (function (cp) {
                        return function (event) {
                            this.props.refreshCurrentPassage(cp);
                        }.bind(this);
                    }).bind(this)(value.passageName.toString())
                }>
                    <Link to={"/blog/" + value.passageName}>
                        {value.passageName}({value.letterNum})&nbsp;author:{value.author}
                    </Link>
                </li>
            } else {
                liEle = <li className="next" key="dropdown" onClick={this.handleDropClick}>next</li>
            }
            liArray.push(liEle);
        });
        return (
            <ul>
                {liArray}
            </ul>
        )
    }
}

class NavBar extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <NavUl refreshCurrentPassage={this.props.refreshCurrentPassage}/>
            </nav>
        );
    }
}

module.exports = NavBar;