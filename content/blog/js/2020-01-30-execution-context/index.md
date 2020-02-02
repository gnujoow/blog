---
title: "[번역]Javascript의 실행 컨텍스트와 실행 스택 이해하기"
date: "2020-01-30"
category: [js]
tags: ["javascript"]
description: JavaScript 코드가 내부에서 어떻게 실행되는지 알아봅시다.
---

이 포스트는 [Sukhjinder Arora](https://twitter.com/sukhjinder_95)가 작성한 **Understanding Execution Context and Execution Stack in Javascript**를 번역하였습니다. 원문은 아래 링크에서 확인할 수 있습니다.

[https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)

---

만약 여러분이 JavaScript를 사용하는 개발자이거나 혹은 개발자가 되기를 희망한다면 JavaScript가 프로그램 내부에서 어떻게 실행되는지 반드시 알고있어야 합니다. Hoisting, Scope 그리고 Closures와 같은 JavaScript의 개념들을 이해하려면 실행 컨텍스트에 대한 이해가 필요합니다.

실행 컨텍스트와 실행 스택의 계념을 제대로 이해하면 훨씬 더 좋은 자바스크립트 개발자가 될 수 있습니다.

그럼 한번 알아봅시다. ;)

---

# 실행 컨텍스트란 무엇일까요?
실행 컨텍스트는 간단히 말해서 자바스크립트 코드를 해석(evaluate)하고 실행하는 환경의 추상적인 계념입니다. Javascript로 작성된 모든 코드들은 실행 컨텍스트 안에서 작동됩니다.

## 실행 컨텍스트의 종류
자바스크립트에는 3가지 실행 컨텍스트가 존재합니다.

- **전역 실행 컨텍스트(Global Execution Context)**  
  전역 실행 컨텍스트는 기본 컨텍스트 혹은 base 실행 컨텍스트입니다. 어느 함수에도 포함되지 않은 코드 전역 실행 컨텍스트에 속하게 됩니다. 전역 실행 컨텍스트는 두가지 작동을 하는데, (브라우저 환경인 경우) window 객체인 전역 객체를 생성하고 `this`의 값을 전역객체와 동일 하게 설정합니다. 자바스크립트 프로그램에는 하나의 전역 실행 컨텍스트만 존재합니다.
- **함수 실행 컨텍스트(Functional Execution Context)**  
 함수가 호출될 때마다 실행된 함수를 위한 새로운 실행 컨텍스트가 생성됩니다. 각 함수는 자체 실행 컨텍스트는 함수를 호출하거나(called) 호출할때(invoked) 생성됩니다. 함수 실행 컨텍스트는 여러개가 존재할 수 있으며 새로운 실행 컨텍스트가 생성될 때마다 몇가지 단계를 거치게 되는데, 단계에 대해서는 블로그 후반에서 설명하겠습니다.
- **Eval 실행 컨텍스트(Eval Execution Context)**  
 Eval 함수내에서 실행된 코드들도 자체 실행컨텍스트를 얻지만, Eval은 보통 Javascript 개발자들이 사용하지 않기 때문에 자세히 다루지 않겠습니다.

 # 실행 스택(Execution Stack)
다른 프로그래밍 언어에서 "콜링 스택(Calling Stack)"이라고도 하는 실행 스택은 코드 실행중에 생성된 모든 실행 컨텍스트들을 저장하는데 사용되는 후입선출(LIFO, Last In, First Out) 구조를 가지는 스택(Stack)입니다.

Javscript 엔진이 스크립트를 처음으로 마주하게되면 전역 실행 컨텍스트를 생성하여 현재 실행 스택에 푸시합니다. 그리고 Javacript 엔진은 함수 호출을 발견할 때마다 해당 함수에 대한 실행 컨텍스트를 생성하여 스택의 상단에 푸시합니다.

Javascript 엔진은 스택의 최상단에 있는 실행 컨텍스트의 함수를 실행합니다. 함수 실행이 완료되면 스택에서 제거되고 현재스택의 아래에 있는 컨텍스트로 컨트롤이 도달합니다.

위 내용을 아래 예제 코드를 통해 살펴보겠습니다.

```js
let a = 'Hello World!';
function first() {
  console.log('Inside first function');
  second();
  console.log('Again inside first function');
}
function second() {
  console.log('Inside second function');
}
first();
console.log('Inside Global Execution Context');
```
![위 코드의 실행 컨택스트 스택](./1.png)
<p align="center">위 코드의 실행 컨텍스트 스택</p>

자바스크립트 코드가 브라우저에 로드되면 Javascript 엔진은 전역 실행 컨텍스트를 생성하고 현재 실행 스택에 푸시합니다. `first()`함수가 호출될때 Javscript엔진은 함수에 대한 새로운 실행 컨텍스트를 생성하고 현재 실행 컨텍스트 스택의 상단에 푸시합니다.

