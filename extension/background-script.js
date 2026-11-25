console.clear()
console.log("INIT");
console.log();









































browser.runtime.onMessage.addListener(notify);
var _4chanTW = []
var dummyThread = []

let newThreadsState = "init";

let ejstorage = {
	name: "pachas",
	caca: "forever"
}

browser.storage.local.set({ newThreadsState }).then(() => {return}, () => {console.log("wawawa")}); // this shit does nothing yet

// [0, 1, 2, 3]
// 0 = file
// 1 = 4chin
// 2 = other
// 3 = other
/*
  browser.tabs.executeScript(itid, {
      file: "content-script.js"
  }).then(() => {
      //  The below should run concurrently as the update script will be waiting for it...
    browser.tabs.sendMessage(
      itid,
      {
        idx: strIndex,
        rst: strResult
      }
    ).catch(onError)
  });
*/

async function notify(message) {
	// how shall i make it 
	// so it can detect between site messages and local messages ? 

	switch(message[0]) {
	  case 0:
		// send message back to content script
		// browser.tabs.sendMessage(3, "pendejo");
			//
		return browser.storage.local.get("_4chanTW");




		// local startpage code goes here
	  break;
      case 1:
	    for (var i = 0; i < message[1].length; i++){
		  dummyThread.push({
		    title: null,
		    hour: null,
		    replies: null,
		    nReplies: null,
		    board: null,
		    tContent: null,
		    img: null
	      })
	    }
	  for(let i = 0; i < message[1].length; i++){
	    dummyThread[i].threadLink = `https:${message[1][i].substring(0, message[1][i].indexOf("#"))}`;
	  }
	  for(let i = 0; i < message[2].length; i++){
		dummyThread[i].nReplies = message[2][i];
	  }

      let threadUpdate;
      await browser.storage.local.get("newThreadsState").then(function(item) {
		  item.newThreadsState == message[3].length ? threadUpdate = false : threadUpdate = true
	  });

	  if(threadUpdate){
		function pururin() {
	      for(let i = 0; i < message[3].length; i++){
		    _4chanTW = dummyThread;
		    _4chanTW[i].board = message[3][i];
	      }
	      for (let i = 0; i < message[3].length; i++){
		  	fetch(_4chanTW[i].threadLink, {mode: 'cors'})
		  	.then(response => response.text())
 		  	.then(text => {
		    	_4chanTW[i].replies = fetchTotalReplies(text)
		    	_4chanTW[i].hour = fetchHour(text)
		    	_4chanTW[i].img = fetchImage(text)
		    	_4chanTW[i].tContent = fetchPostContent(text)
		    	_4chanTW[i].title = fetchTitle(text)
    	  	      });
	     	}
		}
		await pururin();

		browser.storage.local.set({ _4chanTW }).then(() => {console.log(_4chanTW)}, (error) => {console.log(error)}); // this shit does nothing yet


		  dummyThread = [];

	newThreadsState = message[3].length;  
	browser.storage.local.set({ newThreadsState }).then(setItem);
}
		  else {
			dummyThread = [];
			amountOfMessages = 0;
			return
		  }
	break;
  }
}

/////////////// fetching  functions

function fetchTotalReplies(fetchContent){
 let noCalc = fetchContent.slice(fetchContent.search("commentCount") + 23, (fetchContent.search("commentCount") + 28))
		var start_pos = noCalc.indexOf(`"`) + 1;
		var end_pos = noCalc.indexOf(`"`, start_pos);
		return noCalc.substring(start_pos,(end_pos - 2)); 
}
function fetchHour(fetchContent){
 let hourMade = fetchContent.slice(fetchContent.search("datePublished") + 28, (fetchContent.search("datePublished") + 36))
		return hourMade;
}

const htmlSyms = ["&gt;", "&lt;", "&amp;", "&quot;", "&apos;", "&#039;"];
function srchSymHTML(searchStr, str) {
    	let startIndex = 0, index, current_instances = 0, bloat = 0, instances = 0;

		for(let i = 0; i < searchStr.length; i++){
    		let searchStrLen = searchStr[i].length;
    		while ((index = str.indexOf(searchStr[i], startIndex)) > -1) {
				current_instances++;
        		startIndex = index + searchStrLen;
    		}
			bloat += searchStr[i].length * current_instances;
			instances += current_instances;
			current_instances = 0;
			startIndex = 0;
		}
    	return bloat - instances;
}

function fetchTitle(fetchContent){
 let noCalc = fetchContent.slice(fetchContent.search('itemprop="headline">') + 20, fetchContent.indexOf('</span> <span class="nameBlock"'))

	if (noCalc.search("<head><meta charset") > -1) return "";

	if (noCalc.length - srchSymHTML(htmlSyms, noCalc) > 24){
		return `${noCalc.slice(0, 20).replace(/\s+$/, '')}...`
	}
	else {
    	return noCalc;
	}
}

function fetchPostContent(fetchContent){
	let postInnText = fetchContent.slice(fetchContent.search("articleBody") + 13, (fetchContent.indexOf("</blockquote>") - 15))
	postInnText = postInnText.replace(`<span class="quote">`, '').replace(`</span>`, ''); 

	let str_break = null;
	if (postInnText.indexOf("<br>") != -1) {
		str_break = postInnText.indexOf("<br>");
	}

	let fixedText;
	str_break ? fixedText = postInnText.substring(0, str_break) : fixedText = postInnText; 

	// detect what is the last word in the string to guide handling of the string

	if ((fixedText.length - srchSymHTML(htmlSyms, fixedText)) > 68){
		return `${fixedText.slice(0, 66)}...`
	} else { return fixedText }
}

function fetchImage(fetchContent){
  let fileTextIndex = fetchContent.slice(fetchContent.search("fileText") + 12, (fetchContent.indexOf("KB,") - 6)) 
  var start_pos = fileTextIndex.indexOf(`href=`) + 8;
  var end_pos = fileTextIndex.indexOf(`"`, start_pos);

  return fileTextIndex.substring(start_pos, end_pos)
}

//////////////////////

/*setTimeout(() => {
		const jsonBlob = new Blob(["window.tData = " + JSON.stringify(_4chanTW, null, 2)], { type: "text/plain" });
		const url = URL.createObjectURL(jsonBlob);

		let downloading = browser.downloads.download({
		  url,
		  filename: "threads-data.js",
		  saveAs: false,
		  conflictAction: "overwrite" 
	  })}, 4000)*/
