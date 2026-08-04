/** SpAbz script video.js
*   Funktion:
*      called by page load of video.html, decode string of href
*      video.html?video-source#video-title
*      and set video title and video-source
*   version 01.08.2026
*   Autor H. Conrad
*
*/

document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById("meinVideo");
    const source = document.getElementById("videoSource");
    const title = document.getElementById("title");

    href = window.location.href;
    tidx =  href.indexOf("#");
    videoTitle = href.substr(tidx+1);
    videoTitle = videoTitle.replace(/%20/g, " ");
    videoTitle = videoTitle.replace(/%C3%A4/g, "ä");
//         window.alert("titel: "+videoTitle);
    href = href.substr(0, tidx);
    videoPath = href.substr(href.indexOf("?")+1)
    title.textContent = videoTitle;
    source.src = videoPath;
//         window.alert("videopath "+videoPath);
    video.load();
    video.play();
});