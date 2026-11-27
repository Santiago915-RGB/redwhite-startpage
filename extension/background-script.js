console.clear()
console.log("INIT");
console.log();







































browser.runtime.onMessage.addListener(notify);

// [0, 1, 2, 3]
// 0 = file
// 1 = 4chin
// 2 = other
// 3 = other

async function notify(message) {
	switch(message[0]) {
	  case 0:
			return await browser.storage.local.get("threads");
	  		break;
      case 1:
		let threads = { _4chanTW: [] }

	    for (let i = 0; i < message[1].length; i++){
		  threads._4chanTW.push({
		    title: null,
		    hour: null,
		    replies: null,
		    nReplies: null,
		    board: null,
		    tContent: null,
		    img: null
	      })
	    	threads._4chanTW[i].threadLink = `https:${message[1][i].substring(0, message[1][i].indexOf("#"))}`;
			threads._4chanTW[i].nReplies = message[2][i];
		    threads._4chanTW[i].board = message[3][i];
	    }

      const threadUpdate = true //await browser.storage.local.get("threads").then((x) => { return x.threads._4chanTW.length == threads._4chanTW.length ? true : true });

	  if(threadUpdate){

	      for (let i = 0; i < message[3].length; i++){

		  	await fetch(threads._4chanTW[i].threadLink, {mode: 'cors'})
		  	.then(response => response.text())
 		  	.then(text => {
		    	threads._4chanTW[i].replies = fetchTotalReplies(text)
		    	threads._4chanTW[i].hour = fetchHour(text)
		    	threads._4chanTW[i].img = fetchImage(text)
		    	threads._4chanTW[i].tContent = fetchPostContent(text)
		    	threads._4chanTW[i].title = fetchTitle(text)
    	  	});
	      }
		  browser.storage.local.set( { threads } );
		  console.log( await browser.storage.local.get("threads") );

		//console.log(threads._4chanTW);
		// what i will do next is fetching the threads object and




		// browser.storage.local.set({ threads }).then((x) => return, (error) => {console.log(error)}); // this shit does nothing yet
		//console.log(await browser.storage.local.get("threads"));
		

	//threads.
		//threads._4chanTW = []; // look at this later
		// newThreadsState = message[1].length;  

	// browser.storage.local.set({ newThreadsState }).then(setItem);
}
		  else {
			return
		  }
	break;
  }
}

/////////////// fetching  functions

function fetchTotalReplies(fetchContent){
 let noCalc = fetchContent.slice(fetchContent.search("commentCount") + 23, (fetchContent.search("commentCount") + 28))
		let start_pos = noCalc.indexOf(`"`) + 1;
		let end_pos = noCalc.indexOf(`"`, start_pos);
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
  let start_pos = fileTextIndex.indexOf(`href=`) + 8;
  let end_pos = fileTextIndex.indexOf(`"`, start_pos);

  return fileTextIndex.substring(start_pos, end_pos)
}

//////////////////////

/*setTimeout(() => {
		const jsonBlob = new Blob(["window.tData = " + JSON.stringify(threads._4chanTW, null, 2)], { type: "text/plain" });
		const url = URL.createObjectURL(jsonBlob);

		let downloading = browser.downloads.download({
		  url,
		  filename: "threads-data.js",
		  saveAs: false,
		  conflictAction: "overwrite" 
	  })}, 4000)*/
