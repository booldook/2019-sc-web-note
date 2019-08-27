// 전역변수
const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();
const db = firebase.database(); // Database는 두가지 SQL(80%) / noSQL(20%) - not only SQL
var user = null;

// 인증관련 전역변수
const _btLogin = document.querySelector("#btLogin");
const _btLogout = document.querySelector("#btLogout");
const _email = document.querySelector("#email");

// 데이터베이스 관련 전역변수
const _btSave = document.querySelector("#btSave");
const _content = document.querySelector("#content");
const _lists = document.querySelector(".lists");

// 인증관련 이벤트
_btLogin.addEventListener("click", function(){
	auth.signInWithPopup(googleAuth);
});

_btLogout.addEventListener("click", function(){
	auth.signOut();
});

auth.onAuthStateChanged(function(data){
	console.log(data);
	user = data;
	if(data) {
		_email.innerHTML = data.email + "/" + data.uid;
		_lists.innerHTML = "";
		dbInit();
	}
	else _email.innerHTML = "";
});

// 데이터베이스 관련 이벤트
function dbInit() {
	db.ref("root/notes/"+user.uid).on("child_added", onAdd);
	db.ref("root/notes/"+user.uid).on("child_removed", onRev);
	db.ref("root/notes/"+user.uid).on("child_changed", onChg);
}

// 데이터 추가 이벤트 후 실행되는 콜백함수
function onAdd(data) {
	console.log(data.val().content + "/" + data.val().time);
	var html = `
	<ul class="list row border-bottom border-primary">
		<li class="col-8 p-2">${data.val().content}</li>
		<li class="col-4 p-2">${dspDate(new Date(data.val().time))}</li>
	</ul>`;
	_lists.innerHTML = html + _lists.innerHTML;
}

// 데이터 삭제 이벤트 후 실행되는 콜백함수
function onRev(data) {

}

// 데이터 변경 이벤트 후 실행되는 콜백함수
function onChg(data) {

}

// 실제 데이터 저장 구현
_btSave.addEventListener("click", function (e) {
	var content = _content.value.trim();
	if(content == "") {
		alert("글을 작성하세요.");
		_content.focus();
		return false;
	}
	db.ref("root/notes/"+user.uid).push({
		content: content,
		time: new Date().getTime()
	}).key;
});
