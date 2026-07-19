---
title: '어서와, S.S.S(Shared Sequencer & SUAVE)는 처음이지?'
tags:
  - ethereum
published: true
date: 2025-08-11 13:16:26
description: '본 게시글은 서울대학교 블록체인 학회 디사이퍼(Decipher)에서 ‘Shared Sequencer & SUAVE’를 주제로 Weekly Session에서 발표한 내용을 담았습니다. 본 글은 단일 시퀀서를 사용한 현 롤업의 한계점을 해결하기 위한 공유 시퀀서에 대한 내용과 Flashbots의 SUAVE에 대한 내용을 다루고 있습니다.'
---

본 게시글은 *서울대학교 블록체인 학회 디사이퍼(Decipher)에서 ‘Shared Sequencer & SUAVE’를 주제로 Weekly Session에서 발표한 내용을 담았습니다. 본 글은 단일 시퀀서를 사용한 현 롤업의 한계점을 해결하기 위한 공유 시퀀서에 대한 내용과 Flashbots의 SUAVE에 대한 내용을 다루고 있습니다.*

🔗 [S.S.S(Shared Sequencer \&amp; SUAVE)는 처음이지?](https://medium.com/decipher-media/s-s-s-shared-sequencer-suave-%EB%8A%94-%EC%B2%98%EC%9D%8C%EC%9D%B4%EC%A7%80-e6cc770bd9bd)

**Author: 이민혁(**[<strong>@web3vibe</strong>](https://twitter.com/web3vibe)**), 문보설(**[<strong>@1004YUKICHAN</strong>](https://twitter.com/1004YUKICHAN)**)**

**Seoul Nat’l Univ. Blockchain Academy Decipher(**@[decipher-media](https://medium.com/decipher-media))

**Reviewed By Jeong Hyun(**[<strong>@Hyunxukee</strong>](https://twitter.com/hyunxukee)**) & Decipher Media Team**

# 1. Intrduction

이더리움 네트워크는 블록체인 기반의 탈중앙화 응용 프로그램을 지원하는데 있어서 큰 인기를 누리고 있다. 대체불가토큰(NFT)과 탈중앙화 금융(DeFi)과 같은 프로젝트들은 이더리움 네트워크의 활동을 크게 증가시키는 데 기여하고 있다. 이러한 활동의 증가로 인해 이더리움 메인넷에서의 거래와 스마트 컨트랙트 실행에 필요한 가스 비용이 크게 상승하였으며, 이는 사용자들이 이더리움 네트워크를 이용하는데 있어 높은 수수료 문제로 이어졌다.

이 문제를 해결하기 위해, 이더리움 생태계는 여러 가지 Layer-2 스케일링 솔루션을 도입하였으며, 이 중 하나가 롤업(Rollup)이다. 롤업은 이더리움의 메인넷에서 발생하는 거래들을 묶어서 하나의 거래로 처리하는 기술로, 네트워크의 처리 능력을 크게 향상시키고 거래 수수료를 줄일 수 있었다. 현재 이더리움 커뮤니티와 개발자들은 롤업과 같은 Layer-2 솔루션을 적극적으로 도입하고 있으며, 이를 통해 더 많은 사용자와 프로젝트가 이더리움 생태계를 활용하면서 높은 수수료 부담을 감소시킬 수 있을 것으로 기대하고 있다. 그러나, 현재 롤업은 단일 시퀀서의 구조로 되어 있어 검열 저항성, MEV 독점 문제 등과 같은 문제가 발생하고 있으며, 이를 해결하기 위한 공유 시퀀서의 개발도 활발히 진행되고 있다.

또한, 공유 시퀀서와 유사한 구조를 가진 플래시봇의 SUAVE는 공유 시퀀서와 상호작용할 경우 더 큰 효과를 얻을 수 있을 것으로 예상되고 있다. 이러한 내용을 이해하기 위해서는 먼저 레이어 2와 롤업의 구조를 다시 한 번 살펴보며 천천히 알아보도록 하자.

# 2. Single Sequencer

현재 대부분의 롤업(Arbitrum, Optimism, zkSync 등)은 중앙화된 단일 시퀀서를 사용하고 있다. 여기서 말하는 시퀀서의 핵심 역할은 이름이 의미하는 바와 같이 메모리 풀에서 블록에 포함되는 거래의 순서를 결정하고 롤업 체인에 제출하는 것이다. 시퀀서의 역할을 이해하기 위해 롤업의 구조와 핵심 구성 요소를 간단히 살펴본 후 진행하도록 하자. 현재 시점에서 롤업을 크게 두 가지 종류로 구분할 수 있는데, 내용은 아래와 같다.

# 2.1 Smart Contract Rollup

스마트 컨트랙트 롤업은 이더리움과 같은 정산(Settlement) 레이어에 자신의 전체 거래를 게시하는 롤업 블록체인의 한 종류다. 먼저 블록체인의 정산 레이어가 담당하는 역할을 간단하게 요약하여 정의해보면 다음과 같다. 1) 블록을 정렬하고, 2) 데이터의 사용 가능 여부를 확인하고(DA 체크), 3) 거래의 정확성을 확인한다. 이는 모듈러 블록체인 관점에서 실행 레이어에서 수행된 거래들이 정확한지 검증하고 여러 실행 레이어(롤업)를 연결하는 처리 레이어로 볼 수 있다.

잘 알다시피 이더리움 모듈식 스택에서 스마트 컨트랙트 롤업은 일반적으로 실행(Execution)을 담당한다. 따라서 합의(Consensus), 데이터 가용성(Data Availability), 정산(Settlement)의 업무를 이더리움에게 위임하는 형태이다. 스마트 컨트랙트 롤업은 이름에서도 알 수 있듯이 이더리움과 같은 정산 레이어에 있는 롤업 스마트 컨트랙트에 의존하여 블록을 검증한다. 여기서 블록이 유효한지(validity proof)인지, 무효한지(fraud proof)인지를 효율적으로 검증하기 위해 여러 증명 방법들이 사용된다.

![](ee19e4-N9EdP4pCXEpK7AzteFJzHA.png)

*Smart Contract Rollup (출처: Celestia)*

또한, 롤업 스마트 컨트랙트를 통해 정산 레이어에 신뢰를 최소화한 브리지를 구축하고 연결할 수 있다. 이 브리지는 정산 레이어에서 전체 블록의 검증이 직접적으로 이루어지기 때문에 신뢰성을 최소화할 수 있다. 따라서, 블록이 유효한지 여부를 성공적으로 검증하기 위해 일부 참여자만 정직하게 행동하면 된다.

![](ee19e4-dnd5bucFdq2k8gOUkE1HfA.png)

*Smart Contract Rollup (출처: Celestia)*

이와 같이, 스마트 컨트랙트 롤업에서 정산 레이어는 중요한 역할을 담당하는데, 이를 요약하면 다음과 같다:

1.  연결된 롤업들이 증명을 제출하고 검증하는 공간으로 활용
2.  정산 레이어가 보유한 유동성을 활용할 수 있음
3.  같은 정산 레이어를 공유하는 경우 (예: 이더리움) 롤업 간의 브릿징이 용이해짐

현재 많이 알려진 다양한 롤업 솔루션들은 대부분이 스마트 컨트랙트 롤업으로, 각자 고유한 클라이언트, 실행 환경(VM), 멤풀, 증명 체계(ZK롤업), 시퀀서 및 Layer-1 상에 배치된 롤업 스마트 컨트랙트들을 운영하고 배포한다. 프로젝트 별로 구성되는 솔루션에 따라 미묘한 차이가 있을 수 있다. 예를 들어, ZK롤업은 상태 루트(state root)와 calldata를 Layer-1 컨트랙트에 제출하고 Layer-2 블록을 생성하는데, 이와 별개로 ZK롤업은 유효성 증명을 위한 과정을 거치며, Optimistic 롤업은 분쟁 시간 지연(Dispute Time Delay)과 같은 별도의 절차를 밟는다.

# 2.2 Soverign Rollup

소버린(독립) 롤업은 셀레스티아(데이터 가용성을 담당하는 모듈러 블록체인)를 사용하여 새로운 블록체인 디자인을 연구하는 과정에서 ‘Lazyledger’ 백서를 통해 처음 소개된 개념이다. 요약하면 스마트 컨트랙트 롤업과 유사하게 트랜잭션을 다른 블록체인에 기록하고 블록 정렬과 데이터 가용성을 확인하지만, 자체적으로 Settlement를 처리하는 블록체인의 한 종류이다. 결국 Execution 레이어와 Settlement 레이어가 결합된, 즉 롤업 트랜잭션을 롤업 자체에서 처리하고, DA 레이어를 통해 데이터 가용성만을 보장하는 독립적인 롤업이다.

![](ee19e4-kEd2Rz6W8MIfoIPxsad2uQ.jpeg)

*Sovereign Rollup (출처: Celestia)*

모듈식 스택의 맥락에서, 소버린 롤업은 Execution과 Settlement을 담당하며, Data Availability 레이어는 Consensus와 DA를 처리한다. 그러나, 이 구조에서 특별한 점은, DA 레이어가 스마트 컨트랙트 롤업과 달리 소버린 롤업 트랜잭션의 정확성을 확인하지 않는다는 것이다.

여기서 소버린 롤업을 검증하는 노드가 트랜잭션의 정확성을 확인하는데 책임을 진다. 따라서 노드가 DA 레이어에 기록된 트랜잭션을 검증하고, 만약 이가 무효하다면 해당 트랜잭션을 거부하고 무시하게 된다. 결국, 소버린 롤업은 정확한 체인을 결정하는데 책임이 있으며 스마트 컨트랙트 롤업과 달리 별도의 trust-minimized 브리지는 선택적으로 가질 수 있다.

셀레스티아를 데이터 가용성 레이어로 사용하는 소버린 롤업의 경우, 자신의 데이터를 저장하기 위해 셀레스티아에 ‘PayForBlob’라는 트랜잭션을 주기적으로 전송한다.

이 과정에서 셀레스티아는 여러 롤업들과 공유하는 하나의 데이터 가용성 레이어로서 역할을 하며, 롤업이 자신의 데이터를 구분하고 쿼리할 수 있도록 머클 트리에 네임스페이스(Namespace) ID라는 필드를 추가한 NMT(Namespace Merkle Tree) 형식으로 데이터를 저장한다.

![](ee19e4-UyLo0-Js-VuLNmpBOLBBMw.png)

*Celestia Rollup Explorer (출처: Celestia)*

결과적으로 스마트 컨트랙트 롤업과 소버린 롤업의 차이점을 요약하면:

1.  스마트 컨트랙트 롤업: 트랜잭션은 Settlement 레이어의 스마트 컨트랙트에 의해 검증되며, 컨트랙트 업그레이드를 위해 복잡한 과정(다중 서명, 거버넌스 등)이 필요하며, trust-minimized 브리지가 필요하다.
2.  소버린 롤업: 트랜잭션은 소버린 롤업의 노드에 의해 검증되며, 포크를 통해 업그레이드가 가능하다(노드 주도 = 소버린). 앞서 언급한 것처럼 trust-minimized 브리지는 선택적으로 보유할 수 있다.

# 2.3 Single Sequencer Transaction Flow

먼저, 롤업에서 발생하는 트랜잭션의 흐름을 이해하기 위해 기본적인 트랜잭션 흐름을 복습해보면 다음과 같다.

**모노리틱 블록체인:**

1.  사용자는 멤풀에 트랜잭션을 전송한다.
2.  검증자는 멤풀에서 블록에 포함시킬 트랜잭션을 선택한다.
3.  검증자는 선택한 트랜잭션이 유효한지 확인한다.
4.  유효한 트랜잭션을 검증자가 정한 순서대로 블록에 담는다.
5.  정해진 순서로 트랜잭션을 실행하여 블록의 결과값을 계산한다.
6.  다른 검증자에게 블록 내용과 결과값을 전송하여 검증과 저장을 요청한다.
7.  수신한 검증자는 해당 블록의 결과값이 유효한지 검증한다.
8.  유효한 블록을 자신의 블록체인에 연결하여 정보를 저장한다.
9.  다른 검증자에게 블록 내용과 결과값을 전달한다.
10. 50% 이상의 검증자들이 블록을 자신의 블록체인에 연결하면 상태 업데이트가 완료된다.

**롤업 블록체인:**

**\<실행 — 롤업\>**

1.  사용자는 생성하는 트랜잭션을 롤업의 멤풀로 전송한다.
2.  단일 시퀀서는 멤풀에서 블록에 포함시킬 트랜잭션을 선택한다.
3.  단일 시퀀서는 선택한 트랜잭션이 유효한지 확인한다.
4.  유효한 트랜잭션을 시퀀서가 정한 순서대로 블록에 담는다.
5.  정해진 순서로 트랜잭션을 실행하여 블록의 결과값을 계산한다.
6.  이더리움에 전송될 것을 약속하는 롤업의 특별한 기능(soft-commitments)을 제공한다.
7.  이더리움에 블록 내용과 결과값을 전송하여 검증과 저장을 요청한다.

**\<정산 — 이더리움\>**

1.  롤업이 전송한 정보를 바탕으로 블록의 결과값이 유효한지 검증한다.
2.  결과를 블록에 포함시키고 블록체인에 연결하여 정보를 저장한다.
3.  롤업의 결과가 포함된 블록을 다른 마이너에게 전달하여 결과에 대한 보안과 분산화를 강화한다.

현재 대부분의 롤업들은 앞서 설명한 바와 같이 중앙화된 단일 시퀀서를 사용하고 있으며, 해당 네트워크의 운영 주체(Optimism: Optimism PBC, Arbitrum: Offchain Labs 등)들이 각 롤업의 시퀀서 역할을 수행하고 있다.

# 2.4 Limitation

상술한 바와 같이, 시퀀서의 역할은 해당 네트워크를 조절하는 운영 주체가 전적으로 맡고 있다. 이러한 구성은 확장성을 증진하는 데 장점을 지니고 있으나, ‘신뢰’라는 부가적인 요소를 도입하면서 일련의 명확한 한계를 안게 된다. 첫 번째로 대표적인 한계로는 SPOF(단일 장애 지점)의 존재가 거론될 수 있다. 이에 대한 예시로는 Arbitrum의 과거 사례가 있는데, 시퀀서 노드의 하드웨어 결함으로 인해 시퀀서가 작동을 멈추고, 결과적으로 Arbitrum 체인을 일시적으로 사용할 수 없는 상태가 되었던 경우가 빈번하게 존재한다.

![](ee19e4-B86DvmxJG4eQvKLJYsxSEQ.png)

*(출처: Arbitrum Twitter)*

또한, 시퀀서의 핵심 역할 중 하나는 Layer-2로부터 Layer-1로의 자산 이동인데, 이 과정에서 해당 거래가 정당한 것임을 증명하기 위해 유효성 증명(validity proof) 혹은 사기 증명(fraud proof) 과정을 거쳐야 한다. 이 과정은 사용자가 직접 수행할 수 없으며, state transition이 필요한 작업으로 해당 네트워크의 시퀀서가 대신 수행해야 한다. 상기한 바와 같이, 만일 시퀀서가 작동을 멈추면 사용자는 자산을 회수할 수 없게 되고, Layer-2 블록의 생성 또한 중단된다(물론 ‘escape hatch’와 같은 기능을 제공하기도 하지만 이용료가 높다). 더욱이, 중앙 집중화된 시퀀서는 검열 저항성 면에서 취약하며, 거래 정렬과 Layer-2 블록 생성을 담당하는 단일 시퀀서가 부정한 목적을 가질 경우, 모든 MEV를 독점할 수 있게 된다.

마지막으로, 각각의 독립적인 시퀀서와 솔루션의 차이로 인해, Layer-2 간의 상호 운용성과 결합도가 떨어진다. 롤업들은 Layer-1(예: 이더리움 네트워크)을 데이터 가용성 레이어로 공유하게 되지만, 각자의 시퀀서와 독자적인 인프라 때문에 사용자들은 높은 비용과 복잡성을 수반하는 크로스 시퀀서 브리지를 이용해야 하며, 이는 이미 제한된 유동성의 분산과 비효율성을 야기한다.

# 2.5 Effort

단일 시퀀서의 한계를 극복하기 위해 주요 Layer-2 네트워크들(Arbitrum, Optimism, StarkNet 등)은 별도의 시퀀서 선출을 위한 컨센서스 모델(PoA: Proof of Authority, PoS: Proof of Stake 등)을 바탕으로, 시퀀서의 탈중앙화를 실현할 수 있는 방법론을 제안하고 있다.

PoS의 경우, 이더리움과 유사하게 Layer-2 토큰을 활용하여 지분 증명을 기반으로 한 Layer-2 컨센서스를 롤업에 구현하는 방식이다. 이러한 방법으로 시퀀서를 선출하고 로컬 컨센서스를 달성함으로써, 단일 시퀀서에 비해 검열 저항력과 네트워크 활성화가 강화되나, 다른 Layer-2 네트워크들과의 상호운용성과 결합도에 제약이 따른다. 이와 유사하게, StarkNet의 시퀀서들도 자체 토큰을 스테이킹하여 컨센서스에 참여하는 방향으로 진행할 계획이며, 슬래싱 정책을 통해 노드 운영의 안정성을 보장한다.

PoA(Proof of Authority)는 신뢰받는 시퀀서 연합(e.g. 개인 또는 기관)이 순환하여 블록을 생성하는 방식이다. 시퀀싱의 순서는 프로젝트별로 다르게 설정되며, 단일 시퀀서에 비해 검열 저항성과 SPOF가 상대적으로 낮지만, 이 또한 마치 거버넌스 위원회와 유사한 형태로 완전한 탈중앙화로는 간주하기 어렵다. 현재 단일 시퀀서를 운영 중인 Arbitrum은 Sequencer Committee를, Optimism은 Multiple Sequencer Module 등과 같은 방식을 채택할 것으로 전망된다.

MEV 경매(MEVA) 방식은 아직 어떠한 롤업에도 채택된 바 없으나, 이더리움의 PBS(Proposer Builder Separation)와 유사한 체계로, 별도의 시퀀서 구축 없이 MEV를 탈중앙화하는데 장점을 지닌다. 결국, 시퀀서들 중에서 가장 높은 입찰가를 제시한 시퀀서에게 블록 생성 권한이 부여된다. 그러나 이 방식 또한, 가장 우수한 성능을 가지고 효율적인 단일 시퀀서에게 권한이 집중될 가능성에 대한 우려가 여전히 존재한다.

# 3. Shared Sequencer

# 3.1 Overview

공유 시퀀서(Shared Sequencer)는 여러 롤업(Layer-2 네트워크)이 결합하여 분산된 시퀀싱 노드 네트워크를 공유하는 구조를 의미한다. 그러나, 여기서 주의해야 할 점은 롤업 관점에서 공유 시퀀서를 연결하여 사용한다는 관점을 현재 단일적으로 운영되고 있는 시퀀서의 주체가 탈중앙화될 수 있다는 것으로 혼동해서는 안 된다는 점이다. 다수의 Layer-2 롤업 체인들(e.g. 아비트럼, 옵티미즘, 스타크넷 등)이 공유 시퀀서를 사용하여 트랜잭션을 정렬할 수 있지만, 이 시퀀서 자체가 단일 엔티티에 의해 운영될 수 있다는 것을 의미한다. 이러한 구조가 효율성을 높일 수 있지만, 이는 롤업이 완벽하게 탈중앙화되지 않았음을 시사한다. 따라서, Espresso와 같은 프로젝트는 실질적으로 이러한 문제를 해결하기 위해 노력하고 있다. Espresso는 Sequencer as a Service (SaaS) 모델을 사용하여 공유 시퀀서 구조를 제공하지만, 그 목적은 시퀀서 자체를 탈중앙화하는 데 있다. 이는 Eigenlayer를 활용하여 Hotshot 프로토콜을 따르며, 이를 통해 롤업의 시퀀싱이 더 분산되고 탈중앙화된 방식으로 처리될 수 있다. 그렇지만, 공유 시퀀서의 개념은 현재 롤업들이 의존하고 있는 중앙화된 단일 시퀀서를 대체하는 것을 목표로 삼고 있다. 공유 시퀀서 네트워크는 롤업을 통한 확장성 향상과 더불어, 보다 탈중앙화된 체계를 제공하는 구조로서 주목받고 있다. 향후 출현할 수 있는 다양한 롤업들은 공유 시퀀서 네트워크에 시퀀싱 구축과 운영을 위임함으로써, 트랜잭션의 정렬을 보장받을 수 있을 것이다.

![](ee19e4-CBoCAGOyZP0VJo7algXrog.jpeg)

*Aggregation Theory for Shared Sequencing(출처: Maven11 Research)*

# 3.2 Benefits

공유 시퀀서 네트워크는 모듈화된 시스템을 제공하며 롤업 구축의 간소화 및 편의성을 제공하는데 중요한 역할을 할 수 있다. 간단히 요약하면, 롤업의 구성 요소 중 멤풀과 시퀀서를 분리하여 아웃소싱할 수 있다는 점이다. 롤업들이 공유 시퀀서 네트워크를 통해 트랜잭션을 정렬하게 되면, 롤업들 간에 취합된 모든 트랜잭션 데이터를 더욱 쉽게 공유하고 상호작용할 수 있게 되며, 이는 전체 Layer-2 블록체인 생태계의 유기적인 상호작용을 가능하게 한다.

- 트랜잭션 정렬(ordering) = 공유 시퀀서
- 트랜잭션 실행(execution) = 롤업

이러한 미들웨어를 통해 롤업은 시퀀싱 레이어를 직접 구축할 필요 없이, 또한 탈중앙화 네트워크에서만 제공할 수 있는 검열 저항성 보장의 이점을 누릴 수 있다. 또한, 롤업의 트랜잭션 데이터는 Layer-1에 저장되고 각 롤업 풀 노드가 상태를 유지하고 실행을 수행하므로 업데이트가 용이하며 상대적으로 공유 시퀀서의 의존성은 높지 않다. 이를 통해 각 롤업에서는 상태 전환 기능을 차별화하고 최적화하는 데 집중할 수 있으며, 다양한 사용 사례에 더 나은 서비스를 제공할 수 있는 고유한 성능을 개발할 수 있다. 이러한 이유로 공유 시퀀서를 SaaS(Sequencing as a Service)로 명칭하기도 한다.

**공유 시퀀서가 트랜잭션 정렬(ordering)을 담당하는 동안, 롤업은 트랜잭션 실행(execution)을 처리합니다.**

**시퀀싱 레이어 — 트랜잭션 정렬(ordering):**

1.  사용자는 시퀀싱 레이어의 멤풀에 트랜잭션을 전송합니다.
2.  시퀀싱 레이어의 운영자는 멤풀에서 블록에 담을 트랜잭션을 선택합니다.
3.  운영자는 선택한 트랜잭션이 유효한지 확인합니다.
4.  유효한 트랜잭션을 자신이 정한 순서대로 담아서 블록을 생성합니다.
5.  블록을 롤업의 운영자에게 전송합니다.

**실행 레이어(롤업) — 트랜잭션 실행(execution):**

1.  롤업의 운영자는 순서대로 트랜잭션을 실행하여 블록의 결과값을 계산합니다.
2.  이더리움에 블록 내용과 결과값을 전송하여 검증과 저장을 요청합니다.

**정산 레이어 — 정산(이더리움):**

1.  롤업이 전송한 정보를 바탕으로 블록의 결과값이 유효한지 검증합니다.
2.  결과를 블록에 포함하고 블록체인에 연결하여 정보를 저장합니다.
3.  롤업의 결과가 포함된 블록을 다른 마이너에게 전달하여 결과에 대한 보안성과 분산화를 강화합니다.

**데이터 가용성 레이어 — 정보 저장:**

1.  모든 과정에서 보관이 필요한 정보들을 저장하며, 정보를 검증하지 않고 단순 저장합니다.

공유 시퀀서는 롤업들이 크로스체인 메시징과 브릿징을 효율적으로 처리할 수 있도록 지원하며, 이를 통해 저렴한 비용, 높은 속도, 그리고 높은 안전성을 달성한다. 이를 통해 Layer-2 간의 상호 운용성이 향상되며, 다양한 롤업 체인들의 트랜잭션들을 통합적으로 시퀀싱할 수 있다. 이는 통합된 블록 생성, 크로스 롤업 아토믹 스왑, 그리고 파편화된 유동성의 통합 등에 기여하게 된다. 예를 들어, 사용자는 아비트럼(Arbitrum) 롤업의 트랜잭션을 옵티미즘(Optimism) 롤업의 트랜잭션과 상호작용할 수 있도록 설정할 수 있으며, 이러한 기능은 아토믹 크로스 롤업 차익 거래와 같은 새로운 기회를 제공한다.

또한, 공유 시퀀서를 통한 상호 운용성은 개별 롤업 체인들이 각각 클라이언트를 구축하고 상호 운용 체인의 컨센서스를 지속적으로 동기화하는 부담을 줄여줄 수 있다.

공유 시퀀서가 단일 시퀀서 디자인에 비해 제공하는 주요 이점들을 요약하면 다음과 같다:

1.  **검열 저항성(Censorship resistance)**: 공유 시퀀서는 여러 롤업들이 함께 사용하기 때문에, 개별 롤업의 중앙화된 시퀀서보다 더욱 검열에 대한 저항성이 높아진다.
2.  **아토믹 크로스 롤업 결합성(Atomic cross-rollup composability)**: 서로 다른 롤업 체인들 간에 트랜잭션을 아토믹하게 처리할 수 있으며, 이로 인해 사용자들은 여러 롤업 체인들 간에 트랜잭션을 효율적으로 처리할 수 있다.
3.  **기존 및 신규 롤업을 위한 플러그 앤 플레이 솔루션**: 공유 시퀀서는 롤업 체인들이 쉽게 연결될 수 있도록 지원하며, 롤업의 구축과 운영을 간소화하는 데 도움을 준다.

이렇게 공유 시퀀서는 블록체인 네트워크의 확장성, 상호 운용성, 그리고 안정성을 개선하는 데 중요한 역할을 수행할 수 있습니다. 이는 Layer-2 솔루션들이 더욱 성숙해지고 기술적인 발전이 이루어짐에 따라 중요한 요소로 작용할 것으로 보인다.

# 4. SUAVE

# 4.1 Idea

지금부터는 앞서 설명한 공유 시퀀서와 구조적으로 유사하면서, 상호 보완적으로 작동할 수 있는 SUAVE에 대해 알아볼 것이다. 공유 시퀀서와 비슷하게, SUAVE도 여러 체인의 트랜젝션이 모이는 universal한 멤풀을 가지고 있으며 해당 멤풀을 기반으로 블록 빌딩을 한다. 차이점은 공유 시퀀서가 롤업의 시퀀싱 레이어를 아웃소싱하는 데에 초점을 맞추고 있다면, SUAVE는 Layer-1과 Layer-2를 포괄하여 효율적인 블록 빌딩을 하는 데에 초점을 맞추고 있다는 점이다.

이러한 공통점 및 차이점을 가지고 SUAVE와 공유 시퀀서는 서로 보완적인 기능을 수행할 수 있는데, 그 전에 SUAVE가 무엇인지 더 자세히 이해할 필요가 있다. 앞서 언급했듯이 SUAVE는 Flashbots이 개발 중인 범용 플러그 앤 플레이 솔루션으로, 모든 체인에 대해 멤풀과 분산 빌더의 기능을 제공하고자 한다. 이 설계에 따르면, SUAVE 사용자는 자신의 트랜젝션을 목적지 체인의 공용 멤풀이 아닌 SUAVE 멤풀로 보낼 수 있다. SUAVE는 멤풀의 트랜젝션들을 블록으로 만드는데, 이 블록은 사용자가 의도한 목적지 체인의 완전한 블록으로써 체인에 받아들여질 수 있다. 여기서 핵심은 SUAVE가 만드는 블록이 MEV의 관점에서 상당히 효율적인 블록이라는 점이다. 앞서 Flashbots는 MEV-Boost를 통해 MEV를 효율적으로 추출하는 블록을 만드는 솔루션을 제시한 바 있다. SUAVE는 이를 cross-chain으로 확장하면서, 기존에 제기되었던 빌더 중앙화 문제를 해결하고자 한다. 이것이 어떻게 가능한지, 아래에서 SUAVE의 기획 의도와 아키텍처를 살펴보자.

![](ee19e4-LubvheTkZVAb27zSxMloYg.png)

*SUAVE (출처: Flashbots)*

![](ee19e4-k01pQuufr1IvBFgS0eKGBA.png)

*SUAVE (출처: Flashbots)*

# 4.2 Cross-domian MEV

SUAVE의 기획 의도 중 하나는 cross-domain MEV의 어려움을 해소하는 것이다. Flashbots에 따르면, Multi chain universe에서는 유동성의 파편화로 인한 cross domain MEV 기회가 그 전에 비해 더 자주 포착될 수 있다. 그러나 cross domain MEV로 이득을 취하는 것은 어려운 일이다.

![](ee19e4-4jVP2SiCvSKWiWCPWspfaQ.png)

*The multichain world is centralized (출처: Alex Obadia (Flashbots))*

예를 들어 optimism에서의 ETH 가격이 400 DAI, Arbitrum에서의 ETH 가격이 300 DAI라고 하자. 가격 불균형이 사라지기 전에 빠르게 아비트라지를 수행해야 한다. 여기에는 몇 가지 방법이 있는데, 우선 native bridge나 non-native bridge를 사용하는 것은 아비트라지를 하기에 너무 느리다. 그렇다면 bridge를 사용하지 않고 두 domain에 동시에 자산을 가지고 있을 수 있다. optimism에 있는 ETH로 DAI를 사고, 동시에 arbitrum에 있는 DAI를 팔아 ETH를 사면 된다. 하지만 이런 일을 반복하려면 자산의 잦은 리밸런싱이 필요하므로 이 역시 불편한 방법이다.

Cross-domain MEV 기회가 늘어났기 때문에, sequencer 관점에서는 다음이 성립할 것이라고 생각할 수도 있다.

> **mev(a+b) \> mev(a) + mev(b)**

mev(a) : a체인에서 transaction 순서를 조정했을 때 얻을 수 있는 mev 수익

서로 다른 도메인의 DEX가 동일한 가격을 가리키고 있다가, 한쪽 DEX에서 큰 스왑이 일어난다거나 하면 위 공식이 성립하는 상황이 생긴다. 그러나 single sequencer를 가정했을 때, 실제로는 sequencer 간의 communication cost가 있기 때문에 위 식은 다음과 같이 쓰여져야 한다.

> **mev(a+b) \> mev(a) + mev(b) + a**

`alpha : communication cost`

문제는 여기서 communication cost가 아주 크다는 것이다. 두 sequencer는 서로 다른 도메인에 있기 때문이다. 따라서 sequencer들이 공모하여 mev 수익을 얻기 위해서는 communication cost를 최대한 줄이는 것이 중요하다.

정리하자면 일반 아비트라저들은 cross-chain MEV를 쉽게 할 수 있는 솔루션을 요구하고, sequencer들은 서로 다른 도메인의 sequencer들과 communication하는 비용을 줄일 수 있는 솔루션을 요구한다. 앞으로 더 설명하겠지만, 이 두 요구를 자유로운 preference 표현과 universal preference mempool로 충족시키겠다는 것이 SUAVE의 목표이다.

# 4.3 Exclusive Orderflow

![](ee19e4-6dgKC6w7lCE5-0MBzemNg.png)

*Exclusive Orderflow (출처: Volt Capital)*

SUAVE의 두번째 문제의식은 Exclusive orderflow로 인한 빌더의 중앙화이다. Exclusive orderflow란, 말 그대로 주문 흐름(Orderflow)을 독점적으로 가져가는 것을 의미한다. Orderflow는 트랜젝션을 포함하여 체인의 state를 변경하고자 하는 시도이다. Builder는 추가적인 기능(개인정보 보호, pre-confirmation 등)을 사용자에게 제공하거나 MEV 수익 일부를 되돌려줌으로써 주문 흐름을 독점할 수 있다.

EOF의 문제는 Builder의 중앙화를 가속화한다는 것이다. EOF를 통해 Builder는 다른 Builder보다 더 많은 수익을 취할 수 있고, 증가한 수익을 기반으로 더 나은 트랜젝션 처리 속도를 제공하여 더 많은 EOF를 가져갈 수 있다. 더 많은 EOF를 가져가는 Builder가 그 EOF를 기반으로 또 다시 더 많은 EOF를 받을 수 있는 구조인 것이다. 따라서 EOF는 Builder 중앙화에 핵심적인 역할을 한다. SUAVE는 OFA(Orderflow Auction)를 통해 builder들이 공개적으로 경쟁할 수 있게 함으로써 이 문제를 해결하고자 한다.

# 4.4 Architecture

SUAVE의 구조를 좀 더 자세히 살펴보자. SUAVE는 세 가지 영역으로 나누어 볼 수 있는데, Universal Preference Environment, Optimal Execution Market, Decentralized Block Building이다.

![](ee19e4-63nC-sCkwEF0Ml2D-exJsg.png)

*SUAVE (출처: Flashbots)*

# 4.5 Universal Preference environment

Universal preference environment는 사용자들의 preference가 집계되는 공간이다. 여기서 preference는 SUAVE에서 핵심적인 개념으로, SUAVE의 기본 트랜젝션 유형에 해당한다. Preference는 서명을 포함하는 메시지인데, 이 메시지에 사용자가 이루고자 하는 특정한 목표와 지불 조건이 담겨 있다. 여기에서 목표는 단순한 자산 이동부터, 자산 브릿징, cross-chain mev까지 복잡도가 다양할 수 있다. 이 목표는 이후 살펴볼 executor라는 역할군에 의해 달성되는데, 이 때 executor에 의해 지불 조건이 달성될 경우 사용자의 지불이 잠금 해제되는 방식이다.

**Example preferences \[exec(preference, s) → outputs b, e (s: state of SUAVE, b: 지불 금액, e: 지불 대상)\]**

![](ee19e4-yuBmzacT4WOFPY6Uj2gIGA.png)

*SUAVE (출처: Flashbots)*

지금부터 자주 등장할 preference 개념에 대해 더 자세히 알아보자. SUAVE는 EVM fork chain이므로, preference는 smart contract처럼 표현될 수 있다. Smart contract의 형태로 preference를 작성하고 나면, user는 preference를 실행시키기 위해 SUAVE에 자금을 예치한다. 예치한 자금 범위 내에서 bid를 붙여서 preference environment에 자신의 preference를 보낼 수 있게 된다. 이 때 bid가 지불되는 대상은 smart contract의 실행(preference의 충족) 이후 동적으로 지정되게 된다. 예를 들어 preference의 내용이 “block 2번의 트랜젝션 로그에 \[x\]가 포함되어야 한다”라면, bid를 지불할 대상은 \[x\]에 해당하는 트랜젝션의 originator이다. 그러나 preference의 내용이 “block 3번은 비어 있어야 한다”라면, bid를 지불할 대상은 miner이다.

이렇게 bid 지불 대상이 동적으로 지정되는 이유는 MEV 수익을 MEV 생성에 기여한 entity에게 나눠주기 위함이다. User가 preference를 작성하여 cross-chain MEV를 한다면, User가 얻는 이득의 일부가 bid의 형태로 해당 MEV를 달성시킨 entity들에게 돌아가게 된다. 이러한 관점에서 SUAVE는 지불 대상을 executor나 miner 등으로 static하게 지정하는 것이 아니라, 실행 결과 동적으로 지정하게 설계되어 있다.

SUAVE에서 transaction에 대응되는 preference가 모이게 되는 곳이 preference environment이라는 점에서, preference environment는 SUAVE의 멤풀에 해당한다고 할 수 있다. Flashbots에 따르면 이 멤풀에는 여러 체인의 preference가 모일 수 있다고 한다. 예를 들어 이더리움에 배포된 smart contract 호출과 polygon에서의 MEV 활동 등의 preference가 모두 SUAVE의 단일한 멤풀에 담길 수 있는 것이다.

이렇게 모든 체인에 대해 universal한 mempool을 구성하는 이유는 다음 두 가지 목표를 달성하기 위해서이다. 첫 번째로, executor가 실행을 최적화할 수 있는 기회를 더 많이 포착할 수 있게끔 하는 것이다. 여러 체인에 대한 preference가 한 멤풀에 쌓이게 되면 멤풀에 쌓이는 preference의 양 자체가 늘어난다. 이렇게 늘어난 preference 덕분에 executor는 유사한 거래를 일괄 처리하는 등의 최적화를 더 자주 수행할 수 있다. 두번째로는 cross-domain MEV의 communication cost를 낮추기 위한 것이다. 여러 체인의 preference가 쌓이기 때문에, preference를 번들 및 블록으로 만드는 executor들은 다른 도메인의 preference에 쉽게 관여할 수 있다. 다른 도메인의 preference가 어떻게 정렬되는지를 알 수 있고, 더 나아가 자신이 해당 preference를 정렬할 수도 있는 것이다. 이를 통해 앞서 말한 cross-chain으로 트랜젝션을 정렬하는 이득을 더 쉽게 취할 수 있게 된다.

# 4.6 Optimal Execution Market

Optimal Execution Market은 Executor라는 역할군이 앞서 설명한 멤풀을 듣고 있다가, preference에 대한 최적의 execution을 제공하기 위해 경매(OFA, Orderflow Auction)를 벌이는 공간이다.

먼저 Executor가 무엇인지 설명하고 넘어가자. Executor들은 preference를 보고 preference의 목표를 달성할 수 있는 최적의 transaction bundle을 생성한다. 또한, 다른 executor의 bundle에 자신의 bundle을 붙여 나가면서 블록을 만들기도 한다. 기존 MEV-Boost와 비교했을 때, 트랜젝션 번들을 기반으로 블록을 만든다는 점에서 Builder와 유사한 측면이 있다. 차이점은 블록을 만드는 과정을 단일 executor가 아닌 여러 executor들이 협업해서 수행한다는 점과, 트랜젝션 번들을 만드는 것에도 관여한다는 점이다. 즉 번들을 만드는 searcher의 역할을 대신하면서 builder의 역할을 나눠 갖는 entity라고 할 수 있다. 아래는 MEV-Boost와 SUAVE에서 MEV 활동의 각 단계를 어떤 entity들이 수행하는지를 나타낸 그림이다.

![](ee19e4-6L2WfCognY3c7a_2QPnfjg.png)

*(출처: 자체제작)*

여기서 어떻게 preference를 bundle로 변환하는지는 아직 구체적인 언급이 없는 상황이다. 그보다도, OFA를 통해 user에게 MEV 수익을 분배하자는 아이디어가 SUAVE의 핵심이다. SUAVE에서는 일반적인 블록체인에서의 경매 상황과 다르게, executor에서 user 쪽으로 입찰을 진행한다.

이것이 가능한 이유는 MEV라는 특수한 상황에서는 user의 트랜젝션 생성 자체가 중요한 역할을 하기 때문이다. 일반적으로 블록체인에서 경매란 트랜젝션을 블록에 포함시키고자 하는 user가 proposer쪽으로 수수료를 지불하는 형태로 이루어진다. 트랜젝션을 블록에 포함시키는 권한이 proposer에게 있기 때문이다. 반면 MEV 추출 상황에서는 proposer 뿐만 아니라 트랜젝션을 생성하는 user의 역할도 중요해진다. User의 트랜젝션이 MEV 추출 대상이기 때문이다.

현재 OFA의 첫 번째 draft는 최근 발표된 MEV-Share이다. MEV-Share에서는 Matchmaker라는 신뢰주체가 존재하고, MEV 수익 rebate 또한 경매가 아닌 Matchmaker가 지정한 validity condition에 의해 이루어지고 있다. 그러나 이는 OFA를 구현하기 위한 초보적인 단계이며, 앞으로 SGX를 활용하여 Matchmaker를 없애고 executor들의 경매을 통한 MEV rebate가 구현될 것으로 보인다.

![](ee19e4-32rhlZ2O-pfXm1bgrr6jrA.png)

*SUAVE (출처: Flashbots)*

아직 경매에 대한 세부 구현은 나오지 않았지만 Flashbots는 다음 두 가지 옵션을 고려하고 있다.

첫 번째는 ‘명시적 경매’로, 가장 일반적인 경매 개념에 가까운 구현이다. 일정 시간 동안 user가 자신의 트랜젝션을 공개하고 executor들이 이에 대해 입찰을 하면 그 중 가장 높은 bid를 붙인 executor에게 트랜젝션 실행을 허용하는 것이다. User가 이를 직접 진행하지 않아도, 현재 Rook과 같은 경매 중개 플랫폼이 이를 대신하는 서비스를 구현하고 있다. SUAVE가 이와 같은 명시적 경매를 구현하는 것이 불가능한 선택지는 아니라는 것이다.

두번째는 ‘Fee escalator’방식으로, 트랜젝션의 fee가 시간에 대해 점차 증가하게끔 하는 구현이다. 예를 들어 user는 fee가 -200\$로 시작하는 트랜젝션을 보낼 수 있다. 만약 이 트랜젝션이 MEV 수익 100\$를 발생시킬 것으로 예상된다면, executor는 fee가 -100\$ 이상으로 올라가는 시점에 해당 트랜젝션을 가져가야 한다.

위 두가지 설계는 executor가 user 트랜젝션의 MEV 수익을 합리적으로 예측할 수 있다는 가정 하에 가능하다. 그러나 동시에 SUAVE는 MEV-Share나 SGX-based OFA에서 유추할 수 있듯 멤풀을 executor로부터 숨기려고 있다. Executor가 preference를 볼 수 있다면, OFA를 하는 대신 따로 builder에게 트랜젝션 번들을 바로 전달할 수 있기 때문이다. 이렇게 user 트랜젝션의 일부가 숨겨진 상황에서도 executor로 하여금 MEV 수익을 제대로 유추할 수 있게 하는 것이 앞으로 남은 설계의 핵심으로 보인다.

# 4.7 Decentralized Block Building

Decentralized Block Building(DBB)은 executor에 의해 실행 경로가 명시된 preference들을 하나의 block으로 만드는 공간이다. 아직 구체화가 많이 되지 않은 부분 중 하나이지만, flashbots는 한 주체가 블록을 만드는 것이 아닌 여러 executor가 협업하여 하나의 블록을 완성하는 형태를 염두에 두고 있다. Executor가 OFA로 preference의 최적 실행 방법을 명시하면 이는 트랜젝션 번들과 같은 형태가 된다. 이 번들에 다른 Executor들이 자신이 만든 트랜젝션 번들을 추가할 수 있고, 이 과정이 반복되면서 완전한 블록이 만들어지는 형태이다. Executor들의 협업을 통해 블록이 완성되므로, 이 과정은 탈 중앙화된 블록 생성이라고 할 수 있다.

# 4.8 After Block Building

지금까지 Flashbots가 나눈 SUAVE의 세 가지 구성요소에 대해 살펴보았다. 그러나 이 세 가지 구성요소만으로는 SUAVE의 트랜젝션 flow를 모두 설명할 수 없다. DBB를 통해 생성된 블록을 SUAVE 외부 체인의 proposer가 어떻게 받아들이는지, 외부 체인에 트랜젝션이 반영된 이후 preference의 지불은 어떻게 잠금 해제되는지 등이 해명되지 않았기 때문이다.

먼저 외부 체인의 proposer가 SUAVE의 블록을 받아들이는 방법에 대해 알아보자. 우선 SUAVE는 완전한 block을 산출하는 미들웨어로 존재하므로, SUAVE 블록을 받아들이기 위한 프로토콜 단의 변화는 필요하지 않다. 따라서 proposer는 SUAVE가 생성하는 블록을 듣고 있다가, 해당 체인의 공개 멤풀로부터 만들어진 전통적인 블록보다 SUAVE 블록의 bid가 더 높을 경우 SUAVE 블록을 선택할 수 있다. 만약 proposer가 SUAVE에서 생성되는 블록을 듣고 있지 않다면, executor는 third party channel을 통해 proposer에게 접근하면 된다. 예를 들어 PGA(Priority Gas Auction)를 통해 자신의 번들을 블록에 포함시킬 수도 있고, MEV-Boost를 사용할 수도 있다.

어떤 방식으로든, 블록 혹은 번들이 목적지 체인에 제출되어 user의 preference가 달성된 경우 이 사실이 oracle을 통해 SUAVE에 전달된다. 예를 들어 preference의 지불 조건이 0xdeadbeef에 1ETH를 전송하는 것이라고 해 보자. 이 조건이 달성되었음을 나타내는 증거는 transfer event가 될 수 있다. 그렇다면 oracle을 통해 transfer event가 SUAVE로 전달되고, SUAVE는 이것을 보고 preference의 지불을 수행한다.

# 4.9 Transaction Flow

지금까지 살펴본 Architecture를 wrap-up하기 위해, SUAVE의 transaction flow를 간단하게 알아보자.

![](ee19e4-gxF3_C7W7WaVPa1oHdWJww.png)

*SUAVE Preferences (출처: dba:)*

1.  User는 preference를 작성한다.
2.  여기서 이전에 배포한 preference가 있거나, preference 템플릿이 있는 경우 재활용이 가능하다.
3.  User는 SUAVE에 자금을 예치하고 preference를 mempool로 보낸다.
4.  Executor는 OFA를 통해 preference를 트랜젝션 번들과 유사한 형태로 만든다.
5.  Executor가 만든 트랜젝션 번들 혹은 블록을 목적지 체인의 block proposer가 채택한다.
6.  Oracle을 통해 preference 지불 해제 조건이 달성되었음이 SUAVE 체인으로 전달된다.
7.  SUAVE 체인은 해당 조건을 확인하고 사용자의 자금을 지불 대상에게 지불한다.

# 4.10 Pros & Cons

SUAVE는 등장한 지 얼마 되지 않은 기획이며, 로드맵을 모두 달성하는 데에만 4년에서 5년이 걸린다고 한다. 위 설계를 봐도 SUAVE의 지불 방법, preference 처리 방법 등 모호하게 느껴지는 부분이 많다. 이렇게 복잡하고, 달성되기도 어려운 SUAVE가 필요한 이유는 다음의 장점들을 누릴 수 있기 때문이다.

먼저 앞서 언급했듯이, cross-chain MEV를 효율적으로 할 수 있기 때문이다. Universal한 preference environment 덕분에 executor들의 communication cost가 줄어든다. 또한, user 입장에서도 preference를 작성하여 cross-chain MEV를 쉽게 할 수 있다. 원한다면 지불 조건을 조정하여 risk를 없앨 수도 있고, mev 이후 자산 브릿징까지 한번에 하게끔 할 수도 있다.

다음으로, 빌더 중앙화를 해결할 수 있기 때문이다. SUAVE에는 EOF가 없고, executor들이 orderflow를 두고 공개적으로 auction을 벌이게 된다. 따라서 앞서 언급한 EOF의 악순환과 그로 인한 빌더 중앙화를 방지할 수 있다.

SUAVE를 사용하면 OFA를 통한 MEV 수익의 탈중앙화 또한 누릴 수 있다. OFA를 통해 MEV 수익이 orderflow를 발생시키는 user에게 돌아가기 때문이다. User가 아비트라지 등의 MEV를 하는 경우에도, preference의 bid 지불 대상이 동적으로 결정되므로 해당 MEV를 가능하게 해 준 당사자에게 수익이 일부 돌아가는 효과가 생긴다.

이 뿐만 아니라 멤풀 및 블록 빌더의 역할을 아웃소싱 할 수 있다는 점, 로직의 큰 변경 없이도 block proposer의 수익원을 늘릴 수 있다는 점 등이 장점이 될 수 있다.

아직 구체적인 설계가 나오지 않은 상황에서, SUAVE를 구현하는 데에 까다로울 수 있는 부분을 짚어 보면 다음과 같다.

먼저 MEV-Share에서 지적된 것과 비슷하게, preference의 bid가 지불되는 대상을 확정하는 것이 어려운 경우들이 있을 수 있다. 만약 지불 조건을 만족시킨 것이 트랜젝션 하나가 아니라 트랜젝션 번들 덕분이었다면 어떨까? 번들의 user들에게 어떤 비율로 bid가 돌아가야 하는지를 어떻게 동적으로 알아낼 수 있을지 알기 어렵다. 이 부분은 MEV 수익의 탈중앙화와 연관된 부분이므로, 앞으로 더 많은 논의가 필요할 것으로 보인다.

또한 preference에 대한 execution을 어떻게 제공할 것인지가 불명확하다. Executor가 preference를 트랜젝션 번들과 비슷한 형태로 만든다고 하는데, 어떤 과정으로 이것이 이루어지는지는 나와 있지 않다. 따라서 preference를 작성하는 smart contract가 어떤 것인지, executor들이 만든 트랜젝션 번들은 예를 들면 어떤 형태인지 등, executor의 로직이 좀 더 구체화될 필요가 있다.

위 두가지는 앞으로 SUAVE의 구현을 지켜보면서 해소될 수 있는 문제들이다. 이에 비해 원리적으로 해결되지 않을 것 같은 문제가 있는데, 바로 preference의 atomicity가 보장되지 않는 문제이다. 예를 들어 R1에서 ETH를 사고, R2에서 ETH를 파는 cross-chain MEV 상황을 생각해 보자. MEV가 성공하기 위해서는 R1으로 보내는 트랜젝션과 R2로 보내는 트랜젝션이 모두 성공해야 한다. 이 중 하나라도 실패하면 두 트랜젝션 모두를 롤백할 수 있어야 atomicity를 보장한다고 할 수 있다.

![](ee19e4-Uz5yWa6c86-iKycNZ2JW3A.png)

*SUAVE X-Chain Atomicity (출처: dba:)*

그러나 executor가 두 체인의 block proposer가 아니기 때문에, 이러한 atomicity가 프로토콜 차원에서 보장되지는 않는다. 따라서 user 혹은 executor 중 한 entity는 반드시 두 트랜젝션 중 하나만 성공하는 경우의 리스크를 부담해야 한다. 예를 들어 지불 조건을 두 트랜젝션이 모두 성공했을 때만 bid를 지불하는 것으로 설정한다면, 리스크는 executor가 부담해야 한다. 반면, 하나만 성공해도 bid를 지불하는 조건이라면 user쪽에서 리스크를 부담하는 것이다. 따라서 SUAVE에서 cross-chain MEV의 효율성은 보장될 지 몰라도, 안정성은 보장되지 않는다고 할 수 있다. 앞으로 이 atomicity 문제를 보완할 수 있는 해결책으로, shared sequencer와의 결합을 고려해 보고자 한다.

# 5. Shared Sequencer & SUAVE

SUAVE를 통해 사용자들은 블록체인의 자체 멤풀 대신 SUAVE 멤풀을 사용할 수 있으며, SUAVE는 빌더와 검증자에게 최대의 MEV를 추출할 수 있는 기회를 제공하고, 동시에 사용자들을 MEV 공격으로부터 보호한다. 하지만, 공유 시퀀서 네트워크와 Flashbots의 SUAVE 사이에는 근본적인 차이가 있다. 공유 시퀀서 네트워크는 제안자(Proposer)의 역할을 하여 롤업에 블록 생성을 강요하는 반면, SUAVE는 빌더(Builder)의 역할만을 하여 롤업 체인에 SUAVE 블록을 강제로 제안하지 않는다.

이러한 차이를 기반으로, 롤업은 SUAVE와 공유 시퀀서를 미들웨어로써 동시에 사용하여 각각의 장점을 취할 수 있다. 이를 명확하게 구분하면,

- **공유 시퀀서(Shared Sequencer) = 제안자(Proposer)**
- **SUAVE = 빌더(Builder)**

따라서, 두 시스템은 블록체인 생태계에서 서로 다른 역할을 수행하면서 상호 보완적인 관계를 형성하고, 더 나은 성능과 보안을 제공하는 데 기여할 수 있을 것이다. 한 예로, SUAVE와 공유 시퀀서가가 상호 보완적으로 작용하여 크로스 체인 트랜잭션에 대한 효율성과 안전성을 높일 수 있을 것이다. SUAVE는 크로스 체인 트랜잭션에서 사용자의 선호도를 집계하고 최적화하는 반면, 공유 시퀀서는 롤업 간의 트랜잭션에 대한 atomicity를 보장하는 것이다.

![](ee19e4-33CXJvP8Zi0AEs7CP-_ObQ.png)

*SUAVE X-Chain Atomicity (출처: dba:)*

> 거래-1은 롤업-1의 블록-1에서 이루어지고, 거래-2는 롤업-2의 블록-2에서 이루어진다.

SUAVE는 거래들의 선호도를 집계하고, 어떤 거래가 다른 체인에서 실행될 가능성이 있는지 파악한다. 그러나 SUAVE 자체로는 X-체인 트랜잭션의 atomicity를 보장할 수 없다. 여기에서 공유 시퀀서가 제안자(proposer)의 역할을 하기 때문에, 선택적으로 온보딩된 롤업들 사이에서 트랜잭션의 atomicity를 보장하는 역할을 할 수 있다.

# 6. Outro

결국, SUAVE를 ‘Builder’로, 공유 시퀀서를 ‘Proposer’로 사용하여 두 시스템을 협력시킴으로써 크로스 체인 트랜잭션에서 높은 효율성과 안전성을 달성할 수 있다고 본다. SUAVE는 사용자들의 선호도에 따라 크로스 체인 트랜잭션을 최적화하는 반면, 공유 시퀀서는 해당 트랜잭션들이 안전하게 처리되도록 보장한다. 이와 같이, SUAVE와 공유 시퀀서를 결합함으로써 블록체인 생태계는 사용자들이 효율적이고 안전한 크로스 체인 트랜잭션을 실행할 수 있는 더 나은 환경을 제공할 수 있을 것이다. 하지만, 현재 Layer-1(e.g. 이더리움)의 MEV-Boost와 같이 기존 이더리움의 검증자 셋은 탈중앙화 시킨 상태에서, 중앙화에 대한 문제점은 빌더에게로 그대로 흘러가게 되었다고 생각한다.

크로스 체인 MEV 시나리오에서 빌더는 높은 처리량과 낮은 지연성을 유지하면서, 여러 체인의 트랜젝션을 효율적으로 관리하고 구성해야 한다. 이는 크로스 체인 MEV 시장에서 경쟁력을 유지하는 데에 필요한 소프트웨어 및 하드웨어 리소스가 상당하다는 것을 의미한다. 이렇게 투입해야 할 리소스가 증가하게 되면 시장 진입 장벽이 높아질 뿐만 아니라, 더 많은 Orderflow를 차지하는 빌더가 더 많은 수익을 얻고, 그것을 바탕으로 더 많은 리소스를 투입할 수 있게 되는 현상이 발생할 수 있다. 즉, 크로스 체인 빌더에 대한 중앙화 압력이 발생하는 것이다. 크로스 체인 빌더의 역할을 하는 공유 시퀀서 빌더에게도 이러한 우려가 적용된다. 공유 시퀀서에서 빌더는 높은 처리량과 복잡성을 처리해야 하며, 이로 인해 단일 성능이 뛰어난 빌더가 공유 시퀀서의 모든 롤업에 대해 빌더로 작용할 가능성이 높다.

공유 시퀀서를 이용하는 경우, 공유 시퀸서는 Layer-1과 비슷한 형태의 PBS가 필요로 하며 빌더가 모든 공유 시퀀서 롤업에 대해 하나의 메가 블록을 구축하게 된다면 극단적인 요구사항을 필요로 하게 될 수 있다. 결국, 빌더에게 필요한 높은 수준의 리소스와 요구사항으로 인해, 시퀀서를 탈중앙화하는 것만으로는 충분하지 않을 수 있다. 따라서, 크로스 체인 도메인의 블록 빌딩 자체를 탈중앙화하는 방법을 모색해야 할 것이다. 이는 크로스 체인 생태계의 복잡성과 다양성 때문에 점점 더 어려워 지겠지만 더욱 중요한 과제가 될 것이라고 생각된다.

# **7. Reference**

- [https://hyun-jeong.medium.com/scaling-101-1-sequencing-as-a-service-b60259a88260](https://hyun-jeong.medium.com/scaling-101-1-sequencing-as-a-service-b60259a88260)
- [https://celestia.org/learn/sovereign-rollups/an-introduction/](https://celestia.org/learn/sovereign-rollups/an-introduction/)
- [https://collective.flashbots.net/t/ensuring-user-protection-and-rollup-revenue-with-radius-and-mev-boost/1620](https://collective.flashbots.net/t/ensuring-user-protection-and-rollup-revenue-with-radius-and-mev-boost/1620)
- [https://www.galaxy.com/research/whitepapers/mev-the-rise-of-the-builders/](https://www.galaxy.com/research/whitepapers/mev-the-rise-of-the-builders/)
- [https://mirror.xyz/jon-dba.eth/NTg5FSq1o_YiL_KJrKBOsOkyeiNUPobvZUrLBGceagg](https://mirror.xyz/jon-dba.eth/NTg5FSq1o_YiL_KJrKBOsOkyeiNUPobvZUrLBGceagg)
- [https://joncharbonneau.substack.com/p/encrypted-mempools](https://joncharbonneau.substack.com/p/encrypted-mempools)
- [https://medium.com/fourpillars/mev-share-유저들을-위한-mev-재분배-메커니즘-d68806be228a](https://medium.com/fourpillars/mev-share-%EC%9C%A0%EC%A0%80%EB%93%A4%EC%9D%84-%EC%9C%84%ED%95%9C-mev-%EC%9E%AC%EB%B6%84%EB%B0%B0-%EB%A9%94%EC%BB%A4%EB%8B%88%EC%A6%98-d68806be228a)
- [https://jon-dba.notion.site/jon-dba/research-328fa9c082264b5c82f4763c406fd8a3](https://jon-dba.notion.site/jon-dba/research-328fa9c082264b5c82f4763c406fd8a3)
- [https://joncharbonneau.substack.com/p/rollups-arent-real](https://joncharbonneau.substack.com/p/rollups-arent-real)
- [https://dba.mirror.xyz/NTg5FSq1o_YiL_KJrKBOsOkyeiNUPobvZUrLBGceagg](https://dba.mirror.xyz/NTg5FSq1o_YiL_KJrKBOsOkyeiNUPobvZUrLBGceagg)
- [https://xangle.io/research/detail/1161?utm_source=cobak&amp;utm_medium=organic_community&amp;utm_campaign=weekly_originals_230428](https://xangle.io/research/detail/1161?utm_source=cobak&amp;utm_medium=organic_community&amp;utm_campaign=weekly_originals_230428)
- [https://writings.flashbots.net/order-flow-auctions-and-centralisation](https://writings.flashbots.net/order-flow-auctions-and-centralisation)
- [https://www.youtube.com/watch?v=dv5-Lzntv5M](https://www.youtube.com/watch?v=dv5-Lzntv5M&amp;ref=wb3vb.io)
