<%
dim username1,username2,username3
dim password1,password2,password3
dim checkNum:checkNum=request("check")
if checkNum="1" then
	username1=request("username1")
	username2=request("username2")
	username3=request("username3")
	password1=request("password1")
	password2=request("password2")
	password3=request("password3")
	response.write(username1&"|"&username2&"|"&username3&"<br/>")
	response.write(password1&"|"&password2&"|"&password3)
	response.end()
end if
%><!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>解决黄色背景</title>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<style>
#demo2 input:-webkit-autofill,textarea:-webkit-autofill,select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset;
} 
</style>
</head>

<body>
<form action="" method="post" id="demo1">
	默认状态
	<input type="text" name="username1" id="username1"/>
	<input type="password" name="password1" id="password1"/>
	<input type="hidden" name="check" value="1">
	<input type="submit" value="提交"/>
</form>
<form action="" method="post" id="demo2">
	css去掉
	<input type="text" name="username2" id="username2"/>
	<input type="password" name="password2" id="password2"/>
	<input type="hidden" name="check" value="1">
	<input type="submit" value="提交"/>
</form>
<form action="" method="post" id="demo3" onsubmit="saves()">
	js去掉
	<input type="text" name="username3" id="username3" autocomplete="off"/>
	<input type="password" name="password3" id="password3" autocomplete="off"/>
	<input type="hidden" name="check" value="1">
	<input type="submit" value="提交"/>
</form>
<script>
	/*
	sessionStorage 在关闭页面后即被清空，而 localStorage 则会一直保存。
	if(window.localStorage){
	 alert('This browser supports localStorage');
	 }else{
	 alert('This browser does NOT support localStorage');
	 }
	 localStorage.a = 3;//设置a为"3"
	 localStorage["a"] = "sfsf";//设置a为"sfsf"，覆盖上面的值
	 localStorage.setItem("b","isaac");//设置b为"isaac"
	 var a1 = localStorage["a"];//获取a的值
	 var a2 = localStorage.a;//获取a的值
	 var b = localStorage.getItem("b");//获取b的值
	 localStorage.removeItem("c");//清除c的值*/
	function saves(){
		var unm=document.getElementById("username3").value;
		var pwd=document.getElementById("password3").value;
		localStorage.setItem("username",unm);
		localStorage.setItem("password",pwd);
	}
	function init(){
		var unm=localStorage.getItem("username");
		var pwd=localStorage.getItem("password");
		unm&&(document.getElementById("username3").value=unm);
		pwd&&(document.getElementById("password3").value=pwd);
	}
	init();
</script>
</body>
</html>