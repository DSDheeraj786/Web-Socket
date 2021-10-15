const socket = io("http://localhost:8000");

const input = document.getElementById('input');
const messContainer = document.getElementById('messContainer');
const btn = document.querySelector('.btn');
const ting = new Audio('ting.mp3');

const append = (message, position) => {
    const messElem = document.createElement('div');
    messElem.innerText = message;
    messElem.classList.add(position);
    messContainer.append(messElem);
    if (position == "left") {
        ting.play()
    }
}

btn.addEventListener('click', () => {
    const message = input.value;
    console.log(message);
    append(`You : ${message}`, 'right');
    socket.emit('send', message)
    input.value = ""
})

const userName = prompt('Enter Your Name');
console.log(userName);
socket.emit('new-user-joined', userName);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

socket.on('recieve', data => {
    console.log(data);
    append(`${data.name} : ${data.message}`, 'left')
})
socket.on('left', name => {
  
    append(`${name} left the chat`, 'left')
})


