import React, { useContext } from 'react'
import { ChatEngine } from 'react-chat-engine'
import { SocketContext } from '../SocketContext'

const projectID = '44e9dd7a-5f42-40eb-8e78-eb6b0191009c'

const ChatsPage = () => {    
    const { name } = useContext(SocketContext)
    
    return (
        <div style={{height:'100vh'}} className='chatpage'>
            {   
                name &&
                <ChatEngine 
                    height='calc(100vh - 64px)'
                    projectID={projectID}
                    userName={name}
                    userSecret='Qazwsx123%'
                />
            }
        </div>
    );
}

export default ChatsPage;