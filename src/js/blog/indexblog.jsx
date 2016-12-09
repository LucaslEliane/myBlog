import 'babel-polyfill'

import '../../less/main.less'
import 'normalize'

import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root.jsx'

ReactDOM.render(
    <Root />,
    document.querySelector(".blog.content")
)