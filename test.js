var uniqueId = (function() {
  var counter = 0
	return function() { var head = "No"; return head + counter++}
}())

setInterval(() => {
  console.log(uniqueId())
}, 1000)

