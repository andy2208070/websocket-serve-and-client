const main  = document.getElementById('main');
const input = document.getElementById('input');
const btn   = document.getElementById('btn');
const btn2  = document.getElementById('btn2');

let ws
function connect() {
    // 建立一個 WebSocket 物件，並連上 socket server
    ws = new WebSocket('ws://localhost:5566')
    
    // 連線建立後
    ws.onopen = () => {
      console.log('open connection to server')
    }
    
    // 連線斷開後
    ws.onclose = () => {
      console.log('close connection to server')
    }
    
    // 收到 server 事件時，將事件中的訊息印出來
    ws.onmessage = event => {
      console.log(event.data)
      main.innerHTML += `<div>${event.data}</div>`
    }
}

connect();

btn.addEventListener('click', () => {
    const value = input.value;
    ws.send(value);
})
btn2.addEventListener('click', () => {
    connect();
})