`second()`함수가 `first()`함수로부터 호출될때 Javscript엔진은 `second()`함수에 대한 새로운 실행 컨텍스트를 생성하고 현재 실행 컨텍스트 스택에 푸시합니다. `sencond()`함수의 동작이 완료되면 함수의 실행 컨텍스트가 현재 스택에서 제거됩니다. 그리고 제거된 실행 컨텍스트 다음 항목인 `first()`함수 실행 컨텍스트에 도달합니다.

`first()`함수가 동작을 완료되면 `first()`함수 실행 컨텍스트는 스택에서 제거되고 컨트롤은 전역 실행 컨텍스트에 도달합니다. 모든 코드가 실행되면 Javscript엔진은 전역 실행 컨텍스트를 스택에서 제거합니다.

# 실행 컨텍스트는 어떻게 생성될까요?
지금 까지 Javscript 엔진이 어떻게 실행 컨텍스트를 관리하는지 알아보았습니다. 이제 Javscript 엔진이 어떻게 실행 컨텍스트를 생성하는지 알아보도록 하겠습니다.

실행 컨텍스트는 2 단계를 거쳐 만들어집니다.
1. **생성 단계**(Creation Phase)
2. **실행 단계**(Execution Phase)

## 생성 단계
실행 컨텍스트는 생성 단계에서 만들어 집니다. 생성단계에서는 다음과 같은 일들이 일어납니다.

1. **LexicalEnviroment** 컴포넌트가 생성됨
2. **VariableEnviroment** 컴포넌트가 생성됨

따라서 실행 컨텍스트는 다음과 같이 개념적으로 표현할 수 있습니다.
```js
ExecutionContext = {
  LexicalEnvironment = <ref. to LexicalEnvironment in memory>,
  VariableEnvironment = <ref. to VariableEnvironment in  memory>,
}
```

