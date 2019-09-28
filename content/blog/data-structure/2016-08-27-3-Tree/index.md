---
title: 3.Tree에 대해서 알아보자.
date: "2016-08-27"
category: [DS]
tag: [DataStructure, Tree, 트리]
description: 자료구조 트리와 그 표현에 대해서 알아보자.
---

 **트리**, 나무라는 이름의 이 자료구조는 생소하게 느껴질테지만 사실 일상생활에서 많이 볼 수 있는(?) 자료구조이다. 고등학교 생물 시간에 멘델의 법칙을 배운적이 있는데 아래와 같은 그림을 본적이 있다.

<img src="http://study.zumst.com/upload/00-M33-00-22-07/7_2_9.jpg" />
[상염색체에 의한 유전, zum학습백과](http://study.zum.com/book/15117)  
<del>저는 혀말기가 잘 됩니다.</del> 부모와 자식간의 관계를 나타내기에는 tree가 아주 제격이다. 그럼 tree의 정의에 대해서 알아보자.

# 정의

> 트리(tree)는 한 개 이상의 정점(노드, node)로 이루어진 유한 집합으로서
1. 노드 중에는 루트(root)라고 하는 노드가 하나 있고
2. 나머지 노드들은 n(>= 0)개의 분리집합, T1,... Tn으로 분할될 수 있다. 여기서 T1,...,Tn은 각각 하나의 트리이며 루트의 서브트리(subtree)라고한다.  
[*이석호. C++ 자료구조론 (2nd ed.). 인피니티북스.*](http://www.yes24.com/24/goods/2656393)

정의가 어려운데 트리의 정의를 한 문장으로 정의하면 다음과 같다.  
> Connected Acyclic Graph  

모든 노드들이 연결되어 있고 사이클이 존재하지 않는 그래프가 바로 트리이다!

# 용어
<img src="http://ktword.co.kr/img_data/4726_1.JPG" />
[정보통신기술용어해설, 트리](http://ktword.co.kr/abbr_view.php?m_temp1=4726&id=506)  
트리에서 사용되는 용어들은 다음과 같다.

- Root  
		트리의 꼭대기에 있는 노드, 그림에서 A
- Child  
		루트로부터 멀어지는 방향으로 직접적으로 연결된 노드, A의 자식은 B, C
- Parent  
		루트로부터 가까워지는 방향으로 직접적으로 연결된 노드, B의 부모는 A
- Siblings  
		같은 부모를 가지고있는 노드들의 집합, D E F
- Descendant  
		특정 노드에서 노드의 subtree의 모든 집합, C의 자손은 G H L M N
- Ancestor  
		특정 노드에서 노드의 부모 노드의 집합, J의 조상은 D B A
- Leaf  
		자식이 없는 노드, I J K F L M N
- Internal Node  
		적어도 하나의 자식이 있는 노드
- External Node  
		자식이 없는 노드
- Degree  
		자식 노드들 중 최대 개수, B가 자식 3을 가지므로 차수 3
- Edge  
		노드와 노드사이를 잇는 간선
- Path  
		한 노드에서 다른 한 노드에 이르는 길 사이에 놓여있는 노드들의 순서
- Depth  
		루트에서 어떤 노드까지의 경로길이
- Level  

# 표현
트리의 표현은 여러가지 방법으로 구현할 수 있다. 다루고자하는 tree마다 표현이 다를 수 있으므로 다루고자하는 자료가 어떤 tree의 모양을 하고 있을지 미리 예상하면 좋다. <del>고 생각한다.</del>

- 인접행렬
노드의 갯수가 V개라고 했을때 VxV의 크기를 가진 이차원 배열을 할당하여 구현 할 수 있다. 할당한 배열을 A라고 했을 때 노드i에서 j로 가는 간선이 있을 때 `A[ i ][ j ] = 1` 로 표현 할 수 있다.

- 인접리스트
	- Linked List [이전 포스트](/ds/2016/08/25/DS2-linkedlist/)에서 다룬 Linked List로 Tree의 표현을 구현할 수 있다.  
	- STL  

	Linked List는 구현하는데 시간이 오래 걸린다. vector나 list같은 STL을 이용하면 쉽게 구현 할 수 있다. 정점 A[i]와 연결된 정점들의 정보를 가지고 있으면 된다.

	| A[1] |  1 | 2  |
	|:----:|:--:|:--:|
	| A[2] | 3  | 4  |
	| A[3] | 5  |  

- 배열
이진트리(Binary tree)의 경우 배열로 나타낼 수 있다. 트리의 부모만 저장하는 방식으로는 index는 현재 정점을 배열이 가지는 값은 노드의 부모를 가르키는 방식으로 구현 할 수 있다.


## reference
- [정보통신기술용어해설, 트리](http://ktword.co.kr/abbr_view.php?m_temp1=4726&id=506)
- [트리의 개념, 야라바](http://yaraba.tistory.com/78)
- [이석호. C++ 자료구조론 (2nd ed.). 인피니티북스.](http://www.yes24.com/24/goods/2656393)
