---
title: "#3. Thoughts on the Impact of Ethereum Sharding's Success and the Subsequent Flow of L1 & L2 Chains"
category: crypto
tags:
  - ethereum
published: true
date: 2025-08-11 13:10:44
description: 'Even after sharding succeeds, L2s and rival L1s should coexist with Ethereum as a Universal Settlement Layer. L1 chains need PMF and Ethereum compatibility.'
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

The first stage of Ethereum 2.0 focuses on the tools for securing scalability, widely regarded as Ethereum’s toughest challenge among the blockchain trilemma (scalability, security, decentralization). Because every node in Ethereum 1.0 has to process every transaction that occurs, the network inevitably hit bottlenecks whenever a service with a lot of community hype came along.

![](ce4d2b-E40i_voouKVR_AQWXaJGKw.png)

*(Example of a bottleneck\| Source: Google Images)*

There are broadly two ways to approach blockchain scalability: the monolithic approach and the modular approach. The monolithic approach handles everything (execution, security, data availability) on the existing L1, offering a scalability solution through technical upgrades to its own base chain.

![](ce4d2b-N_kt3bjRIoM4BnwfnxLLSQ.jpeg)

*(Monolithic \&amp; modular example \| Source: Bankless)*

The modular format is about splitting up the tasks I just mentioned. The main examples are L2 rollups, which build a new off-chain architecture to execute and bundle transactions before posting them to L1, and sharding.

Also, Kobaekjang’s (@

[100y](https://medium.com/u/5e5fe9213d31?source=post_page---user_mention--ff6dfcf9b57e---------------------------------------)) detailed thread on Polygon (MATIC), which shows the future of modular blockchains, is easy to understand, so I highly recommend it as a must-read.

[[Polygon Series]#1: Polygon PoS: The Beginning of a Journey Toward Mass AdoptionWe examine the future of the modular blockchain that Polygon is envisioning, and learn about its first product, the Plasma chain, Polygon PoS.medium.com](https://medium.com/a41-ventures/polygon-%EC%8B%9C%EB%A6%AC%EC%A6%88-1-polygon-pos-mass-adoption%EC%9D%84-%ED%96%A5%ED%95%9C-%EC%97%AC%EC%A0%95%EC%9D%98-%EC%8B%9C%EC%9E%91-b907d20fd84f?source=post_page-----ff6dfcf9b57e---------------------------------------)

At its core, sharding is a simplified format in which blockchain data is split up through data partitioning, and a group of validators, assigned by random sampling, is then allocated to each shard to share the work of transaction validation. Because this allows parallel processing, it eases Ethereum’s scalability problem.

![](ce4d2b-VnHsnHR36cWPogzwVNuDpw.png)

*(Random sampling committee \| Source: @vbuterin’s blog)*

The plan is to secure stability with an initial 64 shards plus DAS (Data Availability Sampling), then gradually increase the shard count. This format has a clear upside in that scalability improves as more validators join, but it also raises questions about how shard chains communicate with one another and how secure they are against malicious attacks.

## 2. The Direction of Layer-2 Chains

Rollups increase throughput by specializing in executing transaction data off-chain. By rolling up and delegating only the minimal interactions, such as finality and settlement, to the existing Layer-1 chain, they help offset Ethereum’s poor scalability and high fees.

With Ethereum 2.0’s development currently delayed, L2 rollup solutions like Arbitrum, Optimism, and Polygon grew significantly in 2022 as a medium-to-short-term strategy. So if you ask, “After Ethereum 2.0’s sharding succeeds, will L2 technology be rendered obsolete?”, I believe the two ecosystems are very likely to coexist.

Projects that already hold meaningful users, TVL, and user ecosystems, like Arbitrum, Optimism, and Polygon, will find it hard to lose those users, I think. To get closer to mass adoption, they’ll look for flexible ways to reach higher scalability by integrating with shard chains.

## 3. The Direction of Layer-1 Chains

The reason I pay attention to the success of Ethereum 2.0, often called the endgame, is what I see as its potential to solve the blockchain trilemma. The idea is that by improving processing speed (TPS) through shard chains and lowering the barrier to becoming a validator through the PoS consensus algorithm, you can tackle all three challenges at once: securing scalability, security, and decentralization.

I don’t think the impact of Ethereum 2.0’s success on the L1 ecosystem will be all that different. I expect Ethereum to take on a multi-chain form where it plays the pivotal role of a ‘Universal Settlement Layer’ and coexists with EVM- and eWASM-compatible L1 chains that specialize in specific sectors.

So far, every new meta, whether it was the arrival of DeFi, NFTs, or DAOs, has started with Ethereum and spread out to the L1 chains. That’s because more than one factor is at play at once, well beyond Ethereum’s technical prowess. Among them, I’d give a lot of weight to the symbolism of the ‘smart contract standard’ that everyone agrees on in the ‘social layer’ that makes up the ecosystem.

We often see the term ‘Ethereum killer’ whenever a new L1 project shows up touting fast transaction speeds and low fees. But rather than Ethereum 2.0’s success turning Ethereum into a rival for the L1 chains to overtake, I think what gets fiercer is the competition for a slice of the blockchain ecosystem pie, a fight that comes down to chain compatibility and user accessibility in terms of UI/UX.

## 4. Wrapping Up

As of January 2022, roughly 300 million people worldwide hold cryptocurrency, and for the countless new users who haven’t yet touched blockchain, offering a smooth user experience around Ethereum chain integration and compatibility will be a real competitive advantage.

I think future blockchain web and app services are increasingly likely to adopt Ethereum 2.0, and the trend will probably move toward absorbing the ecosystems of the various L1 chains. The current pace of blockchain adoption looks a lot like the pace of internet expansion in the 1990s.

![](ce4d2b-YXs7a10F87ghhbDDIhRJrQ.jpeg)

*(Comparison of internet and crypto adoption rates \| Source: CryptoSlate)*

And just like the internet, blockchain technology will likely spread fast into all kinds of domains, notably finance, gaming, art, and entertainment. Until it gets there, the L1 chains need to pursue a few strategies: 1) playing to their strengths to establish PMF (Product Market Fit) while focusing on building a strong blockchain ecosystem and a narrative within a specific sector, 2) strengthening Ethereum chain compatibility, and 3) building a globally centered community.

Because dApps built on blockchain have the property of ‘composability,’ I don’t think a reverse strategy of just bolting blockchain onto existing Web2 systems in a piecemeal way can ever lead the blockchain market. Instead, much as the various DEXs that grew out of Uniswap expanded into lending, borrowing, and margin trading, we’ll need to keep researching new models, for example: 1) combinations of P2E, NFTs, and DeFi, 2) uncollateralized DeFi services using soulbound tokens (SBTs), and 3) NFT lending services using the ERC-4907 standard, which separates ownership and usage rights.
