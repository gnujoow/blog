---
title: 2.Linkedlist에 대해서 알아보자.
date: "2016-08-25"
category: [DS]
tag: [DataStructure, Linkedlist, 연결 리스트]
description: 메모리를 효율적으로 사용할 수 있는 Linkedlist에 대해서 알아보자.
---

배열의 정의는 같은 타입의 자료형이 **연속된 주소** 에 표현된 것이라 할 수 있다. 배열의 장점은 각각의 원소에 대해 index값을 이용하여 O(1)에 접근 할 수 있는 등 여러 장점이 있지만 **자료의 이동 그리고 크기 변화가 어렵다** 는 단점이 있다.

**Linkedlist** 를 이용하면 크기 변화가 어렵다는 단점을 극복할 수 있다.

# 정의
A, B, D ,E ,F 라는 원소들을 배열에 표현되어있다고 가정해보자.

|item| A| B | D | E | F |
|:-:|:-:|:-:|:-:|:-:|:-:|
|idx| 0 | 1 | 2 | 3 | 4 |

작성하고나니 실수로 C를 입력하는 것을 깜빡했다. 이 경우에 어떻게 문제를 해결할 수 있을까? 여러 방법이 있겠지만 크기가 6인 배열을 새로 할당하여 원소를 옮기는 방법이 있을것이다.

|item| A| B | D | E | F |
|:-:|:-:|:-:|:-:|:-:|:-:|
|idx| 0 | 1 | 2 | 3 | 4 |  

idx 2위치에 C를 삽입하고 뒤 원소들은 하나씩 밀기

|item| A| B | **`C`** | **D** | **E** | **F** |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|idx| 0 | 1 | **`2`** | **3** | **4** | **5** |

이렇게 배열에서는 새로운 원소를 추가하기 위해서 새로 배열을 할당하고 삽입된 위치부터 원소들을 하나씩 뒤로 밀어야하므로 최악의 경우 **O(N)** 이라는 시간복잡도를 가지게 된다. 새로 배열을 할당하는것도 메모리를 차지하기 때문에 썩 기분좋은 방법은 아니다.

메모리를 효율적으로 관리하기 위해 **Linkedlist** 를 사용한다.  

> 자료들이 포인터를 이용하여 한 줄로 연결된 자료구조

|idx | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|:-: |:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|item| F | C |   | A | D |   | B |   | E |   |
|link|   | 4 |   | 6 | 8 |   | 1 |   | 0 |   |

**Linkedlist** 를 이용하면 위와 같이 자료를 표현할 수 있을것이다. 매모리에 무작위로 자료들이 나열되어있지만 link라는 pointer가 다음에 나타날 자료를 가르키고 있으므로 멀리 떨어져있지만 한 줄로 연결된다.


이런식으로 :)  

|idx | 3 | 6 | 1 | 4 | 8 | 0 |
|:-: |:-:|:-:|:-:|:-:|:-:|:-:|
|item| A | B | C | D | E | F |
|link| 6 | 1 | 4 | 8 | 0 |   |


# 구현
가장 기본적인 형태인 single linked list를 구현해보자.

Linked list를 이루는 단위인 **노드** 는 노드의 값과 다음 노드의 주소를 가지고 있다.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/408px-Singly-linked-list.svg.png" />

```cpp
class Linkedlist {
	public:
		Linkedlist(); // 생성자
		~Linkedlist(); // 파괴자
		int Search(int x, Node ** l, Node ** p) // 검색
		int Insert(int x); // 삽입
		int Delete(int x, Node ** l); // 삭제
	private:
		Node * head;  // 첫 노드의 시작
}

class Node{
	private:
		int item; // 노드의 값
		Node * next; // 다음 노드의 주소
}
```

각 멤버 함수는 다음과 같이 정의할 수 있다.

```cpp
// 생성자
Linkedlist::Linkedlist(){
	head = null;
}

// 검색
int Linkedlist::Search(int x, Node ** l , Node ** p){
	* l = head; * p = null;
	while(* l != null) {
		if ((* l) -> item > x ) return 0;
		else if( (* l)-> item == x) return l;
		else {
			* p = * l;
			* l = (* l) -> next;
		}
	}
}

//삽입
int Linkedlist::Insert(int x){
	Node * L, Node * P, Node * N;
	if(Search(x, &L, &P) == 0){
		N = new Node;
		N -> item = x;
		if( P == null) head = N;
		else{
			P->next = N;
			N->next = L;
			return 1;
		}
	}
	return 0;
}

int Linkedlist::Delete(int x, Node ** l){
	Node * L, * P;
	if(search(x, &L , &p) == 1){
		* l = L;
		if(P == null) head = L -> next;
		else p -> next = L ->next;
		return 1;
	}
	return 0;
}
```

linkedlist 의 구현에서 주의해야할 것은 삽입과 삭제인데 삽입과 삭제시 현재노드와 다음노드 간의 관계가 계속 유지되어야 한다.

Linkedlist 는 STL에 구현되어있지 않다 <delete>제보부탁드려요</delete> 하지만 STL에 [list](http://www.cplusplus.com/reference/list/list/) 는 doubly-linked list로 구현되어 있다.

# 종류
위와 같이 list의 방향이 한 방향인 경우를 **singly linked list** 라고한다.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Singly-linked-list.svg/408px-Singly-linked-list.svg.png" />

이와 다르게 list의 방향이 양방향 (이전 노드와 다음노드)이 있는 경우를 **doubly-linked list** 라고한다.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Doubly-linked-list.svg/610px-Doubly-linked-list.svg.png" />


doubly-linked list의 구현은 Node에 이전 노드와 다음노드의 주소를 저장할 포인터 변수를 만들면 된다.

```cpp
class Node{
	private:
		int item; // 노드의 값
		Node * next; // 다음 노드의 주소
		Node * prev; // 이전 노드의 주소
}
```

그리고 삽입과 삭제시 노드간의 관계를 계속 유지되도록 이전 노드와 다음노드간의 관계를 명시해야한다.


# 특징  
- stack과 queue그리고 array가 packed 인 자료구조라면
 linked list는 unpacked이다.  

## reference
 - [이석호. C++ 자료구조론 (2nd ed.). 인피니티북스](http://www.yes24.com/24/goods/2656393)
 - [wikipedia Linked List](https://en.wikipedia.org/wiki/Linked_list)
