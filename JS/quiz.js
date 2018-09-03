(()=>{
  'use strict';

  const question = document.querySelector('#question > h1');
  const answer_option = document.querySelectorAll('#answer_option > ul > li');
  const explain = document.getElementById('explain');
  const explain_sentens = document.querySelector('#explain > p');
  const next_btn = document.getElementById('next_btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  let shuffledAnswers;

  const quizDataAll = [
    {q: '与那国島の方言で「ありがとう」はなんという？', a: ['ふがらっさ〜','てんきゅ〜','かむさ〜'], e: '与那国の方言でありがとうは「ふがらっさー」と言います。ネイティブの発音はぜひ現地で聞いてみてね〜♪'},
    {q: '長命草を食べるとどうなるといわれている？', a: ['長生きできる','与那国馬になれる','空を飛べる'], e: '長命草には豊富な栄養素が含まれています。皆さんも摂取して健康長寿！'},
    {q: '与那国島の人口はおおよそ何人？', a: ['1700人','540人','15000人'], e: '2018/07/31現在の人口は1680人です。外出先で知り合いに遭遇する確率100%(笑)'},
    {q: '与那国島は日本のどこにある？', a: ['日本最西端','日本最東端','日本最北端'], e: '与那国島は日本の最西端の島で、沖縄県八重山諸島の一番西の端っこにあります。すぐお隣には台湾があります。（頑張れば泳げると思う。頑張れば。。）'},
    {q: '小学校は何校あるでしょう？', a: ['3校','6校','9校'], e: '小学校は3校です。与那国小学校と久部良小学校と比川小学校があります。'},
    {q: '与那国島に生息している世界最大の蛾の名前は？', a: ['ヨナグニサン','サイトウサン','オオシロサン'], e: '与那国島で初めて発見されたことから「ヨナグニサン」という名前になりました。羽を広げると18cm~24cmにもなります。（でか！）ちなみに与那国の方言では「アヤミハビル」と言います。'},
    {q: '与那国島を方言で言うと？', a: ['どなん','やいま','うちなー'], e: '渡難と書いて「どなん」と呼びます。昔は海風が強く日本の端っこにあるため船で渡るには難しい島（渡難）だったというのが由来です。'},
    {q: '唯一与那国島でしか製造されていない泡盛の種類は何でしょう？', a: ['花酒','木酒','土酒'], e: '花酒はアルコール度数が60％以上の泡盛で、日本で製造されているお酒の中では1番アルコール度数が高いお酒です。'},
    {q: '与那国島から台湾までの距離はどのくらいでしょう？', a: ['111km','222km','333km'], e: '台湾までの距離は111kmです。たまーに西崎灯台から台湾が見えます！ちなみに石垣島との距離は127kmです。台湾の方が近い！！(笑)'},
    {q: '与那国島の山の中には不思議な岩がありますがどんな岩でしょう？', a: ['人面岩','光岩','浮遊岩'], e: '人面岩は島の南側の「新川鼻」という岬の高台にあります。獣道を進んでいくと目の前に人面岩が現れます！ちょっとした冒険みたいで楽しいですよ〜♪'},
  ];

  let shuffleQuizData = [];//quizDataAllをシャッフル
  let quizData = [];//表示するクイズ(５問)
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  //フィッシャー・イェーツのシャッフルのアルゴリズムを利用
  const shuffle = (arr) => {
    for(let i = arr.length - 1; i >= 0; i--){
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  //クイズ配列をシャッフルして5問取り出す
  shuffleQuizData = shuffle(quizDataAll.slice());
  quizData = (shuffleQuizData.slice(0,5));
  
  //問題文と選択肢を表示する
  let setQuiz = () => {
    isAnswered = false;
    question.textContent = quizData[currentNum].q;
    shuffledAnswers = shuffle(quizData[currentNum].a.slice());//シャッフルされたあとquizData[currentNum].aにも上書きされちゃうからslice()でコピーを作りそれをシャッフルして返す
    explain.style.display = "none";
    for(let i = 0; i < shuffledAnswers.length; i++){
    answer_option[i].classList.remove('correct');
    answer_option[i].classList.remove('wrong');
    answer_option[i].textContent = shuffledAnswers[i];
    }
  }

  //回答を選択した時の処理
  const setEvents = () => {
    for(let i = 0; i < answer_option.length; i++){
      answer_option[i].addEventListener('click', function() {
        checkAnswer(this);
      });
    }
    next_btn.addEventListener('click', ()=>{

      if(currentNum === quizData.length){
        result.classList.add('show');
        scoreLabel.textContent = '正解数：' + score + '/' + quizData.length;
      }else{
        setQuiz();
      }
    });
  }

  const checkAnswer = (node) => {
    if(isAnswered){
      return;
    }
    isAnswered = true;
    if(node.textContent === quizData[currentNum].a[0]){
      node.innerHTML += "<span style='margin-left: 50px;'>正解！！</span>";
      node.classList.add('correct');
      score++;
    }else{
      node.innerHTML += "<span style='margin-left: 50px;'>不正解</span>";
      node.classList.add('wrong');
    }
    explain.style.display = "block";
    explain_sentens.textContent = quizData[currentNum].e;

    currentNum++;
  }

  setQuiz();
  setEvents();

})();
