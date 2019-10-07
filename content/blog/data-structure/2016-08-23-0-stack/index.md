---
title: 0.stack에 대해서 알아보자.
date: "2016-08-23"
category: [DS]
tags: ["자료구조", "stack"]
description: 컴퓨터에서 자주 사용되는 자료구조인 stack에 대해서 알아보자.
---

## 정의  
> **스택** 은 **Top** 이라고 하는 <U>한쪽 끝</U>에서 모든 삽입(**push**)과 삭제(**pop**)가 일어나는 순서 리스트이다.  
> *이석호. C++ 자료구조론 (2nd ed.). 인피니티북스.*

스택에서 자료가 삽입되면 Top에 위치하게 된다 그리고 또 다른 데이터가 추가되면 최신 데이터는 Top에 위치하게 된다. 그리고 데이터를 읽고 삭제하는 위치 역시 Top이기 때문에 가장 **마지막에 들어온 데이터가 가장 먼저 나오는** Last-in first-out의 특징을 가지고 있다. 일명 **LIFO**

## 구현  
stack의 가장 쉬운 구현방법은 stack을 이용하는 것이다.  
```cpp
template<class T>
class Stack{
	public:
		stack (int stackSize = 27); // 크기가 n인 스택 생성 기본값 27
		bool empty(); // 스택이 비어있으면 true 아니면 false
		T& top(); // 스택의 top 원소 반환
		void push(const T& item); // 스택에 원소를 추가
		void pop(); // 스택의 원소 삭제

	private:
		T * stack;	 // 스택 구현을 위한 배열
		int top;		 // top의 배열상의 index
		int size;		 // stack 배열의 크기
}
```

각각의 멤버 함수들은 아래와 같이 구현할 수 있다.

```cpp
// 생성자
Stack<T>::Stack (int stackSize)
:size(stackSize){
	if (size < 1) throw "스택의 사이즈는 반드시 0보다 커야합니다.";
	stack = new T[size];
	top = -1;
}

// empty()
bool Stack<T>::empty(){ return top == -1; }

// top()
T& Stack<T>::Top(){
	if(empty()) throw "stack이 비었습니다."
	return stack[top];
}

// push()
void Stack<T>::push(const T& item){
	if(top == size -1) throw "stack이 가득 찼습니다.";
	stack[++top] = item;
}

// pop()
void Stack<T>::pop(){
	if(empty()) throw "스택이 비어있습니다.";
	stack[top--];
}
```

Stack 클래스의 파괴자에서는 할당해준 stack배열을 반환하는 내용을 작성하면 된다.

Stack은 [STL에 구현되어있다](http://www.cplusplus.com/reference/stack/stack/). C++11 표준에서는 위에서 작성한 함수 이외에 **emplace** 함수와 **swap** 함수가 추가되었는데 emplace는 top보다 위에 아이템을 추가하는 기능이고 swap은 자료형이 같은 두 스택을 swap하는 기능을 한다.


## 특징  
- stack에는 탐색이 없다. 삽입과 삭제만 존재한다.
- 당연히 삽입과 삭제의 시간복잡도는 O(1)

---

## reference
- [이석호. C++ 자료구조론 (2nd ed.). 인피니티북스](http://www.yes24.com/24/goods/2656393)
- [wikipedia stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
- [수까락의 프로그래밍 이야기](http://sweeper.egloos.com/m/112529)
- [stack C++ reference](http://www.cplusplus.com/reference/stack/stack/)
