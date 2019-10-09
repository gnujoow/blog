---
title: 1932번 숫자삼각형
date: "2016-09-08"
category: [BOJ]
tags: ["다이나믹 프로그래밍", "백준온라인저지"]
---

[1932번 숫자삼각형](https://www.acmicpc.net/problem/1932)

문제의 주어진 삼각형에서 꼭대기에서 한칸씩 내려오며 방문한 점들 합의 최대값을 구하는 문제이다. 윗 층에서 아래층으로 내려갈 때 **왼쪽 대각선** 혹은 **오른쪽 대각선** 으로만 이동할 수 있다.

이 문제는 [다이나믹프로그래밍](/algo/2016/05/15/Algo0-dynamic-programing/)으로 풀 수 있다. 우선 문제의 예시로 주어진 삼각형은 다음과 같다.

```
          7
        3   8
      8   1   0
    2   7   4   4
  4   5   2   6   5
```

위 삼각형을 2차원 배열로 나타내면 아래와 같이 나타낼 수 있는데

|행/열| 0 | 1 | 2 | 3 | 4 |
|:--:|:-:|:-:|:-:|:-:|:-:|
| 0  | 7 |
| 1  | 3 | 8 |
| 2  | 8 | 1 | 0 |
| 3  | 2 | 7 | 4 | 4 |
| 4  | 4 | 5 | 2 | 6 | 5 |   

행렬에서 아래층 이동은 **`num[행][열]` > `num[행 + 1][열]` 혹은 `num[행][열]` > `num[행 + 1][열 + 1]`** 이 된다.  
이동하면서 최대값이 저장될 배열 `ret`를 선언하고 `num[행][열]`까지의 최대값을 `ret[행][열]`에 저장한다.

이렇게 이전 단계의 답을 다음단계의 답을 구하는데 활용할 수 있으므로 다이나믹 프로그래밍으로 풀 수 있다.

```cpp
ret[0][0] = num[0][0];
for(int i = 0 ; i < N-1 ; i++){
  for(int j=0; j <i + 1 ;j++){
    if( ret[i+1][j] < ret[i][j] + num[i+1][j]) // 왼쪽 대각선 이동
      ret[i+1][j] = ret[i][j] + num[i+1][j];
    if( ret[i+1][j+1] < ret[i][j] + num[i+1][j+1]) // 오른쪽 대각선 이동
      ret[i+1][j+1] = ret[i][j] + num[i+1][j+1];
  }
}
```


전체 소스코드
```c
#include <cstdio>

int main(){
	int N;
	long long num[501][501]={0,};
	long long ret[501][501]={0,};
	scanf("%d",&N);

	for(int i = 0 ; i < N ; i++){
		for(int j=0; j <i + 1 ;j++){
			scanf("%lld",&num[i][j]);
		}
	}

	ret[0][0] = num[0][0];
	for(int i = 0 ; i < N-1 ; i++){
		for(int j=0; j <i + 1 ;j++){
			if( ret[i+1][j] < ret[i][j] + num[i+1][j])
				ret[i+1][j] = ret[i][j] + num[i+1][j];
			if( ret[i+1][j+1] < ret[i][j] + num[i+1][j+1])
				ret[i+1][j+1] = ret[i][j] + num[i+1][j+1];
		}
	}

	long long max = 0;
	for(int i = 0 ; i < N ; i++){
		if(ret[N-1][i] > max)
			max = ret[N-1][i] ;
	}
	printf("%lld\n",max);

	return 0;
}
```

---

## reference
- [1932번 숫자삼각형](https://www.acmicpc.net/problem/1932)
- [동적계획법 - 나무위키](https://namu.wiki/w/%EB%8F%99%EC%A0%81%20%EA%B3%84%ED%9A%8D%EB%B2%95)
- [다이나믹 프로그래밍 시작하기 - 스타트링크](https://www.youtube.com/embed/0o2hF-To_6Q)
