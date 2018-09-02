const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1;
const week = today.getDay();
const day = today.getDate();

const yobi = new Array("日","月","火","水","木","金","土",);

const today_class = document.getElementById("today");
today_class.innerHTML= "本日は" + year + "年" + month + "月" + day + "日" + yobi[week] + "曜日です";

//classは配列になるから出力時にはインデックス指定する！
// const test_class = document.getElementsByClassName('test');
// console.log(test_class);
// test_class[0].innerHTML = "本日は" + year + "年" + month + "月" + day + "日" + yobi[week] + "曜日だよ";
