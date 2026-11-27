const tP = document.getElementById("twPrune");
setTimeout(async () => {
	if (!tP.src.includes("post_expand_rotate.gif") || !tP.class == "icon rotateicon" ) {
		await browser.storage.local.get("threads").then((e) => {
		  !e.threads && threadMessage();
		})
	}
}, 10);

var threadWatch = document.getElementById("watchList");
const observer = new MutationObserver((e) => {
	if (e[0].addedNodes.length != e[0].removedNodes.length) threadMessage();
	else {
		for (let i = 0; i < e[0].addedNodes.length; ++i) {
			if (e[0].addedNodes[i].innerHTML != e[0].removedNodes[i].innerHTML)
			  { threadMessage(); return }
		}
	}
});

observer.observe(threadWatch, {
  subtree: true,
  childList: true,
});

function threadMessage() {
	let to = threadWatch.querySelectorAll('li');

	let lBoards = []
	let lNreplies = []
	let lPostsLinks = []
	let threads = [to.length];

	for (let i = 0; i < to.length; i++){
	  lBoards[i] = `/${to[i].querySelector("span").getAttribute("data-board")}/`

	  lNreplies[i] = (
		to[i].querySelector("a").className.includes('hasNewReplies') ?
		to[i].querySelector("a").innerText.slice(0, 
		to[i].querySelector("a").innerText.indexOf(' ') 
	  ) : "");

	  lPostsLinks[i] = to[i].querySelector("a").getAttribute("href"); }

  browser.runtime.sendMessage([1, lPostsLinks, lNreplies, lBoards])
}

console.log("- takethreads.js -") // prints on site
