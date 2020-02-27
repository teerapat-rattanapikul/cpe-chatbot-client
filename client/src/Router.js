import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Pages from './pages'
//import Components from './Components'

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Pages.index} />
            <Route exact path='/app' component={Pages.Chat} />
            <Route exact path='/test' component={Pages.test} />
        </Switch>
    </BrowserRouter>
)




