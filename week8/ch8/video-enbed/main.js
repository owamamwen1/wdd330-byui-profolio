var video_player = document.getElementById('video-player');
links = video_player.getElementsByTagName('a');
for(var i =0; i< links.length; i++){
  links[i].onclick = handler();
}
function handler(e){
  e.preventDefault();
  videotaget = this.getAttribute("href");
  filename = videotaget.substr(0, videotaget.lastIndexOf('.'))|| videotaget;
  video = document.querySelector("#video_player video");
  video.removeAttribute('poster');
  source = document.querySelectorAll("#video_player video source");
  source[0].src = filename + ".mp4";
  source[1].src = filename + ".webm";
  video.load();
  video.play();
}