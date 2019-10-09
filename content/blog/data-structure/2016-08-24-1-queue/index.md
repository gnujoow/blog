---
title: 1.Queue에 대해서 알아보자.
date: "2016-08-24"
category: [DS]
tags: ["자료구조", "queue"]
description: 컴퓨터에서 자주 사용되는 자료구조인 Queue에 대해서 알아보자.
---

## 정의  
> **Queue** 는 **한쪽 끝에서 삽입** 이 일어나고 **그 반대쪽에서 삭제** 가 일어나는 순서 리스트이다.
> *이석호. C++ 자료구조론 (2nd ed.). 인피니티북스.*  
>
> 새로운 원소가 삽입되는 끝을 **back** 이라고하고 원소가 삭제되는 끝을 **front** 라 한다.

자료의 삽입과 삭제가 이루어지는 위치가 같은 **Stack** 과 달리 **Queue** 는 자료의 입력과 삭제가 일어나는 위치가 다르다. 만약 자료의 입력 순서가 1, 2, 3, 4 ,5 순이라면 삭제되는 순서 역시 1, 2, 3, 4, 5 우리가 영화관 매표소에서 표를 구매하기위해 줄을 서는 것 처럼 먼저 온 순서대로 삭제가 된다. **가장 먼저 들어온 데이터가 가장 먼저 처리된다** 일명 First-in first-out **FIFO**

## 구현  
**Queue** 의 구현은 여러 방법이 존재한다.

```cpp
template <class T>
class Queue{
	public:
		Queue(int size = 27); // 크기가 size인 Queue생성
		bool empty(); // 큐가 비어있으면 true 아니면 false
		T &front(); // 큐의 앞에 있는 원소 반환
		T &back(); // 큐의 뒤에 있는 원소 반환
		void push(const &T item); //큐의 back에 item을 삽입
		void pop(); // 큐의 원소 삭제

	private:
		T* queue; // 큐 원소를 위한 배열
		int front, // 큐의 앞 위치
			back,  // 큐의 뒤 위치
			size;  // 큐의 사이즈
}
```

이번 포스팅에서는 원형 큐를 구현해본다.

```cpp
//생성자
Queue<T>::Queue(int size) : size( size ){
	if (size < 1) throw "큐의 사이즈는 0보다 커야합니다."
	queue = new T[size];
	front = back = 0;
}

//empty()
bool Queue<T>::empty(){ return front == back; }

//front()
T& Queue<T>::front(){
	if(empty()) throw "큐가 비어있습니다."
	return queue[(front + 1) % size ];
}

//back()
T& Queue<T>::back(){
	if(empty()) throw "큐가 비어있습니다."
	return queue[back];
}

//push()
void Queue<T>::push(const &item){
	if((back+1) % size == front) throw "큐가 가득찼습니다."
	back = (back + 1) % size;
	queue[back] = item;

 //pop()
 void Queue<T>::pop(){
	 if(empty)throw "큐가 비어있습니다."
	 front = (front + 1) % size;
 }

```


Queue 클래스의 파괴자에서는 할당해준 queue배열을 반환하는 내용을 작성하면 된다.

Queue는 [STL에 구현되어있다](http://www.cplusplus.com/reference/queue/queue/). C++11 표준에서는 위에서 작성한 함수 이외에 **emplace** 함수와 **swap** 함수가 추가되었는데 emplace는 back보다 뒤에 아이템을 추가하는 기능이고 swap은 자료형이 같은 두 queue를 swap하는 기능을 한다.

어디서 많이 들어봤다면 <delete>역시나다</delete> 우리가 LoL이나 오버워치를 플레이할 때 언급하는 큐가 바로 이 큐이다. 들어온대로 처리되니까...

>queue 미국·영국 [kju:]  
> 1. (무엇을 기다리는 사람・자동차 등의) 줄   2. 큐, 대기 행렬   3. 줄을 서서 기다리다  
> [네이버 어학사전](http://endic.naver.com/enkrEntry.nhn?sLn=kr&entryId=02265fc67dac436e9e1f704ad898378e)

## 특징  
- Queue에는 탐색이 없다. 삽입과 삭제만 존재한다.
- 당연히 삽입과 삭제의 시간복잡도는 O(1)

---

## reference
- [이석호. C++ 자료구조론 (2nd ed.). 인피니티북스](http://www.yes24.com/24/goods/2656393)
- [wikipedia queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))
- [queue C++ reference](http://www.cplusplus.com/reference/queue/queue)
