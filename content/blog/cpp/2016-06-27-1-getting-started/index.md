---
title: 1. Converting a C Program to C++
date: "2016-06-27"
category: [C++]
tags: ["cpp", "coursera"]
description: C프로그램을 C++로 변환해보자.
---

Coursera에서 제공하는 [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info) 를 보고 포스팅을 하고 있습니다. :)

---
두 주사위를 던저서 나올수 있는 눈의 확률을 구하는 프로그램을 살펴보자.

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define SIDES 6
#define R_SIDE (rand() % SIDES + 1)
```

1행 부터 3행까지는 Standard Libarary를 불러오는 코드이다. 마지막줄의 코드는 랜덤한 주사위의 눈을 얻는 코드인데 **preprocssor**(전처리기) 로 작성되어 있다. 하지만 C++에서는 preprossor를 최대한 적게 사용하는것이 좋다.

```c
  srand(clock());
  printf("\n시행 횟수를 입력하세요:");
  scanf("%d",&trials);

  for (j = 0 ; j < trials ; ++j)
    outcomes[(d1 = R_SIDE) + (d2 = R_SIDE)]++;

  printf("확률\n");

  for(j = 2 ; j < n_dice * SIDES + 1 ; ++j )
    printf(" j = %d p %fl \n", j , (double)(outcomes[j])/trials);
}
```

위와 같이 시뮬레이션을 하는 프로그램을 작성하였다. 시뮬레이션이란 실제로 수행하지 않고 결과를 예측하는 것인데 이때 랜덤요소가 필요하게 된다. 하지만 컴퓨터는 결정론적인(deterministic) 장치이기 때문에 랜덤한 요소를 고려한다는 것이 애매하게 들릴 수 있다.

1행의 `srand(clocl())`은 랜덤의 seed역할을 한다. 시스템 clock값을 읽어 랜덤이 시작하는 위치를 결정한다. 따라서 프로그램을 실행할 때마다 새로운 clock값에서 시작하므로 결과가 항상 달라지게 된다.



**C프로그램** 은 다음과 같이 이루어져 있다.

- Libararies : `stdio.h` 와 같은 표준 라이브러리들
- #define macros : 각종 메크로들 그리고 전처리기들
- main() : 그리고 메인함수 기본적으로 c/c++ 에서는 int 형을 반환한다.

이제 위에서 작성한 C 프로그램을 C++로 바꿔보자

```c
// 아래 프로그램은 주사위눈의
// 확률을 계산하는 프로그램입니다.
#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;
const int sides = 6;
inline int_rside(){return (rand() % sides + 1);}
```

우선 주석을 살펴보면 C에서는 `/* */` 을 사용하여 여러줄의 주석을 달 수 있다. 하지만 C에서는 `//`으로 주석을 단다고 한다. C99 표준에서는 `//`으로 주석을 달 수 있고, GNU컴파일러의 경우 C와 C++모두 컴파일을 하기 때문에 두 언어의 문법이 혼용되는 경우가 있다고 한다. 이 강의에서는 전통적인 C와 C++를 비교하기 때문에 위와같은 설명을 해주셨다.

라이브러리를 불러오는 경우 C++ 에서는 `.h`를 생략한다. 또한 c언어의 라이브러리를 사용할 경우 라이버러리 이름앞에 c를 붙이면된다. `ctime`, `cstllib` 등등...

C++에는 namespace라는 계념이 추가되었다. 함수의 이름과 매개변수가 같을 경우 에러가 나게되는데 이 경우 두 함수의 namespace를 충돌이 일어나지 않는다.

그리고 `#define SIDES 6` 대신 `const int`라는 키워드를 이용하여 상수를 선언한다. 전처리기 매크로를 이용하여 선언한 C와는 달리 `const int`키워드를 이용하여 선언했기 때문에 상수가 type을 가지게 된다. 따라서 컴파일러가 컴파일 할 때 문법검사를 하게된다.

또한 매크로 함수의 경우 `inline` 이라는 키워드를 이용하여 작성한다. 함수 호출의 경우 머신래벨에서 stack에서 함수를 풀러오는 동작은 하게 되고 경우에 따라 a몇 m초가 걸린다. 이 비용을 줄이기 위해 `inline`함수를 사용한다.

그렇다면 C++은 C와 비교하여 어떤 것들이 추가 되었을까?

- **주의** 몇가지 특징들은 morden C를 계승하였다.
- C라이브러리 이외의 라이브러리
- inline 함수의 추가
- `//` 주석

특히 inline 함수를 사용하면 컴파일에러가 어디서 일어나는지 알려준다. 매크로 함수를 사용하게 되면 대부분 매크로 함수를 호출할 때 에러가 발생하기 때문에 이런 문제들을 개선할 수 있다고 한다.

