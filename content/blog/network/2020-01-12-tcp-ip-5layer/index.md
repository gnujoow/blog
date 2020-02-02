---
title: TCP/IP 5계층 네트워크 모델에 대해서 알아보자.
date: "2020-01-12"
category: [Network]
tags: ["Network", "TCP/IP"]
description: TCP/IP 5계층 네트워크 모델에 대해서 알아보고 각 계층의 요소들이 어떤일을 하는지 살펴보자.
---

컴퓨터 네트워크에는 컴퓨터 뿐만 아니라 각종 기기들이 연결되어 네트워크를 이루는데, 이때 각 요소(Network Component)의 역할들을 이해하기 쉽게 **추상화**한 것을 네트워크 모델(Network Model)이라고 합니다. 네트워크가 어떻게 구성되고 각 요소들이 어떻게 통신하는지 설명하는 모델은 여러가지가 있지만 **TCP/IP 5계층**에 대해서 알아봅시다.

| #  | Layer Name | Protocol | Protocol Data Unit | Addressing |
|:-:|:-:|:-:|:-:|:-:|
| 5 | **Application** | HTTP, SMTP, 등등 | Message | n/a |
| 4 | **Transport** | TCP/UDP | Segment | Port # |
| 3 | **Network** | IP | Datagram | IP adress |
| 2 | **Data Link** | Ethernet, Wi-Fi | Frames | MAC adress |
| 1 | **Physical** | 10 Base T, 802.11 | Bits | n/a |


## 물리 계층 (Physical layer)
물리 계층은 말 그대로 컴퓨터와 컴퓨터를 연결하는 물리적 장치를 의미합니다. 물리계층에는 네트워크 케이블의 사양(specification)뿐만 아니라 데이터가 전송되는 방식도 포합됩니다.

## 데이터 링크 계층 (Data Link)
데이터 링크계층에서는 물리계층에서 수신되는 신호들을 해석하는 방법을 정의합니다. 데이터 링크 계층에는 많은 프로토콜이 있지만 가장 가장 널리쓰이는 프로토콜은 이더넷(Ethernet)입니다. Wi-Fi같은 프로토콜도 데이터 링크 계층에 속합니다.

## 네트워크 계층 (Network)
네트워크 계층은 라우터(Router)라는 장치를 통해 서로 다른 네트워크가 서로 통신 할 수 있도록 만드는 계층입니다. 대표적으로 라우터로 함께 연결된 네트워크 모음이 우리가 알고 있는 인터넷이며, 네트워크 계층을 종종 인터넷 계층이라고도 부릅니다.

네트워크 계층에서 가장 많이 사용되는 프로토콜은 IP(Internet Protocol)입니다.

## 전송 계층 (Transport)
네트워크 계층은 두 개의 개별 노드간 데이터를 전송하는 방법을 나타냅니다. 전송 계층에서는 특정 클라이언트와 서버 프로그램사이에 데이터 통신을 제공합니다.
> RFC 1122, §1.1.3. "The transport layer provides end-to-end communication services for applications."

가장 널리 알려진 프로토콜은 TCP(Transmission Control Protocol)입니다. 흔히들 TCP와 IP를 같이 묶어서 TCP/IP라는 하나의 용어로 많이 사용되는데, 각각은 다른 계층에서 다른 목적을 가진 프로토콜입니다.

전송 계층에서 많이 사용되는 프로토콜로는 UDP가 있습니다. 두 프로토콜간 차이는 나중에 따로 정리해보도록 하겠습니다.

## 어플리케이션 계층 혹은 (Application)
마지막 계층은 어플리케이션 계층입니다. 이름에서 알 수 있듯이 이 계층은 어플리케이션 마다 다양한 프로토콜이 존재합니다.

---

이번 포스팅에서는 Coursera강의 [The Bits and Bytes of Computer Networking](https://www.coursera.org/learn/computer-networking/lecture/BTLgy/the-tcp-ip-five-layer-network-model)의 1주차 강의중 [The TCP/IP Five-Layer Network Model](https://www.coursera.org/learn/computer-networking/lecture/BTLgy/the-tcp-ip-five-layer-network-model)를 보고 내용을 정리해보았습니다.

---

### reference
- [OSI 모형(Open Systems Interconnection Reference Model)](https://ko.wikipedia.org/wiki/OSI_%EB%AA%A8%ED%98%95)
- [Internet Protocol Suite](https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%EB%84%B7_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C_%EC%8A%A4%EC%9C%84%ED%8A%B8)
