---
title: 8.Bias vs. Variance
date: "2016-09-01"
category: [ML]
tag: [MachineLearning, Underfitting, Overfitting, Bias, Varriance]
description: 이번 포스팅에서는 bias와 varriance에 대해서 깊게 알아보고 알고리즘이 bias문제가 있는지 varriance문제가 있는지 평가하는 방법에 대해서 알아본다.

---

[Coursera](https://www.coursera.org/)에서 제공하는 [Machine learning by Andrew ng](https://www.coursera.org/learn/machine-learning/) 을 보고 포스팅하였습니다.

---
우리가 생각한대로 머신러닝 알고리즘이 정확히 작동하면 좋겠지만 거의 모든경우에 **High Bias**혹은 **High Variance** 문제가 발생한다. (다른 말로 underfitting problem, overfitting problem) 이 경우에 어떤 문제를 가지고 있는지 알아내는것이 중요하다. 그렇게 해야만 알고리즘을 더 좋은 방향으로 수정할 수 있기 때문이다.

이번 포스팅에서는 bias와 varriance에 대해서 좀 더 알아보고 알고리즘이 bias문제가 있는지 varriance문제가 있는지 평가하는 방법에 대해서 알아본다.

# Diagnosing Bias vs. Variance

polynomial degree **d**에 대한 **underfitting**과 **overfitting** 의 관계를 알아보자.

![예1](./0.png)

왼쪽 그림부터 polynomial degree는 각각  1,2,4이다. 가장 왼쪽 표현은 High bias(underfit)문제가 있고 오른쪽은 High variance(overfit)문제가 있다. 이전 포스팅에서 언급한 cross validation set을 이용해서 테스트를 하면 가장 적절한 polynomial model은 degree가 2인 모델임을 알 수 있다.

알고리즘이 잘 작동하지 않는 경우는 **cross validation error** 가 크거나 **test error** 가 클때이다. 다음 그림을 살펴보자.

![예1](./1.png)

polynomial degree에 따른 error를 그래프로 나타내보자.

 - 빨간선(training error)
 - 초록선(cross validation error)

보통 training error는 d가 커질수록 줄어드는 경향이 있다. 그리고 동시에 cross validation error는 점차 줄었다가 polynomial degree가 커짐에 따라 다시 증가한다. 첫번째 그림에서 polynomial degree가 2인 경우가 cross validation error가 가장 작은 때이다.


그렇다면 학습한 알고리즘의 성능이 좋지 않을 때 이 알고리즘이 bias 문제를 가지고 있는지 variance 문제를 갖고 있는지 어떻게 진단 할 수 있을까

| **Underfitting** <br> (High bais) | **Overfitting**  <br> (High variance) |
|:----------------------------------|:--------------------------------------|
| $J_{train} (\Theta)$와 $J_{CV}(\Theta)$ 의 값이 크다. | $J_{train} (\Theta)$의 값은 작다.  |
| $J_{CV}(\Theta) \approx J_{train} (\Theta)$ | $J_{CV}(\Theta) \>\> J_{train}(\Theta)$ |

위 그림에서와 같이 그래프의 왼쪽 끝처럼 cross validation error의 값과 training error의 값이 크면서 그 차이가 크지 않을 때 High bais problem이 있다고 평가 할 수 있다. 그리고 그래프의 오른쪽 끝처럼 cross validation error의 크기는 큰데 training error의 크기는 작으면서 둘의 크기가 매우 클 때 High varience problem이 있다고 평가 할 수 있다.

이번 포스팅에서는 bias문제가 있는지 varriance문제가 있는지 평가하는 방법에 대해서 알아보았다. 다음 포스팅에서는 이를 해결하기 위해서는 어떻게 해야하는지 알아보도록 하겠다. 그럼 빠잉~

---

## reference

 - [Machine learning by Andrew Ng](https://www.coursera.org/learn/machine-learning)
 - [Lec38. Machine Learning(머신러닝) ? Evaluating a Learning Algorithm and Cross Validation(교차 검증) 작성자 헐멍](http://blog.naver.com/mypa3424/220576318791)
