---
title: 6.Heap에 대해서 알아보자.
date: "2016-09-23"
category: [DS]
tags: ["자료구조", "Heap"]
description: 우선순위 큐를 구현하는데 자주 사용되는 Heap에 대해서 알아보자.
---

# 정의

> - Complete Binary Tree
> - A가 B의 부모노드이면 A의 키(key)값과 B의 키값 사이에는 대소관계가 성립한다.

**이진트리**(Binary Tree)는 부모의 자식이 0~2개인 트리인데 이진트리의 **모양** 에 따라 이진트리를 분류 할 수 있다.

- **Rooted Binary Tree** 는 모든 노드의 자식이 최대 2개인 루트를 가진 트리
- **Full Binary Tree** 단말 노드가 아닌 모든 노드가 2개의 자식을 가진트리
- **Complete Binary Tree** 마지막 레벨을 제외하고 모든 노드가 채워진 이진트리, 마지막 레벨의 노드들은 왼쪽부터 채워져있다.
- **Perfect Binary Tree** 루트(root)에서 부터 말단노드(leaf)까지의 거리가 모두 같은 트리

이중 **Heap** 은 **Complete Binary Tree** 의 꼴을 하고 있다.
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Complete_binary.pdf/page1-440px-Complete_binary.pdf.jpg" />



## reference
- [위키피디아 - 힙](https://ko.wikipedia.org/wiki/%ED%9E%99_(%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0))
- [위키피디아 - 이진트리](https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84_%ED%8A%B8%EB%A6%AC)
- [wikipedia - Heap](https://en.wikipedia.org/wiki/Heap_(data_structure))
- [나무위키 - 힙 트리](https://namu.wiki/w/%ED%9E%99%20%ED%8A%B8%EB%A6%AC)
- [이석호. C++ 자료구조론 (2nd ed.). 인피니티북스.](http://www.yes24.com/24/goods/2656393)
