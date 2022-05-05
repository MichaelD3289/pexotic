import React, { useEffect, useState } from 'react'
import './MessagingPage.css'
import {sendMessage, receiveMessage, socket, getAllSocketRooms, receiveAllSocketRooms, setActiveRoom, getMessages} from '../../redux/reducers/messaging'
const { useSelector, useDispatch  } = require('react-redux')

function MessagingPage() {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  
  const username = useSelector(state => state.currentUser.userInfo.username)
  const {rooms, activeRoom} = useSelector(state => state.messaging)
  const currentRoomMessages = rooms.find(room => room.room === activeRoom)?.messages
  

  useEffect(() => {
    document.title = 'Pexotic | Messages'
  }, [])

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      console.log(data)
    })
    
    return () => socket.off('recieve_message')
  })

  useEffect(() => {

    getAllSocketRooms(username)
    dispatch(receiveAllSocketRooms())
    socket.on('all_messages', (data) => {
      dispatch({
        type: 'RECEIVE_ALL_MESSAGES',
        payload: data
      })
    })

    return () => {
      socket.off('all_rooms')
      socket.off('get_all_rooms')
    }
  }, [socket])

  useEffect(() => {
    
      dispatch(getMessages(activeRoom))
      dispatch(setActiveRoom(activeRoom))
      socket.emit('join_room', activeRoom)
    // return () => socket.off('join_room')
  }, [activeRoom])

  

  return (
    <main id='user-message-page'>
      <section id='user-chat-room-header'>
        <h2>Messages</h2>
      </section>
      <section id='user-chat-room-container'>
      <h2>Shops:</h2>
      {rooms.length > 0 && rooms.map(({room}, index) => {

       return (
        <div 
          className={`chat-user-room${activeRoom === room ? ' active' : ''}`}
          value={room} 
          key={room}
          onClick={() => {
            socket.emit('join_room', room)
            dispatch(getMessages(room))
            dispatch(setActiveRoom(room))
          }}
        >
          <h3>{room.split('.')[1].replace('_', ' ')}</h3>
        </div>)
      })}
      </section>
      <section id='user-chat-room-message-container'>
          {currentRoomMessages?.map((message, index) => (
            <div 
              className={'chat-user-room-message'
              + (message.username === username ? ' user-message' : ' other-message')}
              key={index}>
              <h3>{message.message_text}</h3>
            </div>
          ))}
      </section>
      <section id='user-chat-room-footer'>
        <input
          type='text'
          placeholder='Type a message...'
          id='user-chat-room-message-input'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          id='user-chat-room-send-button'
          onClick={() => {
            sendMessage(message, activeRoom, username)
          }}
        >Send Message</button>
      </section>
    </main>
  )
}

export default MessagingPage