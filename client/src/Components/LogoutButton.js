import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'
import { AccountCircle, ForumRounded } from '@material-ui/icons'
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"

const LogoutButton = () => {

    const { logout, isAuthenticated } = useAuth0()
    const history = useHistory()
    return (
        <div style={{position:'absolute', top:'10px', right:'10px'}}>
            {isAuthenticated && (
                <div>
                    <Button 
                        variant="contained" 
                        color="primary"  
                        startIcon={<AccountCircle fontSize="large" />} onClick={() => logout()} >
                            Log Out
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"  
                        startIcon={<ForumRounded fontSize="large" />} onClick={()=>history.push("/chat")} >
                            ChatPage
                    </Button>
                </div>

            )
        }
        </div>
    )
}

export default LogoutButton
