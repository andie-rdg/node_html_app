// this function talks to the local GPT robot server
async function talkToRobot(prompt) {

	// Se connecter au serveur GPT local
	const request = await fetch("http://10.42.0.1:3001/ask;'" + prompt + "'", {
		method: 'GET'
	})

	console.log("asking GPT for new text")
	const response = await request.text()
	
	console.log("gpt result received:")
	console.log(response)

}

talkToRobot("hello")