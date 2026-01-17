let current_x_index = 0;
let current_y_index = 0;
let current_idx = 0;

const max_x_index = 3;
const max_y_index = 1;
const max_idx = max_y_index*(max_x_index+1) + (max_x_index+1) - 1

let mouse_interval = 2*1000;
let mouse_interval_ID = null;
let mouse_cursor_visible = true;


function keyInput(event) {
	let key = event.key;
	let array_arrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
	let array_digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let array_space = [' '];
	//console.log(key);

	if (array_arrow.includes(key)) {
		//console.log(key);
		//return
		keyInputArrow(key);
	} else if (array_digit.includes(key)) {
		//console.log(key);
		return
		keyInputDigit(key);
	} else if (array_space.includes(key)) {
		//console.log('Space!!!');
		return
		keyInputSpace(key);
	}
}

function keyInputArrow(key) {

	if (key === 'ArrowUp') {
		let arr = [current_y_index-1, 0];
		current_y_index =  Math.max( ...arr );
	} else if (key === 'ArrowDown') {
		let arr = [current_y_index+1, max_y_index];
		current_y_index =  Math.min( ...arr );
	} else if (key === 'ArrowLeft') {
		let arr = [current_x_index-1, 0];
		current_x_index =  Math.max( ...arr );
	} else if (key === 'ArrowRight') {
		let arr = [current_x_index+1, max_x_index];
		current_x_index =  Math.min( ...arr );
	}

	updateIdx();
	updateSelection();
	hideMouseCursor();
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

function mouseEnter() {
	unfocusAll()
	this.querySelector("a").focus();

	let els = document.getElementsByClassName('streaming_service'); // htmlCollection
	let arr = [...els];
	let temp_idx = arr.indexOf(this);
	current_idx = temp_idx;
	updateXY();
	//console.log([current_x_index,current_y_index,current_idx]);
}

function unfocusAll() {
	document.activeElement.blur()
	//let els = document.getElementsByClassName('streaming_service');

	//for (let i = 0; i < els.length; i++) {
	//	el = els[i];
	//	el.querySelector("a").focus();
	//}
} 

function preventFocus(event) {
	event.preventDefault()
}

function moveMouseCursor() {
	if (mouse_interval_ID) {
		window.clearTimeout(mouse_interval_ID);
	}
	if (!mouse_cursor_visible) {
		el = document.getElementById('general_overlay');
		el.style.cursor = "default";
		document.body.style.cursor = "default";

		let els = document.getElementsByTagName('a');

		for (let i = 0; i < els.length; i++) {
			el = els[i];
			el.style.cursor = "pointer";
		}

		mouse_cursor_visible = true;
	}
	mouse_interval_ID = window.setTimeout(hideMouseCursor, mouse_interval);
}

function hideMouseCursor() {
	if (mouse_interval_ID) {
		window.clearTimeout(mouse_interval_ID);
		mouse_interval_ID = null;
	}
	if (!mouse_cursor_visible) {
		return;
	}
	mouse_interval_ID = null;
	el = document.getElementById('general_overlay');
	el.style.cursor = "none";
	document.body.style.cursor = "none";

	let els = document.getElementsByTagName('a');

	for (let i = 0; i < els.length; i++) {
		el = els[i];
		el.style.cursor = "none";
	}

	mouse_cursor_visible = false;
}

function updateIdx() {
	current_idx = current_y_index*(max_x_index+1) + (current_x_index+1) - 1;
}

function updateXY() {
	temp_x_index = current_idx%(max_x_index+1);
	temp_y_index = (current_idx-temp_x_index)/(max_x_index+1);
	current_x_index = temp_x_index;
	current_y_index = temp_y_index;
}

function updateSelection() {
	unfocusAll();
	let els = document.getElementsByClassName('streaming_service');
	let el = els[current_idx];
	el.querySelector("a").focus();
	//console.log([current_x_index, current_y_index, current_idx]);
}

function addEventListeners() {
	document.addEventListener('keydown', function(event) {
	    keyInput(event);
	})

	document.body.addEventListener("mousedown", preventFocus);
	document.addEventListener("mousedown", preventFocus);

	document.addEventListener("mousemove", moveMouseCursor);
	mouse_interval_ID = window.setTimeout(hideMouseCursor, mouse_interval);

	let els = document.getElementsByClassName('streaming_service');

	for (let i = 0; i < els.length; i++) {
		el = els[i];
		el.addEventListener("mousemove", mouseEnter);
	}
}

updateIdx();
updateSelection();

addEventListeners()