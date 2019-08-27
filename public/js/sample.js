const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();

const _btLogin = document.querySelector("#btLogin");
const _btLogout = document.querySelector("#btLogout");
const _email = document.querySelector("#email");

_btLogin.addEventListener("click", function(){
	auth.signInWithPopup(googleAuth);
});

_btLogout.addEventListener("click", function(){
	auth.signOut();
});

auth.onAuthStateChanged(function(data){
	console.log(data);
	if(data) _email.innerHTML = data.email;
	else _email.innerHTML = "";
});
