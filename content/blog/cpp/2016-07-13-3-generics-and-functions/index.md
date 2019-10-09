---
title: 3. Generics & Fucntions
date: "2016-07-13"
category: [C++]
tags: ["cpp", "coursera"]
description:
---

Coursera에서 제공하는 [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info) 를 보고 포스팅을 하고 있습니다. :)

---

C++의 함수에서 새롭게 다음 항목들이 새롭게 추가 되었다.

- default parameters, variable arguemnt lists
- const parameters
- multiple Types in a generic
- operator overloading

```c
double sum(double data[], int size)
{
  double s = 0.0; // 리턴값
  int i;          // 루프 변수
  for(i = 0 ; i < size ; ++i)
    s += data[i];

  return s;
}
```

**C** 에서 함수를 작성할 때 리턴형의 자료형과 매개변수의 자료형을 선언했다. 1차원 배열의 원소의 합을 구하는 함수를 작성해 보았다. 배열의 주소와 크기를 전달인자로 받아오는데 배열의 주소는 `double data[]` 혹은 `double *data`로 받아온다.

C++에서는 다음과 같이 generic하게 작성할 수 있다.
```cpp
template <class T> // T는 generic Type
T sum(const T data[], int size, T s=0)
{
  for(int i = 0 ; i < size ; ++i)
    s += data[i]; // += 연산자는 T에 대해서 수행되어야 한다.

  return s;
}
```

C와 C++로 작성한 함수를 비교해보자. 우선 metavariable T를 선언하였다. T를 통해 전달되는 인자가 **int**, **double** 등 다양한 자료형이 들어오더라도 함수가 수행된다. 한 가지 특이한 점은 함수 선언 마지막 부부인데 **T s = 0** 이다. C++에서는 매개변수의 기본값을 설정할 수 있는데 아무것도 전달 받지 않으면 설정한 값으로 초기화 된다.  
그리고 반복문에서 변수를 선언할 수 있는데 코드 블럭 내에서 선언한 지역변수와 같은 역할을 한다.

---

## Multiple Template Argument

```cpp
template <class T1, class T2>
void copy(const T1 source[], T2 destination[], int size)
{
  for(int i = 0 ; i < size ; ++i)
    destination[i] = static_cast<T2>(source[i]);
}
```

safe casting 을 해주지 않으면 작동하지 제대로 작동하지 않는다. C++에서는 C와 비교하여 자료형에 대한 안정성이 향상되었다. C에서 형변환 type casting을 할 경우 종종 오류가 일어나는데 C++에는 여러가지 type casting을 통해 이 부분이 향상되었다.

| 종류 | 특징 |
|:-------------------|:-----------------|
| static_cast<type> | considered safe |
| reinterpret_cast<type> | highly unsafe |
| dynamic_cast<type> | used with classes |
| const_cast<type> | cast away const-ness |


---

# reference
- [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info)
