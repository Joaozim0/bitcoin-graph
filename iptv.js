document.addEventListener("DOMContentLoaded", function() {
    const player = document.getElementById("iptv-player");
    
    // URL M3U que você irá carregar
    const m3uUrl = 'http://komprao24.com:80/get.php?username=599120567&password=q657e8834t&type=m3u_plus';
    
    // Função para carregar e tocar o canal IPTV
    function loadIPTVStream() {
        player.src = m3uUrl;
        player.load();
        player.play();
    }

    // Carregar o stream assim que a página carregar
    loadIPTVStream();
});
