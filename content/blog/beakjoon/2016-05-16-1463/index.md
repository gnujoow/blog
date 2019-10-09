---
title: 1463번 1로 만들기
date: "2016-05-16"
category: [BOJ]
tags: ["다이나믹 프로그래밍", "백준온라인저지"]
---

[1463번 1로 만들기](https://www.acmicpc.net/problem/1463)

이 문제는 어떤 수를 3가지 연산을 통하여 1로 만드는 가장 적은 연산 횟수를 출력하는 문제이다. 연산은 세가지로 나뉜다.

- 3으로 나누기
- 2로 나누기
- 1빼기

이렇게 연산을 하면 같은 수라고 할지라도 여러 경로가 나오게 된다. 이를테면 10을 입력하면 두가지 경로가 나오게 된다.

- 10 -> 5 - > 4 -> 2 -> 1
- 10 -> 9 -> 3 -> 1

따라서 한 수에서 세가지 연산중 길이 제일 짧은 길을 선택해야 한다. 이 문제를 풀때 **top-down** 방식을 선택하여 풀었는데 **top-down** 방식은 큰 문제를 작은 문제로 쪼개고 작은 문제들의 답으로 큰 문제를 푸는 방식이다.

1부터 n까지의 거리를 N이라고 하면 N에서 1까지 가능 경로는 세 연산을 통해 *N-1* , *N/2* , *N/3* 으로 풀 수 있다. 다시 3 문제들은 또 다시 각각 세가지 작은 문제로 나뉘며 반복하면 작은 문제들이 겹치는 현상이 일어난다. 한 번 풀었던 문제는 이미 푼 답(cache)을 참고하여 풀 수 있기 때문에 dynamicProgramming을 사용하여 풀 수 있다.

```c
//2016.05.15
//https://www.acmicpc.net/problem/1463

#include <stdio.h>
#include <stdlib.h>

int N; int *arr;

int check(int n)
{
	if( n == 1) return 0;
	if( arr[n] > 0) return arr[n];
	arr[n] = check(n-1) + 1;

	if(n % 2 == 0){
		int temp = check(n/2) + 1;
		if(arr[n] > temp) arr[n] =temp;
	}
	if(n % 3 == 0){
		int temp = check(n/3) + 1;
		if(arr[n] > temp) arr[n] = temp;
	}

	return arr[n];
}

int main()
{
  scanf("%d",&N);
  arr = (int *)calloc(N+1,sizeof(int));
  check(N);

  printf("%d",arr[N]);
  return 0;
}
```

---

## reference

- [다이나믹 프로그래밍 시작하기 - 스타트링크](https://www.youtube.com/embed/0o2hF-To_6Q)
