let randomWordURL = "https://random-word-api.herokuapp.com/word?number=1&swear=0";
let wordDefinitionURL = "https://api.dictionaryapi.dev/api/v2/entries/en_US/";

fetch (randomWordURL)
.then(function(response) {
	return response.json();
})
.then (function (data) {
	console.log(data[0]);
	document.getElementById("term").innerHTML = data[0];
	return data[0];
})
.then (function (word) {
	return fetch(wordDefinitionURL + word);
	
})
.then (function (response) {
	return response.json();
})
.then (function (def) {
	console.log(def);
	
	if (def[0] != undefined) 
	{
		if (def[0].meanings[0] != undefined) 
		{
		
			let definition = def[0].meanings[0].definitions[0].definition;
			let array = def[0].meanings[0].definitions;
			let output = "";
			
			let length = (def[0].meanings).length;
			let elem = document.getElementById("meanings");
			let div = null;
			let txt = null; 
			
			
			// add each meaning
			
			for (let j = 0; j < length; j++) {
				
				let item = def[0].meanings[j];
				
				// get part of speech 
				div = document.createElement('div');
				div.classList.add('partofspeech');
				txt = document.createTextNode(item.partOfSpeech);
				div.appendChild(txt);
				elem.appendChild(div);
				let br = document.createElement("br");
				div.appendChild(br);
				let br2 = document.createElement("br");
				div.appendChild(br2);
				console.log("Item is ");
				console.log(item);
				
				array = item.definitions;
				let i = 0;
				div = document.createElement('div');
				div.classList.add('definition');

				while (i < array.length) {
					txt = document.createTextNode(array[i].definition);
					div.appendChild(txt);

					let br = document.createElement("br");
					div.appendChild(br);
					let br1 = document.createElement("br");
					div.appendChild(br1);
					
					
					i++;
				}
				
				
				elem.appendChild(div);
			}
			
			
			//document.getElementById("definition").innerHTML = output;
			
			
			for (let i = 0; i < array.length; i++) 
			{
				
				output += "<br />" + array[i].definition;
				//document.getElementById("definition").innerHTML ="<br />" + output;
			}
			
			let partsOfSpeech = def[0].meanings[0].partOfSpeech;
			//document.getElementById("partofspeech").innerHTML = partsOfSpeech;
			
			//let pronunciation = def[0].phonetics[0].audio;
					
		} else if(def[0].meanings[0] === undefined) {
			document.getElementById("meanings").innerHTML = "You can try the search again at later time or head to the web instead.";
		}
		
	} else {
		document.getElementById("meanings").innerHTML = "You can try the search again at later time or head to the web instead.";
	}
		
		
	if (def[0].phonetics[0] != undefined) 
		
	{
		
		let array2 = def[0].phonetics;
		let output2 = "";
				
		if (array2.length != 0) {
			for (let k = 0; k < array2.length; k++) {
					output2 +=  "<br /><audio controls> <source src='" + array2[k].audio + "'></source></audio>";
			}
			
			document.getElementById("pronunciation").innerHTML = output2;
		}
		
				
	} else {
			document.getElementById("pronunciation").innerHTML = "Sorry pal, we couldn't find pronunciations for the word you were looking for";
	}
		
	
})








