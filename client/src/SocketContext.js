import React, { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext();

const socket = io('http://localhost:5000')

const ContextProvider = ({ children }) => {
    
    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [screenShare, setScreenShare] = useState(false)
    const [name, setName] = useState('')
    const [chatOpen, setChatOpen] = useState(false)
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video:true, audio:true })
            .then((currentStream) => {
                setStream(currentStream)
                
            })
        socket.on('me', (id) => setMe(id))
        socket.on('callUser', ({from, name:callerName, signal}) => {
            setCall({ isReceivingCall:true, from, name:callerName, signal })
        })
    }, [])

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({ initiator:false, trickle:false, stream })

        peer.on('signal', (data) => {
            socket.emit('answerCall', {signal:data, from:call.from, name });
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })

        peer.signal(call.signal)
        connectionRef.current = peer
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator:true, trickle:false, stream })

        peer.on('signal', (data) => {
            socket.emit('callUser', {userToCall:id, signalData:data, from:me, name });
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream
        })

        socket.on('callAccepted', (data) => {
            setCallAccepted(true)
            peer.signal(data.signal)
            setCall({ isReceivingCall:false, from:data.from, name:data.name, signal:data.signal })
        })

        connectionRef.current = peer
    }
    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
        window.location.reload()
    }

    const videoOff = () => {
        if(stream) {
            stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled
        }
    }

    const audioOff = () => {
        if(stream) {
            stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled
        }

    }


    const shareScreen = () => {
        navigator.mediaDevices.getDisplayMedia({cursor: true})
        .then(currentStream => {
            setScreenShare(true)
            setStream(stream)
            myVideo.current.srcObject = currentStream
            const videoTrack = currentStream.getVideoTracks()[0]
            const peer = connectionRef.current
            if(peer) {
                peer.replaceTrack(
                    peer.streams[0].getVideoTracks()[0], 
                    videoTrack,
                    peer.streams[0]
                )
            }
            videoTrack.onended = () => {
                peer.replaceTrack (
                    peer.streams[0].getVideoTracks()[0], 
                    stream.getVideoTracks()[0],
                    peer.streams[0]
                )
                myVideo.current.srcObject = stream
            }
            
        })
    }
    const stopScreenShare = () => {
        setScreenShare(false)
        const peer = connectionRef.current
        peer.replaceTrack (
            peer.streams[0].getVideoTracks()[0], 
            stream.getVideoTracks()[0],
            peer.streams[0]
        )
        myVideo.current.srcObject = stream
    }
    const openChat = () => {
        setChatOpen(!chatOpen)
    }

    return (
        <SocketContext.Provider value = {{
            call,
            callEnded,
            callAccepted,
            callUser,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            me,
            leaveCall,
            answerCall,
            audioOff,
            videoOff,
            shareScreen,
            stopScreenShare,
            screenShare,
            chatOpen,
            openChat,
        }}>
            {children}
        </SocketContext.Provider>
    );
}
export { ContextProvider, SocketContext }
