---
title: 9507번 Generations of Tribbles
date: "2019-11-11"
category: [BOJ]
tags: ["백준온라인저지"]
---

[1010번 다리놓기](https://www.acmicpc.net/problem/1010)

간단한 수식으로 풀 수 있다.

```cpp
#include <cstdio>

int main(){
	int T;
	scanf("%d",&T);
	while(T--){
		int N, M;
		scanf("%d %d",&N,&M);
		int ret = 1;
		for(int i = 0; i < N ; i++){
			ret = ret*(M-i)/(i+1);
		}
		printf("%d\n",ret);
	}
	return 0;
}
```
