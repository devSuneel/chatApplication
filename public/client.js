
const socket = io();

let username;
let textarea = document.querySelector('#textarea');
let msgArea = document.querySelector('.message-wrapper')
do {
    username = prompt('please enter your name');
} while (!username)

textarea.addEventListener('keyup', (evt) => {
    if (evt.key == 'Enter') {
        // document.querySelector('.incoming h4').innerText = name;
        sendMessage(evt.target.value);
        evt.target.value = "";
    }
})

function sendMessage(e) {
    let msg = {
        username: username,
        msg: e.trim()
    }
    appendMessage(msg, 'outgoing');

    // send msg to server

    socket.emit("message", msg);
}
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className, 'msg');

    let markup = `
        <h4>${msg.username}</h4>
        <p>${msg.msg}</p>
    `;
    mainDiv.innerHTML = markup;
    msgArea.append(mainDiv);

    var scroll = document.querySelector('.message-wrapper');
    scroll.scrollTop = scroll.scrollHeight;
    scroll.animate({ scrollTop: scroll.scrollHeight });
}

// Receive message

socket.on("message", (msg) => {
    // console.log(msg)
    appendMessage(msg, 'incoming');
    // socket.broadcast.emit("message",msg);
})