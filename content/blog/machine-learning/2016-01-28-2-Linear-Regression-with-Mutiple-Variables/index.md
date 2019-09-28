---
title: 2.Multivariate Linear Regression
date: "2016-01-28"
category: [ML]
tag: [Machine Learning, Supervised Learning, Linear Regression]
description: 다중선형회귀에 대해서 알아보자.
---

[Coursera](https://www.coursera.org/)에서 제공하는 [Machine learning by Andrew ng](https://www.coursera.org/learn/machine-learning/) 을 보고 포스팅하였습니다.

---

## 모델의 표현

변수가 하나인 선형회귀가 아닌 변수(특징)가 여럿인 선형회귀를 알아보자 그 전에 모델을 정의하자

![예1](/./ml2-0.png)

Notation:

 - \\( n\\) : 특징들의 갯수
 - \\( x^{(i)}\\) : i번째 트래이닝 예(training example)의  입력(특징)
 - \\( x_j^{(i)}\\) : i번째 트래이닝 예의 j번째 특징의 값

여기서 우리는 침실, 층, 그리고 지어진 연도와 크기 총 4개의 특징이 있으므로\\\(n=4\\)가된다.

그럼 **변수가 여럿인 선형회귀(Multivariate Linear Regression)** 의 **가설함수(hypothesis function)** 는 어떻게 되는지 알아보자

변수가 1개인 선형회귀의 가설함수는 아래와 같이 표현하였다.

<div>
$$
h_\theta(x) = \theta_0 + \theta_1x
$$
</div>

변수가 여러개읜 선형회귀 가설함수는 아래와 같다.

$$
h_\theta(x) = \theta_0 + \theta_1x_1 + \theta_2x_2 + \dots + \theta_nx_n
$$

위의 가설함수 표현은 두 행렬의 곱으로 나타낼 수 있는데

$$
\begin{align*}
h_\theta(x) =
\begin{bmatrix}
\theta_0 \hspace{2em}  \theta_1 \hspace{2em}  ...  \hspace{2em}  \theta_n
\end{bmatrix}
\begin{bmatrix}
x_0 \newline
x_1 \newline
\vdots \newline
x_n
\end{bmatrix}
= \theta^T x
\end{align*}
$$

로 나타낼수 있다. ~~머신러닝을 공부할때 선형대수를 알고있어야 좋은 이유~~

위의 과정을 통해서 알게된것은 변수가 여러개가 되더라도 변수가 하나일 떄와 식이 다르지 않다는점, 즉 문제에 대한 접근을 같이해도 된다는 결론을 알 수 있다.

## Gradient Descent for Multiple Variables

변수가 여럿인 선형회귀의 Gradient Descent는 아래와 같이 표현할 수 있다.

<div>
Hypothesis : $h_\theta(x) = \theta^Tx = \theta_0 + \theta_1x_1 + \theta_2x_2 + \dots + \theta_nx_n$
<br>
Prameters : $\theta_0, \theta_1, \dots, \theta_n$
<br>
Cost function:<br>
&nbsp;
$J(\theta) = J(\theta_0, \theta_1, \dots, \theta_n) = \dfrac {1}{2m} \displaystyle \sum _{i=1}^m \left (h_\theta (x^{(i)}) - y^{(i)} \right)^2$
<br>
Gradient descent : Repeat <br>
&nbsp;
$\theta_j := \theta_j + \alpha \frac{\partial}	{\partial \theta_j} J(\theta)$
</div>

마찬가지로 변수가 1개일때와 식이 다르지 않다.

![예](/./ml2-1.png)

각 \\( \theta\\)에 대한 접근또한 변수가 1개일때와 크게 다르지 않다.

## feature Scailing

이제 본격적으로 변수가 여러개일 때 회귀문제에 접근해보자.
우선 모델의 특징들을 살펴보면 방의 수, 층 수, 지어진년도, 가격, 크기가 있다. 이 변수들의 범위는 대략적으로

  - size : 0~ 3000
  - 방의수 : 1~ 10
  - 연도 : 0 ~ 40년
  - 가격 : 1000~ 10000

일 것이다. 이러한 경우 Cost function의 그래프는 아래그림의 왼쪽과 같이 그려진다.

![예](/./ml2-2.png)

이렇게 되면 Gradient Descent 알고리즘을 적용하여 최소값을 찾는데 시간이 오래걸린다. 이를 해결하기 위해 각 특징들을 같은 비슷한 범위로 **크기변환(Scaling)** 을 해준다. 각 특징들을 특징들이 가진 최대값으로 나눈다면 특징들의 범위는 \\( 0<x^{(i)}) <1\\)이 되어 계산하기 편해진다.

다른 크기변환(scaling)방법으로는 **mean normalization** 이 있다.
mean normalization은 모든 특징들을 \\( -1 \<= x_i \<= 1\\)범위에 들어가도록 근사화하는 것이다. 이는 간단히 아래식으로 근사화 할 수 있다.

<div>
$$
x_1 = \dfrac{x_1 - 특징의\ 평균값}{특징의\ 최대값 - 특징의\ 최소값}
$$
</div>

수업을 하시는 Andrew Ng교수님은 -3 to 3 -1/3 to 1/3 범위를 사용하신다고 한다.

