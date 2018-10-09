(()=>{
  'use strict';
  const menu = document.getElementsByClassName('menu');
  const question = document.querySelector('#question > h1');
  const answer_option = document.querySelectorAll('#answer_option > ul > li > a');
  const explain = document.getElementById('explain');
  const t_f = document.querySelector('#explain > h1');
  const explain_sentens = document.querySelector('#explain > p');
  const next_btn = document.querySelector('#next_btn > a');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');


  let shuffledAnswers;
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

  let test = quizDataAll[2].history;
  let foods = quizDataAll[0].food;
  
  //ヘッダーメニューの選択
  
  document.getElementById('food').addEventListener('click',function(){
        test = foods;
         console.log(currentNum++);
  });

console.log(foods.slice());
console.log(test);

  

  //クイズ配列をシャッフルして5問取り出す
  shuffleQuizData = shuffle(test.slice());
  quizData = (shuffleQuizData.slice(0,5));
  
  //問題文と選択肢を表示する
  let setQuiz = () => {
    isAnswered = false;
    question.textContent = "問題" + (currentNum + 1) + ". " + quizData[currentNum].q;
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
      t_f.innerHTML = "<span style='color:#94c168;'>正解！！</span>";
      node.classList.add('correct');
      score++;
    }else{
      t_f.innerHTML = "<span style='color:#ff3712;'>不正解。。</span>";
      node.classList.add('wrong');
    }
    explain.style.display = "block";
    explain_sentens.innerHTML = "<span style='font-size:20px; color: black;'>解説: </span>"+quizData[currentNum].e;
    
    currentNum++;
  }
  
  setQuiz();
  setEvents();

})();
