let url = 'https://www.svt.se/text-tv/api/100';
let xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';
xhr.send();

xhr.onload = function() {
	if (xhr.status != 200) { // analyze HTTP status of the response
		alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
	} else { // show the result
		// alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
		let resp = xhr.response;
		let gif = resp['data']['subPages'][0]['gifAsBase64'];

		let img = document.getElementById("text_tv_img");
		img.src = "data:image/gif;base64," + gif;
	}
};