## Learning Rate
앞서 살펴본 변수가 하나인 선형회귀 문제에서 Gradient descent 알고리즘을 적용할 때 \\(\alpha\\) (learning rate)의 값이 크면 overshooting이 일어나 최소점을 찾지 못하는 것을 확인했다. 그렇다면 Gradient descent 알고리즘이 잘 작동하려면 어떤 \\( \alpha\\) 값을 선택해야하는지 알아보자.

![예](/./ml2-3.png)

우선 잘 못된 \\( \alpha \\) 값을 선택할 경위 위와 같은 잘 못된 결과를 얻게된다. 왼쪽 위의 그래프는 너무 큰 \\( \alpha\\)값을 선택하여 최소점에 도달하지 못하고 계속 증가하게 되며 오른쪽 그래프는 충분히\\( \alpha\\)작지 않은 \\( \alpha\\)값을 선택하여 overshooting이 일어났다. 마지막으로 왼쪽 아래의 그래프는 바로 전 상황과 같이 충분히 작지 않은 \\( \alpha\\)값을 선택하여 최소점을 찾지 못하였다. 따라서 최소점을 찾기 위해서는 **충분히 작은 \\( \alpha\\)(learning rate)** 값을 선택해야한다.

하지만 너무 작은 \\(\alpha\\)값을 선택한다면 하강하는 폭이 너무 작아 최소점을 찾는데 너무 많은 시간이 걸리게 된다.

따라서 작은 learning rate부터 알고리즘 연산을 해서 점점 큰 learning rate를 선택해야한다.

Ng교수님은

0.001 -> 0.003 -> 0.01 -> 0.03 -> 0.1 -> 0.3 -> 1

순으로 접근한다고하니 교수님한테 꿀팁 하나 배워간다.

## Features and Polynomial Regression

이제 선형회귀에 대한 감이 온다. 아주 조금이긴 하지만... 이제 어떤 특징을 사용할 것인지와 적절한 특징들을 선택하는 알고리즘에 대해서 알아보자.

집의 가격을 구하는 선형회귀 문제에서 집의 특징이 집의 가로폭과 세로폭의 길이가 있다고 하자 그렇다면 이 모델에 대한 가설 함수는 다음과 같이 표현 할 수 있다.

<div>
$$
h(x) = \theta_0 + \theta_1 집의 가로폭 + \theta_2 집의세로폭
$$
</div>

하지만 이렇게 접근하기 보다는 새로운 특성 **넓이** 를 만들어 접근하는것이 문제를 더 쉽게 만들수 있다. 이를테면 넓이는 가로와 세로의 곱이니까 새로운 특징으로 가설함수를 만들면

<div>
$$
h(x) = \theta_0 + \theta_1 집의넓이
$$
</div>
가 되어 변수가 하나인 선형회귀 문제가 된다. 변수가 줄어들었으니 문제가 더 간단해 졌다!

![예](/./ml2-4.png)

위와 같은 모델이 있다면 이 모델을 잘 표현(fit하게)하려면 여러 가설함수를 생각 할 수 있는데 Linear function이 아닌 Quadratic function을 고려할 수 있다.

모델을 표현하기 위한 가설함수를 선택하기전에 모델의 특성을 고려해야한다. 위 그림에서 파란색 실선은 2차 함수로 모델을 나타냈는데 2차 함수는 증가하다 꼭지점 이후에 감소하게 된다.

당연히 집이 넓을 수록 집값이 떨어지진 않을테니 적절한 가설함수가 아니다. 3차 함수로 나타내는것이 좀더 논리적이다.

한 가지 유의해야할 사항은 polynomial regression을 할 경우 feature scaling이 중요하다.

## Computing Parameters Analytically

몇몇 선형회귀 문제에 대해서 **normal equation** 를 이용하면 최적의 \\( \theta \\)값을 찾기 수월하다.

전역 최소점(global minimum)을 찾기 위해서 gradient descent 알고리즘을 사용했다. 알고리즘이 반복적으로 연산하면 점점 \\( \theta \\)값에 근접하게되고 최소값을 얻을 수 있다.

이와 다르게 Normal equation은 \\( \theta\\)를 분석적으로 계산하여 얻는다. 그러니까 반복적으로 계산하는 gradient descent 알고리즘과 달리 최소점을 단 한번의 계산으로 얻을 수 있다. 짱!

![예](/./ml2-5.png)

**normal equation** :
\\(
\large
\theta = (X^T X)^{-1}X^T y
\\)

normal equation의 특징 중 하나는 feature scaling을 할 필요없다는 것이다.  normal equation과 gradient descent의 차이는 아래표와 같다.

<table>
<tbody>
	<tr><th>Gradient Descent</th><th>Normal Equation</th></tr>
	<tr><td>alpha를 선택해야함</td><td>alpha를 선택할 필요 없음</td></tr>
	<tr><td>반복 연산</td><td>반복 연산 없음</td></tr>
	<tr><td>n이 클 때 잘 작동함</td><td>n이 크면 느림</td></tr>
	</tbody>
</table>

normal equation의 시간복잡도는 약 \\(\mathcal{O}(n^3) \\)가 된다. Andrew Ng교수님은 n이 10,000이 넘어간다면 discent gradient를 적용하는것을 고려해야한다고 하셨다.

---

## reference

 - [Cousera course wiki](https://share.coursera.org/wiki/index.php/ML:Linear_Regression_with_Multiple_Variables#Polynomial_Regression)
 - [Machine Learning by Andrew Ng](https://www.coursera.org/learn/machine-learning/home/week/2)
