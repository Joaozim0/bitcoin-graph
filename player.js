const m3uUrl = 'http://komprao24.com:80/get.php?username=454293497&password=47724087&type=m3u_plus'; // URL da lista M3U

async function loadM3U(url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const lines = data.split('\n');
    const channels = [];
    let channelName = '';

    lines.forEach(line => {
      if (line.startsWith('#EXTINF')) {
        const info = line.split(',');
        channelName = info[1] ? info[1].trim() : 'Canal Desconhecido';
      } else if (line.startsWith('http') || line.startsWith('rtmp')) {
        channels.push({ name: channelName, url: line.trim() });
      }
    });

    displayChannels(channels);
  } catch (error) {
    console.error('Erro ao carregar a lista M3U:', error);
  }
}

function displayChannels(channels) {
  const channelList = document.getElementById('channels');
  channelList.innerHTML = '';

  channels.forEach(channel => {
    const li = document.createElement('li');
    li.textContent = channel.name;
    li.addEventListener('click', () => playChannel(channel.url));
    channelList.appendChild(li);
  });
}

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
    alert('Seu navegador não suporta este tipo de vídeo.');
  }
}

loadM3U(m3uUrl);