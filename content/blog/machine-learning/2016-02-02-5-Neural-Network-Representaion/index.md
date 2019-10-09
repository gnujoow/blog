---
title: 5.Neural Networks:Representation
date: "2016-02-02"
category: [ML]
tags: ["Machine Learning", "Neural Networks"]
description: 인공 신경망(artificial neural network)에 대해서 알아보고 표현에 대해서 알아보자.
---

[Coursera](https://www.coursera.org/)에서 제공하는 [Machine learning by Andrew ng](https://www.coursera.org/learn/machine-learning/) 을 보고 포스팅하였습니다.

---
이번 포스팅과 그리고 다음에 올릴 포스팅에서 **신경망(Neural Network)** 에 대해서 알아본다. 신경망은 꽤 오래된 아이디어이고 잠시 사람들 관심 밖의 아이디어였지만 오늘날에는 여러 기계학습문제에 관련해서 중요한 축으로 자리잡았다. 우리는 이미 Linear Regression이랑 Logistic regression을 배웠는데 (게다가 교수님이 우리가 많이 안다고 하셨는데) 왜 신경망 알고리즘을 알아야 할까? 다음 예를 보면서 알아보도록 하자.

## Non-linear Hypotheses


![예1](/./ml5-0.png)

위와 같은 training set을 가진 classification 문제에서 우리는 Logistic regression알고리즘을 적용해서 문제를 풀었다. 결과가 아주 마음에 든다. 하지만 Logistic regression은 특징이 1개 혹은 2개일 때 잘 분류한다. 그러나 많은 기계학습 문제들이 그렇듯이 특징이 1~2개 보다 많은경우가 많다. 집 값문제만 하더라도 사이즈뿐만 아니라 방의 갯수, 건설년도, 위치등 많은 특징들에 의해서 가격이 결정된다.

만약 집값을 결정하는 특징이 100가지라면 아래와 같이 여러 quardatic function으로 가설함수를 할 수 있을 것이다.

$$
x_1^2, x_1x_2, ... , x_1x_{100}, x_2^2, ..., x_2x_{100}, ...
$$

만약 특징($n$)이 100개라면 약 $\frac{n^2}{2}$이니까 5000개가 된다. 너무 많다... 따라서 아래와 같은 함수들로 표현하는 것을 고려해 볼 수 있다.

$$
x_1^2, x_2^2, ... x_{100}^2
$$

그러나 이 함수들로 경계를 표현하기에는 training set을 특징들을 정확히 표현 할 수 없다.

거의 모든 머신러닝 문제들은 **특징(n)** 이 매우 크다. 다음 예를 살펴보자.

컴퓨터공학이나 전자공학을 전공했다면 [영상처리](https://ko.wikipedia.org/wiki/%EC%98%81%EC%83%81_%EC%B2%98%EB%A6%AC), 혹은 [컴퓨터비전](http://terms.naver.com/entry.nhn?docId=818632&cid=50376&categoryId=50376)라는 단어를 들어본적이 있을것이다. 우리가 눈으로 보기에는 간단한 문제들이 왜 컴퓨터한테는 어려울까?

어떤 자동차사진을 주고 우리가 느끼기엔 아! 자동차라고 인지 할 수 있는데 컴퓨터는 왜 인지하기 어려운 것일까

![예1](/./ml5-1.png)

작은 부분 그러니까 자동차의 문을 확대해서 보면 우리는 자동차의 문이 보이지만 컴퓨터에게는 숫자들의 행렬이 보인다. 컴퓨터 비전의 문제는 이러한 행렬을 보면서 이것이 자동차의 문이다! 라고 인지하는 것이다.

![예1](/./ml5-2.png)

여러 그림들의 특정 위치 pixel1, pixel2를 가지고 자동차인지 아닌지 구별하고 그래프로 나타내보자. 원래 이미지의 pixel1의 특징과 pixel2의 특징이 어디서 나타나는지 그래프로 표현해보고 차인지 아닌지 더 많은 예를 통해서 그려보면 아래와 같은 그래프가 나타나게 된다. 그럼 이 그래프를 2클래스로 나눌수 있다. 그럼 feature space의 dimension은 어떻게 될까? 가로세로가 각각 50인 그림이 있다면 총 그림에 2500개의 픽셀이 존재한다. 그럼 2500개의 특징이 존재한다. 이것을 Quadratic features로 나타내면 $\frac {n^2}{2}$이므로 약 3백만개의 특징이 존재하며 컴퓨터가 일일이 계산하기에는 너무 큰 시간이 소요된다.

따라서 특징이 많은 모델에 대해서 logistic regression을 적용하기에는 적절하지 않다.

## Neurons and the brain

**신경망 알고리즘(Neural Network Algorithm)** 은 기계가 사람의 뇌를 흉내내려고 만든 오래된 알고리즘이다.

80대 그리고 90년도 초에 널리쓰였지만 여러가지 이유로 90년 말에 들어서 인기가 줄어들었다. 아마도 주된 이유는 컴퓨터의 메모리와 속도가 지금보다 느렸기 때문일것이다.

최근에 들어 컴퓨터의 속도가 빨라지고 메모리가 커짐에 따라 비용(소요시간과 메모리소모)이 크다고 여겨졌던 신경망 알고리즘이 잘 작동할 수 있는 환경이 되었고 여러 application등에서 널리 쓰이게 됬다.

사람의 뇌를 상상해보자 감각을 느끼고 보는것을 배우고 수학도 배우고 미적분도 하고 정말 컴퓨터가 상상하기 어려울 정도로 여러가지일들을 배우고 또 수행한다. 이런 복잡함 일들을 컴퓨터가 할 수 있으면 좋겠지만 컴퓨터는 한가지일에 대해서 배울수 있다.


![예1](/./ml5-3.png)

그림에 보이는 뇌의 붉은 부분은 우리 뇌에서 청각을 담담하는 부분이다. 우리의 귀에서 부터 청각신호가 저 붉은 부분으로 전달되면 붉은 부분이 누구의 목소리인지 구분하게 된다. 신경과학자들은 귀와 연결된 신경을 절단하고 눈과 연결시켰는데 청각을 담당하는 저 부분이 보는 법을 배우게 됬다고 한다. 신기방기

![예1](/./ml5-4.png)

뇌에 붉게 표시된 영역읜 체지성(눈,귀,코를 제외한 신체감각)영역이다 마찬가지로 이 부분을 체지성 신경과 끊고 시각신경과 연결하면 체지성영역은 보는 법을 배우게 된다. 신기방기...

뇌가 스스로 다른 감각에 대해서 배우는 것처럼 neural network알고리즘도 새로운 타입의 데이터에 대해서 배우는것이 목표라고 생각한다.


## Model Representation I

그럼 신경망(Neural Network) 알고리즘을 사용할때 가설함수(hyoithesis function)의 표현은 어떻게 될까? 알아보도록하자. 신경망은 뉴런을 자극하는것과 뇌에서 뉴런들의 망처럼 개발됬다. 가설함수의 표현을 알아보기 전에 뇌를 구성하는 뉴런이라는 단위가 어떻게 생겼는지 살펴보자.

![예1](/./ml5-5.png)

이쯤되니 뇌를 배우는건지 알고리즘을 배우는지 헷갈린다 ㅎㅎ...
뉴런에서 중요한것은 두부분이다. 뉴런이 몸통이라고 할 수 있는 Nucleus을 살펴보자.Nuclues는 입력이라고 할 수있는, 즉 자극을 받아들이는 Dendrite가 있다(Input wire). 그리고 받아들인 자극을 다른 뉴런으로 보내는 Axon이 있다(Output wire).


![예1](/./ml5-6.png)

뉴런들의 사진이 있다. 뉴런들은 spikes라고 불리는 아주 작은 전기 펄스 신호를 이용해서 서로 커뮤니케이션을 한다. Axon으로 부터 나온 전기적 신호는 다른 뉴런의 dentrites에 전달되고 어떤 계산을 한 후에 axon을 통해 다른 뉴런으로 보낼지 결정한다. 우리가 느낀 감각들이 뉴런을 통해 전달되는 과정이 우리몸의 신경계애서 일어나고 있다. 그리고 이 과정은 우리의 감각과 근육이 움직이는 과정과 같다.

![예1](/./ml5-7.png)
그럼 신경망 알고리즘의 가설함수 표현을 알아보자.

인공 신경망(artificial neural network)에서는 뉴런들이 하는 일을 컴퓨터가 하도록 적용하였다. 뉴런 하나하나를 logistic unit으로 하고 단순화한 모델을 사용한다.

앞서 살펴본바와 같이 뉴런은 하나의 계산 유닛이다. **dendrites** 로 부터 전기적 신호 spikes를 입력을 받고 처리한 후 Axon을 통해서 출력한다.

인공 신경망에서는 dendrites는 입력되는 틍징들이며 Axon은 가설함수의 결과로 나타낸다.

강의를 하시는 Andrew Ng교수님은 보통 input wire를 x1,2,3만 그리시지만 경우에 따라 **bias unit** 혹은 **bias neuron** 인 x0를 같이 그려주는것이 표기상 편할 때도 있다. 그리고 블로그를 찾아보니 bias unit은 입력 값에 대한 가중치들이 편향되지 않게 하는 기능도 있다고 한다.
bias unit의 값은 1이다.

앞서 말한바와 같이 뉴런하나하나를 logistic  unit으로 단순화 한다. 인공 신경망에서는 classfication에서 사용했던 sigmoid function을 사용하는데, 이것을
 **sigmoid(logistic) activation function** 혹은 **artificial neuron with sidmoid** 라고 부른다.
표현은 $g(z)$로 한다.

$\theta$는 nueral network에서 weight라고 부르기도 한다. 하나의 뉴런을 간단하게 나타내면 아래와 같이 표현할 수 있다.

$$
\begin{bmatrix}
x_0 \\
x_1 \\
x_2 \\
\end{bmatrix}
\rightarrow
\begin{bmatrix}
\ \ \ \\
\end{bmatrix}
\rightarrow
h_\theta(x)
$$

![예1](/./ml5-8.png)

logistic unit들이 모여서 형성된 neural network를 살펴보자. 용어정리를 간단히 하자만 가장 왼쪽의 x노드들을 **input layer** 가장 오른쪽의 노란색노드를 **output layer** 그리고 가운데 노드를 **hidden layer** 라고 한다.

아까 언급했던 바와 같이 bias unit을 추가하여 네트워크를 구성할 수 있다.

![예1](/./ml5-9.png)

인공신경망에서의 계산을 설명하기 앞서 두식의 표기를 알아보고 시작하자.

$$
\begin{aligned}
& a_i^{(j)} = \text{"activation" of unit $i$ in layer $j$} \\
& \Theta^{(j)} = \text{matrix of weights controlling function mapping from layer $j$ to layer $j+1$}
\end{aligned}
$$

$\Theta$는 레이어 j에서 j+1로 입력이 들어갈때 가중치를 정하는 함수가 되겠다.

a는 레이어 l의 유닛 i의 activation(출력 값)을 의미한다. a는 g로 표시되는 logistic activation function를 통해 나온 값을 의미한다.
수식에서와 같이 각 입력에 대한 $\Theta$가 곱한한 값을 logistic activation function에 넣었을 때 나오는 결과가 바로 activation이고 a로 나타낸다.


j번째 레이어에 $s_j$가 있고 j+1번째 레이어에 $s_{j+1}$가 있다면 $\Theta$벡터의 차원$s_{j+1} \times (s_j + 1)$.

예를 들어 위 그림처럼 입력이 3개 activation node가 3개 있을경우 $\Theta^{(1)}$벡터의 차원은 3$\times$4가 된다.


## Model Representation II

Forward propagation:Vectorized implementation

위에서 배운 식들을 벡터로 구현하는 방법에 대해서 알아보자. activation 노드를 계산하는 식에서 g함수가 포함하고 있는 식들을 $z_k^{(i)}$라고 정의하자. 그럼 우리가 이전에 표현했던 식들을 z로 나타낼수 있다.

$$
\begin{aligned}
a_1^{(2)} = g(z_1^{(2)}) \\
a_2^{(2)} = g(z_2^{(2)}) \\
a_3^{(2)} = g(z_3^{(2)}) \\
\end{aligned}
$$

j=2 번째인 레이어 노드 k를 z로 나타내면 아래식과 같다.

$$
z_k^{(2)} = \Theta_{k,0}^{(1)}x_0 + \Theta_{k,1}^{(1)}x_1 + \cdots + \Theta_{k,n}^{(1)}x_n
$$

<br>
x와 $z^{(j)}$의 벡터표현은 아래와 같다.
<br>

$$
\begin{aligned}
x =
\begin{bmatrix}
x_0 \\
x_1 \\
\cdots \\
x_n
\end{bmatrix} &
z^{(j)} =
\begin{bmatrix}
z_1^{(j)} \\
z_2^{(j)} \\
\cdots \\
z_n^{(j)}
\end{bmatrix}
\end{aligned}
$$

## Examples and Intuitions

이제 복잡한 비선형 입력이 들어왔을 때 신경망 알고리즘이 어떻게 계산하는지 예를 들어 설명해보겠다.

신경망을 이용한 간단한 예제중 하나는 x1과 x2의 논리연산 결과를 예측하는 것이다.

(논리연산 AND는 입력한 두 값 모두가 1일때 1을 반환한다.)

![예1](/./ml5-10.png)

입력되는 값 x1, x2는 0,1둘 중 하나의 값이고 y는 x1 AND x2일 때, 위 그림은 아래 식으로 나타낼 수 있다.

$$
\begin{aligned}
\begin{bmatrix}
x_0 \\
x_1 \\
x_2
\end{bmatrix} \rightarrow
\begin{bmatrix}
g(z^{(2)})
\end{bmatrix} \rightarrow
h_\Theta(x)
\end{aligned}
$$

그리고 그림에 표현된 +1는 bias unit임을 잊지말자. theta matrix는 다음과같다.

$$
\Theta^{(1)} =
\begin{bmatrix}-20 & 30 & 30\end{bmatrix}
$$

위와 같이 theta matrix를 정하면 x1과 x2 모두 1이여만 양수가 되서 1이된다.

$$
\begin{aligned}
& h_\Theta(x) = g(-30 + 20x_1 + 20x_2) \\
\\
& x_1 = 0 \ \ and \ \ x_2 = 0 \ \ then \ \ g(-30) \approx 0 \\
& x_1 = 0 \ \ and \ \ x_2 = 1 \ \ then \ \ g(-10) \approx 0 \\
& x_1 = 1 \ \ and \ \ x_2 = 0 \ \ then \ \ g(-10) \approx 0 \\
& x_1 = 1 \ \ and \ \ x_2 = 1 \ \ then \ \ g(10) \approx 1
\end{aligned}
$$

위와 같이  논리 게이트를 사용하듯 인공신경망의 작은단위를 이용하면 논리연산을 할 수 있다. theta matrix의 값을 조금만 바꾸면 AND뿐만 아니라 OR NOR연산도 가능하다.

$$
\begin{aligned}
AND:\\
\Theta^{(1)} &=
\begin{bmatrix}-30 & 20 & 20\end{bmatrix} \\
NOR:\\
\Theta^{(1)} &=
\begin{bmatrix}10 & -20 & -20\end{bmatrix} \\
OR:\\
\Theta^{(1)} &=
\begin{bmatrix}-10 & 20 & 20\end{bmatrix} \\
\end{aligned}
$$

위와 같이 theta matrix의 값만 바꿔주면 된다.

그럼 XNOR같은 연산은 어떻게 할까?

![예1](/./ml5-11.png)

$$
\begin{aligned}
\begin{bmatrix}
x_0 \\
x_1 \\
x_2
\end{bmatrix} \rightarrow
\begin{bmatrix}
a_1^{(2)} \\
a_2^{(2)}
\end{bmatrix} \rightarrow
\begin{bmatrix}
a^{(3)}
\end{bmatrix} \rightarrow
h_\Theta(x)
\end{aligned}
$$

신경망을 수식으로 나타내면 위와 같다. 첫번째 레이어에서 두번째 레이어로 전개할때 NOR연산과 AND연산을 하기 위해 theta 1 을 사용한다.

$$
\Theta^{(1)} =
\begin{bmatrix}
-30 & 20 & 20 \\
10 & -20 & -20
\end{bmatrix}
$$

그리고 두번재 레이어에서 다음 레이어로 전개 할때는 OR연산을 하므로 theta matrix는 아래와 같다.

$$
\Theta^{(2)} =
\begin{bmatrix}-10 & 20 & 20\end{bmatrix}
$$

위 과정들을 수식으로 나타내면

$$
\begin{aligned}
& a^{(2)} = g(\Theta^{(1)} \cdot x) \\
& a^{(3)} = g(\Theta^{(2)} \cdot a^{(2)}) \\
& h_\Theta(x) = a^{(3)}
\end{aligned}
$$

이 된다.

---

마치며
인공신경망에 대해서 알아보았다. 수업 중간중간에 여기저기서 튀어나오는 여러수식과 수학기호들 때문에 좀 버벅거렸지만 집중하고 천천히 쫓아가다보니 개념에 대해서 이해할 수 있었다. 하지막 내가 이해한바를 모두 글로 표현했는지 잘 모르겠다. 좀 더 공부하면서 내용을 보충해야겠다.

---

## reference

 - [courser machine learning by Andrew Ng](https://www.coursera.org/learn/machine-learning/lecture/ka3jK/model-representation-i)
 - [인공 신경망에 관한 설명](http://poohrusa.tistory.com/1283)
