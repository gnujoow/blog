---
title: 11403번 경로 찾기
date: "2016-09-08"
category: [BOJ]
tags: ["플로이드와샬", "floyd-warshall", "백준온라인저지"]
---

[11403번 경로 찾기](https://www.acmicpc.net/problem/11403)

가중치 없는 그래프G에서 모든 정점 i, j에 대해서 i에서 j로 가는 경로가 있는지 없는지 구하는 문제이다.

이 문제는 **플로이드-워셜 알고리즘** 을 사용하면 풀 수 있다.  
i에서 j로 가는 방법은 다음과 같은 방법이 존재한다.

- i에서 j로 곧장 가는 방법
- i에서 임의의 정점 k를 거쳐 j로 가는 방법

문제의 입력을 받을 때 i에서 j로 가는길을 입력받기 때문에 i에서 임의의 점점 k를 거쳐 j로 가는 방법들을 추가해주면 된다.

```cpp
for(int k = 0 ; k < N ; k++){
  for(int i = 0 ; i < N ; i++){
    for(int j = 0 ; j < N ; j++){
      if( map[i][k] && map[k][j]){
        map[i][j] = 1;
      }
    }
  }
}
```

전체소스코드

```cpp
#include <cstdio>
int N;
int map[100][100]={0,};

int main(){
	int temp;
	scanf("%d",&N);
	for(int i = 0 ; i < N ; i++){
		for(int j = 0 ; j < N ; j++){
			scanf("%d", &map[i][j]);
		}
	}

	for(int k = 0 ; k < N ; k++){
		for(int i = 0 ; i < N ; i++){
			for(int j = 0 ; j < N ; j++){
				if( map[i][k] && map[k][j]){
					map[i][j] = 1;
				}
			}
		}
	}

	for(int i = 0 ; i < N ; i++){
		for(int j = 0 ; j < N ; j++){
			printf("%d ", map[i][j]);
		}
		printf("\n");
	}

	return 0;
}
```

---

## reference
- [11403번 경로 찾기](https://www.acmicpc.net/problem/11403)
- [플로이드-워셜 알고리즘 - 위키피디아](https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EC%9B%8C%EC%85%9C_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)
