---
title: 2178번 미로 탐색
date: "2016-10-15"
category: [BOJ]
tag: [BFS, 백준온라인저지]
---

[2178번 미로 탐색](https://www.acmicpc.net/problem/2178)

(0, 0)에서 (N, M)까지 이동하는 최소 이동수를 구하는 문제이다. bfs로 문제를 풀 수 있다.

전체소스코드

```cpp
#include <cstdio>
#include <queue>
using namespace std;

int N, M;
int map[100][100]={0,};
const int dx[]={-1,1,0,0};
const int dy[]={0,0,1,-1};
void bfs(int x, int y);

int main() {
	scanf("%d %d",&N,&M);
	for(int i = 0 ; i <N ; i++){
		for(int j = 0 ; j < M ; j++){
			scanf("%1d",&map[i][j]);
		}
	}

	map[0][0] = 2;
	bfs(0,0);

	printf("%d\n",map[N-1][M-1]-1);

	return 0;
}

void bfs(int x, int y){
	queue<pair<int, int> > q;
	q.push(make_pair(x,y));

	while(!q.empty()){
		x = q.front().first;
		y = q.front().second;
		q.pop();
		for(int k = 0 ; k < 4; k++){
			int nx = x + dx[k];
			int ny = y + dy[k];
			if(nx < 0 || nx > N-1 || ny < 0 || ny > M-1) continue;
			if(map[nx][ny] == 1){
				q.push(make_pair(nx,ny));
				map[nx][ny]=map[x][y]+1;
			}
		}
	}
}
```

---

## reference
- [2178번 미로 탐색](https://www.acmicpc.net/problem/2178)
- [**위키피디아** 너비 우선 탐색](https://ko.wikipedia.org/wiki/%EB%84%88%EB%B9%84_%EC%9A%B0%EC%84%A0_%ED%83%90%EC%83%89)
