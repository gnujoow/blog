---
title: json이란 뭘까
date: "2016-07-05"
category: [Dev]
tag: [json]
description:
---

**API** 를 사용하여 데이터를 가져오는 일을 하다보면 `JSON` 혹은 `XML` 이란 단어를 자주 마주하게 된다. `JSON`은 **JavaScript Object Notation** 의 약자로 속성-값 쌍으로 이루어진 데이터 오브젝트를 전달하기 위해 사람이 읽을 수 있는 텍스트를 사용하는 개방형 표준 포맷이다. 이름에 `JavaScript`가 포함되어 있어 `JavaScript`와 관련이 있어보인다. JSON은 [JavaScript Programming Language](http://www.crockford.com/javascript/),[Standard ECMA-262 3rd Edition - December 1999](http://www.ecma-international.org/publications/files/ecma-st/ECMA-262.pdf)일부에 토대를 두고 있다. 하지만 JSON은 언어와 플랫폼에 상관없이 사용할 수 있어 C, C++, C#, Java, JavaScript, Python, Ruby 등등 다양한 환경에서 사용할 수 있다. JSON의 공식 인터넷 미디어 타입은 `application/json`이며, 확장자는 `.json`이다.


## 기본구조

- name / value 형태의 쌍으로 collection 타입.
다양한 언어들에서, object, record, struct(구조체), dictionary, hash table, 키가 있는 list, 또는 연상배열로 실현된다.
- 값들의 순서화된 리스트. 대부분의 언어들에서 array, vector, list 또는 sequence로 실현된다.

## 기본자료형

- 수 (number)
- 문자열 (string)
- 참/거짓 (boolean)
- 배열 (array)
- 객체 (object)

## 예

```json
{
  "이름": "테스트",
  "나이": 25,
  "성별": "여",
  "주소": "서울특별시 양천구 목동",
  "특기": ["농구", "도술"],
  "가족관계": {"#": 2, "아버지": "홍판서", "어머니": "춘섬"},
  "회사": "경기 안양시 만안구 안양7동";
}
```

---

## reference

- [wikipedia](https://ko.wikipedia.org/wiki/JSON)
- [json.org](http://www.json.org/json-ko.html)

---
