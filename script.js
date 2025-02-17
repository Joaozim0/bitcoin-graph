document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const channelsList = document.getElementById('channels-list');
    const player = document.getElementById('player');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Autenticação simples (apenas exemplo)
            if (username === 'admin' && password === 'admin') {
                window.location.href = 'channels.html';
            } else {
                alert('Usuário ou senha incorretos');
            }
        });
    }

    if (channelsList) {
        const channels = [
            { name: 'Canal 1', url: 'http://komprao24.com:80/get.php?username=233633529&password=5004055&type=m3u_plus' },
            // Adicione mais canais aqui
        ];

        channels.forEach(channel => {
            const li = document.createElement('li');
            li.textContent = channel.name;
            li.addEventListener('click', () => {
                window.location.href = `player.html?url=${encodeURIComponent(channel.url)}`;
            });
            channelsList.appendChild(li);
        });
    }

    if (player) {
        const urlParams = new URLSearchParams(window.location.search);
        const url = urlParams.get('url');
        if (url) {
            player.src = url;
        } else {
            alert('URL do canal não encontrada.');
        }
    }
});
