---
title: 0.What is Machine Learning
date: "2016-01-26"
category: [ML]
tags: ["Machine Learning", "Supervised Learning", "Unsupervised Learning"]
description: 머신러닝이란 무엇일까? 머신러닝의 종류와 예를 통해 머신러닝이 무엇인지 알아보자.
---

[Coursera](https://www.coursera.org/)에서 제공하는 [Machine learning by Andrew ng](https://www.coursera.org/learn/machine-learning/) 을 보고 포스팅하였습니다.

---

머신러닝이란 무엇일까? 우리는 모르고있지만 이미 일상 생활속에서 많이 사용하고 있다.

머신러닝은 구글과 빙과 같은 검색엔진을 사용할 때 검색결과의 순서를 우리가 선호하는 순으로 나열해준다. Facebook과 Apple사진앱에서 친구와 함께 찍은 사진을 올리면 친구의 얼굴을 인식해준다. 그리고 이메일을 받을 때 스팸메일인지 스펨메일이 아닌지 걸러주는것 일 또한 머신러닝이다.


[Author Samuel](https://en.wikipedia.org/wiki/Arthur_Samuel)은 머신러닝을 다음과 같이 정의했다.

>명시적으로 프로그래밍을 하지 않아도 컴퓨터가 학습할 수 있는 능력을 부여하는 연구 분야

>the field of study that gives computers the ability to learn without being explicitly programmed.

그리고 [Tom Mitchell](https://en.wikipedia.org/wiki/Tom_M._Mitchell)은 머신러닝을 좀더 현대적으로 정의했다.

> 만약 컴퓨터프로그램의 성능이 P로 측정된 T가 경험E로 항샹되었다면 컴퓨터프로그램는 어떤일 T에 대한 경험E와 성능측정 P로부터 배웠다고 할 수 있다.
~~해석 너무 어렵다~~

> A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.


머신러닝은 크게 3가지로 나눌 수 있다.

- 지도학습 Supervised learning
- 비지도학습 Unsupervised learning
- 강화학습 Reinforcement learning


## 지도학습(Supervised Learning)
지도학습은 우리가 어떤결과가 나올지 미리 알고 있는 데이터 혹은 입력과 출력의 관계를 가지고 있는 데이터가 주어진다. 지도학습은 크게 "**회귀**(Regression)"과 "**분류**(Classification)"문제로 나눌 수 있다. **회귀문제** 는 **연속적인** 결과에서 입력에 대한 예측을 하는 문제이다. **분류문제** 는 입력한 데이터를 어떻게 분류할것인지 예측하는 문제이다.

예를 들어 지도학습에 대해 이해해보자

친구 중 한명이 집을 팔려고한다. 머신러닝이 어떻게 이 친구에게 도움을 줄 수 있을까?

![예1](./ml0-0.png)

집의 넓이에 따른 가격데이터가 있다. 이 데이터를 선으로 최대한 잘 나타내면 그림과 같이 데이터를 직선 혹은 2차 곡선으로 나타낼 수 있을것이다. 이런 접근이 **지도학습** 의 예라고 할 수 있다.

**지도학습** 이란 알고리즘에게 **정답** 이 주어진 데이터셋을 학습시키는 것이다. 위의 도표처럼 넓이에 따른 실제 가격의 데이터를 주어지면 이를 학습하고 알고리즘은 넓이에 따른 가격을 연속된 점의 집합 **선** 으로 나타낼 수 있다. 선으로 나타난 결과를 바탕으로 친구의 집 넓이를 알고 있으므로 가격을 **예측** 할 수 있을것이다. 이런 종류의 예측 문제를 **회기문제(Regression problem)** 라고 한다.

**회기문제(Regression problem)** 는 위 처럼 결과에서 무엇을 예측하는것이다. 혹은 [**회귀분석(Regression analysis)**](https://ko.wikipedia.org/wiki/%ED%9A%8C%EA%B7%80%EB%B6%84%EC%84%9D)이라고 한다.

지도학습의 다른 예를 살펴보자.

![예1](./ml0-1.png)

위 그래프처럼 가슴 종양의 크기가 주어졌을 때 이 종양이 위험한지 아닌지 분류하는 문제이다. 이처럼 데이터들이 주어졌을 때 분류하는 문제를 **Classification problem** 이라고 한다. 위 처럼 분류를 위험 / 위험하지 않음 2개로 분류할 수 있지만 해결하고자하는 문제의 종류에 따라 여러부류로 분류해서 풀 수 있다.

위 문제에서는 종양의 특성중 크기만을 사용하여 종양을 구별하였지만 다른 특성을 이용하면 다른 접근도 가능하다.

![예1](./ml0-2.png)

위 그래프는 나이와 종양의 크기에 따라 악성종양인지 아니면 아직 위험하지 않은 종양인지 구별한다. 대략적으로 두 집단을 구분하는 선을 그릴 수 있고 이 선을 기준으로 종양을 분류 할 수 있다.

물론 두 특성만을 가지고 종양을 구분하는건 무리이다. 실제로는 종양의 두께 세포의 크기, 세포의 모양등 다양한 종양의 특징을 고려해야한다.


## 비지도학습(Unsupervised Learning)


방금 두 예시를 통해 지도학습이 어떤것인지 대략적으로 알 수 있다. 그렇다면 비지도 학습이란 무엇일까?

![예1](./ml0-3.png)

Classification 문제를 예시를 들어 생각해보자. 우선 지도학습에서 분류문제는 참과 거짓 같은 정답이 주어진 데이터들이 주어진다. 하지만 비지도 학습에는 조금 다른 데이터들이 주어진다.

![예1](./ml0-4.png)

위와 같이 Label이 같거나 없는 데이터들이 주어진다. 이런 데이터들에서 구조나 규칙을 찾아낼 수 있을까? 비지도학습에서는 이런 데이터들을 여러무더기(Cluster)로 묶는것이 목표이다. 이 문제를 풀기위해서는 Clustrering Algorithm이 사용된다.

비지도학습이 사용되는 실제 사례를 살펴보자.


![예1](./ml0-5.png)

오늘 신문이다. 여러 신문사에서 같은 뉴스를 올렸는데 [구글뉴스](https://news.google.com/)가 비슷한 뉴스끼리 묶어놓았다.

비지도학습은 지도학습과 다르게 결과가 어떻게 나올지에 대한 정보가 거의 없거나 없는 문제에 접근한다. 비지도학습을 통해서 각 변수의 특징을 모르는 데이터들로부터 구조를 만들수 있다.  

---

### reference
 - [Coursera Machine learning by Andrew ng]((https://www.coursera.org/learn/machine-learning/home/week/1)])

---
