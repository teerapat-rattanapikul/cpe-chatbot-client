import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Pages from './pages'
//import Components from './Components'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Pages.App} />
        </Switch>
    </BrowserRouter>
)




