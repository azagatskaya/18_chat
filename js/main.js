'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
	let name = getNameFromLocalStorage();
	if (name) {
		document.querySelector('.form__name').value = name;
	}
});

document.querySelector('.button--send').addEventListener('click', checkMessage);
document.querySelector('.button--clear').addEventListener('click', clearChat);
document.querySelector('.form__comment').addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		checkMessage();
	}
});

function checkMessage() {
	let author = document.querySelector('.form__name').value;
	if (!isCommentEmpty()) {
		if (!getNameFromLocalStorage()) {
			localStorage.setItem('name', author);
		}
		if (getNameFromLocalStorage() !== author) {
			localStorage.setItem('name', author);
		}
		sendMessage();
		clearComment();
	}
}

function checkSpam() {
	const spamExamples = [/viagra/ig, /xxx/ig];
	let filteredMsg = '';
	let resultText = getUserMsg();
	for (let spamWord of spamExamples) {
		filteredMsg = resultText.replace(spamWord, '***');
		resultText = filteredMsg;
	}
	return filteredMsg;
}

function isCommentEmpty() {
	return document.querySelector('.form__comment').value.trim() === '';
}

function sendMessage() {
	let author = document.querySelector('.form__name').value;
	let comment = document.querySelector('.form__comment').value;
	document.querySelector('.chat').innerHTML += `<div class="chat__msg"><span class="author">${author}: </span><span class="comment">${comment}</span></div>`;
}

function getNameFromLocalStorage() {
	return localStorage.getItem('name');
}

function clearChat() {
	document.querySelector('.chat').innerHTML = '';
	clearComment();
}

function clearComment() {
	document.querySelector('.form__comment').value = '';
}



// объект
const obj = {
	prop1: 'value1',
	prop2: 'value2',
	prop3: 'value3'
}

//сохраним объект в LocalStorage предварительно преобразовав его в строку JSON
localStorage['mykey'] = JSON.stringify(obj);
// если ключ «mykey» имеется в localStorage, то...
if (localStorage['mykey']) {
	// получим из LocalStorage значение ключа «mykey» и преобразуем его с помощью метода JSON.parse() в объект
	const newObj = JSON.parse(localStorage['mykey']);
	console.log(newObj);

}