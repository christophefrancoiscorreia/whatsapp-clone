import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'

export default function OpenConversation() {
    const [text, setText] = useState('')
    const setRef = useCallback(node => {
        if(node){
            node.scrollIntoView({ smooth: true })
        }
    }, [])
    const { sendMessage, selectedConversation } = useConversations()


    function handleSubmit(e) { 
        e.preventDefault()

        sendMessage( 
            selectedConversation.recipients.map(r => r.id),
            text
        )
        setText('')
    }

    return (
        <div className="d-flex flex-column flex-grow-1" style={{width: "calc(100% - 250px)", backgroundColor: "#dfe6ec"}}>
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3 pt-3">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length - 1 === index
                        return (
                            <div
                                ref={lastMessage ? setRef : null }
                                key={index}
                                style={{maxWidth: "50%", wordBreak: "break-all"}}
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                            >
                                <div style={{lineHeight: "1.5em" }} className={`rounded py-2 px-3 ${message.fromMe ? 'bg-primary text-white' : 'border' } `}>
                                    {message.text}
                                </div> 
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : 'text-left' }`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div> 
                            </div>
                        )
                    })} 
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-0">
                    <InputGroup> 
                        <Form.Control  
                        as="textarea" 
                        required 
                        className="rounded-0"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        style={{height: 75, resize: 'none'}}
                         />
                        <InputGroup.Append>
                            <Button type="submit" className="rounded-0" style={{width: 100}}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
