import React from 'react';
import ReactDOM from 'react-dom';
import ParseMarkdown from './parseMarkdown.js';
import $ from 'jquery';

class Comment extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            passageName: this.props.passageName,
            commentArray: this.asyncGetComment("index")
        }
    }

    // componentWillMount () {
    //     this.asyncGetComment(this.state.passageName);
    // }

    // componentDidMount () {
    //     this.asyncGetComment(this.state.passageName);
    // }

    // componentWillReceiveProps (nextProps) {
    //     console.log(nextProps);

    //     this.asyncGetComment (nextProps.passageName);
    // }

    createCommentLabel (commentArray) {
        let commentElement = [];
        commentArray.forEach((value, index) => {
            let comment = <div key={index + " " + value.name}><p>{value.name}</p>
                <p>{value.comment}</p>
                <p>{value.timestamp}</p>
                </div>;
            commentElement.push(comment);
        });
        return commentElement;
    }

    asyncGetComment (passageName) {
        $.ajax({
            url: "../resources/comment/" + passageName.trim().toLowerCase() + ".json",
            success: (data) => {
                this.setState({
                    commentArray: this.createCommentLabel (data)
                });         
            }
        });
    }

    render() {
        console.log("render");
        return (
            <div>{this.state.commentArray}</div>
        )
    }
}

class Passage extends React.Component {
    constructor (props) {
        super(props);
        
        this.parseMarkdown  = "";
        this.state = {
            passage: [],
            passageName: "",
            passageInfo: {
                author: "",
                title: ""
            },
            parseMarkdown: new ParseMarkdown()
        }

    }

    componentDidMount () {
        $.ajax({
            url: "../resources/data/index.json",
            success: (data) => {
                this.setState({
                    passage: [<p key="index">{data.passageContent}</p>],
                    passageName: "index",
                    passageInfo: {
                        author: data.author,
                        title: data.passageName
                    }
                })
            }
        })
    }

    componentWillReceiveProps (nextProps) {
        let passageName = this.props.params.name;
        passageName = passageName.toLowerCase().replace(" ", "");
        $.ajax({
            url: "../resources/data/" + passageName + ".json",
            success: (data) => {
                let passageArray = [];
                if (data.passageContent.length < 20) {
                    data.passageContent.forEach((value, index) => {
                        this.state.parseMarkdown.setPassage(value);
                        passageArray.push(<p key={index} dangerouslySetInnerHTML={{__html: this.state.parseMarkdown.parse()}}></p>);
                    });
                } else {
                    this.state.parseMarkdown.setPassage(data.passageContent);
                    passageArray.push(<p key={data.passageContent.length} dangerouslySetInnerHTML={{__html: this.state.parseMarkdown.parse()}}></p>);                    
                }
                this.setState({
                    passage: passageArray,
                    passageName: passageName,
                    passageInfo: {
                        author: data.author,
                        title: data.passageName
                    }
                });
            }
        });
    }

    render() {
        console.log("render passage");
        return (
            <article>
                <h2>{this.state.passageInfo.title}<span className="title">{this.state.passageInfo.author}</span></h2>
                {this.state.passage}
                <Comment passageName={this.state.passageName}/>
            </article>
        );
    }
}

module.exports = Passage;