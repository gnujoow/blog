---
title: script 태그의 async와 defer 속성
date: "2019-10-05"
category: [js]
description: script 태그의 async속성과 defer속성에 대해서 알아보고 script 요소가 렌더링에 미치는 영향에 대해서 간단하게 알아봅니다.
tags: ["javascript"]
---

일반적으로 `<script>` 요소를 통해서 HTML 파일에 자바스크립트 파일을 포함합니다. `<script>`요소를 이용해 inline으로 자바스크립트를 작성하거나 **src**를 속성에 자바스크립트의 위치를 지정해서 외부 스크립트를 불러올 수 있습니다.

이 포스트에서는 외부 스크립트를 불러올 때 사용할 수 있는 **async**, **defer** 속성에 대해서 알아봅니다.

---

일반적으로 `<script>`는 html의 `<head>`요소 안에 작성합니다. `<script>`를 `<head>`에 작성하면 css 등 외부로부터 불러오는 리소스 파일을 한 군데에서 관리할 수 있는 장점이 있습니다.

```HTML
<!doctype html>
<html>
  <title>title</title>
  <link href="stylesheet.css" rel="stylesheet" type="text/css">
  <script scr="script.js"></script>
  <body>
    ...
  </body>
</html>
```

하지만 위의 방식은 브라우저가 html 렌더링에 영향을 줍니다. 브라우저는 HTML 마크업을 파싱하여 DOM 트리를 구성하고 페이지를 렌더링합니다. HTML을 파싱하는 동안 브라우저는 `<script>`를 만날 때 마다 파싱을 중지하고 스크립트를 로드하고 실행하게 됩니다. 이 과정에서 외부 스크립트를 로드하는 네트워크 왕복 시간, 자바스크립트를 실행하는(evaluate) 시간만큼 렌더링이 지연됩니다.

```HTML
<!doctype html>
<html>
  <title>title</title>
  <style>
    /* css */
  </style>
  <script type="text/javascript">
    /* inline js */
  </script>  <body>
    ...
  </body>
</html>
```
위 같이 작성하면, 외부스크립트를 로드하는 요청이 없어져서 빠르게 렌더링을 할 수 있습니다. 하지만 스크립트를 실행하는 동안 `<body>`의 내용은 사용자에게 보이지 않습니다. 스크립트의 내용이 길어질수록 렌더링은 점점 늦어지게 됩니다.

스크립트가 렌더링을 막는 것을 방지하기 위해 최근 웹에서는 일반적으로 아래와 같이 스크립트를 `<body>`의 맨 아래에 삽입합니다.

```HTML
<!doctype html>
<html>
  <title>title</title>
  <link href="stylesheet.css" rel="stylesheet" type="text/css">
  <body>
    ...
    <script scr="script.js"></script>
  </body>
</html>
```

위와 같이 작성하면 body의 내용이 렌더링 된 이후에 script를 만나 로드하고 실행하기 때문에 위의 코드보다 렌더링 타이밍이 더 빨라지게 됩니다. 스크립트가 DOM을 조작하는 내용을 포함하고 있다면, 스크립트가 렌더링 된 DOM에 접근할 수 있음으로 아래 위치에 작성하는 것이 좋습니다.

# defer
`<script>`는 다운로드와 실행이 순차적으로 진행되는 것과 달리 **defer** 속성을 가진 스크립트는 브라우저가 `<script defer>`를 만났을 때 다운로드를 시작하지만, html 파싱을 막지 않고 `</html>`을 만났을 때 실행됩니다. (**DOMContentLoaded 이벤트 이전에 실행됩니다**) 스크립트를 `<body>`태그의 맨 마지막 줄에 작성하는 것과 같이 스크립트가 DOM을 조작하는 내용을 포함하는 것이 좋습니다. 하지만 [일부 브라우저](https://caniuse.com/#search=defer)에서는 defer속성을 지원하지 않음으로 주의해야합니다.

# async
**async** 속성을 가진 스크립트는 `<script>`, `<script defer>`와 마찬가지로 브라우저가 해당 요소를 만났을 때 외부 스크립트 다운로드를 시작합니다. defer와 마찬가지로 다운로드 중에 HTML 파싱을 막지 않지만 다운로드가 완료되면 즉시 실행하고 실행하는 동안 브라우저는 HTML 파싱을 멈춥니다. async속성의 스크립트에는 DOM을 조작하지 않으며 앞뒤에 로드되고 실행될 스크립트와 의존성이 없는 코드만 포함하는 것이 좋습니다. async속성 역시 [일부 브라우저](https://caniuse.com/#search=defer)에서 지원하지 않음으로 주의해야합니다.


# 결론
![script defer async 로딩 설명](./script_load.png)
(*credit: [growingwiththeweb](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)*)

HTML 문서에서 script의 위치는 매우 중요합니다. 스크립트가 로딩되고 실행되어야하는 시점을 잘 파악하여 적절한 위치에 사용하는것이 좋겠습니다.

---

## Reference
- [2장 HTML 속의 자바스크립트 - **프론트엔드 개발자를 위한 자바스크립트 프로그래밍**](https://coupa.ng/bjijMw)
- [자바스크립트로 상호작용 추가](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)
- [렌더링 차단 자바스크립트 삭제](https://developers.google.com/speed/docs/insights/BlockingJS#FAQ)
- [Efficiently load JavaScript with defer and async](https://flaviocopes.com/javascript-async-defer/)
- [loading thirdp-party js](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript)
- [async vs defer attributes](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)
- [defer scripts and execution order on browsers - **stackoverflow**](https://stackoverflow.com/questions/32413279/defer-scripts-and-execution-order-on-browsers)
- [Deep dive into the murky waters of script loading](https://www.html5rocks.com/en/tutorials/speed/script-loading/)
