---
title: '[MEV Series]#3: Censorship Resistance Solutions & Builder Centralization'
tags:
  - ethereum
published: true
date: 2025-08-11 13:14:20
description: '검열 저항을 위한 이더리움의 프로토콜 단에서 로드맵인 PBS(Proposer Builder Separation)와 crLists(censorship resistant List)에 대해 알아보고, 이후 발생할 수 있는 Builder 중앙화와 Flashbots의 SUAVE에 대해 간략히 알아봅니다.'
---

**검열 저항을 위한 이더리움의 프로토콜 단에서 로드맵인 PBS(Proposer Builder Separation)와 crLists(censorship resistant List)에 대해 알아보고, 이후 발생할 수 있는 Builder 중앙화와 Flashbots의 SUAVE에 대해 간략히 알아봅니다.**

🔗 [\[MEV Series\]#3: Censorship Resistance Solutions \&amp; Builder Centralization](https://medium.com/decipher-media/mev-series-3-censorship-resistance-solutions-builder-centralization-44d194089633)

Author: [web3vibe](https://twitter.com/web3vibe/)\
Reviewer: [Yohan Lim](http://normalmangrc/)

서울대학교 블록체인 학회 디사이퍼(Decipher) After the merge 팀에서 이더리움의 로드맵 중 하나인 MEV에 대한 글을 시리즈로 연재합니다. 본 글은 MEV 시리즈의 3편으로, 다른 편을 읽고 싶으시다면 아래의 리스트를 확인해주십시오.

1편: [Overview of MEV and Strategies to Reduce the Negative Impacts of MEV](https://medium.com/@rejamong/mev-series-1-overview-of-mev-and-strategies-to-reduce-the-negative-impacts-of-mev-247294dcb693)\
2편: [MEV-Boost &amp; Censorship](https://medium.com/@JwagmiB/mev-series-2-mev-boost-censorship-a0bf00b6f1fe)\
3편: Censorship Resistance Solutions & Builder Centralization

![](6f1f7a-x-GNlHG0VZRLicOhR5mJ_g.png)

# 1. 들어가며

이 글의 전편에서 MEV의 탈중앙화를 위해 플래시봇 팀이 개발한 MEV-Boost 솔루션과 최근 화두가 되는 OFAC의 제재에 의한 트랜잭션 검열, 그리고 검열을 방지하기 위한 여러 방안에 대해 알아보았다. 앞서 언급했던 바와 같이 검열 저항을 위한 다양한 서드파티 솔루션(MEV-Boost 릴레이)들의 노력이 이루어지고 있지만, 결국 근본적으로 이더리움 네트워크라는 자체적인 프로토콜 레벨에서 이를 해결할 방안이 제시되어야 한다. 따라서, 그중 최근 비탈릭 또한 로드맵에서 업데이트한 ‘The Scourge’ 파트에서 찾아볼 수 있는 PBS(Proposer Builder Separation)과 ‘inclusion lists’라고도 불리는 crLists(censorship resistant List)의 작동 방식에 대하여 조금 더 자세히 다뤄보려고 한다.

그리고 검열 저항성을 갖추기 위한 이더리움 네트워크의 PBS 도입을 통해 우려했던 많은 부분이 해결될 것이라고 생각하고 있지만, 해당 구조로 인해 또 다른 문제점이 야기되고 있다. 이는 결국 높은 컴퓨팅 파워를 지닌 블록 Builder의 권한이 매우 커질 수 있다는 것을 의미하며 이러한 소수 Builder 간의 경쟁은 결국 또 다른 중앙화 문제점을 가져올 수 있다는 점이다. 따라서, Builder 중앙화의 요인은 무엇인지, 그리고 소수의 Builder들의 독점으로 인해 중앙화된다면 어떠한 문제점들이 생기게 되며 해결 방안은 존재하는지 등에 대하여 본 글에서 자세히 살펴보려고 한다.

# 2. PBS (Proposer Builder Separation)

간단히 말하자면 Proposer와 Builder 분리(Proposer Builder Separation, PBS)는 기존 합쳐져 있던 블록 제안이라는 역할과 블록 빌딩의 역할을 나누는 블록체인 아키텍처이다. 여기서 말하는 블록 제안이란 Validator의 승인을 위해 트랜잭션으로 구성된 블록을 제출하는 작업이며 블록 빌딩은 mempool에서 트랜잭션을 선별하여 블록을 구축하는 작업으로 말할 수 있다. 블록체인 프로토콜단에서 위 두 작업을 분리한다면 각 작업을 완료하는 프로세스를 단순화하고 전문화할 수 있다는 이점이 존재한다. 대부분의 레이어1 블록체인에서는 보통 단일 검증인이 해당 작업을 완료한다. 예를 든다면, 머지(The Merge) 이전의 작업 증명 기반의 이더리움은 Proposer와 Builder가 분리되지 않았으며 트랜잭션을 정렬하여 새로운 블록을 구축하고 제안하는 것을 오로지 채굴자(miner)가 단독으로 제어했다.

프로토콜 레벨에서 검열 저항성(censorship resistance)을 갖추기 위해 이더리움의 향후 로드맵에서 PBS를 도입하기로 결정한 이유에 대하여 비탈릭은 자신의 작성한 글 [“State of research: increasing censorhsip resistance of transactions under PBS”](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)을 통해 다음과 같이 서술하였다.

> *현 트랜잭션(transaction) 시장에서 블록 Proposer(현재: miner, 머지 후: Validator)는 mempool 상에서 어떤 트랜잭션이 가장 높은 우선순위(priority) 수수료를 지불하는지 살펴본 후 블록에 포함할 트랜잭션을 자신이 직접 선택하게 된다. 이를 통해 블록 Proposer는 복잡하고 정교한 전략을 사용해 DEX간 차익 거래 및 청산(이하 간단히 “MEV”라고 명칭 함)과 같은 기회를 활용하여 이익을 극대화하기 위해 mempool에서 어떤 트랜잭션을 포함할지 결정하게 되고, 심지어 자신의 트랜잭션을 포함할지에 대한 선택권을 가지게 된다. MEV로 인한 이러한 전략의 복잡성으로 인해 효과적인 Miner, 혹은 Validator를 운영하는 데 매우 높은 고정 비용이 발생하고 생태계 참여자(홀더)를 대신하여 이러한 작업을 수행하는 중앙화된 풀(pool)에게 유리한 환경이 조성된다. Proposer & Builder 분리(PBS)는 블록 제안 역할과 블록 구축 역할을 분리하여 해당 문제를 해결한다. Builder라고 하는 별도의 행위자는 블록 바디(본질적으로 블록의 주요 “payload”가 되는 정렬된 트랜잭션 목록)를 빌드하고 입찰(bid)을 제출한다.*

검열 저항에 관련된 이점 이외에도 PBS는 Validator가 되기 위해 필요한 컴퓨팅 오버헤드를 최소화하여 더 많은 Validator의 진입 장벽은 낮추기 때문에 이더리움의 분산화에 중요한 역할을 할 수 있다. 이를 통해 이더리움 네트워크는 보다 다양한 네트워크 참여자 그룹을 모집할 수 있게되며 폭 넓은 참여자에게 인센티브를 제공하게 된다. PBS는 또한 이더리움의 네트워크를 보다 모듈화된 미래로 향하는 ‘The Merge’의 전반적인 목표를 반영하며 특히 지분증명 합의 알고리즘으로 전환은 모듈성을 통해 탈중앙화를 이루기 위한 강력한 의지로 보여진다. 블록을 구축하는 서로 다른 메커니즘을 분해할 수 있다면 각각의 모듈을 개별적으로 분산시킬 수 있다. 이를 통해 서로 다른 전문성을 가진 다양한 네트워크 참여자는 자신의 특정 강점에 집중할 수 있으며 최종적으로 MEV-Relay와 같은 미들웨어의 외부 솔루션의 의존도를 낮춰 더욱 탈중앙화된 네트워크로 거듭날 수 있다.

# 2.1 Post Merge: Builder & MEV-Boost

Proposer와 Builder를 분리하는 것을 in-protocol 형태로 구현한다면 이더리움 네트워크의 검열 저항성과 탈중앙화를 촉진한다는 것을 인지하고 있었지만, 이전 작업 증명(Proof of Work) 기반에서 바로 구현해내는 것은 어려웠다. 따라서, 이더리움 핵심 개발자들은 이더리움의 머지 과정에서 병행할 수 있는 컨센서스 클라이언트 개편을 통해 PBS를 프로토콜에 내재하는 것으로 방향을 잡게 되었지만, 지분 증명(Proof of Stake) 전환 자체만으로도 매우 크고 어려운 작업이었다. 따라서 이더리움 커뮤니티는 차선책으로 필요에 따라 블록 구축을 아웃소싱할 수 있는 사이드카인 proto-PBS를 먼저 적용해보는 것으로 결정하였고 이는 이 전장에서 소개한 ‘MEV-Boost’로 알려져 있다. MEV 연구 개발 조직인 Flashbot은 MEV-Boost 설계를 주도적으로 이끌고 있으며 이를 현재는 오픈소스 프로젝트로 유지하고 있다.

MEV팀은 머지 이후로 부터 스테이킹 풀에 참여하지 않고 스스로 운영 가능한 ‘Solo-Validator’가 도입되면서 기존 MEV-Geth와 같이 소수의 Builder 화이트리스트를 유지하는 것은 불가능하다는 것을 인지하였고, 이것을 바탕으로 개발한 MEV-Boost의 작동 구조는 아래 그림과 같다. 해당 도표와 같은 형식의 MEV 마켓플레이스는 이제 MEV-Boost로 알려져 있으며, 블록 Builder가 만든 블록의 헤더를 블록 Proposer에게 전달하고 Builder가 Proposer에게 그들이 만든 블록을 선택한 대가로 일정 금액을 지불하겠다는 약속인 입찰(bid)를 전달한다. 마켓플레이스의 중심에는 Builder가 만든 블록의 유효성 확인을 책임지는 Relay가 존재한다. 하지만, MEV-Boost 시장에 참여하는 Builder로부터 제안을 받기 위해서 Validator는 합의 및 실행 클라이언트와 함께 MEV-Boost 프로그램을 실행해야한다. 이를 통해 Validator는 연결할 릴레이(Relay)를 선택할 수 있는 권한을 가질 수 있다.

![](6f1f7a-2GtSZ5QXOQqIW8HJqo8FAA.jpeg)

*(Post Merge 블록 빌딩 \| 출처: Devcon 프레젠테이션)*

# 2.2 Towards in-protocol PBS 구조

비탈릭은 궁극적으로 Relay의 잠재적인 유효성 검증 실패 가능성과 이러한 MEV-Boost 시스템에서 새로운 단일 실패 지점(본질적으로 중앙화 요소)으로 작용할 수 있는 부분은 수정되어야 한다고 생각하였고 ‘in-protocol(내재화)’ PBS 아이디어를 도입했다. 해당 디자인에서 Validator는 Builder가 제공한 블록을 사용하기 위해 다시 한번 블라인드(blind) 커밋을 진행한다. 하지만, 기존에 이러한 과정을 중개했던 릴레이(Relay) 대신 이더리움 프로토콜 자체가 두 가지 종류의 보증을 제공한다.

1.  **Builder는 Proposer가 입찰을 커밋(commit)한다면 해당 약정(commitment)은 컨센서스 실패(ex. 블록 리오그 등)에 의해서만 되돌릴 수 있다.**
2.  **Proposer에게 지불하겠다는 Builder의 약속은 이후 Builder가 어떠한 행위를 하더라도(ex: 블록 내용을 공개하지 않거나 유효하지 않은 블록을 공개하는 경우) 이행된다.**

![](6f1f7a-nPsEbxRNzySB_V0wWR8Ogw.jpeg)

*(A possible design for in-protocol PBS l 출처: Devcon 프레젠테이션)*

# 3. crList (censorship resistant List)

PBS 모델이 이더리움 프로토콜에 적용된다면 기존 MEV-Boost에서 볼 수 있는 중간 다리 역할을 하던 릴레이들은 사라지게 된다. 따라서 Builder는 Prosper와 이더리움 프로토콜 내에서 직접적인 경매를 진행하게 된다. 이것이 무엇은 의미하는지 조금 더 깊게 생각해본다면 PBS 모델은 안타깝게도 Builder가 트랜잭션의 배열을 통해 블록을 구성할 수 있는 더 큰 권한을 쥐여주게 되며, 따라서 Builder가 트랜잭션을 검열할 더 큰 기회를 제공한다. 예를 들어 높은 컴퓨팅 파워를 지닌 효율적인 Builder는 자신이 원하지 않는 특정 디앱에서 발생하는 트랜잭션이나, OFAC의 규제 리스트에 포함된 트랜잭션을 자신의 선택에 따라 블록에 포함하지 않을 수 있다. 비록 트랜잭션을 검열하는 Builder의 블록은 MEV를 최대로 뽑아내기 어려울지라도 고효율적인 알고리즘을 작성하여 타 Builder를 압도하거나, 진심으로 특정 트랜잭션이 포함되지 않기를 원한다면 블록을 ‘over-bid’ 할 것이다.

여기에서 crLists라는 기능이 도입된다면 앞서 언급한 Builder의 트랜잭션 검열에 대한 파워를 약화하고 제한할 수 있다. 해당 ‘inclusion list’에 대한 아이디어는 아직 설계 중이며 정확한 구현 일정 또한 확인하기 어렵지만 ‘하이브리드 PBS 디자인이 유력한 후보로 떠오르고 있다. Proposer는 mempool에서 확인 가능하며 적합한 모든 트랜잭션 목록을 지정하여 서머리를 구성하며 Builder는 블록이 가득 차지않는 한 Proposer가 전달한 해당 ‘summary hash’를 포함하도록 강제된다.

# 3.1 crList Design

![](6f1f7a-TsNSaLDU6BHLunTD5226eA.png)

*(crList : Hybrid PBS Design 구성도 \| 출처: 델피 디지털)*

1.  Prosper는 멤풀에서 확인할 수 있는 적합한 모든 트랜잭션을 포함하는 crList 및 crList 서머리를 게시한다.
2.  Builder는 기존 PBS 모델과 같이 블록 바디을 생성한 후 crList를 확인했다는 것을 증명하는 crList 서머리 해시를 포함하여 비딩을 제출한다.
3.  Proposer는 낙찰된 빌더의 비딩 및 블록 헤더를 수락합니다(Proposer는 아직 블록 바디를 확인할 수 없다.)
4.  Builder는 블록을 게시하고 1) 제시된 crList의 모든 트랜잭션을 포함했다는 증명, 혹은 2) 블록이 가득 찼다는 증거를 포함한다. 그렇지 않을 경우 **‘fork-choice’** 규칙에 의해 블록이 수락되지 않는다.
5.  Attestor는 게시된 블록 바디의 유효성을 확인한다.

하지만, 여기서 이러한 질문을 던저볼 수 있다. “만약 Proposer가 만약 유효한 트랜잭션을 포함하지 않은 텅 빈 crList를 제출한다면 어떻게 될까?” 만약 경제적인 요인을 목적으로 하여 Proposer와 Builder가 공모하여 텅 빈 crList 서머리를 포함한다면 트랜잭션을 검열하는 Builder는 여전히 높은 확률로 자신의 비딩이 성공할 가능성이 매우 높다. 해당 의문점을 해결할 수 있는 여러 방법들이 제시되어야 할 것이다.

# 4. Builder Centralization

자 그렇다면 미래에, 위에서 언급된 PBS 모델과, crList 기능이 이더리움 프로토콜에 완벽하게 구현되었으며 트랜잭션 검열에 대한 문제를 해결되었다고 가정해보자. 모든 문제가 해결되었을까? 아마도 우리는 생각치 않던 전혀 다른 종류의 어려움을 맞이할 준비를 해야할지도 모른다. 물론 crList를 통해 블록 구성 권한를 Proposer에게 조금 분배할 수 있었지만, Builder들은 해당 스킴을 통해 더 많은 권력을 얻게 된 것이 사실이다. 우리는 Builder 중앙화에 대한 고민을 시작할 필요성이 존재하게 된다. Builder의 중앙화라는 것을 무엇일까? 만약 몇명의 Builder가 시장을 독점한다고 하면 중앙화되었다고 봐야하는 것일까? 혹은 소수의 효율적인 Builder가 구축하는 생태계는 나쁘다고 봐야 할까? 등에 대해 알아보려 한다.

# 4.1 Exclusive Order Flow

이더리움이 네트워크 안에서 주문 흐름이라고도 불리우는 Order Flow(OF)는 사실 블록체인상에서 상태를 변경할 수 있는 모든 것을 의미한다. 전형적인 예시로는 dApp 사용자들이 만들어내는 무언가를 실행하려는 \*\*‘의도’\*\*이며 이는 mempool에서 흔하게 찾아볼 수 있는 수많은 트랜잭션의 묶음이 주문 흐름(oder flow, OF)이라고 볼 수 있다. 이렇게 주문 흐름을 설명할 수 있다면 주문 흐름에 대한 독점적인 접근 권한을 가지는 것을 우리는 ‘Exclusive(독점적인)’이라는 수식어를 붙여 ‘Exclusive Order Flow’, 즉 EOF라고 정의 할 수 있다. EOF는 결과적으로 Builder 시장의 경쟁력을 약화시킬 수 있는 잠재력을 지니고 있다고 언급한다. PBS 모델에서 Builder 시장의 Builder 간 경쟁력 약화와 중앙화는 임대료 착취(rent extraction), 열악한 사용자 경험(poor user experience), 네트워크 인센티브에 대한 과도한 영향력을 가진 빌더의 고착화(entrenchment of builders) 등을 야기할 수 있다.

Builder는 특정 트랜잭션이 그들에게만 전송되도록 할 수 있다. 예를 든다면 사용자에게 위협이 되는 프론트런(front-run)을 하지 않겠다고 약속하며 그들에게 백런(back-run) 수익에 대한 일부 인센티브를 제공할 수 있다. SushiSwap의 ‘Sushi Guard’와 같이 현재 실행 중인 몇 가지 초기 사례를 볼 수 있다. 이러한 Builder는 수익을 통해 더 많이 비딩하고, 더 많은 블록을 획득하며 더 많은 독점 계약(EOF)을 얻는다는 것을 정당화할 수 있다. 이러한 형식으로 중앙화된 블록 Builder는 네트워크에 심각한 피해를 줄 수 있다.

![](6f1f7a-wXxKVKPDv1blpdkWJftp0Q.png)

*(Exclusive Order Flow \| 출처: 델피 디지털)*

위 그림과 같이 단일 Builder에 독점적 주문 흐름(EOF)을 보내는 사용자를 생각해보자. 일반 사용자는 자신이 실행한 트랜잭션이 실행되려면 트랜잭션을 받게 되는 Builder가 해당 트랜잭션을 되도록 빠르게 포함하여 생성한 블록을 체인에 비딩해 주어야 하며 이러한 과정은 사용자들이 기대하는 만큼 빠르게 발생하지 않을 수 있다. 블록체인 디앱을 사용하는 사용자들이 우선적으로 바라는 점은 빠른 속도이며 그 어떤 사용자도 자신의 트랜잭션이 딜레이되는 것을 좋아하지 않는다. 또한, 딜레이되는 트랜잭션은 가스피를 훨씬 더 가늠하기 어렵게 만들기도 한다. 결과적으로 사용자는 가장 높은 블록 포함 비율(inclusion rate)을 가진 우수한 Builder에게 자신의 OF를 전송하여 이러한 딜레이를 최소화하도록 하며 Builder는 이러한 위치가 가지게 되는 장점을 통해 인센티브를 받아 시장 지배력을 점차적으로 더욱 높이게 된다. 이러한 현상이 Builder 중앙화라고 볼 수 있으며 점점 더 가속화되고 있다.

사용자가 이러한 결정을 하는 데는 여러 가지 이유가 있다고 생각된다. 우선 가장 확실한 점은 Builder와 사용자 간의 OF에 대한 계약 체결을 통한 거래라고 볼 수 있다. 사용자는 자신이 발생시키는 OF에 대한 독점적인 권한을 Builder에게 제공하는 것과 동시에 계약을 통해 수익의 일부를 아주 쉽게 획득할 수 있다. 혹은, 효율이 매우 높은 Builder가 제안하는 특정 기능(ex. pre-confirmation)과 교환할수도 있다. 사용자 입장에서 가장 세력이 크고 지배적인, 그리고 신뢰할 수 있는 Builder 외에 굳이 다른 소규모 Builder와 통합할 이유가 없다고도 볼 수 있다. 이러한 현상은 결국 독점 계약(EOF)을 정당화 할 수 있다고 본다. 그렇다면 이러한 주문 흐름은 사용자만 만들어낼 수 있는 것일까? 이러한 동기를 가질 수 있는 주문 흐름을 제어하는 능력지는 주체는 사용자만 국한된 것이 아니다. 예를 든다면 메타마스크와 같은 엄청난 OF를 생성해내는 dApp도 매우 유사한 위치에 있다고 볼 수 있다.

# 4.2 Properties of PBS

우선 독점적인 주문 흐름(EOF)이 MEV 시장에 바람직하지 않은 영향을 미친다는 점을 설명하기 전에 먼저 위에서 설명한 PBS 모델이 요구하는 속성들은 무엇인지에 대해 이해해보자.

1.  **Proposer 중심 :** 사실 이 부분은 PBS 모델이 지향하는 가장 중요한 목표이자 아이디어라고 볼 수 있다. 하이 레벨에서 바라봤을 때 궁극적인 목표부터 살펴본다면 Proposer의 관점에서 실행할 수 있는 최선의 전략은 Builder 마켓을 통해 블록을 구축하거나 자신이 만들어내는 블록이 Builder 시장에서 제안하는 것보다 더 높은 수익을 창출하는 것이라고 생각해 볼 수 있다. 하지만, 효율적인 Builder를 넘어서기에는 현재로써 무리가 있다.
2.  **생태계 환원 :** Builder 혹은 Seacher를 통해 추출된 MEV의 대부분은 추출한 주체가 독점하고 소유하면 안 되며 다시 생태계로 흘러야 한다. 이렇게 추출된 가치는 결과적으로 어디로 흘러야 할까? 많은 의견이 존재하겠지만 결국 이러한 가치들은 궁극적으로 네트워크를 유지하는 Validator 및 dApp 프로토콜 혹은 사용자이다.
3.  **검열 저항성 :** PBS 모델의 목표는 언제나 이더리움 네트워크가 지향했던 바와 같이 사용자들이 만들어낸 의도, 곧 유효한 트랜잭션들이 궁극적으로 블록에 포함되어야 한다는 것이 필수이다. 또한 이상적으로는 블록에 많은 딜레이 없이 포함되어야 한다.
4.  **사용자 경험 개선 :** 사실 UX의 개선은 모든 블록체인 영역에서 희망사항에 가깝다고 본다. 하지만, 이더리움 생태계에 취약한 것으로 알려진 생태계 영역을 개선하기 위해 UX 개선점을 적극 찾고 고쳐나가야 한다.

# 4.3 The Problem: Builder’s Market Domination

독점적 주문 흐름(EOF)은 효율이 높은 Builder 또는 담합을 통해 뭉친 소규모 Builder 그룹이 Builder 시장을 독점할 수 있도록 만들 수 있으며 점진적으로 Builder 시장의 경쟁력을 잃도록 만들게 된다. 아래 이러한 문제점들에 대해 더 깊게 살펴보겠지만 이는 PBS 모델의 핵심 파트중 하나인 Builder 시장에 상당히 부정적인 영향을 미치게 될 것이다.

Builder 시장이 소수에게 Builder에게 집중되는 것을 먼저 고려해보도록 해보자. Builder들이 서로 경쟁하는 정상적인 시나리오라고 한다면 Builder는 경쟁 업체보다 블록에 대한 더 높은 가격을 제시하기 위해 추출된 MEV의 수익 대부분을 비딩을 통해 사용하게 된다. 하지만 서로 똘똘 뭉쳐 담합한 Builder들은 서로의 비딩을 대폭 낮추고 이를 통해 얻게 되는 수익을 공유할 수 있어 위에서 설명한 ‘생태계 환원’이라는 PBS의 성질을 위반할 수 있다. 아래 두 가지 시나리오를 살펴보자:

1.  새로운 Builder로 활동하는 ‘민수’라는 Builder 시장에 진입한다. 해당 마켓에서 담합을 하는 Builder들을 발견하였지만, 담합을 통해 입찰이 매우 낮은 수준이기 때문에 민수는 충분히 더 높게 입찰할 수 있다. 해당 담합 Builder 그룹은 민수를 그룹에 포함시켜 이익을 더 나눌 수 있지만, 더 많은 Builder들이 시장에 진입함에 따라 담합 그룹은 경쟁을 위해 낮은 입찰을 유지하기 어려우며 결과적으로 MEV 가치를 다시 생태계로 환원하게 된다.
2.  민수는 새로운 Builder로써 Builder 시장에 진입했지만, 대부분의 주문 흐름(OF)에 접근할 수 없다. 발생하고 있는 모든 트랜잭션이 기존 자리잡은 빌더에게 **직접** 전송되기 때문이다. 결과적으로 민수의 블록 Building 알고리즘이 매우 효율적이고 사용자 기능이 아무리 우수하더라도 기존 시장을 지배하던 Builder들은 민수를 능가하기 위해 노력할 필요가 없다. 그래서 민수도 여러 사용자로 부터 주문 흐름(EOF)를 확보하려고 시도하지만 이미 사용자들은 기존 Builder와 계약을 맺은 상태이며 계약을 위반하며 이를 갈아타기는 어렵다. 또한 사용자의 입장에서 이제 막 시작하게 된 민수의 블록 포함률이 높지 않을 가능성이 높기 때문에 민수와 계약을 체결할 가능성이 없다고 생각한다. 또한, dApp 지갑 관리자들도 민수와 통합하는 것은 그만한 가치가 있다고 생각하지 않는다. 결국 민수는 체인에서 블록을 생성하지 못하게 된다.

위에서 볼 수 있는 두 번째 시나리오는 기존 Builder가 지속해 MEV 수익 대부분을 가져가게 되며 자신이 얻게되는 수익이 생태계로 환원되지 않는다는 점을 볼 때 부정적인 시나리오라는 것을 알 수 있다.

# 4.4 Additional Problem

# 1) UX Perspective

결국 주문 흐름에 대한 독점적인 접근 권한은 Builder에게 경쟁적 우위를 제공한다. Builder가 PFOF(Payment-For Order Flow)를 확보할 수 없다면, 그들은 OF를 유인하기 위해 더욱더 편리하고 직관적인 사용자 기능을 구현하는데 경쟁을 할 수 있는 환경이 조성될 것이다. 하지만, 현재 시점에서 잠재적인 Builder가 사용자에게 제공해줄 수 있는 기능들은 대부분 명확히 밝혀지지 않았다. 몇 가지를 생각해 본다면 Builder는 백런닝 서비스(backrunning-as-a-service), 가스피가 없는 트랜잭션 취소(gasless cancellation), 가스피가 없는 주문(gasless order), 사전 트랜잭션 컨펌(pre-confirm) 등 몇 가지 아이디어들을 생각해 볼 수 있다. 주문 흐름이 PFOF로 인해 계약에 묶여 있거나 다른 이유로 이러한 새로운 기능들을 원하지 않는 경우 Builder가 이러한 기능을 구현하고 개발해야 할 의미 자체가 존재하지 않는다.

우수한 기능으로 인해 다른 Builder보다 더 많은 주문 흐름을 갖게 되는 것과 PFOF로 인해 더 많은 주문 흐름을 갖는 것은 다르다는 점을 정확히 파악해야 한다. 전자의 경우 진입 장벽은 더욱 경쟁력 있고 효율적인 기능을 구현해야 한다는 것이 될 것이고, 후자의 경우 새로운 Builder의 진입 장벽은 사용자들이 기존 Builder와의 계약을 파기하도록 설득하고 자신에게 계약을 끌어오는 것이다. 즉, Builder의 주문 독점에 대한 부분은 기능 개발 및 제공에 의한 것이 아닌 PFOF에 포함된다.

# 2) Proposer Incentive

Builder 시장에서 대부분의 MEV 가치에 대한 통제는 Proposer 인센티브에 영향을 미치게 된다. 위에서 언급한 crLists를 두고 생각해보자. Proposer가 crList를 게시할 때(일반적으로 정직한 행동을 수행한다고 가정) 일부 Builder는 자신이 보유한 목록에 있는 주소 및 계정을 원하는대로 검열하거나 게시되는 것을 억제하려고 하기 때문에 해당 Proposer에게 블록을 보내지 않도록 선택할 수 있다. 만약 Builder 시장이 경쟁적이라면 보류된 블록은 비검열 Builder를 통해 유사한 MEV 가치를 지닌 블록으로 쉽게 대체되어야 한다. 그러나 가치 있는 블록을 생산할 수 있는 Builder의 수가 매우 적고 이러한 독점적인 빌더가 블록을 보류하기로 선택한 경우 Proposer는 이익만을 추구하는 합리적인 행동과 검열을 당하는 정직한 행동 둘 중의 하나를 선택해야 한다. Proposer에게 정직한 행동과 높은 수익 중 하나를 선택하도록 강요하는 것은 이더리움이 네트워크가 궁극적으로 원치 않는 행동을 장려하고 이렇게 정직하지 않은 Proposer가 더 높은 수익을 얻고 더 빨리 성장하며 정작 정직한 Proposer는 네트워크에서 손해를 봐야 한다는 점은 옳지 않다.

# 5. Decentralize Builder Role

그렇다면 **블록 Builder의 중앙화로 인한 이더리움의 네트워크 중립성과 검열 저항에 대한 부정적 영향은 어떻게 해결할 수 있을까?.** 레이어1 블록체인의 고유한 역할은 수수료를 지불하였으며 유효한 모든 트랜잭션이 블록에 안정적으로 포함되도록 보장하는 것이다. 하지만 최근 소수의 블록 Builder가 전체 이더리움 블록의 80%를 구성한 것이 현실이다. 이렇게 특정 몇몇의 블록 Builder는 자신이 원하지 않는 트랜잭션들은 처리되지 않도록 선택할 수 있으며 블록 구성에 대한 상당한 큰 제어 권한을 가지게 된다. Builder 시장의 경쟁을 촉진하기 위해서는 신규 Builder 시장 진입이 쉬워야 하지만 진입장벽이 낮다고 해서 반드시 다양한 종류의 Builder가 존재한다는 의미로 해석되지는 않는다. 이미 구축되어 있는 큰 규모의 MEV 경제는 소수 Builder의 영향력이 지배적일 가능성이 높으며 이로 인해 Builder는 사용자로부터 임대료 추출(rent-seeking)과 같은 부정적인 결과가 발생할 수 있다. 위에 설명한 것처럼 Builder는 네트워크 사용자에게 ‘사전 컨펌(pre-confirmation)’과 같은 기타 편리하고 새로운 기능을 제공하거나, EOF에 대한 비용을 사용자에게 지불함으로써 자신의 시장 점유율을 더욱 끌어올릴 수 있다. 이러한 문제를 해결하기 위해 노력중은 Flashbots의 SUAVE에 간략하게 알아보도록 한다.

# 5.1 Flashbots, SUAVE

향후 선택권은 두 방향으로 나눠볼 수 있는데 첫번째로는 MEV 솔루션의 구조를 다시 한번 변경하여 블록 구축 단계에서 중앙화된 세력의 영향력을 줄이고 블록체인의 잠재적 이점을 달성할 수 있는 방법을 찾거나, 두번째로는 앞으로 벌어질 상황에 편승하고 소수 중앙화 된 블록 Builder 체제를 허용하며 크립토가 지향하는 탈중앙성은 일부 포기하는 방안이다.

하지만 플래시봇이 그리는 MEV 솔루션의 궁극적인 목적은 정직한 참여자가 부정직한 참여자보다 더 많은 네트워크 보상을 획득하고 공정 경쟁을 유지할 수 있는 인프라를 만들기 위해 협력하는 구조이다. 전통적인 금융 시스템과 같이 개인의 이익을 위해 시스템을 중앙화하고 통제할 수 있는 것을 선호하는 주체는 수 없이 많기 때문에 플래시봇은 지금까지 끊임없이 노력하여 구축해 낸 블록체인 시스템을 보호해고 탈중앙화를 유지해야 한다고 주장해 왔다.

따라서, 플래시봇은 MEV 솔루션의 이상적인 구조에 대해 지속적으로 연구하였으며 다음과 같은 원칙들이 필요하다는 것을 깨달았다. 첫번째로는 EOF에 대응하기 위해 사용자는 트랜잭션 컨펌(confirmation) 전에 트랜잭션과 같은 개인정보를 비공개 한다. 따라서, 발생시킨 트랜잭션은 비공개지만 모든 블록 Builder가 접근할 수 있도록 해야 한다는 점이다. 두번째로는 Cross-Domain MEV에 대응하기 위해 서로 다른 블록체인의 Builder는 기존 플래시봇 경매 방식과 동일하게 개방적이고 무허가(permissionless)적인 방식으로 서로 자유롭게 통합할 수 있어야 한다. 마지막으로는 장기적 관점에서 트랜잭션 시스템과 블록 구축 시스템은 자체적으로 탈중앙화 되어야 한다고 설명했다.

이러한 원칙들을 바탕으로 플래시봇은 광범위한 연구 및 커뮤니티 협력을 통해 SUAVE(the Single Unified Auction for Value Expression) 즉, ‘가치 표현을 위한 단일 통합 경매’라는 Builder 중앙화 문제에 대한 솔루션을 제시했다. SUAVE는 모든 블록체인을 위한 멤풀 및 블록 Builder가 되도록 설계된 새로운 블록체인으로 플래시봇이 개발한 네트워크를 통해 MEV 활동을 연결하여 완전히 새로운 EVM 호환 블록체인으로써 MEV 시장의 경제적 기반 역할을 담당하고자 한다.

# 5.2 Structure of SUAVE

![](6f1f7a-rHligiHvIu1YQtIJZXMYvA.png)

*(Architecture of SUAVE \| 출처: Flashbot: The Future of MEV is SUAVE)*

SUAVE의 구조는 크게 사용자와 Searcher의 선호도(preference)를 나타낼 수 있는 ‘표현(expression)’ 파트와, SUAVE 멤풀로부터 최적화된 실행을 담당하는 ‘실행(execution)’ 파트, 그리고 ‘합의(settlement)’라는 3가지 핵심 파트로 나눠볼 수 있다.

이러한 SUAVE의 핵심에는 ‘선호도(preference)’라는 아이디어가 존재한다. 선호도라는 것은 사용자가 원하는 것을 보여주고 조건이 충족된다면 비용을 지불 하겠다는 서명을 포함한 메시지이다. 선호도는 하나의 시스템 내에서 토큰을 전송하고 스왑하는 것과 같이 단순할 수도 있고, 더욱 복잡할 수도 있으며 서로 다른 블록체인에 걸쳐 여러 단계가 포함될 수도 있다. 간단한 예를 든다면 “나는 A만큼의 자산을 보유하고 있는데 B라는 자산을 구매하기 원하며 C를 지불할 의향이 있다.” 혹은, “나는 트랜잭션 순서가 C, B, A 순으로 처리되었으면 좋겠다.”라는 의도라고 볼 수 있다.

# 1) Preference Environment

‘선호도 환경(Preference Environment)’ 파트는 위 선호도를 표현하는데 최적화된 탈중앙화 단일 환경이라고 설명할 수 있다. 기존 MEV 시스템에서 사용되어온 ‘번들(bundle)’의 확장된 개념으로 더욱 복잡한 선호도를 표현할 수 있도록 멤풀을 개선하려 한다. 사용자의 선호도 표현과 관련하여 앞으로 수많은 활동과 개발이 있을 것으로 예상되는데, 예를 들자면 Executor라는 주체는 유사한 트랜잭션을 함께 묶어 그룹화하거나 사용자 수수료를 먼저 선지불하여 우선적으로 트랜잭션을 실행시킬 수 있는 ‘pre-confirmation’과 같은 사용자 선호도를 제공할 수 있다.

# 2) Execution Market

일차적으로 사용자의 선호도가 SUAVE에 반영된다면, 그다음 ‘Execution Market’으로 넘어가게 된다. 여기에서 ‘Executor(실행자)’라고 불리는 특수하고 다양한 주체는 여러 블록체인 사용자에게 최상의 서비스를 제공하고 최대한 많은 사용자의 선호도를 처리하기 위해 경쟁하게 된다. 예를 든다면 우리는 ‘Orderflow’ 경매자, Builder, 그리고 RPC 제공 업체 등을 ‘실행자(Executor)’라고 표현할 수 있을 것이다. 특정 사용자의 트랜잭션이 MEV를 생성하는 경우 Executor는 가장 높은 비율의 MEV 수익을 사용자에게 환원하기 위해 경쟁할 수 있다. 이러한 자유 경쟁을 통해 Execution Market이 최적의 MEV를 제공한다면 주문 흐름을 발생시키는 주체(originator)는 기존 방식대로 한명의 빌더에게 EOF를 발생시켜야 하는 이유가 줄어들게 되고, 이는 곧 빌더의 중앙화를 완화할 수 있는 기반이 될 수 있다.

# 3) Decentralized Block Building

마지막 파트는 SUAVE의 Preference Environment와 Execution Market에서 수집된 결과물을 풀 블록으로 생성해내는 분산화된 빌딩 네트워크(Decentralized Building Network)이다. 수집된 선호도를 반영한 번들은 탈중앙화된 블록 Building 네트워크에서 다양한 블록체인에 걸쳐 블록으로 변환된다. 해당 마켓은 Builder와 Validator의 MEV를 최대화하는 동시에 Builder가 탈중앙화되도록 하는 것을 목표로 하게 된다.

# 6. 마치며

이더리움이 작업 증명(Proof of Work)에서 머지를 통해 지분 증명(Proof of Stake)으로 전환함에 따라 MEV Supply Chain은 점진적으로 진화화해왔으며, 머지(The Merge)의 결과로 인해 특히 탈중앙화 및 검열 저항과 관련하여 새로운 과제 및 위험 벡터가 등장했다. 이에 대응하기 위해 Flashbots Auction, MEV-Geth, MEV-Boost 및 경쟁 시장을 육성하기 위한 이러한 솔루션의 오픈 소싱화를 시도하였고 이제는 EOF 및 크로스체인 MEV을 통한 블록 빌더의 중앙화가 제시하는 위험을 분산화하고자 새로운 네트워크 SUAVE도 출시를 앞두고 있다. 이렇게 이더리움의 각 로드맵 단계별로 해결하고자 하는 과제들 존재하며, 그것을 해결하기 위해 개발 중인 솔루션은 또 어떠한 문제점을 야기할 수 있는지에 대한 끊임없는 고민이 필요한 시점이라고 생각된다. 이를 통해 발생가능한 리스크를 지속적으로 줄여나가야 할 것이다.

# 7. 참고 문헌

- [Censorship… wat do?: The Devil You Know vs. The Devil You Don’t](https://joncharbonneau.substack.com/p/censorship-wat-do)
- [Decentralizing the Builder Role](https://joncharbonneau.substack.com/p/decentralizing-the-builder-role)
- [Order flow, auctions and centralisation II: order flow auctions](https://collective.flashbots.net/t/order-flow-auctions-and-centralisation-ii-order-flow-auctions/284)
- [Order flow, auctions and centralisation I: a warning](https://collective.flashbots.net/t/order-flow-auctions-and-centralisation-i-a-warning/258)
- [https://www.coindesk.com/tech/2022/11/23/ethereum-rd-firm-flashbots-shares-details-about-its-next-gen-block-builder/](https://www.coindesk.com/tech/2022/11/23/ethereum-rd-firm-flashbots-shares-details-about-its-next-gen-block-builder/)
- [https://www.youtube.com/watch?v=FqalnLJTdCc](https://www.youtube.com/watch?v=FqalnLJTdCc&amp;ref=wb3vb.io)
- [https://writings.flashbots.net/the-future-of-mev-is-suave/](https://writings.flashbots.net/the-future-of-mev-is-suave/)
