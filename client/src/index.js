import React from 'react'
import ReactDOM from 'react-dom'
import { ContextProvider } from './SocketContext'
import App from './App'
import './styles.css'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId =  process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(
    <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}>
        <ContextProvider>
            <App />
        </ContextProvider>
    </Auth0Provider>, 
document.getElementById('root')
)
