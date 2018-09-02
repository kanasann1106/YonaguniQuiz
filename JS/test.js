const fncCall = () => {
  const mes = "関数が呼び出されました！";
  alert(mes);
}

const greet = (name) => {
  const target = document.getElementById("output");
  target.innerHTML = "こんにちは";
  target.style = "color: red; font-size: 30px; border: solid 1px; width: 155px;"
}

//ボタンの上の文字を変更する関数
const myNameButton = document.getElementById("my_name");
console.log(myNameButton);
const myFunc = () => {
  myNameButton.value = "かなだよ";
}
myNameButton.onclick = myFunc;

const like = document.getElementsByClassName("like");
console.log(like[0]);
console.log(like[1]);
console.log(like);

//クリックするたび数字が増える関数
let num = 0;
const add = () =>{
  num++;
  alert("数字は" + num + "です");
}
