import React, { useContext, useEffect } from 'react'
import { SocketContext } from './SocketContext'

import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress } from '@material-ui/core'
import { createUser } from './Chat_helper/createUser'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Meeting from './Components/Meeting'
import ChatsPage from './Chat_helper/chatsPage'



const App = () => {
    const { setName } = useContext(SocketContext)
    const { isLoading } = useAuth0()
    const { loginWithRedirect, isAuthenticated, user } = useAuth0()
    useEffect(() => {
        if(!isAuthenticated && !isLoading) {
            loginWithRedirect()
        }
    }, [isLoading])
    useEffect(() => {
        if(user && isAuthenticated) {
            setName(user.name)
            createUser({username:user.name, secret:'Qazwsx123%', ...user })
        }
    }, [user])
    if(isLoading) {
        return (
        <div>
            <CircularProgress color="secondary" />
        </div>
        )
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Meeting} />
                <Route exact path="/chat" component={ChatsPage} />
            </Switch>
        </BrowserRouter>
        
    );
}

export default App
