(()=>{
  'use strict';
  const MENU = document.getElementsByClassName('menu');
  const QUESTION = document.querySelector('#question > h1');
  const answer_option = document.querySelectorAll('#answer_option > ul > li > a');
  const EXPLAIN = document.getElementById('explain');
  const TRUE_FALSE = document.querySelector('#explain > h1');
  const EXPLAIN_SENTENS = document.querySelector('#explain > p');
  const NEXT_BTN = document.querySelector('#next_btn > a');
  const RESULT = document.getElementById('result');
  const SCORE_LABEL = document.querySelector('#result > p');


  let shuffledAnswers;
  let shuffleQuizData = [];//quizDataAllをシャッフル
  let quizData = [];//表示するクイズ(５問)
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  //フィッシャー・イェーツのシャッフルのアルゴリズムを利用
  const SHUFFLE = (arr) => {
    for(let i = arr.length - 1; i >= 0; i--){
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  let createAndSetQuiz = (quizDataAll) => {
    //クイズ配列をシャッフルして5問取り出す
    shuffleQuizData = SHUFFLE(quizDataAll.slice());
    quizData = (shuffleQuizData.slice(0,5));

  //問題文と選択肢を表示する
  let setQuiz = () => {
    isAnswered = false;
    QUESTION.textContent = "問題" + (currentNum + 1) + ". " + quizData[currentNum].q;
    shuffledAnswers = SHUFFLE(quizData[currentNum].a.slice());//シャッフルされたあとquizData[currentNum].aにも上書きされちゃうからslice()でコピーを作りそれをシャッフルして返す
    EXPLAIN.style.display = "none";
    for(let i = 0; i < shuffledAnswers.length; i++){
    answer_option[i].classList.remove('correct');
    answer_option[i].classList.remove('wrong');
    answer_option[i].textContent = shuffledAnswers[i];
    }
  }

  //回答を選択した時の処理
  const SET_EVENTS = () => {
    for(let i = 0; i < answer_option.length; i++){
      answer_option[i].addEventListener('click', function() {
        CHECK_ANSWER(this);
      });
    }

    NEXT_BTN.addEventListener('click', () => {
      if(currentNum === quizData.length){
        RESULT.classList.add('show');
        SCORE_LABEL.textContent = '正解数：' + score + '/' + quizData.length;
      }else{
        setQuiz();
      }
    });

  }

  const CHECK_ANSWER = (node) => {

    if(isAnswered){
      return;
    }
    isAnswered = true;
    if(node.textContent === quizData[currentNum].a[0]){
      TRUE_FALSE.innerHTML = "<span style='color:#94c168;'>正解！！</span>";
      node.classList.add('correct');
      score++;
    }else{
      TRUE_FALSE.innerHTML = "<span style='color:#ff3712;'>不正解。。</span>";
      node.classList.add('wrong');
    }
    EXPLAIN.style.display = "block";
    EXPLAIN_SENTENS.innerHTML = "<span style='font-size:20px; color: black;'>解説: </span>"+quizData[currentNum].e;
    
    currentNum++;
  }
  
    setQuiz();
    SET_EVENTS();
  }
   //ヘッダーメニューの選択
  document.getElementById('food').addEventListener('click',function() {
    quizDataAll = quizCategory[0].food;
    createAndSetQuiz(quizDataAll);
  });
   document.getElementById('creature').addEventListener('click',function() {
    quizDataAll = quizCategory[1].creature;
    createAndSetQuiz(quizDataAll);
  });   
  
  // デフォルト (最初の読み込み時)
  createAndSetQuiz(quizDataAll);
})();
