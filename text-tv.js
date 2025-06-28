let current_page_number = '100';
let prev_page_number = '';
let next_page_number = '101';
let last_page_number = '100';
let key_input_var = '';

let sub_pages_array = [];
let current_subpage = 0;
let prev_subpage = 0;
let next_subpage = 0;
let maximum_subpage = 1;

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
				sub_pages_array = resp['data']['subPages'];
				current_subpage = 0;
				loadSubPage()
				
				last_page_number = current_page_number;
				current_page_number = resp['data']['pageNumber'];
				prev_page_number = resp['data']['prevPage'];
				next_page_number = resp['data']['nextPage'];
		
				updatePageNumber(current_page_number);
			} else {
				current_page_number = last_page_number;
				updatePageNumber(current_page_number);
			}
		}
	};
}

function loadSubPage() {
	let temp_sub_page = current_subpage;

	if (sub_pages_array.length > temp_sub_page) {
		let gif = sub_pages_array[temp_sub_page]['gifAsBase64'];
	
		let img = document.getElementById("text_tv_img");
		img.src = "data:image/gif;base64," + gif;

		next_subpage = (temp_sub_page + 1) % sub_pages_array.length;
		prev_subpage = (temp_sub_page - 1) % sub_pages_array.length;
		if (prev_subpage < 0) {
			prev_subpage += sub_pages_array.length;
		}
	}
}

function updateClock() {
	let d = new Date();
	let hour = String(d.getHours()).padStart(2,'0');
	let minute = String(d.getMinutes()).padStart(2,'0');
	let sec = String(d.getSeconds()).padStart(2,'0');

	let time_string = hour + ':' + minute + ':' + sec;
	let time_el = document.getElementById("clock");
	let spacer = '&nbsp;'.repeat(7);
	time_el.innerHTML = '<strong>' + spacer + time_string + '</strong>';
}

function updatePageNumber(number) {
	let page_string = String(number);
	let page_number_el = document.getElementById("page_number");
	page_number_el.innerHTML = '<strong>&nbsp;' + page_string + '&nbsp;</strong>';
}

function keyInput(event) {
	let key = event.key;
	let array_arrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
	let array_digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	if (array_arrow.includes(key)) {
		keyInputArrow(key);
	} else if (array_digit.includes(key)) {
		keyInputDigit(key);
	}
}

function keyInputArrow(key) {
	key_input_var = '';
	clearInterval(page_interval);
	page_interval_ID = setInterval(loadPage, page_interval);

	if (key === 'ArrowUp') {
		if (next_page_number!='') {
			last_page_number = current_page_number;
			current_page_number = next_page_number;
			loadPage() 
		}
	} else if (key === 'ArrowDown') {
		if (prev_page_number!='') {
			last_page_number = current_page_number;
			current_page_number = prev_page_number;
			loadPage() 
		}
	} else if (key === 'ArrowLeft') {
		current_subpage = prev_subpage;
		loadSubPage();
	} else if (key === 'ArrowRight') {
		current_subpage = next_subpage;
		loadSubPage();
	}


}

function keyInputDigit(key) {
	key_input_var += key;
	let temp_key_input_var = key_input_var.padEnd(3,'-');
	updatePageNumber(temp_key_input_var);
	
	if (key_input_var.length===3) {
		let temp_int = parseInt(key_input_var);
		console.log(temp_int);
		key_input_var = '';
		if (temp_int >= 100 && temp_int <= 899) {
			last_page_number = current_page_number;
			current_page_number = String(temp_int);
			loadPage(temp_int)
			
			clearInterval(page_interval);
			page_interval_ID = setInterval(loadPage, page_interval);
		} else {
			updatePageNumber(current_page_number);
		}
	}

}

loadPage()
updateClock();

let clock_interval = 250;
let page_interval = 2*60*1000;

let clock_interval_ID = setInterval(updateClock, clock_interval);
let page_interval_ID = setInterval(loadPage, page_interval);


document.addEventListener('keydown', function(event) {
    keyInput(event);
})