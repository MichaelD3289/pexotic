import io from 'socket.io-client'
export const socket = io.connect('http://localhost:5000')


export const createSocketRoom = (room) => {
  
  socket.emit('create_room', room.trim())
}

export const sendMessage = (message, room, sender) => {
  socket.emit('message', { message, room, sender })
}

export const createSocket = () => {
  socket.on('message', (data) => {
    console.log(data)
  })
}

export const receiveMessage = () => {
  socket.on('recieve_message', (data) => {
    console.log(data)
  })
}

export const getAllSocketRooms = (data) => {
  socket.emit('get_all_rooms', {data})
}

export const receiveAllSocketRooms = () => dispatch => {
  socket.on('all_rooms', (data) => {
    dispatch({
      type: 'RECEIVE_ALL_SOCKET_ROOMS',
      payload: data.map(room => ({
        room,
        messages: []
      }))
    })
    dispatch({
      type: 'SET_ACTIVE_ROOM',
      payload: data[0]
    })
  })
}

export const getMessages = (room) => dispatch => {
  socket.emit('get_messages', {room})
  socket.on('all_messages', (data) => {
    dispatch({
      type: 'RECEIVE_ALL_MESSAGES',
      payload: {room, data}
    })
  })
}

export const getShopMessages = (shop) => dispatch => {
  socket.emit('get_shop_messages', {shop})
  socket.on('all_shop_messages', (data) => {
    dispatch({
      type: 'RECEIVE_ALL_SHOP_MESSAGES',
      payload: {shop, data}
    })
  })
}

export const setActiveRoom = (room) => dispatch => {
  dispatch({
    type: 'SET_ACTIVE_ROOM',
    payload: room
  })
}

const initialState = {
  rooms: [],
  activeRoom: null,
}


export default function messagingReducer(state=initialState, action) {
  switch(action.type) {
    case 'RECEIVE_ALL_SOCKET_ROOMS':
      return {
        ...state,
        rooms: action.payload
      }
    case 'SET_ACTIVE_ROOM':
      return {
        ...state,
        activeRoom: action.payload
      }
    case 'RECEIVE_ALL_MESSAGES':
      return {
        ...state,
        rooms: state.rooms.map(room => {
          if (room.room === action.payload.room) {
            return {
              ...room,
              messages: action.payload.data
            }
          } else {
            return room
          }
        })
      }
    default:
      return state
  }
}