### Lexical 환경(Lexical Enviroment)
[공식 ES6 문서](http://ecma-international.org/ecma-262/6.0/) Lexical Enviroment를 다음과 같이 정의합니다.

> A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code. A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment.

간단히 이야기해서 *lexical 환경*은 식별자 - 변수(Idetifier - Variable) 매핑을 가지는 구조입니다.

여기서 **식별자**(Identifier)는 변수/함수의 이름을 말하면, **변수**(Variable)는 실제 객체[함수 객체와 배열 객체 포함] 또는 윈시 값에 대한 참조입니다.

아래 코드를 통해 살펴보겠습니다.

```js
var a = 20;
var b = 40;

function foo() {
  console.log('bar');
}
```

위 코드에 대한 lexical 환경은 다음과 같습니다.

```js
lexicalEnvironment = {
  a: 20,
  b: 40,
  foo: <ref. to foo function>
}
```

각 Lexical 환경에는 세가지 요소가 있습니다.
1. 환경 레코드(Enviroment Record)
2. 외부 환경에 대한 참조(Reference to the outer environment)
3. This Binding

#### 환경 레코드(Enviroment Record)
환경 레코드는 Lexical 환경안에 변수와 함수의 선언이 저장되는 공간입니다.

*환경 레코드*에는 두가지 타입이 있습니다.

- **선언 환경 레코드**(Declarative environment record)  
이름에서 알 수 있듯이 변수와 함수 선언도 저장합니다. 함수 코드의 lexical 환경은 선언 환경 레코드를 포함합니다.
- **객체 환경 레코드**(Object environment record)  
변수와 함수 선언과는 별도로 객체 환경 레코드에는 전역 바인딩 객체(브라우저의 경우 window 개체)도 저장됩니다. 따라서 바인딩 오브젝트의 각 속성(브라우저의 경우 브라우저가 window 객체에 제공하는 property들과 method를 포함합니다.)에 대해, 레코드에 새로운 엔트리가 생성됩니다.


**중요** - 함수 코드의 경우 함수에 전달된 index와 전달인자(argument)와 함수에 전달된 매개변수의 길이를 맵핑을 포함하는 `argument` 객체도 환경 레코드에 포함됩니다. 예를 들어, 다음 함수에 대한 전달인자 객체는 다음과 같습니다.

```js
function foo(a, b) {
  var c = a + b;
}
foo(2, 3);
// argument object
Arguments: {0: 2, 1: 3, length: 2},
```

#### 외부 환경에 대한 참조(Reference to the outer environment)
외부 환경에 대한 참조는 외부 Lexical 환경에 접근할 수 있음을 의미합니다. Javascript 엔진이 현재 Lexical 환경에서 변수를 찾을 수 없다면 외부 환경에서 변수를 찾을 수 있습니다.

#### This Binding
이 컴포넌트에서 this의 값은 결정되거나(determined) 설정됩니다(set).

전역 실행 컨텍스트에서 this의 값은 전역 객체를 가르킵니다. (브라우저에서는 `this`가 window객체를 가르킵니다.)

함수 실행 컨텍스트에서 `this`의 값은 함수가 호출되는 방식에 따라 달라집니다. 만약 함수가 객체 참조(called by an object reference)로 호출되면 `this`의 값은 해당 객체로 설정(set)됩니다. 그렇지 않으면 `this`는 전역 객체로 설정되거나 strict모드에서는 undefined로 설정됩니다.

예를 들어
```js
const person = {
  name: 'peter',
  birthYear: 1994,
  calcAge: function() {
    console.log(2018 - this.birthYear);
  }
}
person.calcAge();
// 'calcAge'가 'person'을 객체 참조로 호출되어
// 'this'는 'person'를 가르킵니다.

const calculateAge = person.calcAge;
calculateAge();
// 어떤 객체도 참조로 함수에 주어지지 않아
// `this`는 전역 window객체를 가르킵니다.
```

추상적으로, lexical 환경은 아래 수도코드(pseudocode)와 같습니다.
```js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
    }
    outer: <null>,
    this: <global object>
  }
}
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
    }
    outer: <Global or outer function environment reference>,
    this: <depends on how function is called>
  }
}
```

### 변수 환경 (Variable Enviroment)
또한 이 실행 컨텍스트 내에서 *VariableStatements*에 의해 작성된 바인딩을 보유하는 EnvironmentRecord의 Lexical 환경입니다.

위에 작성한 것과 같이, 변수 환경 역시 Lexical 환경입니다. 따라서 변수환경은 위에서 정의한 Lexical 환경의 모든 특성과 구성요소들을 가지고 있습니다.

ES6에서 LexicalEnviroment의 구성요소와 VariableEnviroment의 구성요소의 한가지 차이점은 전자는 함수 선언 및 변수(`let` and `const`) 바인딩을 저장하는데 사용되고 후자는 변수(`var`) 바인딩만 저장되는데 사용됩니다.


## 실행 단계(Execution Phase)
이 단계에서 모든 변수에 대한 할당이 완료되고 최종적으로 코드가 실행됩니다.

## Example
몇가지 예를 통해 위 계념을 살펴봅시다.
```js
let a = 20;
const b = 30;
var c;
function multiply(e, f) {
 var g = 20;
 return e * f * g;
}
c = multiply(20, 30);
```

위 코드를 실행하면 Javacript 엔진은 전역 실행 컨텍스트를 생성하고 전역 코드를 실행합니다. 따라서 전역 실행 컨텍스트는 생성 단계에서 다음과 같이 나타낼 수 있습니다.

```js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```

실행 단계에서 변수 할당이 완료됩니다. 따라서 실행 단계에서는 전역 실행 컨텍스트는 다음과 같이 표현됩니다.

```js
GlobalExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      a: 20,
      b: 30,
      multiply: < func >
    }
    outer: <null>,
    ThisBinding: <Global Object>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // Identifier bindings go here
      c: undefined,
    }
    outer: <null>,
    ThisBinding: <Global Object>
  }
}
```

`multiply(20, 30)`함수가 호출되면 새로운 함수 실행 컨텍스트가 생성되고 함수 코드를 실행합니다. 생성 단계에서 함수 실행 컨텍스는 다음과 같이 표현 됩니다.

```js
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      g: undefined
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```

위 단계 이후, 실행 컨텍스트는 함수 내부의 변수에 대한 할당이 완료되는 실행 단계를 거치게 됩니다. 따라서 함수 실행 컨텍스트는 실행 단계에서 다음과 같이 표현됩니다.
```js
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      Arguments: {0: 20, 1: 30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>,
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // Identifier bindings go here
      g: 20
    },
    outer: <GlobalLexicalEnvironment>,
    ThisBinding: <Global Object or undefined>
  }
}
```
함수 실행이 완료되면 리턴 값은 `c`에 저장됩니다. 따라서 전역 Lexical 환경은 업데이트 됩니다. 이후, 전역 코드가 실행되고 프로그램이 종료됩니다.

**중요** - 여러분도 눈치챘겠지만 생성 단계중에 `let`과 `const`는 연결된 값이 없는 변수로 정의됩니다. 하지만 `var`는 `undefined`로 설정됩니다.

그 이유는, 생성 단게에서 코드에 변수와 함수 선언이 있는지 스캔하고, 함수 선언이 환경에 통째로 저장되는 동안 변수는 처음에 undefined(`var`의 경우)로 설정되거나 (`let`과 `cosnt`)의 경우 초기화 되지 않은 상태(uninitialized)로 유지되기 때문입니다.

이것이 바로 var는 선언되기 전에 (undefined 이긴 하지만) 변수에 접근할 수 있지만 `const`와 `let`에 접근할때 참조 오류가 발생하는 이유입니다.

이것이 Hoisting 입니다.

**중요** - 실행 단계에서 Javscript 엔진이 소스코드에 선언된 위치 에서 `let`변수의 값을 찾을 수 없는 경우, undefined를 할당 합니다.


# 결론
이 포스팅을 통해 Javscript 프로그램이 내부적으로 어떻게 실행되는지 알아보았습니다. 훌륭한 Javscript 개발자가 되기 위해 이러한 개념을 모두 배울필요는 없지만, 위의 개념을 장 이해하면 Hoisting, Scope, Closure와 같은 다른 개념들을 더 쉽게 깊게 이해할 수 있을겁니다.

내용이 도움이 되었다면 [원문](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)에 👏 버튼을 눌러주시고 자유롭게 코멘트를 남겨주세요.
