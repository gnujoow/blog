---
title: "[번역]ECMAScript 명세 이해하기, part 1"
date: "2020-02-04"
category: [js]
tags: ["javascript"]
description: ECMAScript 명세를 이해해봅시다.
---

이 포스트는 [Marja Hölttä](https://twitter.com/marjakh)가 V8 블로그에 작성한 **Understanding the ECMAScript spec, part 1**을 번역하였습니다. 원문은 아래 링크에서 확인할 수 있습니다. [https://v8.dev/blog/understanding-ecmascript-part-1](https://v8.dev/blog/understanding-ecmascript-part-1)

원문 포스트는 [**the Creative Commons Attribution 3.0 License**](https://creativecommons.org/licenses/by/3.0/)를 따르고 있으며 자세한 내용은 [링크](https://v8.dev/terms#site-policies)에서 확인할 수 있습니다.

---

이 글에서는 간단한 간단한 함수를 통해 ECMAScript 명세와 표기법을 알아봅니다. 그럼 바로 시작해볼까요?

# 서문

여러분이 JavaScript를 알고 있다고 하더라도 [ECMAScript 언어 명세](https://tc39.es/ecma262/)를 읽는 것은 꽤 힘든 일일 수 있습니다. 적어도 제가 처음 읽기 시작했을 때 이런 느낌을 받았습니다.

구체적인 예를 통해 명세를 살펴보고 이해해보겠습니다. 다음 코드는 `Object.prototype.hasOwnProperty`의 사용법을 안내합니다.
```js
const o = { foo: 1 };
o.hasOwnProperty('foo'); // true
o.hasOwnProperty('bar'); // false
```

위 예에서, 객체 `o`에는 `hasOwnProperty`라는 property가 존재하지 않습니다. 그럼 prototype chain을 한번 살펴보겠습니다. 객체 `o`의 prototype은 `Object.prototype`입니다.

`Object.prototype.hasOwnProperty`의 작동을 설명하기 위해 명세에는 수도코드와 비슷한 방식으로 서술하고 있습니다.

> [Object.prototype.hasOwnProperty(V)](https://tc39.es/ecma262#sec-object.prototype.hasownproperty)
>
> When the hasOwnProperty method is called with argument V, the following steps are taken:
>
> 1. Let P be ? ToPropertyKey(V).
> 2. Let O be ? ToObject(this value).
> 3. Return ? HasOwnProperty(O, P).

...그리고...

> [HasOwnProperty(O, P)](https://tc39.es/ecma262#sec-hasownproperty)
>
>The abstract operation HasOwnProperty is used to determine whether an object has an own property with the specified property key. A Boolean value is returned. The operation is called with arguments O and P where O is the object and P is the property key. This abstract operation performs the following steps:
>
> 1. Assert: Type(O) is Object.
> 1. Assert: IsPropertyKey(P) is true.
> 1. Let desc be ? O.[\[GetOwnProperty]\](P).
> 1. If desc is undefined, return false.
> 1. Return true.

그런데 "abstract operation"이 뭘까요? 그리고 `[[ ]]`안에 있는 것은 무엇일까요? 왜 함수 앞에 물음표가 있을까요? 그리고 assert의 의미는 무엇일까요?

한번 알아봅시다.

# 언어 타입과 명세 타입(Language types and specification types)

우선 친숙한 내용부터 시작해봅시다. 명세에서는 `undefined`, `true` 그리고 `false` 같은 우리가 이미 알고 있는 값들을 사용합니다. 이 값들은 모두 언어 값[(Language values)](https://tc39.es/ecma262/#sec-ecmascript-language-types), 즉 명세가 정의하는 언어 타입(Language Type)의 값입니다.

명세는 내부적으로 언어 값을 사용합니다. 예를 들어 내부 데이터 타입은 가능한 값인 `true` 및 `false`를 담는 필드를 포함할 수 있습니다. 이와 반대로, Javascript 엔진은 일반적으로 내부적으로 언어 값을 사용하지 않습니다. 예를 들어 JavaScript엔진이 C++로 작성된 경우 일반적으로 C++의 `true`, `false`를 사용합니다.(Javascript의 `true`, `false`의 내부 표현이 아닙니다.)

언어 타입 이외에도 명세에는 명세에만 존재하는 사양 타입[(specification Type)](https://tc39.es/ecma262/#sec-ecmascript-specification-types)을 사용합니다. 이 사양 타입은 Javascript 언어에는 존재하지 않습니다. JavaScript 엔진은 이것들을 구현할 필요는 없지만 (혹은 자유롭게) 구현할 수 있습니다.

이 블로그 포스트에서는 사양 타입 레코드(와 이것의 하위 유형 레코드(subtype Completion Record))에 대해 알아 보겠습니다.

# 추상 연산자(Abstract operations)

[추상 연산자(Abstract operations)](https://tc39.es/ecma262/#sec-abstract-operations)는 ECMAScript 명세에 정의되어있는 함수들입니다. 추상 연산자는 명세를 간결하게 작성하기 위해 정의되었습니다. JavaScript 엔진은 추상 연산자를 엔진 내부의 별도의 함수로 구현할 필요 없으며 Javascript에서 직접 호출 할 수 없습니다.

# 내부 슬롯과 내부 메소드 (Internal slots and internal methods)
[내부 슬롯과 내부 메소드(Internal slots and internal methods)](https://tc39.es/ecma262/#sec-object-internal-methods-and-internal-slots)의 이름은 `[[ ]]`로 감싸져 있습니다.

내부 슬롯은 JavaScript 객체 또는 사양 타입의 데이터 멤버입니다. 내부 슬롯은 객체의 상태를 저장하는데 사용됩니다. 내부 메소드는 JavaScript 객체의 멤버 함수 입니다.

예를 들어 모든 Javascript 객체는 내부 슬롯 `[[Prototype]]`과 내부 메소드 `[[GetOwnProperty]]`를 가지고 있습니다.

내부 슬롯과 메소드는 자바스크립트에서 접근할 수 없습니다. 이를테면 `o.[[Prototype]]`에 접근하거나 `o.[[GetOwnProperty]]()`를 호출 할 수 없습니다. Javascript엔진은 엔진 내부에서 사용을 위해 구현할 수 있지만 반드시 그럴 필요는 없습니다.

가끔 내부 메소드는 일반적인 객체의 `[[GetOwnProperty]]`와 같이 비슷한 이름의 추상 연산자를 위임합니다.

>[\[[GetOwnProperty]\](P)](https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-getownproperty-p)
>
>When the [[GetOwnProperty]] internal method of O is called with property key P, the following steps are taken:
>
>Return ! OrdinaryGetOwnProperty(O, P).

(느낌표가 의미하는 것이 무엇인지 다음 챕터에서 살펴보겠습니다.)

`OrdinaryGetOwnProperty`는 어느 객체와 연결되어 있지 않으므로 내부 메서드가 아닙니다. 대신 작동하는 객체가 매개 변수로 전달됩니다.

`OrdinaryGetOwnProperty`는 일반 객체(ordinary object)와 함께 작동하므로 "ordinary"라는 이름이 붙었습니다. ECMAScript에서 객체는 일반적인 객체와 예외(exotic) 객체가 있습니다. 일반적인 객체는 **필수 내부 메소드(essential internal method)**인 메소드 집합에 대해 기본동작을 가져야합니다. 만약 객체의 기본동작과 다르다면 일반적인 객체가 아닌 예외 객체 입니다.

가장 잘 알려진 예외행동을 하는 객체는 **배열(Array)**입니다. length 프로퍼티가 기본값이 아닌 방식으로 작동하기 때문입니다. 배열에서 length 프로퍼티 값을 변경하면 배열에서 요소를 제거할 수 있습니다.

필수 내부 머소드는 [링크](https://tc39.es/ecma262/#table-5)에서 확인할 수 있습니다.

# 완성 레코드(Completion record)

느낌표가 의미하는 것이 무엇일까요? 여기에 답하기 위해서 [**Completion Record**](https://tc39.es/ecma262/#sec-completion-record-specification-type)에 대해 알아봅시다.

완성 레코드는 명세에서만 사용되는 타입입니다. Javscript 엔진은 이와 관련된 내부 데이터 타입을 가질필요 없습니다. 

완성 레코드는 "record"입니다. 완성 레코드에는 지정된 필드집합이 있는 세 가지 데이터 타입이 존재합니다.

| 이름 | 설명 | 
|:-:|-----|
| [\[Type\]]    | normal, break, continue, return, 혹은 throw  중에 하나, **normal**을 제외한 모든 다른 타입들은 **abrupt completion**입니다. | 
| [\[Value\]]   | completion이 발생할때 생성된 값, 예를 들어 함수의 return값 혹은 exception 값 (하나일 경우) | 
| [\[Target\]]  | 지시된 제어 전송에 사용됨 | 

모든 추상 연산자는 암시적으로 완성 레코드를 반환합니다. 추상 연산자가 Boolean 타입과 같은 간단한 타입을 반환하는 것처럼 보일지라도 암시적으로 normal타입의 완성 레코드로 감싸집니다.

([Implicit Completion Values](https://tc39.es/ecma262/#sec-implicit-completion-values) 보기).

**중요 1.** 명세는 이와 관련하여 완벽하게 일관되지 않습니다. 완성 레코드에서 값을 추출하지 않고 bare value를 반환하고 반환된 값을 그대로 사용하는 일부 헬퍼 함수들이 있습니다. 이것은 일반적으로 컨텍스트가 명확합니다.

**중요 2.** 명세 편집자는 완성 레코드 처리를 좀 더 명시적으로 작성하려고 합니다.

알고리즘에서 예외가 발생하면 `[[Value]]`가 예외 객체 인 `[[Type]]` throw와 함께 완성 레코드를 반환하는 것을 의미합니다. `break`, `continue` 그리고 `return` 타입은 잠시 무시하겠습니다.

[ReturnIfAbrupt(argument)](https://tc39.es/ecma262/#sec-returnifabrupt)는 다음 절차를 밟는것을 의미합니다.

> 1. If argument is abrupt, return argument
> 2. Set argument to argument.[\[Value\]]

즉 완성 레코드를 검사합니다. **abrupt completion** 인 경우 즉시 반환합니다. 그렇지 않으면 완성 레코드에서 값을 추출합니다.

`ReturnIfAbrupt`는 함수호출처럼 보이지만 그렇지 않습니다. `ReturnIfAbrupt()`자체를 반환하지 않고 `ReturnIfAbrupt()`가 발생한 함수를 반환합니다. C언어와 같은 언어에서 macro처럼 동작합니다.

`ReturnIfAbrupt`는 다음과 같이 사용할 수 있습니다.

> 1. Let obj be Foo(). (obj is a Completion Record.)
> 1. ReturnIfAbrupt(obj).
> 1. Bar(obj). (If we’re still here, obj is the value extracted from the Completion Record.)

이제 [물음표](https://tc39.es/ecma262/#sec-returnifabrupt-shorthands) 대해서 알아볼 차례입니다. `? FOO()`는 `ReturnIfAbrupt(Foo())`와 같습니다. `?` 와 같이 기호를 사용하여 표기하면, 에러 핸들링 코드를 매번마다 적을 필요 없습니다. 실용적이죠?

이와 비슷하게, `Let val be ! Foo()`은 다음과 같습니다.

> 1. Let val be Foo().
> 1. Assert: val is not an abrupt completion.
> 1. Set val to val.[[Value]].

위 내용을 가지고 `Object.prototype.hasOwnProperty`를 아래와 같이 다시 작성할 수 있습니다.

> **Object.prototype.hasOwnProperty(V)**
>
> 1. Let P be ToPropertyKey(V).
> 1. If P is an abrupt completion, return P
> 1. Set P to P.[[Value]]
> 1. Let O be ToObject(this value).
> 1. If O is an abrupt completion, return O
> 1. Set O to O.[[Value]]
> 1. Let temp be HasOwnProperty(O, P).
> 1. If temp is an abrupt completion, return temp
> 1. Let temp be temp.[[Value]]
> 1. Return NormalCompletion(temp)

...그리고 `HasOwnProperty`는 아래와 같이 다시 작성할 수 있습니다.

> **HasOwnProperty(O, P)**
>
> 1. Assert: Type(O) is Object.
> 1. Assert: IsPropertyKey(P) is true.
> 1. Let desc be O.[[GetOwnProperty]](P).
> 1. If desc is an abrupt completion, return desc
> 1. Set desc to desc.[[Value]]
> 1. If desc is undefined, return NormalCompletion(false).
> 1. Return NormalCompletion(true).

`[[GetOwnProperty]]` 내부 메소드를 느낌표 없이 작성하면 다음과 같습니다.

> **O.[[GetOwnProperty]]**
>
> 1. Let temp be OrdinaryGetOwnProperty(O, P).
> 1. Assert: temp is not an abrupt completion.
> 1. Let temp be temp.[[Value]].
> 1. Return NormalCompletion(temp).

여기서 `temp`는 어느것과도 충돌하지 않는 완선 새로운 변수라고 가정하겠습니다.

반환문(return statement)이 완성 레코드가 아닌 다른 것을 반환할 때 `NormalCompletion` 안에 감싸진다는 것을 알고 있습니다.

## 번외: `Return ? Foo()`

명세에서는 `Return ? Foo()`같은 표기법을 사용합니다. 여기에 왜 물음표가 있을까요?

`Return ? Foo()`를 풀어서 작성하면 다음과 같습니다. 

> 1. Let temp be Foo().
> 1. If temp is an abrupt completion, return temp.
> 1. Set temp to temp.[[Value]].
> 1. Return NormalCompletion(temp).

이 표현은 `Return Foo()`와 동일합니다. 이것은 abrupt와 normal completion에 모두 같은 방식으로 작동합니다.

`Return ? Foo()`는 완성 레코드를 반환하는 것을 더울 분명하게 하기 위해 편집상의 이유로 표기되었습니다.

# Assert
명세에서 Assert는 알고리즘의 불변 조건을 이야기합니다. Asserts는 명확성을 위해 추가된 것일 뿐 구현에는 아무런 요구사항을 추가하지 않습니다. 구현할 떄에는 확인하지 않아도 됩니다.

# 마치며
명세를 읽는 데 필요한 `Object.prototype.hasOwnProperty`와 같은 간단한 메소드와 `HasOwnProperty`와 같은 추상 연산자에 대해 알아보았습니다. 다른 추상 연산자들이 더 존재하지만, 이 포스팅을 통해 해당 연산자들이 어떤 동작을 하는지 알 수 있을 겁니다. 다음에는 명세 타입인 Property Descriptor에 대해서 알아보겠습니다.

![Object.prototype.hasOwnProperty의 함수 호출 그래프](https://v8.dev/_img/understanding-ecmascript-part-1/call-graph.svg)
`Object.prototype.hasOwnProperty`의 함수 호출 그래프

# 유용한 링크
[How To Read the ECMA Specification](https://timothygu.me/es-howto/): 이 포스팅에서 다루고 있는 대부분의 내용을 약간 다른 각도로 바라보고 작성된 튜토리얼입니다. 

---

원문 [https://v8.dev/blog/understanding-ecmascript-part-1](https://v8.dev/blog/understanding-ecmascript-part-1)

원저자 [Marja Hölttä](https://twitter.com/marjakh)