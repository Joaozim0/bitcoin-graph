// URL da lista M3U
const m3uUrl = 'http://komprao24.com:80/get.php?username=454293497&password=47724087&type=m3u_plus';

// Inicializa o player
const player = videojs('videoPlayer');

// Função para carregar a lista M3U e extrair o primeiro stream
async function loadM3U(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const lines = data.split('\n');
        for (let line of lines) {
            if (line && !line.startsWith('#')) {
                player.src({ src: line.trim(), type: 'application/x-mpegURL' });
                break;
            }
        }
    } catch (error) {
        console.error('Erro ao carregar a lista M3U:', error);
    }
}

// Carrega a lista M3U ao iniciar
loadM3U(m3uUrl);