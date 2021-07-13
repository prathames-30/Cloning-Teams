import React, { useContext } from 'react'
import { Typography, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import VideoPlayer from './VideoPlayer'
import Options from './Options'
import Notifications from './Notifications'
import bgimage from '../Teams_logo.jpg'
import { SocketContext } from '../SocketContext'
import LogoutButton from './LogoutButton'
import Chat from '../Chat_helper/meetChat'

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',
    
        [theme.breakpoints.down('xs')]: {
          width: '90%',
        },
    },
    image: {
        marginLeft: '15px',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
}))

const Meeting = () => {
    const classes = useStyles()
    const { chatOpen } = useContext(SocketContext)
    return (
        <div id="Big-div" className={ classes.wrapper } style={{backgroundImage: `url(${bgimage})`,backgroundSize:'cover', backgroundPosition:'center'}} >
            <LogoutButton />
            <div id="video-chat-text">
                <AppBar id="chat-text" className={ classes.appBar } position="static" align="center" >
                    <Typography variant="h2">Video Chat App</Typography>
                </AppBar>
            </div>
            <div id="video-chat-methods">
                <VideoPlayer />
                <Options>
                    <Notifications />
                </Options>
            </div>
            {chatOpen ? (
                <div className={"chatbox"} style={{width:'500px', height:'90vh', position:'fixed', top:'5vh', left:'50px', borderRadius:'10px'}} >
                    <div style={{position:'relative', height:'100%'}}> 
                        <Chat />
                    </div>
                </div>
            ) : (
                null
            )}
        </div>
    )
}

export default Meeting
