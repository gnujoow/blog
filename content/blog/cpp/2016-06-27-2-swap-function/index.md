---
title: 2. Swap function in C&C++
date: "2016-06-27"
category: [C++]
tags: ["c++", "coursera"]
description: swap function을 통해 C와 C++의 차이점을 알아보자.
---

Coursera에서 제공하는 [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info) 를 보고 포스팅을 하고 있습니다. :)

---

C와 C++에서 두 데이터를 교환하는 방법을 통해 두 언어의 차이점을 알아보자. 우선 C언어는 **call by value** 언어이다. call by value라 함은 함수에 값이 전달되고 처리될 때 매개변수들이 함수 안에서 지역변수로 연산되기 때문에 함수가 return 될 때 전달된 두 자료는 바뀌지 않는다. 따라서 pointer를 이용해서 두 자료의 값을 바꿔주는 함수를 작성하게 된다. 이때 자료형의 주소를 알아야하고 더 낮은 레벨의 사고를 필요로 하기 때문에 C를 처음 배울때 매우 어렵게 느껴졌던것이 기억난다. ~~ㅎㅎ~~

```c
void swap(int *i, int *j)
{
  int temp = *i;
  *i = *j;
  *j = temp;
}
```

C에서 swap은 위와 같다. 포인터 변수를 매개변수로 받아와서 해당 변수의 역참조 `*` 연산자를 통해 메모리가 가르키는 값을 교환하는 식이다. 이때 int가 아닌 double형의 swap을 하는 함수를 만드려면 어떻게 해야할까 답은 '새로 만든다' 이다.

```c
void double_swap(dobule *i, double *j)
{
  double temp = *i;
  *i = *j;
  *j = temp;
}
```

위의 함수와 거의 비슷하지만 함수의 이름과 매개변수의 자료형이 다르다. C에서는 함수의 이름과 변수의 이름이 특정되어야 하기 때문에 이런식으로 코드를 작성해야한다.

```c
int main()
{
  int m = 5, n = 10;
  double x = 5.3 , y = 10.6;
  printf("입력 : %d %d\n",m,n);
  swap(&m,&n);
  printf("출력 %d %d\n",m,n);
  printf("double 입력 %d %d\n",m,n);
  double_swap(&x,&y);
  printf("double outpus: %lf %lf \n",x,y);
}
```

위와 같이 pointer를 이용하여 call by reference를 할 수 있다.

그럼 이제 C++버전의 swap코드를 살펴보자.

```cpp
#include <iostream>
using namespace std;

inline void swap(int &i, int& j){
  int temp = i;
  i = j;
  j = temp;
}

inline void swap(double& i , double& j){
  double temp = i;
  i = j;
  j = temp;
}
```

C++에서는 함수의 이름이 같더라도 매개변수가 다르면 자동으로 **signature matching algorithm**를 통해 적절한 함수를 호출한다.

```cpp
int main()
{
  int m = 5, n = 10;
  double x = 5.3, y = 10.6;
  cout << "inputs:" << m << "," << n << endl;
  swap(m,n);
  cout << "outpus:" << m << "," << n << endl;
  cout << "double inputs:" << x << "," << y << endl;
  swap(x,y);
  cout << "double outputs:" << x << "," << y << endl;
}
```

데이터를 출력할때 포맷타입을 정의해줘야하는 C와 달리 C++에서는 자동으로 타입에 따른 포멧을 정해주므로 포멧타입을 따로 설정해 줄 필요가 없다.  
선언된 swap함수가 call-by-reference로 선언되어 있기 때문에 자동으로 두 값이 바뀌게 된다. 또한 함수를 호출 할 때 변수의 타입에 따라 다른 함수가 호출되므로 dobule, int swap을 같은 이름을 가진 함수로 작성해도된다.

---

> ## "Generics"
> Programming using templates

**Generics** 이란 자료형에 구애 받지 않고 프로그래밍 할 수 있는 방법이다. 이를 테면 삶은 돼지고기 요리 레시피를 삶은 소고기에 적용하면 비슷한 맛이 나는것 처럼 <u>각각 재료에 따라 구분하지 않고 삶은 고기 요리 레시피로 일반화 하는것이다</u>.

```cpp
template <class T>
inline void swap (T& d, T& s)
{
  T temp = d;
  d = s;
  s = Temp;
}
```

`template`라는 키워드를 이용하여 모든 자료형에 대한 swap함수를 작성하였다.

```cpp
#include <complex>

int main()
{
  int m = 5, n = 10;
  double x = 5.3, y =10.6;
  complex<double> r(2.4, 3.5), s(3.4, 6.7);
  cout << "inputs:" << m << "," << n << endl;
  swap(m,n);
  cout << "outpus" << m << "," << n << endl;
```

위와 같이 코드를 작성하면 데이터 타입과 상관없이 swap된다.


---


# reference
- [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info)
