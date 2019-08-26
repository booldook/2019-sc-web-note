const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
var user = null;	// 로그인한 사용자의 정보를 저장하는 변수

// 인증기능 만들기
// $("#btLogin").click(function(e){});
auth.onAuthStateChanged(data => {
	console.log(data);
});
document.querySelector("#btLogin").addEventListener("click", e => {
	auth.signInWithPopup(google);
	//auth.signInWithRedirect(google);
});
document.querySelector("#btLogout").addEventListener("click", e => {
	auth.signOut();
});
