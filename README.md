# Firebase를 배워보자
## Firebase 설치
1. 파이어베이스를 설치하기 위해서는 https://nodejs.org 에서 node.js를 먼저 설치한 이후
2. 아래와 같이 터미널 창에서 -g(Global option)옵션으로 firebase를 설치한다. 
```console
npm i -g firebase-tools
```
---
## Firebase 최초 구동
1. 터미널 창에서 아래와 같이 실행한 후 실행된 브라우저에서 로그인을 진행하며 로그인 할 계정은 firebase.com의 회원계정(구글계정)과 일치하여야 한다.
```bash
firebase login
```
---
## Firebase 프로젝트 만들기
1. 프로젝트 폴더를 생성 후 `vscode`를 실행하여 프로젝트 폴더를 연다.
2. `vscode`의 터미널 창에서 
```
firebase init
```
위와같이 실행하여 프로젝트 Initialize를 해준다.
3. init을 진행중 선택화면이 나오면 프로젝트에 포함할 서비스를 선택한다.
* database
* auth
* storage
* hosting 등
4. 이후 public(웹의 루트폴더)선택 등 옵션은 우선적으로 `y`눌러 진행한다.
5. 프로젝트의 선택은 미리 http://firebase.com 에서 생성한 프로젝트의 id를 선택한다.
6. public 폴더에 우리가 필요한 `css/html/img/js` 등의 폴더를 생성한다.
---
## Firebase 프로젝트 코딩
1. `프로젝트 시작파일(예: index.html)`에 아래와 같은 코드를 포함시킨다.
```html
<!--firebase js module-->
<script src="/__/firebase/6.4.2/firebase-app.js"></script>
<script src="/__/firebase/6.4.2/firebase-auth.js"></script>
<script src="/__/firebase/6.4.2/firebase-database.js"></script>
<script src="/__/firebase/6.4.2/firebase-messaging.js"></script>
<script src="/__/firebase/6.4.2/firebase-storage.js"></script>
<script src="/__/firebase/init.js"></script>
<!--우리가 작성할 js module-->
<script src="../js/util.js"></script>
<script src="../js/note.js"></script>
```
