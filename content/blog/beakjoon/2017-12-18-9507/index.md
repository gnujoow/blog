---
title: 9507번 Generations of Tribbles
date: "2017-12-18"
category: [BOJ]
tag: [dp, DynamicPrograming, 다이나믹프로그래밍, 백준온라인저지]
---

[2178번 Generations of Tribbles](https://www.acmicpc.net/problem/9507)

해당문제는 시간 제한이 2초이므로 [다이나믹프로그래밍](/algo/2016/05/15/Algo0-dynamic-programing/)으로 풀어야한다. 완전 탐색으로 풀 경우 시간이 초과된다.

```cpp
#include <cstdio>

long long koong(int n);
long long num[77];

int main(){
	num[0]=1;
	num[1]=1;
	num[2]=2;
	num[3]=4;

	int n,t;
	scanf("%d",&t);

	while(t--){
		scanf("%d",&n);
		printf("%llu\n",koong(n));
	}

	return 0;
}

long long koong(int n){
	if(num[n] != 0)return num[n];
	num[n] = koong(n-1)+koong(n-2)+koong(n-3)+koong(n-4);
	return num[n];
}
```
