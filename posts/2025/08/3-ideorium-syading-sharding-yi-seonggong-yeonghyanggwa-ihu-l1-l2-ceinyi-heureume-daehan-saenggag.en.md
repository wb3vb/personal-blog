---
title: "#3. Thoughts on the Impact of Ethereum Sharding's Success and the Subsequent Flow of L1 & L2 Chains"
tags:
  - ethereum
published: true
date: 2025-08-11 13:10:44
description: "If the Shard Chain, the core of Ethereum 2.0's Phase 1, is smoothly introduced and successfully implemented in Phase 2, what will become of the coexisting Layer-1 chains? As the saying 'winner takes all' goes, will Ethereum's era of sole dominance be completed?"
---

**If the Shard Chain, the core of Ethereum 2.0’s Phase 1, is smoothly introduced and successfully implemented in Phase 2, what will become of the coexisting Layer-1 chains? As the saying ‘winner takes all’ goes, will Ethereum’s era of sole dominance be completed?**

🔗 [\[Ethereum Note\]#3. Thoughts on the Impact of Ethereum Sharding’s Success and the Subsequent Flow of L1 \&amp; L2 Chains](https://medium.com/@wb3vb.eth/ethereum-note-3-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-%EC%83%A4%EB%94%A9-sharding-%EC%9D%98-%EC%84%B1%EA%B3%B5-%EC%98%81%ED%96%A5%EA%B3%BC-%EC%9D%B4%ED%9B%84-l1-l2-%EC%B2%B4%EC%9D%B8%EC%9D%98-%ED%9D%90%EB%A6%84%EC%97%90-%EB%8C%80%ED%95%9C-%EC%83%9D%EA%B0%81-ff6dfcf9b57e)

![](ce4d2b-AAMpxXNccogUgVF9f-BGMA.png)

Written by 

[web3vibe.eth](https://medium.com/u/e78eb57aef2b?source=post_page---user_mention--ff6dfcf9b57e---------------------------------------)

## TL;DR

> *1) After Ethereum successfully activates its shard chains, it will coexist with other Layer-1 & 2 chains and serve the role of a ‘Universal Settlement Layer’\
> 2) Various Layer-1 chains will need to find their PMF and build ecosystems with greater compatibility with Ethereum\
> 3) Continuous research into new models that incorporate diverse blockchain services will be needed*

## 1. On Scalability

The first stage of Ethereum 2.0 focuses on the tools for securing scalability—regarded as Ethereum’s toughest challenge among the blockchain trilemma (scalability, security, decentralization). Because in Ethereum 1.0 every node must process the transactions that occur, it inevitably suffered bottlenecks whenever a service with high community hype appeared.

![](ce4d2b-E40i_voouKVR_AQWXaJGKw.png)

*(Example of a bottleneck\| Source: Google Images)*

Approaches to solving blockchain scalability can be broadly divided into two frames: the first is the monolithic approach, and the second is the modular approach. The monolithic approach handles all tasks (execution, security, data availability) on the existing L1, and presents a scalability solution through technical upgrades to its own base chain.

![](ce4d2b-N_kt3bjRIoM4BnwfnxLLSQ.jpeg)

*(Monolithic \&amp; modular example \| Source: Bankless)*

The modular format is a concept of dividing up the tasks mentioned above; representative examples are L2 rollups—which build a new off-chain architecture to execute and bundle transactions and then handle posting them to L1—and sharding.

