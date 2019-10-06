---
title: ES6 array helper method들을 알아보자
date: "2016-10-14"
category: [Dev]
description: 알아두면 두고두고 편하게 쓸 수 있는 es6의 array helper method들의 사용법에 대해서 알아보자.
tag: [es6, javascript]
---

이 글은 ES6를 막 공부하기 시작한 사람이 공부한 내용을 정리하고 작성한 글입니다. 따라서 내용이 정확하지 않을 수 있습니다. 글에 오류가 있으면 따끔하게 지적해주세요!

---

ES6에는 배열(array)을 처리 할 수 있는 여러 함수들이 있다. ES5에서 넘어온 함수들도 있고 [loadash](https://lodash.com/)와 같은 라이브러리 함수에서 아이디어를 얻어 추가된 함수들도 있습니다.

핼퍼 메소드들을 사용하지 않고 for loop를 사용하여 원하는 기능을 직접 구현할 수 있지만 <del>개인적인 생각으론</del> 헬퍼 메소드들을 이용하면 더 쉽게 자료들을 처리 할 수 있고 길어지는 코드에서 개발자의 실수를 줄일수 있다는 장점이 있습니다.

이번 포스팅에서 다룰 메소드들은 다음과 같습니다.

- [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
- [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

---

## [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
> The **forEach()** method executes a provided function once per array element.

과일이 모여있는 배열을 출력하는 자바스크립트 코드는 다음과 같이 작성할 수 있습니다.
```javascript
var fruits = ['apple','banana','peach','blue berry'];

for(var i = 0 ; i < fruits.length ; i++) {
  console.log(fruits[i]);
}
```

[for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) 반복문을 사용하면 위와 같이 배열의 원소들을 출력할 수 있습니다. 이때 배열의 반복은 [array.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 번 반복하면 됩니다.

위 코드를 **forEach** 메소드로 다시 구현해보면 아래와 같습니다.
```javascript
var fruits = ['apple','banana','peach','blue berry'];

fruits.forEach(function(fruit) { // .forEach((fruit) =>
  console.log(fruit);
});
```

**forEach** 는 전달받은 함수를 배열의 각각 원소에대해서 실행하므로 다음과 같이 사용할 수 있습니다.


```javascript
function addComment(comment){
  //어떤 함수
  ...
}

var comments = [
  { id: 3, content: '굿 모닝' },
  { id: 6, content: '좋은 아침이네요' },
  { id: 10, content: '아침에는 시원한 물 한잔' }];


// for loop사용
for (var i = 0; i < posts.length; i++) {
  addComment(comments[i]);
}

//forEach 사용
comments.forEach(addComment);
```

---

## [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
> The **map()** method creates a new array with the results of calling a provided function on every element in this array.

과일이름이 들어있는 배열에서 각각 원소에 *juice* 라는 문자열을 덧붙여 새로운 배열을 만든다면 아래와 같이 구현할 수 있습니다.

```javascript
var fruits = ['apple','banana','peach','blue berry'];
var juice = [];

for(var i = 0 ; i < fruits.length ; i++){
	juice.push(fruits[i]+' juice');
}
```

**map** 을 사용하면 아래와 같이 구현 할 수 있습니다.
```javascript
var fruits = ['apple','banana','peach','blue berry'];

var juice = fruits.map(function(fruit) { // .map((fruit) =>
	return fruit + ' juice';
});
```

좀 더 ES6스럽게 코드를 작성한다면 아래와 같이 작성합니다.
```javascript
var juice = fruits.map(fruit => `${fruit} juice`);
```

**map** 은 각각 배열 원소들에 대해서 전달받은 함수를 호출하고 그 결과를 모아서 새로운 배열을 만듭니다. 이때 return이 없는 함수인 경우 원래 배열의 원소 갯수만큼 undefined로 채워진 배열이 만들어집니다.

```javascript
var comments = [
  { id: 3, content: '굿 모닝' },
  { id: 6, content: '좋은 아침이네요' },
  { id: 10, content: '아침에는 시원한 물 한잔' }];

var idx = comments.map( comment => {
    return comment.id;
});
```

위와 같이 객체로 이루어진 배열에서 특정원소의 멤버 변수로만 이루어진 배열을 만들때도 사용할 수 있습니다.
개인적인 경험으로는 map함수가 reactJS 코딩을 할 때 자주 사용되더라구요

---

## [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

> The filter() method creates a new array with all elements that pass the test implemented by the provided function.

객체 배열에서 어떤 특정 조건에 맞는 원소들로만 배열을 만들려면 아래와 같이 구현할 수 있습니다.

```javascript
var datas = [
  { id: 3, type: 'comment', content: '굿 모닝'},
  { id: 6, type: 'post', content: '좋은 아침이네요' },
  { id: 10, type: 'comment' ,content: '아침에는 시원한 물 한잔' },
  { id: 6, type: 'post', content: '공부하기 싫어요' }];

var filteredData = [];

for(var i = 0 ; i < datas.length ; i++){
  if (datas[i].type === 'post'){
    filteredData.push(datas[i]);
  }
}
```

**filter** 를 사용하면 위 내용을 아래와 같이 구현할 수 있습니다.

```javascript
var filteredData = datas.filter( data => {
  return data.type === 'post';
});
```

**filter** 함수는 각각 배열의 원소에 대해서 전달받은 함수의 결과가 true를 반환한 원소들로만 배열을 만듭니다.

다음 예제처럼 조건이 여러개일 경우 논리 연산자를 조합해서 사용할 수 있다. data에서 like가 5개 이상인 comment만 골라낸다면 다음과 같이 구현할 수 있습니다.

```javascript
var datas = [
  { id: 3, type: 'comment', content: '굿 모닝', like: 1},
  { id: 6, type: 'comment', content: '좋은 아침이네요' , like: 5},
  { id: 7, type: 'comment', content: '공부하기 싫어요' , like: 30},
  { id: 10, type: 'comment' ,content: '아침에는 시원한 물 한잔' , like: 10},
  { id: 15, type: 'comment', content: '저는 공부가 좋은데요?' , like: 0},
  { id: 16, type: 'comment', content: '여기 이상한 사람이 있어요' , like: 15}];

var filteredData = datas.filter( data => {
  return data.type === 'comment'&& data.like > 5;
});
```

---

## [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
> The find() method returns a value in the array, if an element in the array satisfies the provided testing function. Otherwise undefined is returned.

배열에서 특정 값을 검색할 때 어떤식으로 하시나요? 저는 주로 아래와 같은 방법으로 구현합니다. 아래와 같은 객체배열이 있고 id가 10인 객체를 찾는다고 하면
```javascript
var datas = [
  { id: 3, type: 'comment', content: '굿 모닝', like: 1},
  { id: 6, type: 'comment', content: '좋은 아침이네요' , like: 5},
  { id: 7, type: 'comment', content: '공부하기 싫어요' , like: 30},
  { id: 10, type: 'comment' ,content: '아침에는 시원한 물 한잔' , like: 10},
  { id: 15, type: 'comment', content: '저는 공부가 좋은데요?' , like: 0},
  { id: 16, type: 'comment', content: '여기 이상한 사람이 있어요' , like: 15}];

var ret;
for(var i = 0 ; i < datas.length ; i++){
	if( datas[i].id === 10){
    ret = datas[i];
    break;
  }
}
```

처럼 구현할 수 있습니다. es6에 추가된 **find** 를 사용하면 위 내용을 좀 더 쉽게 구현할 수 있습니다.

```javascript
var ret = datas.find( data => {
	return data.id === 10;
});
```

**filter** 와 비슷해보이는데 filter와 find와 가장 큰 차이점은 find함수는 배열 원소에 대해서 주어진 함수연산을 하다가 함수가 true를 반환하면 find함수도 같이 종료됩니다. **for** 로 구현한 예제의 13행의 break;와 같이 동작한다고 이해하고 있습니다.

find함수로 조건에 만족하는 원소를 반환하지 못하는 경우 **undefined** 를 반환합니다.

---

## [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
> The **every()** method tests whether all elements in the array pass the test implemented by the provided function.

배열의 값들이 어떤 기준에 맞는지 검사하기 위해서는 아래와 같은 코드를 작성합니다.

```javascript
var scores = [
  { subject: '국어', point: '100'},
  { subject: '영어', point: '90'},
  { subject: '수학', point: '80'},
  { subject: '컴퓨터', point: '10'}];

var pass = true;

for(var i = 0 ; i < scores.length ; i++){
  if(scores[i].point < 70){
    pass = false;
  }
}
```

**every** 는 배열의 모든 원소들이 제공된 함수로 구현된 테스트를 통과하는지 검사합니다. 배열의 원소들에 대해서 함수를 실행하게 되고 함수가 false를 리턴하게 되면 every는 false를 리턴하게됩니다.

```javascript
var pass = scores.every( score => {
	return score.point > 70;
});
```

---

## [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
> The some() method tests whether some element in the array passes the test implemented by the provided function.

위 **every** 예제에서는 모든 과목이 70점보다 높아야만 pass가 true가 반환되는 코드를 작성했습니다. 한 과목이라도 70보다 높을때 true를 반환하고자 할 때는 **some** 을 사용하면 됩니다.

```javascript
var pass = scores.some( score => {
	return score.point > 70;
});
```

---

## [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
> The **reduce()** method applies a function against an accumulator and each value of the array (from left-to-right) to reduce it to a single value.

배열 원소값의 합을 구하기 위해서는 아래와 같은 코드를 작성하게 됩니다.

```javascript
var scores = [1,2,3,4,5];
var sum = 0;
for(var i = 0 ; i < scores.length ; i++){
  sum += scores[i];
}
```

reducer를 이용하면 아래와 같이 구현할 수 있습니다.
```javascript
var sum = scores.reduce((sum, number) => sum + number,0);
```

**reduce** 는 배열의 각 원소에 대해서 첫번째 원소부터 마지막 원소 순으로 연산한 값이 줄도록 함수를 적용합니다.

이를테면 위 예제에서 (((( 1 + 2 ) + 3 ) + 4 ) + 5) 순으로 연산을 하게 됩니다.

0은 initial value로서 누산값의 초기값을 의미합니다.

아래 예제는 reduce와 find를 이용하여 중복되는 원소들을 제외하고 새로 배열을 만드는 과정입니다.
```javascript
const numbers = [1, 1, 2, 3, 4, 4];

function unique(array) {
  return array.reduce((a,b) => {
    let isIn = a.find(element => {
    	return element === b;
    });
    if(!isIn){
      a.push(b);
    }
    return a;
  },[]);
}

let ret = unique(numbers);
```

결과

```text
[1,2,3,4]
```

---

지금까지 ES6에서 자주 사용되는 array helper methods들을 공부한 내용을 정리해 보았습니다. 포스팅을 위해 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)을 보면서 느낀거지만 대부분의 함수들이 ECMAScript5.1에서 사용할 수 있고 ES6에 새로추가된 것은 find뿐이네요. 확실히 정리를 하고나니 함수에 대한 이해가 더 넓어진것 같습니다. 다음 포스팅에서는 ES6의 **const**, **let**, **var** 에 대해서 포스팅 해보겠습니다.

---

## reference
- [**hacks** *Jason Orendorff* ES6 In Depth: Iterators and the for-of loop](https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/)
- [**MDN** Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
