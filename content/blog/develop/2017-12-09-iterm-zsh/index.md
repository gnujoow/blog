---
title: iterm과 zsh를 설치해보자.
date: "2016-12-09"
category: [DEV]
tag: [iterm, zsh]
thread: [jekyll-tutorial]
description: 터미널을 더 간편하게 사용할 수 있게 도와주는 도구들을 설치해보자.
---

프로그래머가 나오는 영화나 드라마를 보면 프로그래머가 검은화면에서 알 수 없는 명령어를 입력하는것을 볼 수 있다.

![programmer](https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif)
> https://gph.is/YeaoHh

이런 환경을 CLI(**command line interface**)라고 하는데 우리에게 익숙한 GUI(**graphic user interface**)와 다른게 *텍스트 터미널* 을 통해 사용자와 컴퓨터가 상호작용하는 인터페이스를 말한다. 키보드를 통해 명령어를 입력하면 이에 대한 출력이 텍스트 형식으로 나타나게 된다.

이와 같은 인터페이스를 제공하는 프로그램을 명렁어 해석기(**Command Line Interpreter**) 또는 쉘(**Shell**)이라고 한다. 일반적으로 쉘이라는 용어가 더 자주 쓰인다.

이번 포스팅에서는 OSX에서 iterm을 설치하고 zsh를 설치하여 좀더 편안한 환경에서 CLI를 사용할 수 있도록 세팅을 해보자.

---

기본적으로 osx에는 bash shell과 terminal이 설치되어있는데 두 도구로도 충분히 cli를 사용하는데 무리 없지만 iterm과 zsh에서 제공하는 기능들이 cli를 더 편한하게 만들어 준다. :)  

---

## iterm 설치하기

[iterm 홈페이지](https://www.iterm2.com/)에 접속하면 **Download** 메뉴에서 다운로드를 할 수 있다. 다운로드가 완료되면 iterm을 **application** 폴더로 옮겨주면 된다.

---

## iterm 설정하기
`command + ,`키 혹은 메뉴에서 *preference* 를 클릭하면 iterm을 설정 할 수 있는 메뉴가 나온다.

![예1](./iterm0.png)
**profile** > **general** 탭에서 **working Directory** 를 **Reuse previous session's Directory** 로 설정하자. iterm에서는 화면 분활을 자주 사용하게 된다.  
이전 세션에서 작업하던 위치에서 시작하기 위해서 위와 같이 설정하면 편리하다.
![예1](./iterm1.png)
**Window** 탭에서 **Transparency** 값을 주면 터미널 뒤의 화면이 보이기 때문에 다른 사람이 올려놓은 코드를 참고하면서 작업을 할 때 편리하다.

그 밖에도 여러 설정을 살펴보고 자기 입맛에 맞는 설정으로 설정하면 된다.

---

# homebrew 설치하기
zsh을 설치하기 위해서는 패키지 관리자인 **Homebrew** 가 설치되어있어야 한다. 다음 명령어를 입력해서 brew가 설치되어있는지 확인할 수 있다.


```shell
$ brew -v
```

위 명령어를 입력했을때 Homebrew의 버전이 출력됫다면 hombrew가 설치되어있다는 뜻이다. Homebrew가 설치되어있지 않다면 다음 명령어를 통해서 homebrew를 설치 할 수 있다.  

```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

[homebrew 홈페이지](https://brew.sh/index_ko.html)에 homebrew에 대해 자세히 설명되어있다.

homebrew설치를 완료하였다면 `brew -v`명령어를 다시 입력해서 설치 완료를 확인 할 수 있다.

---

# zsh 설치하기

다음 명령어를 통해 zsh를 설치 할 수 있다.

```shell
$ brew install zsh
```

zsh설치가 완료되었다면 다음 명령어로 zsh의 위치를 확인 할 수 있다.

```shell
$ which zsh
```

이제 기본 쉘을 zsh로 변경해줘야한다. 다음 명령어로 기본쉘을 확인할 수 있다.
```shell
$ echo $SHELL
```

기본쉘을 변경하기 위해서는 다음 명령어를 입력하면된다.

```shell
$ chsh -s `which zsh`
```

쉘 변경을 위해서는 터미널을 종료하고 재시쟉해야한다. 터미널을 재 시작한 후 `echo $SHELL`명령어를 통해 기본쉘이 zsh로 변경되었는지 확인해보자.

만약 zsh로 변경되지 않았다면 **시스템환경 설정** > **사용자 및 그룹** 에서 설정 해주어야한다. 설정을 변경하기 위해 자물쇠 아이콘을 클릭한 후 비밀번호를 입력하고 현재 사용자이름을 **control** 키를 누를 상태로 클릭해준다. 그리고 **고급옵션** 을 클릭한다.
![예1](./setting0.png)

고급설정의 로그인 쉘 입력장에 `which zsh` 명령어의 출력값을 입력하면 된다.

터미널을 종료하고 다시 실행하면 기본쉘이 zsh로 변경된다.

---

# oh my zsh 설치하기

```shell
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

oh my zsh에 대한 자세한 정보는 [홈페이지](http://ohmyz.sh/)에서 확인 할 수 있다.

---

## reference
- [터미널 초보의 필수품인 Oh My ZSH!를 사용하자](https://nolboo.kim/blog/2015/08/21/oh-my-zsh/)