Also, Kobaekjang’s (@

[100y](https://medium.com/u/5e5fe9213d31?source=post_page---user_mention--ff6dfcf9b57e---------------------------------------)) detailed thread on Polygon (MATIC), which shows the future of modular blockchains, is easy to understand, so I highly recommend it as a must-read.

[[Polygon Series]#1: Polygon PoS — The Beginning of a Journey Toward Mass AdoptionWe examine the future of the modular blockchain that Polygon is envisioning, and learn about its first product, the Plasma chain, Polygon PoS.medium.com](https://medium.com/a41-ventures/polygon-%EC%8B%9C%EB%A6%AC%EC%A6%88-1-polygon-pos-mass-adoption%EC%9D%84-%ED%96%A5%ED%95%9C-%EC%97%AC%EC%A0%95%EC%9D%98-%EC%8B%9C%EC%9E%91-b907d20fd84f?source=post_page-----ff6dfcf9b57e---------------------------------------)

The basic concept of sharding is a simplified format in which blockchain data is divided through data partitioning, and then a group of validators—assigned via random sampling—is allocated to each shard to share the work of transaction validation; because this allows parallel processing, it improves Ethereum’s scalability problem.

![](ce4d2b-VnHsnHR36cWPogzwVNuDpw.png)

*(Random sampling committee \| Source: @vbuterin’s blog)*

The plan is to secure stability with an initial 64 shards and DAS (Data Availability Sampling) and then increase the number of shards; while this format has the advantage that scalability improves as validators increase, there are concerns about the method of communication between shard chains and about security against malicious attacks.

## 2. The Direction of Layer-2 Chains

Rollups increase throughput by specializing in executing transaction data off-chain, and by rolling up and delegating the minimal interactions—such as finality and settlement—to the existing Layer-1 chain, they improve Ethereum’s poor scalability and high fees.

As the development of Ethereum 2.0 has currently been delayed, in 2022 L2 rollup solutions such as Arbitrum, Optimism, and Polygon grew significantly as a medium-to-short-term strategy. So, if one asks, “After Ethereum 2.0’s sharding succeeds, will L2 technology be rendered obsolete?”—I believe the two ecosystems are highly likely to coexist.

Projects that currently hold meaningful users, TVL, and user ecosystems—such as Arbitrum, Optimism, and Polygon—will, I think, find it hard to lose their existing users, and in order to approach mass adoption they will seek flexible ways to achieve higher scalability through integration with shard chains.

## 3. The Direction of Layer-1 Chains

The reason I pay attention to the success of Ethereum 2.0—often called the endgame—is, I believe, the possibility of solving the blockchain trilemma. The idea is that by improving processing speed (TPS) through shard chains and lowering the barrier to becoming a validator through the PoS consensus algorithm, all three challenges—securing scalability, security, and decentralization—can be solved.

I judge that the impact of Ethereum 2.0’s success on the L1 ecosystem will not be greatly different either. Ethereum is expected to take on a multi-chain form in which it plays the pivotal role of a ‘Universal Settlement Layer’ and coexists with EVM- and eWASM-compatible L1 chains that possess expertise in specific sectors.

Until now, the emergence of new metas—such as the arrival of DeFi, NFTs, and DAOs—has begun with Ethereum and spread to the L1 chains. This is because multiple factors act simultaneously, beyond just the dimension of Ethereum’s technical prowess; among them, I think the symbolism of the ‘smart contract standard’ that everyone agrees upon in the ‘social layer’ constituting the ecosystem carries great weight.

We often see the term ‘Ethereum killer’ used whenever a new L1 project emphasizing fast transaction speeds and low fees appears. However, rather than forming a narrative in which the success of Ethereum 2.0 makes Ethereum a competitor to be surpassed among the L1 chains, I think the competition to secure a share of the blockchain ecosystem pie—one that emphasizes chain compatibility and user accessibility in terms of UI/UX—will grow even fiercer.

## 4. Wrapping Up

As of January 2022, roughly 300 million people worldwide hold cryptocurrency, and for the countless new users who have not yet encountered blockchain, providing a smooth user experience for Ethereum chain integration and compatibility will be a very significant competitive advantage.

I think the probability that future blockchain web and app services will adopt Ethereum 2.0 will rise further, and it is highly likely to trend toward absorbing the ecosystems of the various L1 chains. The current pace of blockchain adoption is very similar to the pace of internet expansion in the 1990s.

![](ce4d2b-YXs7a10F87ghhbDDIhRJrQ.jpeg)

*(Comparison of internet and crypto adoption rates \| Source: CryptoSlate)*

Therefore, like the internet, the adoption of blockchain technology is predicted to rapidly expand into diverse domains—notably finance, gaming, art, and entertainment. Accordingly, as mentioned above, until that point is reached, L1 chains must pursue the following strategies: 1) leveraging their strengths to the fullest to establish PMF (Product Market Fit) and focusing on building a strong blockchain ecosystem and forming a narrative within a specific sector, 2) strengthening Ethereum chain compatibility, and 3) building a globally centered community.

Because dApps built on blockchain have the characteristic of ‘composability,’ I believe that a reverse strategy of merely grafting blockchain onto existing Web2 systems from a fragmentary perspective cannot lead the blockchain market. Therefore, just as the various DEXs derived from Uniswap expanded into lending, borrowing, and margin trading, continuous research into models will be needed—for example: 1) combinations of P2E, NFTs, and DeFi, 2) uncollateralized DeFi services utilizing soulbound tokens (SBTs), and 3) NFT lending services utilizing the ERC-4907 standard, which separates ownership and usage rights.
