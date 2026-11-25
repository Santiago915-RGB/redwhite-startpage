console.log("W");


window.addEventListener("message", (e) => {
  if (e.source !== window || e.data?.type !== "TO_EXT") return;
  window.tData = e.data.data;
  console.log(e.data.data);
});
