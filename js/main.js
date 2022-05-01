'use strict';

// document.addEventListener('DOMContentLoaded', function () {
getNameFromLS();

function getNameFromLS() {
	let name = localStorage.getItem('name');
	if (name) {
		document.querySelector('.form__name').value = name;
		document.querySelector('.user-info__wrapper span.author').innerText = name;
	}
	document.querySelector('.icon--active').src = getUserIconFromLS(name);
}

// eventListeners

document.querySelector('.user-info__wrapper span.author').addEventListener('click', handleActiveNameClick);
inputFocusOutListener();

function inputFocusOutListener() {
	document.querySelector('.user-info__wrapper input').addEventListener('focusout', handleActiveNameInput)
};
document.querySelector('.user-info__wrapper input').addEventListener('keydown', handleActiveNameEnter);
document.querySelector('.icon--active').addEventListener('click', handleActiveIconClick);
document.querySelector('.button--send').addEventListener('click', checkMessage);
document.querySelector('.button--clear').addEventListener('click', clearChat);
document.querySelector('.form__comment').addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		checkMessage();
	}
});

document.querySelector('.icon--add').addEventListener('click', addIconLink);
const icons = document.querySelectorAll('.user-info__select-icon .icon-wrapper:not(:last-child)');
for (let icon of icons) {
	icon.addEventListener('click', handleIconClick);
}

// handlers

function handleIconClick(e) {
	let author = document.querySelector('.form__name').value;
	localStorage.setItem(`icon${author}`, e.target.src);
	changeDisplay('.user-info__select-icon');
	changeActiveUser(e);
}

function handleActiveIconClick() {
	changeDisplay('.user-info__select-icon');
}

function handleActiveNameClick() {
	changeDisplay('.user-info__wrapper input');
}

function handleActiveNameEnter(e) {
	if (e.keyCode === 13) {
		e.target.removeEventListener('focusout', handleActiveNameInput);
		handleActiveNameInput(e);
		setTimeout(inputFocusOutListener, 3000);
	}
}

function handleActiveNameInput(e) {
	e.preventDefault();
	setActiveIcon(getUserIconFromLS(e.target.value));
	document.querySelector('.form__name').value = e.target.value;
	document.querySelector('.user-info__wrapper span.author').innerText = e.target.value;
	changeDisplay('.user-info__wrapper input');
}

// main functions

function checkMessage() {
	if (!isCommentEmpty()) {
		checkNameInLS();
		checkActiveUser();
		sendMessage(checkSpam());
		clearComment();
	}
}

function checkNameInLS() {
	let author = document.querySelector('.form__name').value;
	let lsName = localStorage.getItem('name');
	if ((!lsName) || (lsName !== author)) {
		localStorage.setItem('name', author);
	}
}

function checkSpam() {
	const spamRgEx = /viagra|xxx|ххх/ig;
	let resultText = document.querySelector('.form__comment').value;
	let filteredMsg = resultText.replace(spamRgEx, '***');
	resultText = filteredMsg;
	return filteredMsg;
}

function sendMessage(message) {
	let author = document.querySelector('.form__name').value;
	let userIcon = getUserIconFromLS(author);
	document.querySelector('.chat').innerHTML += `<div class="chat__msg">
	<div class="icon-wrapper">
		<img class="user-icon" src="${userIcon}">
	</div>
	<span class="author">${author}: </span>
	<span class="comment">${message}</span>
	</div>`;
}

function checkActiveUser() {
	const name = document.querySelector('.form__name').value;
	const activeUser = document.querySelector('.user-info__wrapper span.author');
	if (activeUser.innerText !== name) {
		activeUser.innerText = name;
		setActiveIcon(getUserIconFromLS(name));
	}
}

function setActiveIcon(icon) {
	if (!!icon) {
		document.querySelector('.icon--active').src = icon;
	}
}

function changeActiveUser(e) {
	const name = document.querySelector('.form__name').value;
	console.log(name);
	// const activeUser = document.querySelector('.user-info__wrapper .author');
	if (name !== '') {
		document.querySelector('.user-info__wrapper span.author').innerText = name;
		document.querySelector('.icon--active').src = e.target.src;
	} else {
		document.querySelector('.icon--active').src = e.target.src;
		document.querySelector('.user-info__wrapper span.author').innerText = 'Your name';
	}
}

// helpers

function addIconLink() {

}

function changeDisplay(selector) {
	document.querySelector(selector).style.display = !isDisplayed(selector) ? 'flex' : 'none';
}

function clearChat() {
	document.querySelector('.chat').innerHTML = '';
	clearComment();
}

function clearComment() {
	document.querySelector('.form__comment').value = '';
}

function getUserIconFromLS(author) {
	let userIcon = localStorage.getItem(`icon${author}`);
	return userIcon ? userIcon : 'https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/user_people_person_users_man-512.png';
}

function isCommentEmpty() {
	return document.querySelector('.form__comment').value.trim() === '';
}

function isDisplayed(selector) {
	return document.querySelector(selector).style.display === 'flex';
}
// });