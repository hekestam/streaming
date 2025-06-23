let current_page_number = '100';
let prev_page_number = '';
let next_page_number = '101';

let resp

function loadPage() {
	let url = 'https://www.svt.se/text-tv/api/' + current_page_number;
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.responseType = 'json';
	xhr.send();

	xhr.onload = function() {
		if (xhr.status != 200) { // analyze HTTP status of the response
			alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
		} else { // show the result
			// alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
			resp = xhr.response;
			if (resp['status'] === 'success') {
				let gif = resp['data']['subPages'][0]['gifAsBase64'];

				let img = document.getElementById("text_tv_img");
				img.src = "data:image/gif;base64," + gif;
				current_page_number = resp['data']['pageNumber'];
				prev_page_number = resp['data']['prevPage'];
				next_page_number = resp['data']['nextPage'];
		
				updatePageNumber(current_page_number);
			}
		}
	};
}

function updateClock() {
	let d = new Date();
	let hour = String(d.getHours()).padStart(2,'0');
	let minute = String(d.getMinutes()).padStart(2,'0');
	let sec = String(d.getSeconds()).padStart(2,'0');

	let time_string = hour + ':' + minute + ':' + sec;
	let time_el = document.getElementById("clock");
	time_el.innerHTML = '<strong>' + time_string + '</strong>';
}

function updatePageNumber(number) {
	let page_string = String(number);
	let page_number_el = document.getElementById("page_number");
	page_number_el.innerHTML = '<strong>&nbsp;' + page_string + '&nbsp;</strong>';
}

function keyInput(event) {
	let key = event.key;
	let array_arrow = ['ArrowUp', 'ArrowDown'];
	let array_digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

	if (array_arrow.includes(key)) {
		keyInputArrow(key);
	}
}

function keyInputArrow(key) {
	if (key === 'ArrowUp') {
		if (next_page_number!='') {
			current_page_number = next_page_number;
			loadPage() 
		}
	} else if (key === 'ArrowDown') {
		if (prev_page_number!='')
			current_page_number = prev_page_number;
			loadPage() 
		}

}

loadPage()
updateClock();

const clock_interval_ID = setInterval(updateClock, 250);
const page_interval_ID = setInterval(loadPage, 15*1000);


document.addEventListener('keydown', function(event) {
    keyInput(event);
})