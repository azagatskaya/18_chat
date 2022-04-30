'use strict';

// document.addEventListener('DOMContentLoaded', function () {
getNameFromLS();

function getNameFromLS() {
	let name = localStorage.getItem('name');
	if (name) {
		document.querySelector('.form__name').value = name;
	}
}

document.querySelector('.header .user-icon').addEventListener('click', selectIcon);
document.querySelector('.button--send').addEventListener('click', checkMessage);
document.querySelector('.button--clear').addEventListener('click', clearChat);
document.querySelector('.form__comment').addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		checkMessage();
	}
});

function checkMessage() {
	if (!isCommentEmpty()) {
		checkNameInLocalStorage();
		sendMessage(checkSpam());
		clearComment();
	}
}

function checkSpam() {
	const spamRgEx = /viagra|xxx|ххх/ig;
	let resultText = document.querySelector('.form__comment').value;
	let filteredMsg = resultText.replace(spamRgEx, '***');
	resultText = filteredMsg;
	return filteredMsg;
}

function isCommentEmpty() {
	return document.querySelector('.form__comment').value.trim() === '';
}

function sendMessage(message) {
	let author = document.querySelector('.form__name').value;
	let userIcon = getUserIconFromLS(author);
	document.querySelector('.chat').innerHTML += `<div class="chat__msg">
	<div class="icon-wrapper">
	<img class="user-icon" src="${userIcon}"></div>
	<span class="author">${author}: </span>
	<span class="comment">${message}</span></div>`;
}

function getUserIconFromLS(author) {
	let userIcon = localStorage.getItem(`icon${author}`);
	return userIcon ? userIcon : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
}

function checkNameInLocalStorage() {
	let author = document.querySelector('.form__name').value;
	let lsName = localStorage.getItem('name');
	if ((!lsName) || (lsName !== author)) {
		localStorage.setItem('name', author);
	}
}

function clearChat() {
	document.querySelector('.chat').innerHTML = '';
	clearComment();
}

function clearComment() {
	document.querySelector('.form__comment').value = '';
}

// });