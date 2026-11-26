window.addEventListener("message", (e) => {
	if (e.source !== window || e.data?.type !== "TO_ELF") return;


	// console.log(e.data.data.threads);
	window.tData = e.data.data.threads;
	displayAllThreads(tData);
})

console.log("welcome to the enclave");

function notificationOriginColor (origin) {
	switch (origin) {
	  case "Firefox": return "#ff00ff"; break;
	  case "qBittorrent": return "#00ffff"; break;
	  default: return "#ff0000"; break;
	}
}
function notificationImgOrigin (origin) {
	switch (origin) {
	  case "Firefox": return "https://i.ibb.co/GfM90MKM/02.png"; break;
	  case "qBittorrent": return "https://i.ibb.co/GfM90MKM/02.png"; break;
	  default: return "https://i.ibb.co/0jmPG3rN/mrmaid.jpg"; break;
	}
}

const yous = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

// dont add whiles;
//

//try {
//	window.tData ? console.log("real") : console.log("fake");
//	console.log(window.tData);
//} finally { }

//const xx = document.getElementById('clock-hour');
//xx.addEventListener("click", () => {console.log(window.tData)});

function displayAllThreads() {
	for(let i = 0; i < window.tData._4chanTW.length; i++) {
	  document.getElementById("threadsContainer").innerHTML += `<div class="n-row-post"><a href="${window.tData._4chanTW[i].threadLink}" target="_blank" class="post-image-container" style="aspect-ratio: 16 / 9;"><img class="posted-image" src="https://${window.tData._4chanTW[i].img}" class="avatar" alt="avatar" loading="lazy" width="37" height="37"></a><div class="n-row-post-content"><span class="threadTitle">${window.tData._4chanTW[i].title}</span><p class="level level-post" ${yous[i] ? 'style="background: var(--accent-color); color: black;"' : ""}>${window.tData._4chanTW[i].hour} - <span>44<span style="background: var(--accent-color); color: black;">${window.tData._4chanTW[i].nReplies}</span></span> - <span style="${yous[i] ? 'background: #0f0; color: black; ': 'color: #0f0;'} padding-right: 3px;">${window.tData._4chanTW[i].board}</span></p><p class="n-row-post-text-content">${window.tData._4chanTW[i].tContent}</p></div></div>`

let testRatio = 16;
while (document.getElementsByClassName("level-post")[i].offsetHeight > 13){
  document.getElementsByClassName("post-image-container")[i].style.aspectRatio = `${testRatio} / 9`;
	testRatio--;
  }
	}




}

