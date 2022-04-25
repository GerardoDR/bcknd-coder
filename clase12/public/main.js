const socket = io.connect();

const render = (data) => {
    const html = data.map((el,index) => {
        return (
                `<div class="message">
                    <strong>${el.author}</strong>
                    <em>${el.text}</em>
                </div>`
                )
            }).join(" ")

    document.getElementById('messages').innerHTML = html;
}

const addMessage = (e) => {
    const mensaje = { 
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    }
    socket.emit('new-message', mensaje);
    return false
}
socket.on('messages', data => {
    render(data);
})