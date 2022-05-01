'use strict';

const author = document.querySelector('.form__name');
const authorInHeader = document.querySelector('.user-info__wrapper span.author');

getNameFromLS();

function getNameFromLS() {
	let name = localStorage.getItem('name');
	if (name) {
		author.value = name;
		authorInHeader.innerText = name;
	}
	document.querySelector('.icon--active').src = getUserIconFromLS(name);
}


// eventListeners

authorInHeader.addEventListener('click', handleActiveNameClick);
document.querySelector('.user-info__wrapper .input--author').addEventListener('keydown', handleActiveNameEnter);
document.querySelector('.icon--active').addEventListener('click', handleActiveIconClick);
document.querySelector('.icon--add').addEventListener('click', handleAddIconLink);
document.querySelector('.button--send').addEventListener('click', checkMessage);
document.querySelector('.button--clear').addEventListener('click', clearChat);
author.addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		checkActiveUser();
	}
});
document.querySelector('.form__comment').addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		checkMessage();
	}
});

inputFocusOutListener();

function inputFocusOutListener() {
	document.querySelector('.user-info__wrapper .input--author').addEventListener('focusout', handleActiveNameInput);
};

const icons = document.querySelectorAll('.user-info__select-icon .icon-wrapper:not(:last-child)');
for (let icon of icons) {
	icon.addEventListener('click', handleIconClick);
}

// handlers

function handleActiveIconClick() {
	if (changeDisplay('.user-info__select-icon') === 'flex') {
		document.querySelector('.close-select-icon').addEventListener('click', handleCloseSelectionClick);
	} else {
		document.querySelector('.close-select-icon').removeEventListener('click', handleCloseSelectionClick);
	}
}

function handleIconClick(e) {
	let name = author.value;
	localStorage.setItem(`icon${name}`, e.target.src);
	changeDisplay('.user-info__select-icon');
	changeActiveUser(e);
}

function handleActiveNameClick() {
	changeDisplay('.user-info__wrapper .input--author');
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
	author.value = e.target.value;
	authorInHeader.innerText = e.target.value;
	changeDisplay('.user-info__wrapper .input--author');
}

function handleAddIconLink() {
	changeDisplay('.user-info__select-icon')
	changeDisplay('.add-icon-link__wrapper');
	document.querySelector('.btn--add-icon-link').addEventListener('click', handleSaveLinkClick);
}

function handleSaveLinkClick() {
	const link = document.querySelector('.input--add-icon-link').value;
	setActiveIcon(link);
	let name = author.value;
	localStorage.setItem(`icon${name}`, link);
	document.querySelector('.btn--add-icon-link').removeEventListener('click', handleSaveLinkClick);
	changeDisplay('.add-icon-link__wrapper');
}

function handleCloseSelectionClick() {
	changeDisplay('.user-info__select-icon');
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

function sendMessage(message) {
	let name = author.value;
	let userIcon = getUserIconFromLS(name);
	document.querySelector('.chat').innerHTML += `
	<div class="chat__msg">
		<div class="icon-wrapper">
			<img class="user-icon" src="${userIcon}">
		</div>
		<div class="text-wrapper" >
			<span class="author">${name}: </span>
			<span class="comment">${message}</span>
		</div>
	</div>`;
}

function checkActiveUser() {
	const name = author.value;
	const activeUser = authorInHeader;
	if (activeUser.innerText !== name) {
		activeUser.innerText = name;
		setActiveIcon(getUserIconFromLS(name));
	}
}

function checkNameInLS() {
	let name = author.value;
	let lsName = localStorage.getItem('name');
	if ((!lsName) || (lsName !== name)) {
		localStorage.setItem('name', name);
	}
}

function checkSpam() {
	const spamRgEx = /viagra|xxx|ххх/ig;
	let resultText = document.querySelector('.form__comment').value;
	let filteredMsg = resultText.replace(spamRgEx, '***');
	resultText = filteredMsg;
	return filteredMsg;
}

function setActiveIcon(icon) {
	if (!!icon) {
		document.querySelector('.icon--active').src = icon;
	}
}

function changeActiveUser(e) {
	const name = author.value;
	authorInHeader.innerText = (name !== '') ? name : 'Your name';
	document.querySelector('.icon--active').src = e.target.src;
}

function getUserIconFromLS(name) {
	let userIcon = localStorage.getItem(`icon${name}`);
	return userIcon ? userIcon : 'https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/user_people_person_users_man-512.png';
}

// helpers

function changeDisplay(selector) {
	return document.querySelector(selector).style.display = !isDisplayed(selector) ? 'flex' : 'none';
}

function clearChat() {
	document.querySelector('.chat').innerHTML = '';
	clearComment();
}

function clearComment() {
	document.querySelector('.form__comment').value = '';
}

function isCommentEmpty() {
	return document.querySelector('.form__comment').value.trim() === '';
}

function isDisplayed(selector) {
	return document.querySelector(selector).style.display === 'flex';
}