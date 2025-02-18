// URL da lista M3U
const m3uUrl = 'https://bit.ly/4eoenaV';

// Função para carregar a lista M3U e extrair os canais
async function loadM3U(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const lines = data.split('\n');
        const channels = [];
        let currentChannel = {};

        lines.forEach(line => {
            if (line.startsWith('#EXTINF:')) {
                const info = line.split(',');
                currentChannel.name = info[1].trim();
            } else if (line.startsWith('http')) {
                currentChannel.url = line.trim();
                channels.push({ ...currentChannel });
                currentChannel = {};
            }
        });

        displayChannels(channels);
    } catch (error) {
        console.error('Erro ao carregar a lista M3U:', error);
    }
}

// Função para exibir a lista de canais
function displayChannels(channels) {
    const channelList = document.getElementById('channels');
    channels.forEach(channel => {
        const listItem = document.createElement('li');
        listItem.textContent = channel.name;
        listItem.addEventListener('click', () => playChannel(channel.url));
        channelList.appendChild(listItem);
    });
}

// Função para reproduzir o canal selecionado
function playChannel(url) {
    const video = document.getElementById('videoPlayer');

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
    } else {
        console.error('Este navegador não suporta HLS.');
    }
}

// Carrega a lista M3U ao iniciar
loadM3U(m3uUrl);