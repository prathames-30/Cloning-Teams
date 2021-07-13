import React, { useContext, useState } from 'react'
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Assignment, Phone, PhoneDisabled, VideocamOff, ScreenShare, StopScreenShare, Chat } from '@material-ui/icons'
import { SocketContext } from '../SocketContext'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
    },
}))

const Options = ( { children } ) => {
    const { callAccepted, callUser, callEnded, leaveCall, name, me, audioOff, videoOff, 
      shareScreen,stopScreenShare, screenShare, openChat} = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState('')
    const classes = useStyles()
    return (
        <Container>
            <Paper elevation={10} className={classes.Paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography gutterBottom variant="h6">Account Info</Typography>
                            <TextField label="Name" value={name} disabled fullWidth/>
                            <CopyToClipboard text={me} className={classes.margin}>
                                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                                    Copy The Id
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography gutterBottom variant="h6">Make a Call</Typography>
                            <TextField label="Id to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth/>
                            {callAccepted && !callEnded ? (
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                  <Button 
                                      variant="contained" 
                                      color="primary"  
                                      startIcon={<VideocamOff fontSize="large" />}
                                      onClick={videoOff}
                                      className={classes.margin}> 
                                          VideoOff
                                  </Button>
                                  <Button 
                                    variant="contained" 
                                    color="primary"  
                                    startIcon={<PhoneDisabled fontSize="large" />}
                                    onClick={audioOff}
                                    className={classes.margin}> 
                                        AudioOff
                                  </Button>
                                  {screenShare ? (
                                      <Button 
                                      variant="contained" 
                                      color="primary" 
                                      startIcon={<StopScreenShare fontSize="large" />}
                                      onClick={stopScreenShare}
                                      className={classes.margin}> 
                                          Stop Sharing
                                    </Button>
                                  ) : (
                                      <Button 
                                      variant="contained" 
                                      color="primary" 
                                      startIcon={<ScreenShare fontSize="large" />}
                                      onClick={shareScreen}
                                      className={classes.margin}> 
                                          Share Screen
                                    </Button>
                                  )}
                                  <Button
                                    variant="contained" 
                                    color="primary" 
                                    startIcon={<Chat fontSize="large" />}
                                    onClick={openChat}
                                    className={classes.margin}> 
                                        Open Chat
                                  </Button>
                                  <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    startIcon={<PhoneDisabled fontSize="large" />}
                                    onClick={leaveCall}
                                    className={classes.margin}> 
                                        Hang up
                                  </Button>
                                </div>
                            ) : (
                                <Button
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                startIcon={<Phone fontSize="large" />}
                                onClick={() => callUser(idToCall)}
                                className={classes.margin}>
                                    call
                                </Button>

                            )}
                        </Grid>  
                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    )
}

export default Options