// browser.storage.local.get("")

var threadWatch = document.getElementById("watchList");

const observer = new MutationObserver((e) => {
	if (e[0].addedNodes.length != e[0].removedNodes.length) {
		console.log("added or removed") 
	}
	else {
		let sameThreads = true;
		for (let i = 0; i < e[0].addedNodes.length; ++i) {
			if (e[0].addedNodes[i].innerHTML != e[0].removedNodes[i].innerHTML) { sameThreads = false; return }
		}
		!sameThreads && threadMessage();
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

  lPostsLinks[i] = to[i].querySelector("a").getAttribute("href");
}

// browser.runtime.sendMessage([1, lPostsLinks, lNreplies, lBoards])
}




// console.log("- takethreads.js -") // prints on site
// what are the triggers of this function???
// enter site true, remove thread false, click twPruen ADD DOM
