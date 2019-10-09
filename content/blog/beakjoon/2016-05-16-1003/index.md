---
title: 1003번 피보나치 함수
date: "2016-05-16"
category: [BOJ]
tags: ["다이나믹 프로그래밍", "백준온라인저지"]
---

[1003번 피보나치 함수](https://www.acmicpc.net/problem/1003)

피보나치 함수문제이다. 피보나치수를 구하는 방법은 여러가지가 있다. 대표적으로 재귀적으로 피보나치수를 구하는 방법이 있고, 다이나믹프로그래밍을 이용하는 방법이 있다. 다이나믹프로그래밍으로 구할 수 있는 이유는 큰 수를 구할 때 작은 수들의 합으로 표현되고 작은 수들이 여러번 사용되기 때문이다. 이 문제를 재귀 적으로 풀면 다음과 같다.

```c
#include <stdio.h>
#include <stdlib.h>

int zero, one;

int fibonacci(int n){
    if (n == 0){
        zero ++;
        return 0;
    }
    else if(n == 1 ){
        one ++;
        return 1;
    }
    else
        return fibonacci(n-1) + fibonacci(n-2);
}

int main ()
{
    int T; //testCase
    scanf("%d",&T);

    for(int i = 0 ; i < T ;i++){
        zero = 0; one =0;
        int temp;

        scanf("%d", &temp);
        fibonacci(temp);
        printf("%d %d\n",zero,one);
    }

    return 0;
}
```
> 메모리 944kb 시간 1576ms

`fibonacci(0)`과 `fibonacci(1)`이 호출 될 때마다. 전역 변수를 증가시키는 방법으로 풀었다. 가장 먼저 떠오른 방법이고 수가 너무 크지않다면 문제없다.

출력되는 결과를 살펴보면 규칙을 찾을 수 있는데

n   | fibonacci(0)호출  | fibonacci(1)호출 |
:--:|:----------------:|:---------------:|
0   | 1	  | 0 |
1   | 0	  |	1	|
2	  | 1	  | 1	|
3	  | 1 	| 2	|
4	  | 2   | 3 |
5	  | 3 	| 5 |

가 된다. 이를 정리하면 점화식$D[n] = D[n-1] + D[n-2]$ 를 구할 수 있다. 이를 이용하여 코드를 작성하면 아래와 같다.

```c
#include <stdio.h>
#include <stdlib.h>

int memo[40] = {1,1,};

int fibonacci(int n){
	if ( n <= 1) return memo[n];
	else {
		if(memo[n] > 0) return memo[n];
	}
	return memo[n] = fibonacci(n-1) + fibonacci(n-2);
}

int main ()
{
	int T; //testCase
	scanf("%d",&T);

	for(int i = 0 ; i < T ;i++){
		int temp;
		scanf("%d", &temp);

		if (temp == 0) printf("1 0\n");
		else if(temp == 1) printf("0 1\n");
		else{
			fibonacci(temp);
			printf("%d %d\n",memo[temp-2],memo[temp-1]);
		}
	}

	return 0;
}
```
> 메모리 944KB 시간 0MS

위의 재귀함수로 풀었을 때와 동적계획법으로 푼 결과가 시간 차이가 크게 나는 것을 확인할 수 있다.


---

## reference

- [다이나믹 프로그래밍 시작하기 - 스타트링크](https://www.youtube.com/embed/0o2hF-To_6Q)
