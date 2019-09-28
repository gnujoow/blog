---
title: 7. Class(1) constructor
date: "2016-07-23"
category: [C++]
tag: [C++, class, object oriented,constructor, linkedlist]
description:
---

Coursera에서 제공하는 [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info) 를 보고 포스팅을 하고 있습니다. :)

---

C++에는 여러가지 int, short, double 등 여러가지 native type들이 있다. 지금 까지의 포스팅에서는 새로 만든 타입들이 **<<** 연산이나 **+** 혹은 **++** 연산에 잘 작동하도록 연산자 오버로딩 하는법을 알아보았다.

아래와 같이 native type을 할당 해보자.

```c
int i, j = 3;
```

위와 같이 변수를 만들면 stack이라는 메모리 상에서 **선언**, **할당**, **초기화** 가 이루어진다. 자동으로! 우리가 만든 class에서도 자연스럽게 native type처럼 만드려면 어떻게 해야할까? 바로 **생성자(constructor)** 를 사용하면 된다.

본격적으로 생성자에 대해서 알아보기전에 기본적인 C/C++문법에 대해서 짚고 넘어가자

```c
int main()
{
  int i = 9, j = 3;
  cout << "i 는" << i << "j 는" << j << endl;
  {
    int i = j + 2;
    cout << "i 는" << i << "j 는" << j <<endl;
  }
  cout << "i 는" << i << "j 는" << j <<endl;
}
```

위 코드를 실행하면 다음과 같은 결과가 출력된다.

```
i는 9 j는 3
i는 5 j는 3
i는 9 j는 3
```

첫 번째행이 출력될 때 바깥 i와 j는 스택 메모리에 존재한다. 그리고 2번째 행이 출력될 때는 바깥 i는 여전히 스택에 존재한 상태에서 안쪽 i가 스택에 할당된다. 이후 안쪽 코드 블럭을 빠져 나가면 안쪽 i는 스택에서 사라지고 바깥쪽 i가 출력된다.

다시 생성자이야기로 돌아가보자

```cpp
class point{
  public:
    point(double x=0.0, double y= 0.0):x(x),y(y){} // constructor
    double getx(){return x;}
    void setx(double v){x = v;}
  ....
  private:
    double x,y;
};
```

3행이 바로 point class의 생성자이다. 위 생성자는 매개변수 default값이 각각 0.0으로 지정되어있다. 여기서 짚고 넘어갈 생성자의 특징은 다음과 같다.

- 함수의 이름과 클래스의 이름이 같다.
- 반환형이 선언되어있지 않으며, 실제로 아무것도 반환하지 않는다.

```cpp
point();
point(1.1);
point(1.1, 2.2);
```

클래스가 생성될 때 가장먼저 호출되는것이 바로 생성자 메소드이다. 위와 같이 호출하면 각각에 해당하는 x,y값으로 바뀌게 된다.  
생성자 뒤에 나온 **:x(x),y(y){}** 은 멤버 이니셜라이저(initializer list)한다.

생성자를 표현하는 방법은 여러가지가 있다.

```cpp
point(){ x = y = 0.0;}
point(){ this -> x = 0.0; this-> y =0.0}
point():x(0.0),y(0.0){}
default constructor - the constructor whose signature is void
```

첫 번째 방법은 ordinary assignment, 두번째는 **this 포인터** 를 사용하였다. 모든 객체가 가지고 있는 **this 포인터** 는 객체 자신을 가리키는 용도로 사용되는 포인터이다. 세번째는 멤버 이니셜라이저를 사용하여 객체를 사용하는데 강의하는 교수가 가장 선호하는 방법이라고 한다. 멤버 이니셜라이져를 이용하면 객체가 생성되는 과정에서 클래스 생성자를 통해 객체를 초기화 할 수 있다.

---

## More constructors

클래스에서 생성자의 역할은 중요하다. 생성자는 다음과 같은 기능을 수행할 수 있다.

- initialize
- allocate
- convert
- check correctness

지금까지 우리는 생성자가 클래스의 멤버변수를 초기화하는 방법을 살펴보았다. 규모가 크고 복잡한 클래스인 경우(heap 메모리를 할당 받아야하는 경우) 생성자에서 메모리를 할당 할 수 있다. 또한 클래스가 생성될때 생성자에서 다양한 형식이 argument로 부터 static_cast 를 할 수 있다. 또한 클래스가 만들어지는 시점에서 멤버 변수의 특정 범위를 제한 하고 싶을 경우 멤버 변수를 체크할 수 있다.

C community에서 heap메모리를 관리하고자 할 때에는 malloc혹은 calloc함수를 통해 메모리를 할 당하고 free함수를 통해 할당해제하였다.

C++에서는 **new** 와 **delete** 를 통해 메모리를 할당하고 해제한다. JAVA와 같이 자동으로 garbage collection이 되는 언어와 달리 C/C++에서는 프로그래머가 직접 할당해제를 해야한다. 코드가 조금 더 복잡해지고 더 주의를 요하지만 더 메모리를 더 효과적으로 사용할 수 있다.

```cpp
char * s = new char[size]; // get off heap
int * p = new int(9); // single int initialized and 9 is stored
delete [] s; // delete an array
delete p; // delete single element
```

생성자에서 메모리 할당을 했다면 **소멸자(destructor)** 에서 할당 해제를 반드시 해야한다. 소멸자에 대해서는 다음 포스팅에서 더 자세하게 이야기하겠당.

---

## reference

- [C++ for C programer](https://www.coursera.org/learn/c-plus-plus-a/home/info)
- 윤성우 열혈 C++ chapter4 클래스의 완성
- [멤버이니셜라이져리스트(멤버초기화리스트) C언어 예술가](http://thrillfighter.tistory.com/222)
