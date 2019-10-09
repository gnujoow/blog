---
title: 6. Class(0)
date: "2016-07-22"
category: [C++]
tags: ["cpp", "class", "struct", "widget", "overloading", "object oriented"]
description:
---

Coursera에서 제공하는 [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info) 를 보고 포스팅을 하고 있습니다. :)

---

객체 지향 프로그래밍에서는 새로운 타입을 자유롭게 추가할 수 있다. 각각 용도에 맞게 설계된 fortran, lisp, cobol과 같이 새로운 요가가 생겨날때 새언어를 만들필요 없이 새로운 타입을 추가하여 사용하면 된다. 이런 작은 기능들을 하는 widget들을 추가하는 방법은 무엇인지, 어떻게 만들어야하는지 알아보자.

C에서 새로운 타입을 선언할 때 주로 구조체(struct)를 사용한다.

```c
typedef struct point{double x,y;}point;
void add_points(point* p1, point* p2, point* sum){
  sum->x = p1->x + p2->x;
  sum->y = p1->y + p2->y;
}
```

C++에서는 class라는 구조체를 사용하여 새로운 타입(객체!)을 만든다.

클래스내의 변수나 함수를를 선언할 때는 **public**, **private**, **protected** 로 선언 할 수 있다. public은 누구나 접근할 수 있으며 private는 정반대의 성격을 가지고 있다. private는 해당 클래스만 접근 할 수 있다.

```cpp
class point{
  public:
    double getx() {return x;}
    void setx(double v){x = v;} // mutator method
  ...
  private:
    double x,y;
};
```

위 와같이 point 클래스에서 x와 y는 private으로 선언되어 정보은닉이 되어있다. 해당 정보를 가져오거나 설정하기 위해서는 public으로 선언되어있는 멤버함수를 사용해야하는데 **제한된 방법으로의 접근만을 허용해서 잘못된 값이 저장되지 않게하고 또 실수를 했을 경우 실수가 어디서 발생했는지 쉽게 발견되도록 하기 위해** 위와 같이 설계한다.

```cpp
point operator+ (point& p1, point& p2){
  point sum = {p1.x + p2.x, p1.y + p2.y};
  return sum;
}

ostream& operator<< (ostream& out, const point& p){
  out<< "(" << p.x << ", " << p.y << ")";
  return out;
}
```


```cpp
int main()
{
  point a= {3.5, 2.5}, b = {2.5, 4.5};
  cout << "a=" << a << "b=" << b << endl;
  cout << "sum=" << a+b << endl;
}
```

위와 같이 작성하면  main()함수에서 기존에 존재하는 타입들 (native types)과 동일하게 연산자가 작동하는 것을 확인할 수 있다. 그리고 새롭게 타입을 만들면 다른 타입과 동일하게 작동되게 하는것이 좋은 객체지향 프로그래밍이다.

---

## reference

- [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info)
- 윤성우 열혈 C++ chapter4 클래스의 완성
