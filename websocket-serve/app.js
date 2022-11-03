const express = require('express')
const WEBSOCKET = require('ws')
const PORT = 5566

// 建立 express 物件並綁定在 port 5566
const server = express().listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})

const wss = new WEBSOCKET.Server({ server })

// 監聽是否有新的 client 連上線
wss.on('connection', ws => {
  console.log('One client has connected.')
  // CLIENT ID
  ws.id = wss.getUniqueID();

  // 監聽 client 傳來的訊息後，再將訊息傳回去
  ws.on('message', data => {
    console.log('client send message.')
    // ws.send('這是回傳的訊息：'+data)
    //https://karlhadwen.medium.com/node-js-websocket-tutorial-real-time-chat-room-using-multiple-clients-44a8e26a953e
    wss.clients.forEach(client => {
        if(client?.readyState === WEBSOCKET.OPEN){
            client.send('這是回傳的訊息：'+data)
        }
    })
  })

  // 監聽 client 是否已經斷開連線
  ws.on('close', () => {
    console.log('One client has disconnected.')
  })
})