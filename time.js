var before = Date.now();

setTimeout(() => {
  var after = Date.now();
  console.log("Read Time: " + (after - before));
}, 3000);
