(() => {
	'use strict';

	let menu = new Vue({
		el: '#menu',
		data: {
			menus: [
				'食べ物',
				'生物',
				'文化・歴史',
				'雑学',
				'すべて'
			]
		},
		
		})
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

	let quiz = new Vue({
		el: '#quiz',
		data: {
			quizDataList: [],
			quizData: []
		},
		created: function(){
			this.getQuizdata()
		},
		methods: {
			getQuizdata: function(){
				axios.get('JS/quizdata.json').then(function(response){
				const quizDataAll = response.data
				let shuffleQuizData = shuffle(quizDataAll.slice());
				this.quizDataList = (shuffleQuizData.slice(0,5));
				console.log("this.quizDataList",this.quizDataList);
				}.bind(this)).catch(function(e){
				console.log(e)
				})
				this.setQuizdata()
			},
			setQuizdata: function(){
				console.log("this.quizDataList",this.quizDataList);
				for(let i = 0; i < this.quizDataList.length; i++){
					this.quizData[i] = this.quizDataList[i];
					console.log(this.quizDataList);
				}

			}

		}
	})



})();
