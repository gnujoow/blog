---
title: 5. Operator overloading
date: "2016-07-20"
category: [C++]
tag: [C++, types, overloading,Operator]
description:
---

Coursera에서 제공하는 [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info) 를 보고 포스팅을 하고 있습니다. :)

---

이번 포스팅에서는 객체지향 프로그래밍 언어로서 C++를 좀더 살펴보기로 한다.  
우선 우리가 잘 알고 있는 C언어에 대한 복습을 하도록하자.

- **C의 Native 자료형 3가지를 알고있는가?**
```
short, int, double, char, long, long double, int *
```
등등...

- **3 / 4의 값은 무엇인가?**  `0` 두 수모두 정수 이므로
- **3.0 / 4의 값은 무엇인가?** `0.75` double/int 이므로

C에서는 위와 같이 데이터 타입에 따라 결과값이 확연하게 달라지게 된다.

객체지향 프로그래밍 언어에서는 새로운 자료형을 정의하거나 기존 자료형을 확장하여 코드를 짤 수 있게 해준다. 만약 윈도우운영체제의 메뉴바 색상을 변경하는 기능이 있다고하면 색상 타입을 새로 추가해야할 수 도 있다.

```c
typedef enum color{RED, WHITE, GREEN} color;
```

enum을 사용하면 위와 같은 `color`자료형을 정의할 수 있다. RED는 기본적으로 0이 되고 WHITE와 GREEN은 각각 1과 2가된다. enum은 간단한 int 자료형이다. enum은 연관된 상수들의 작은 집합을 만드므로 enum을 정의하여 사용하게 된다.

이렇게 만든 자료형들을 원래 자료형들이 가지고 있는 연산자가 적용되도록 코드를 짜는것이 좋은 객체지향 프로그램이다. 아래 예를 살펴보자.
```cpp
typedef enum days{SUN, MON, TUE, WED, THU, FRI, SAT}days;

inline days operator++(days d){
  return static_cast<days>((static_cast)<int>(d)+1) % 7);
}
```

위와 같이 각 요일에 해당하는 자료형 days를 정의하였다. enum의 정의에 따라 `SUN`은 0, `MON`은 1 ... `SAT`은 6이 된다. 그리고 3행에 inline함수로 증가연산자 **++** 를 정의하였다.

inline함수로 정의할 이유는 ++연산자는 자주호출될 것이고 함수 호출시 비용을 줄이고자 inline함수로 선언하였다. return타입은 days로 하였다. 연산된 결과가 days로 리턴되어야하기 때문!

위 함수에서는 매개변수가 하나이므로 [Unary operator](https://en.wikipedia.org/wiki/Unary_operation)가 된다. 연산자 오버로딩과 기존 연산자에 새로운 의미를 추가할 때 이 연산자가 어떤 연산자인가에 대한 물음에 혼란에 빠질 수 있다. C++에는 Unary operator와 [Binary opertor](https://en.wikipedia.org/wiki/Binary_operation)가 존재한다. 함수의 매개변수를 정의함으로써 연산자가 어떤 형식인지 명쾌하게 정의 할 수 있다. 한가지 덧 붙이자면 재정의된 연산자의 연산우선순위는 원래 연잔자의 우선순위를 따른다.

새로운 데이터 타입을 만들면 타입에 대한 입출력을 구현해야 한다.  
output stream에서 **<<** 연산자는 c의 printf와 같은 역할을 한다. 위에서 만든 days 타입에 대하여 << 연산(출력)이 잘 작동되게 하기 위해서 아래와 같이 << 를 재정의 해줘야한다.

```cpp
ostream& operator <<(ostream& out, const days& d){
  switch(d){
    case SUN: out<< "SUN"; break;
    case MON: out<< "MON"; break;
    ...
  }
  return out;
}
```

화면에 출력결과를 표시하기 위해서 리턴 타입은 ostream의 reference이 된다. << 연산은 Binray Opertor이므로 2개의 매개변수가 필요하다. 첫번째 매개변수는 output stream이 되고 두번째 매개변수는 우리가 출력하고자하는 자료형이다.  두 매개변수 모두 ostream에서 사용할 때 효율성과 기타 다른 이유로 call-by-reference로 전달받는다. days의 경우 값이 변하면 안 되므로 const 즉, 상수로 전달 받는다.

switch case문에서는 각각 days에 해당하는 문자열을 출력한다.

이제 우리가 정의한 데이터 타입 `days`에 대한 증가연산자, << 연산자의 오버로딩을 완성하였다.

```cpp
int main()
{
  days d = MON, e;
  e = ++d;
  cout << d << "\t" << e << endl;
}
```

`days` 변수 **e** 에 **d** 가 증가한 값을 저장한다. 이때 ++d는 다음 함수가 호출된다. **operator++(days e)**  
다음 줄의 cout << d 또한 재정의한 연산자가 호출된다.

---

## reference

- [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info)
- [객체 지향 설계](http://terms.naver.com/entry.nhn?docId=831385&cid=42344&categoryId=42344)
- StackOverflow
  - [why overloading of operator<< must return by reference?](http://stackoverflow.com/questions/9646893/why-overloading-of-operator-must-return-by-reference)
- wikipedia
  - [Unary operation](https://en.wikipedia.org/wiki/Unary_operation)
  - [Binary operation](https://en.wikipedia.org/wiki/Binary_operation)
