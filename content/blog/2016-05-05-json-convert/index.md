---
title: javascript로 현재 페이지 json만들기
date: "2016-05-05"
category: [Dev]
tag: [troubleShooting, javascript, json]
description:
---

ruby gem인 [Rouge](http://rouge.jneen.net/) 사이트에서 `<select>` `<option>`에 있는 프로그래밍언어의 목록을 json으로 만들어야했다. json으로 만들어 놓으면 나중에 rails에서 seed.rb를 이용해서 디비에 값을 저장하기 편하기 때문에...

 nokogiri 같은 젬이나 beautifulSoup같은 파이썬 라이브러리를 사용하는 방법도 있지만 이번에 새로운 방법을 알게되었다. 바로 **javascript**를 이용하는 방법이다.

 ```javascript

 var items = $("select > option").map(function() {
    var ret = new Array();
    var obj = new Object();

    obj.name = $(this).val();
    obj.value= $(this).text();
    ret.push(obj);

    return ret;
}).get();

var jsonInfo = JSON.stringify(items);
console.log(jsonInfo);

```

바로 콘솔창에서 확인할 수 있어 참 편리했다.


---

## reference

 - [stackOverflow Convert array to JSON](http://stackoverflow.com/questions/2295496/convert-array-to-json)
 - [Husk's repository JavaScript 에서 JSON 생성](http://huskdoll.tistory.com/11)
