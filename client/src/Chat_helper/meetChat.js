/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useContext } from 'react'

import { getOrCreateChat } from './getOrCreateChat'

import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine'
import { SocketContext } from '../SocketContext'

const projectID = '44e9dd7a-5f42-40eb-8e78-eb6b0191009c'

const Chat = (props) => {
    const didMountRef = useRef(false)
    const { name, call } = useContext(SocketContext)
    const [chat, setChat] = useState(null)
    const [headers, setHeaders] = useState({
        'Project-ID': projectID,
        'User-Name': name,
        'User-Secret': 'Qazwsx123%',
    })

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            const data = {
                "usernames": [name, call.name],
                "is_direct_chat": true
            }
            getOrCreateChat(headers, data, chat => setChat(chat))
        }
    })

    
    if (chat === null) return <div/>
    
    return (
        <div style={{ width: '100%', height:'100%', borderRadius:'30px' }}>
            <ChatEngineWrapper>
                <Socket 
                    projectID={headers['Project-ID']}
                    userName={headers['User-Name']}
                    userSecret={headers['User-Secret']}
                />

                <ChatFeed activeChat={chat.id} />
            </ChatEngineWrapper>
        </div>
    )
}

export default Chat