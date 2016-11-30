import React from 'react';
import ReactDOM from 'react-dom';
import ParseMarkdown from './parseMarkdown.js';
import $ from 'jquery';


class Passage extends React.Component {
    constructor (props) {
        super(props);
        
        this.parseMarkdown  = "";
        this.state = {
            passage: [],
            passageInfo: {
                author: "",
                title: ""
            },
            parseMarkdown: new ParseMarkdown()
        }

    }

    componentDidMount () {

    }

    componentWillReceiveProps (nextProps) {
        //let passageName = nextProps.currentPassage;
        let passageName = this.props.params.name;
        passageName = passageName.toLowerCase().replace(" ", "");
        $.ajax({
            url: "../resources/data/" + passageName + ".json",
            success: (data) => {
                let passageArray = [];
                if (data.passageContent.length < 500) {
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
                    passageInfo: {
                        author: data.author,
                        title: data.passageName
                    }
                });
            }
        });
    }

    render() {
        return (
            <article>
                <h2>{this.state.passageInfo.title}<span className="title">{this.state.passageInfo.author}</span></h2>
                {this.state.passage}
            </article>
        );
    }
}

module.exports = Passage;