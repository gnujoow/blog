---
title: 7576번 토마토
date: "2016-04-15"
category: [BOJ]
tag: [BFS, queue, c, 넓이우선탐색]
---

[7576번 토마토](https://www.acmicpc.net/problem/7576)

bfs문제인 토마토 동적할당으로 풀었으면 메모리 사용을 좀 더 줄일 수 있었을것 같다.


```cpp:title=src/util/alert.js
//https://www.acmicpc.net/problem/7576
//2016.04.15

#include <stdio.h>
#define test 0
void show();

int M, N;//x ,y
int time = 1;
int tomato = 0;

int map[1001][1001] = {0,};
int q[1002001][2];
int front=0, rear=0;
const int di[] = { -1, 1, 0, 0 };
const int dj[] = { 0, 0, 1, -1 };

int main(){
#if test
	freopen("input.txt", "r", stdin);
#endif
	scanf("%d %d",&M,&N);
	for (int y = 0 ; y < N ; y++){
		for(int x = 0 ; x < M ; x++){
			scanf("%d",&map[y][x]);
			if(map[y][x] == 0 || map[y][x] == 1){
				tomato ++;
				if(map[y][x] == 1){
					q[front][0]  = x;
					q[front++][1] = y;
				}
			}
		}
	}

	while(!(front == rear)){
		int tempx = q[rear][0];
		int tempy = q[rear++][1];
		tomato--;
		for(int i = 0 ; i < 4 ; i++){
			int x = tempx + di[i];
			int y = tempy + dj[i];

			if( x < 0 || x > M -1|| y < 0 || y > N -1)continue;
			if(map[y][x] == 0){
				map[y][x] = map[tempy][tempx] +1;
				if(time < map[y][x])time = map[y][x];
				q[front][0]  = x;
				q[front++][1] = y;
			}
		}
#if test
		show();
#endif
	}
	if(tomato == 0)
		printf("%d\n",time-1);
	else
		printf("%d\n",-1);
	return 0;
}

void show(){
	printf("------- %d  %d---------\n",time,tomato);
	for(int i  =0 ; i < N ; i++)
	{
		for(int j = 0 ; j < M ; j++)
			printf("%d ",map[i][j]);

		printf("\n");
	}
}
```


# 3차원 토마토

[7569번 토마토](https://www.acmicpc.net/problem/7569)

같은 방법으로 푼다. 주의 할 점은 선형 queue를 사용할 경우 사이즈가 너무 커진다는 점을 유의 해야한다.

```c
#include <stdio.h>
#define size 101*101*101

int q[size][3] = { 0, };

int main() {
	int M, N, H;
	int map[101][101][101] = { 0, };
	int tomato = 0;

	const int nx[6] = { 1, -1, 0 , 0, 0, 0 };
	const int ny[6] = { 0, 0, 1 , -1, 0, 0 };
	const int nz[6] = { 0, 0, 0 , 0, 1, -1 };
	int front = 0, rear = 0;

	int time = 0;

	scanf("%d %d %d", &M, &N, &H);
	for (int z = 0; z < H; z++) {
		for (int y = 0; y < N; y++) {
			for (int x = 0; x < M; x++) {
				scanf("%d", &map[z][y][x]);
				if (map[z][y][x] == 0 || map[z][y][x] == 1) {
					tomato++;
					if (map[z][y][x] == 1) {
						q[front][0] = x;
						q[front][1] = y;
						q[front++][2] = z;
					}
				}
			}
		}
	}

	while (!(front == rear)) {
		int tempX = q[rear][0];
		int tempY = q[rear][1];
		int tempZ = q[rear++][2];
		tomato--;
		for (int i = 0; i < 6; i++) {
			int x = tempX + nx[i];
			int y = tempY + ny[i];
			int z = tempZ + nz[i];

			if (x< 0 || y < 0 || z < 0 || x > M - 1 || y > N - 1 || z > H - 1)continue;

			if (map[z][y][x] == 0) {
				map[z][y][x] = map[tempZ][tempY][tempX] + 1;

				q[front][0] = x;
				q[front][1] = y;
				q[front++][2] = z;

				if (time < map[z][y][x]) time = map[z][y][x];
			}
		}
	}
	if (tomato == 0) {
		printf("%d\n", time - 1);
	}
	else
		printf("%d\n", -1);
	return 0;
}

```
