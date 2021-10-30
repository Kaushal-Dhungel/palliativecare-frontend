import React, { useEffect } from 'react';

import { Home,SearchResults,Navbar,Footer,Registration,Donors,Stories } from './components';
import { ProfileEdit,UserProfile, Profile } from './profile';   
import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import * as actions from './store/actions/auth'
import { connect } from 'react-redux';

const App = ({onTryAutoSignup}) => {

    useEffect(()=> {
        onTryAutoSignup();
    },[onTryAutoSignup])

    return (
        <div>
        <BrowserRouter >
        <Navbar />
        <Switch>
            <Route exact path = '/' component = {Home}/>
            <Route exact path = '/register' component = {Registration}/>
            <Route exact path = '/donors' component = {Donors}/>
            <Route exact path = '/stories' component = {Stories}/>

            <Route exact path = '/profile' component = {UserProfile}/>
            <Route exact path = '/docprofile/:id' component = {Profile}/>
            <Route exact path = '/profile/edit' component = {ProfileEdit}/>

            <Route exact path = '/items/:id' component = {SearchResults}/>

            <Redirect to  ="/" />
        </Switch>
        </BrowserRouter>
        <Footer />
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: ()=> dispatch(actions.authCheckState())
    }
  }
  
export default connect(null,mapDispatchToProps) (App);
