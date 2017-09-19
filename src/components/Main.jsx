import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {GoogleApiWrapper} from 'google-maps-react';
import Login from './Login.jsx'
import Register from './Register.jsx'
import Filters from './Filters.jsx'
import Container from './Container.jsx'
import Favorites from './Favorites.jsx'
import FavoriteContainer from './FavoriteContainer.jsx'
import UpdateUserInfoContainer from './UpdateUserInfoContainer.jsx'
import Index from './Index.jsx'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route path='/' component={Index}/>
      <Route path='/login' component={Login}/>
      <Route path='/map' component={Container}/>
      <Route path='/register' component={Register}/>
      <Route path='/filters' component={Filters}/>
      <Route path='/user' component={UpdateUserInfoContainer}/>
      <Route path='/favorites' component={Favorites} />
      <Route path='/favoritesmap' component={FavoriteContainer} />
    </Switch>
  </main>
)

export default Main
