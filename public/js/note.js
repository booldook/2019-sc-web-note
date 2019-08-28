const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const db = firebase.database();

var user = null;	// 로그인한 사용자의 정보를 저장하는 변수

const _btLogin = document.querySelector("#btLogin");
const _btLogout = document.querySelector("#btLogout");
const _btSave = document.querySelector("#btSave");
const _content = document.querySelector("#noteTxt");
const _lists = document.querySelector(".lists");

// 인증기능 만들기
// $("#btLogin").click(function(e){});
auth.onAuthStateChanged(data => {
	user = data;
	console.log(user);
	if(user == null) viewChg('');
	else {
		viewChg('R');
		dbInit();
	}
});
_btLogin.addEventListener("click", e => {
	auth.signInWithPopup(google);
	//auth.signInWithRedirect(google);
});
_btLogout.addEventListener("click", e => {
	auth.signOut();
});

// 노트 추가하기
_btSave.addEventListener("click", (e) => {
	var content = _content.value.trim();
	if(content === "") {
		alert("내용을 입력하세요.");
		_content.focus();
		return false;
	}
	db.ref("root/notes/"+user.uid).push({
		content: content,
		time: new Date().getTime(),
		icon: content.substring(0, 1)
	}).key;
	_content.value = "";
});

// Database init
function dbInit() {
	_lists.innerHTML = "";
	db.ref("root/notes/"+user.uid).on("child_added", onAdd);
	db.ref("root/notes/"+user.uid).on("child_removed", onRev);
	db.ref("root/notes/"+user.uid).on("child_changed", onChg);
}

// Database onAdd 콜백함수
function onAdd(data) {
	var html = '';
	html += '<ul class="list border border-white rounded p-3 mt-3 bg-primary text-light position-relative" id="'+data.key+'">';
	html += '<li class="d-flex">';
	html += '<h1 class="bg-light text-primary rounded-circle text-center mr-3 flex-shrink-0" style="width: 56px; height: 56px;">'+data.val().icon+'</h1>';
	html += '<div>'+data.val().content+'</div>';
	html += '</li>';
	html += '<li>'+dspDate(new Date(data.val().time))+'</li>';
	html += '<li class="position-absolute" style="bottom: 5px; right: 10px; cursor: pointer;">';
	html += '<i class="fas fa-trash-alt" onclick="dataRev(this);"></i>';
	html += '</li>';
	html += '</ul>';
	_lists.innerHTML = html + _lists.innerHTML;
}

// Database onRev 콜백함수
function onRev(data) {
	var id = data.key;
	document.querySelector("#"+id).remove();
}

// Database onChg 콜백함수
function onChg(data) {

}

// onclick 함수 : dataRev()
function dataRev(obj) {
	//console.log(obj.parentNode.parentNode.getAttribute("id"));
	if(confirm("진심 삭제?")) {
		var key = obj.parentNode.parentNode.getAttribute("id");
		db.ref("root/notes/"+user.uid+"/"+key).remove();
	}
}


// 화면전환 함수
function viewChg(state){
	switch(state) {
		case "R" :
			imagesLoaded(document.querySelector(".email img"), () => {
				document.querySelector(".email img").setAttribute("src", user.photoURL);
				document.querySelector(".email-txt").innerHTML = user.email;
				document.querySelector(".email").style.display = "flex";
				document.querySelector("#btLogin").style.display = "none";
			});
			document.querySelector(".email img").setAttribute("src", user.photoURL);	
			break;
		default :
		document.querySelector(".email-txt").innerHTML = "";
			document.querySelector(".email").style.display = "none";
			document.querySelector("#btLogin").style.display = "inline-block";
			break;
	}
}