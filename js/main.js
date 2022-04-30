'use strict';

// document.addEventListener('DOMContentLoaded', function () {
getNameFromLS();


function getNameFromLS() {
	let name = localStorage.getItem('name');
	if (name) {
		document.querySelector('.form__name').value = name;
		document.querySelector('.user-info__wrapper .author').innerText = name;
	}
	document.querySelector('.icon--active').src = getUserIconFromLS(name);
}

document.querySelector('.icon--active').addEventListener('click', handleActiveIconClick);
document.querySelector('.button--send').addEventListener('click', checkMessage);
document.querySelector('.button--clear').addEventListener('click', clearChat);
document.querySelector('.form__comment').addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		e.preventDefault();
		checkMessage();
	}
});

const iconToAdd = document.querySelectorAll('.user-info__select-icon .user-icon:last-child').addEventListener('click', addIconLink);
const icons = document.querySelectorAll('.user-info__select-icon .user-icon:not(:last-child)');
for (let icon of icons) {
	icon.addEventListener('click', handleIconClick);
}

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

function isCommentEmpty() {
	return document.querySelector('.form__comment').value.trim() === '';
}

function sendMessage(message) {
	let author = document.querySelector('.form__name').value;
	let userIcon = getUserIconFromLS(author);
	document.querySelector('.chat').innerHTML += `<div class="chat__msg">
	<img class="user-icon" src="${userIcon}">
	<span class="author">${author}: </span>
	<span class="comment">${message}</span></div>`;
}

function getUserIconFromLS(author) {
	let userIcon = localStorage.getItem(`icon${author}`);
	return userIcon ? userIcon : 'https://cdn-icons.flaticon.com/png/512/2105/premium/2105556.png?token=exp=1651353113~hmac=6e5f91dd2ec0e342534e36a0c8cfb5a7';
}

function handleIconClick(e) {
	let author = document.querySelector('.form__name').value;
	localStorage.setItem(`icon${author}`, e.target.src);
	changeMenuDisplay();
	changeActiveUser(e);
}

function checkActiveUser() {
	const name = document.querySelector('.form__name').value;
	const activeUser = document.querySelector('.user-info__wrapper .author');
	if (activeUser.innerText !== name) {
		activeUser.innerText = name;
		const icon = getUserIconFromLS(name);
		if (!!icon) {
			document.querySelector('.icon--active').src = icon;
		}
	}
}

function changeActiveUser(e) {
	const name = document.querySelector('.form__name').value;
	const activeUser = document.querySelector('.user-info__wrapper .author');
	if (name !== '') {
		document.querySelector('.user-info__wrapper .author').innerText = name;
		document.querySelector('.icon--active').src = e.target.src;
	} else {
		document.querySelector('.user-info__wrapper .author').innerText = 'Your name';
	}
}

function handleActiveIconClick() {
	changeMenuDisplay();

}

function addIconLink() {

}

function changeMenuDisplay() {
	!isMenuDisplayed() ? document.querySelector('.user-info__select-icon').style.display = 'flex' : document.querySelector('.user-info__select-icon').style.display = 'none';
}

function isMenuDisplayed() {
	return document.querySelector('.user-info__select-icon').style.display === 'flex';
}

function clearChat() {
	document.querySelector('.chat').innerHTML = '';
	clearComment();
}

function clearComment() {
	document.querySelector('.form__comment').value = '';
}

// });