
const client = new tmi.Client({
    channels: ['SaoriLikidvamp']
});

client.connect();

const chatContainer = document.getElementById('chat-container');

client.on('message', (channel, tags, message, self) => {
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-message';

    const avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.src = `https://unavatar.io/twitch/${tags.username}`;

    const username = document.createElement('span');
    username.className = 'username';

    if (tags.mod) username.classList.add('mod');
    else if (tags.vip) username.classList.add('vip');
    else if (tags.subscriber) username.classList.add('sub');
    else username.classList.add('default');

    username.textContent = tags['display-name'];

    const msg = document.createElement('span');
    msg.className = 'message';
    msg.textContent = message;

    chatMessage.appendChild(avatar);
    chatMessage.appendChild(username);
    chatMessage.appendChild(msg);
    chatContainer.appendChild(chatMessage);

    // Remove message after 10 seconds
    setTimeout(() => {
        chatContainer.removeChild(chatMessage);
    }, 10000);
});
