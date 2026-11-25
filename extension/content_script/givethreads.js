console.log("M");

const kk = async () => {
  const reply = await browser.runtime.sendMessage([0])
  //console.log(reply);
	return reply;
  // window.tData = JSON.stringify(reply._4chanTW)
}
kk().then((x) => { window.postMessage({ type: "TO_EXT", data: x }, "*") })

//window.postMessage({ type: "TO_EXT", data: "w" }, "*")
