const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
var user = null;	// 로그인한 사용자의 정보를 저장하는 변수

// 인증기능 만들기
// $("#btLogin").click(function(e){});
auth.onAuthStateChanged(data => {
	user = data;
	console.log(user);
	if(user == null) viewChg('');
	else viewChg('R');
});
document.querySelector("#btLogin").addEventListener("click", e => {
	auth.signInWithPopup(google);
	//auth.signInWithRedirect(google);
});
document.querySelector("#btLogout").addEventListener("click", e => {
	auth.signOut();
});


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