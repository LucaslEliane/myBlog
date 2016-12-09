import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.handleList = this.handleList.bind(this)
    }

    handleList(list, onSelect, onPageTurn) {
        if (!list.listContent) {
            return []
        }
        let listArray = []
        let sliceArray = []

        if (list.listPage !== list.lastPage) {
            sliceArray = list.listContent.slice((list.listPage - 1) * 8,
                list.listPage * 8)
        } else {
            sliceArray = list.listContent.slice((list.listPage - 1) * 8, list.listContent.length - 1)
        }
        if (list.listPage !== 1) {
            listArray.push(
                <li key="prev" className="prev" onClick={(e) => {
                    e.preventDefault()
                    onPageTurn(list.listPage - 1)
                }}>
                    <a href="#">
                        Previous
                    </a>
                </li>
            )
        } else {
            listArray.push(
                <li key="first" onClick={(e) => e.preventDefault()}>
                    <a href="#">
                        The First Page
                    </a>
                </li>
            )
        }
        sliceArray.forEach((value, index) => {
            let passageName = value.passageName
            passageName = passageName.toLowerCase().replace(" ","")
            listArray.push(
                <li key={index}>
                    <Link to={ "/" + passageName } onClick={(e) => 
                        onSelect(passageName)
                    }>
                        { 
                            value.passageName + "(" + 
                            value.letterNum + ")" +
                            ": " + value.author
                        }
                    </Link>
                </li>
            )
        })
        if (list.listPage !== list.lastPage) {
            listArray.push(
                <li key="next" className="next" onClick={(e) => { 
                    e.preventDefault()
                    onPageTurn(list.listPage + 1)
                }}>
                    <a href="#">
                        Next
                    </a>
                </li>
            )
        }
        return listArray
    }



    render() {
        const { onSelect, value, onPageTurn } = this.props
        const listArray = this.handleList(value, onSelect, onPageTurn)
        return (
            <nav>
                <ul>
                    { listArray }
                </ul>
            </nav>
        )
    }
}

Navbar.propTypes = {
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    onPageTurn: PropTypes.func.isRequired
}