import React, { PropTypes } from 'react'
import ParseMarkdown from '../functionality/parseMarkdown.js'

export default class Passage extends React.Component {
    
    constructor(props) {
        super(props)
        this.processingData = this.processingData.bind(this)
        this.parseMarkdown = new ParseMarkdown()
        this.passageArray = []
    }

    componentWillReceiveProps() {
        const { value } = this.props
        this.passageArray = this.processingData(value.passageContent)
    }

    processingData(content) {
        let passageArray = []
        !content || !content.passageContent || content.passageContent.forEach((value, index) => {
            this.parseMarkdown.setPassage(value)
            passageArray.push(<p key={index} dangerouslySetInnerHTML={{__html: this.parseMarkdown.parse()}}></p>)
        })
        return passageArray
    }

    render() {
        const { value, passageName } = this.props
        return(
            <article>

                <h2>
                    {  value.passageName }
                    <span className="title">
                        {  value.author }
                    </span>
                </h2>
                { this.passageArray }
            </article>
        )
    }
}

Passage.propTypes = {
    value: PropTypes.object.isRequired,
    passageName: PropTypes.string.isRequired
}