```cpp
int main(void)
{
  const int n_dince = 2;
  int d1, d2;
  srand(clock());
  cout << "\nEnter number of trials";
  int trials;
  cin >> trials; //compare to scanf
  int* outcomes = new int[n_dice * sides +1];
}
```

main함수에 해당하는 부분을 C++코드로 다시 작성하였다. 가장 두드러지는 변화는 `printf`대신 `cout`를 사용한 점이다. `cout`은 **iostream** 에 정의된 함수이다. 출력을 할 때 `<<`연산자를 사용하는데 이는 C 커뮤니티에서 사용되는 bit shift연산자이다. 물론 C++에서도 bit shift연산을 하지만 cout 에서 `<<`는 오버로딩(overloading) 된 연산자이므로 다른 의미를 가지게 된다.

또 한가지 C++에 추가된 것은 소스코드 중간에 변수를 선언할 수 있다는 것이다. C에서는 코드 블럭의 시작에서만 변수를 선언 할 수 있는데 반해 C++에서는 소스코드 중간에서도 변수를 선언할 수 있어 코드를 이해하는데 도움을 준다.

또한 C 에서 동적할당을 위해서 `malloc()`과 `free()`를 사용하던 것이 C++에서는 `new` 와 `delete`로 대체되었다.

나머지 코드를 살펴보자.

```cpp
for(int j = 0 ; j < trials ; ++j)
  outcomes[(d1 = r_sides()) + ( d_2 = r_sizdes())]++;

cout << "probablity\n";

for(int j = 2; j < n_dice * sides + 1 ; ++j)
 cout << "j=" << j << "p="
      << static_cast<double>(outcomes[j])/trials
      << endl;
```

c++ 의 for문의 초기 state 구문을 살펴보면 c와 다르게 변수가 선언될 수 있음을 알 수 있다. 반복문에서 사용되던 i, j를 지역변수처럼 선언할 수 있게 됨으로서 코드가 복잡해지는것을 조금이나마 해소하였다.

C에서 자료형 변환(typecasting)을 할 때 `(double)var` 이런식으로 하였다. C++ 에서는 `static_cast<double>`과 같이 형변환을 하게 되는데 비 정상적인 강제형변환으로 인한 에러를 예방할 수 있다고 한다.

C++의 장점을 정리하면 다음과 같다.

- safe cast
- for statement can include declaration initailizer
- *endl* iomanipulator can be placed in an ostream

---

그렇다면 왜 C++가 더 나을까?

- More Type Safe
- More Libararies
- Less reliance on preprocssor
- OO vs impreative

일단 C++는 타입이 안전한다. `C99`같은 C표준에서는 타입의 안전이 향상되었지만 C 자체는 로컬 아키텍쳐에서 컴파일 되도록 설계되어 있다. 따라서 int 나 double같은 자료형을 선언할 때 아키텍쳐에 따라 int가 2byte가 될 수도 있고 4byte도 될 수도 있어 언어의 문법이 다소 느슨하다. 하지만 이점은 그 아키텍쳐, 언어, 컴파일된 코드들은 해당 아키텍쳐에 최적화 할 수 있다. 이런 느슨한 문법 특징은 범용 언어로서 단점을 가지게 된다. C프로그램을 다른 플랫폼에서 실행히키면 다른 동작을 보게 될수도 있기 때문이다.

C++에는 더 많은 라이브러리들이 추가되었다. 이런 라이브러리들은 정확성을 보장하기 위해 테스트 되었으며 이들을 사용하여 즉각적인 코드 재활용이 가능하다.

세번째로 C++가 향상된 점은 전처리기에 대한 낮은 의존성이다. 기존의 C나 C커뮤니티에서 주로 사용되던 #define은 C++에서는 사용하지 않는다. 소프트웨어 엔지니어링에서 문맥상으로 언어의 규칙을 따르지 않고 문자를 치환하는데 사용하는 것은 오류를 발생시킬 확률을 더 많이 만들게 되는것을 알게되었다고 한다. 같은 기능을 언어에 있는 문법 체크 기능을 사용하면 이런 확률들이 더 낮아지게 되므로 C++가 전처리기에 덜 의존하게 되었다.

또한 객체지향 개념이 추가되어 더 좋은 언어가 되었다.

지금까지

- `inline`, `const`
- `static_cast<type>`
- namespace
- iostream

에 대해서 알아보았다.


---


# reference
- [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info)
- [객체지향 프로그래밍](https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_%EC%A7%80%ED%96%A5_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)
