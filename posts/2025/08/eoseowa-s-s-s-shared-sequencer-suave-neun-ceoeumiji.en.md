---
title: 'Welcome, Is This Your First Time with S.S.S(Shared Sequencer & SUAVE)?'
category: crypto
tags:
  - ethereum
published: true
date: 2025-08-11 13:16:26
description: "This post is based on a presentation delivered at a Weekly Session of Decipher, the Seoul National University Blockchain Academy, on the topic of 'Shared Sequencer & SUAVE.' It covers shared sequencers, which address the limitations of current rollups that use a single sequencer, as well as Flashbots' SUAVE."
---

This post *is based on a presentation delivered at a Weekly Session of Decipher, the Seoul National University Blockchain Academy, on the topic of 'Shared Sequencer & SUAVE.' This article covers shared sequencers, which address the limitations of current rollups that use a single sequencer, as well as Flashbots' SUAVE.*

🔗 [Is This Your First Time with S.S.S(Shared Sequencer \&amp; SUAVE)?](https://medium.com/decipher-media/s-s-s-shared-sequencer-suave-%EB%8A%94-%EC%B2%98%EC%9D%8C%EC%9D%B4%EC%A7%80-e6cc770bd9bd)

**Author: Lee Minhyeok(**[<strong>@web3vibe</strong>](https://twitter.com/web3vibe)**), Moon Boseol(**[<strong>@1004YUKICHAN</strong>](https://twitter.com/1004YUKICHAN)**)**

**Seoul Nat’l Univ. Blockchain Academy Decipher(**@[decipher-media](https://medium.com/decipher-media))

**Reviewed By Jeong Hyun(**[<strong>@Hyunxukee</strong>](https://twitter.com/hyunxukee)**) & Decipher Media Team**

# 1. Introduction

The Ethereum network enjoys great popularity in supporting blockchain-based decentralized applications. Projects such as non-fungible tokens (NFTs) and decentralized finance (DeFi) have contributed to a significant increase in activity on the Ethereum network. This surge in activity has caused a sharp rise in the gas costs required for transactions and smart contract execution on Ethereum mainnet, which in turn has led to the problem of high fees for users of the Ethereum network.

To solve this problem, the Ethereum ecosystem has introduced various Layer-2 scaling solutions, one of which is the rollup. A rollup is a technology that bundles the transactions occurring on Ethereum mainnet and processes them as a single transaction, greatly improving the network's throughput and reducing transaction fees. The Ethereum community and developers are currently adopting Layer-2 solutions such as rollups in earnest, and they expect that this will allow more users and projects to make use of the Ethereum ecosystem while reducing the burden of high fees. However, current rollups are structured around a single sequencer, which gives rise to problems such as weak censorship resistance and MEV monopolization, and the development of shared sequencers to solve these is also actively underway.

In addition, Flashbots' SUAVE, which has a structure similar to that of a shared sequencer, is expected to achieve even greater effects when it interacts with a shared sequencer. To understand this, let's first revisit the structure of Layer-2 and rollups and work through it step by step.

# 2. Single Sequencer

Currently, most rollups (Arbitrum, Optimism, zkSync, etc.) use a centralized single sequencer. As the name implies, the core role of the sequencer here is to determine, from the memory pool, the order of the transactions to be included in a block, and to submit them to the rollup chain. To understand the sequencer's role, it helps to briefly look at the structure and core components of a rollup first. At present, rollups can be broadly divided into two types, as described below.

# 2.1 Smart Contract Rollup

A smart contract rollup is a type of rollup blockchain that posts all of its transactions to a settlement layer such as Ethereum. First, a quick summary of what a blockchain's settlement layer does: 1) it orders blocks, 2) it checks whether data is available (a DA check), and 3) it verifies the correctness of transactions. From a modular blockchain perspective, this can be seen as a processing layer that verifies whether the transactions executed on the execution layer are correct and connects multiple execution layers (rollups).

In Ethereum's modular stack, a smart contract rollup generally handles execution. It therefore takes the form of delegating the tasks of consensus, data availability, and settlement to Ethereum. As the name suggests, a smart contract rollup relies on a rollup smart contract residing on a settlement layer such as Ethereum to verify blocks. Here, various proof methods are used to efficiently verify whether a block is valid (validity proof) or invalid (fraud proof).

![](ee19e4-N9EdP4pCXEpK7AzteFJzHA.png)

*Smart Contract Rollup (Source: Celestia)*

In addition, through the rollup smart contract, a trust-minimized bridge can be built on and connected to the settlement layer. Because the verification of entire blocks is carried out directly on the settlement layer, this bridge can minimize trust. Therefore, only some participants need to act honestly in order to successfully verify whether a block is valid.

![](ee19e4-dnd5bucFdq2k8gOUkE1HfA.png)

*Smart Contract Rollup (Source: Celestia)*

So in a smart contract rollup, the settlement layer plays an important role, which we can summarize as follows:

1.  It serves as a space where connected rollups submit and verify proofs.
2.  The liquidity held by the settlement layer can be utilized.
3.  When rollups share the same settlement layer (e.g., Ethereum), bridging between rollups becomes easier.

Most of the various widely known rollup solutions today are smart contract rollups, each of which operates and deploys its own client, execution environment (VM), mempool, proof system (in the case of ZK rollups), sequencer, and rollup smart contracts deployed on Layer-1. There may be subtle differences depending on how each project's solution is composed. For example, a ZK rollup submits the state root and calldata to a Layer-1 contract and generates Layer-2 blocks; separately from this, a ZK rollup goes through a process for validity proofs, while an Optimistic rollup follows a separate procedure such as a Dispute Time Delay.

# 2.2 Sovereign Rollup

The sovereign (independent) rollup is a concept first introduced through the ‘Lazyledger’ whitepaper, in the course of researching new blockchain designs using Celestia (a modular blockchain responsible for data availability). In short, it is a type of blockchain that, like a smart contract rollup, records transactions on another blockchain and checks block ordering and data availability, but handles settlement on its own. So it is an independent rollup that combines the execution and settlement layers, processing rollup transactions within the rollup itself and guaranteeing only data availability through a DA layer.

![](ee19e4-kEd2Rz6W8MIfoIPxsad2uQ.jpeg)

*Sovereign Rollup (Source: Celestia)*

In the context of the modular stack, a sovereign rollup handles execution and settlement, while the data availability layer handles consensus and DA. What is special about this structure, however, is that, unlike in a smart contract rollup, the DA layer does not check the correctness of the sovereign rollup's transactions.

Here, the nodes that verify the sovereign rollup are responsible for checking the correctness of transactions. A node therefore verifies the transactions recorded on the DA layer, and if a transaction is invalid, it rejects and ignores that transaction. In the end, the sovereign rollup is responsible for determining the correct chain, and unlike a smart contract rollup, it may optionally have a separate trust-minimized bridge.

A sovereign rollup that uses Celestia as its data availability layer periodically sends a transaction called ‘PayForBlob’ to Celestia to store its data.

In this process, Celestia serves as a single data availability layer shared among multiple rollups, and it stores data in the NMT (Namespace Merkle Tree) format, a Merkle tree with an added field called a Namespace ID, so that a rollup can distinguish and query its own data.

![](ee19e4-UyLo0-Js-VuLNmpBOLBBMw.png)

*Celestia Rollup Explorer (Source: Celestia)*

To summarize the differences between smart contract rollups and sovereign rollups:

1.  Smart contract rollup: Transactions are verified by a smart contract on the settlement layer; upgrading the contract requires a complex process (multi-signature, governance, etc.), and a trust-minimized bridge is required.
2.  Sovereign rollup: Transactions are verified by the sovereign rollup's nodes, and upgrades are possible through forks (node-driven = sovereign). As mentioned earlier, a trust-minimized bridge can be held optionally.

# 2.3 Single Sequencer Transaction Flow

First, to understand how transactions flow through a rollup, let's review the basic transaction flow.

**Monolithic blockchain:**

1.  A user sends a transaction to the mempool.
2.  A validator selects the transactions to include in a block from the mempool.
3.  The validator checks whether the selected transactions are valid.
4.  It places the valid transactions into the block in the order the validator has determined.
5.  It executes the transactions in the determined order to compute the block's result.
6.  It sends the block's contents and result to other validators, requesting verification and storage.
7.  The receiving validators verify whether the block's result is valid.
8.  They connect the valid block to their own blockchain and store the information.
9.  They pass the block's contents and result on to other validators.
10. Once more than 50% of the validators have connected the block to their own blockchain, the state update is complete.

**Rollup blockchain:**

**\<Execution: Rollup\>**

1.  A user sends the transactions they create to the rollup's mempool.
2.  The single sequencer selects the transactions to include in a block from the mempool.
3.  The single sequencer checks whether the selected transactions are valid.
4.  It places the valid transactions into the block in the order the sequencer has determined.
5.  It executes the transactions in the determined order to compute the block's result.
6.  It provides a special rollup feature (soft-commitments) that promises the block will be sent to Ethereum.
7.  It sends the block's contents and result to Ethereum, requesting verification and storage.

**\<Settlement: Ethereum\>**

1.  Based on the information sent by the rollup, it verifies whether the block's result is valid.
2.  It includes the result in a block and connects it to the blockchain to store the information.
3.  It passes the block containing the rollup's result on to other miners to strengthen the security and decentralization of the result.

As we saw, most rollups today use a centralized single sequencer, and the entity operating each network (Optimism: Optimism PBC, Arbitrum: Offchain Labs, etc.) serves as the sequencer for that rollup.

# 2.4 Limitation

As described, the role of the sequencer falls entirely to the operating entity that controls the network. While this configuration has advantages for improving scalability, by introducing the additional element of ‘trust’ it comes to carry a series of clear limitations. The first representative limitation that can be cited is the existence of an SPOF (single point of failure). As an example of this, there is a past case with Arbitrum: there have been frequent instances where a hardware fault in the sequencer node caused the sequencer to stop working, and as a result the Arbitrum chain was temporarily rendered unusable.

![](ee19e4-B86DvmxJG4eQvKLJYsxSEQ.png)

*(Source: Arbitrum Twitter)*

In addition, one of the sequencer's core roles is the movement of assets from Layer-2 to Layer-1, a process that must go through a validity proof or fraud proof to prove that the transaction is legitimate. This process cannot be performed by the user directly; it is a task that requires a state transition and must be carried out on the user's behalf by the network's sequencer. As noted, if the sequencer stops working, users can no longer recover their assets, and the generation of Layer-2 blocks halts as well (of course, features such as an ‘escape hatch’ are sometimes provided, but the usage fees are high). A centralized sequencer is also weak on censorship resistance, and if the single sequencer responsible for transaction ordering and Layer-2 block generation acts in bad faith, it can monopolize all MEV.

Finally, due to the differences between each independent sequencer and solution, interoperability and composability between Layer-2s are poor. Rollups share Layer-1 (e.g., the Ethereum network) as a data availability layer, but because of their individual sequencers and independent infrastructure, users must use cross-sequencer bridges that entail high costs and complexity, which causes the fragmentation and inefficiency of already limited liquidity.

# 2.5 Effort

To overcome the limitations of the single sequencer, major Layer-2 networks (Arbitrum, Optimism, StarkNet, etc.) are proposing methodologies that can realize sequencer decentralization, based on consensus models for electing a separate sequencer (PoA: Proof of Authority, PoS: Proof of Stake, etc.).

With PoS, much like Ethereum, the idea is to run a Layer-2 consensus based on proof of stake in the rollup by using a Layer-2 token. By electing a sequencer and achieving local consensus in this way, censorship resistance and network liveness are strengthened compared to a single sequencer, but constraints follow with respect to interoperability and composability with other Layer-2 networks. Similarly, StarkNet's sequencers also plan to proceed in the direction of participating in consensus by staking their own token, and they guarantee the stability of node operation through a slashing policy.

PoA (Proof of Authority) is an approach in which a trusted consortium of sequencers (e.g., individuals or institutions) takes turns generating blocks. The sequencing order is set differently for each project, and while the risks related to censorship and single points of failure are relatively lower than with a single sequencer, this too takes a form resembling a governance committee and is difficult to regard as fully decentralized. It is expected that Arbitrum, which currently operates a single sequencer, will adopt an approach such as a Sequencer Committee, and Optimism a Multiple Sequencer Module.

The MEV auction (MEVA) approach has not yet been adopted by any rollup, but it is a system similar to Ethereum's PBS (Proposer Builder Separation) and has the advantage of decentralizing MEV without building a separate sequencer. In the end, the right to generate blocks goes to the sequencer that offers the highest bid. However, with this approach as well, there remains a concern about the possibility that authority becomes concentrated in the single most performant and efficient sequencer.

# 3. Shared Sequencer

# 3.1 Overview

A shared sequencer refers to a structure in which multiple rollups (Layer-2 networks) come together to share a distributed network of sequencing nodes. However, a point to be careful about here is that the perspective of connecting to and using a shared sequencer from a rollup's standpoint should not be confused with the idea that the currently single operating entity of the sequencer can be decentralized. Multiple Layer-2 rollup chains (e.g., Arbitrum, Optimism, StarkNet, etc.) can use a shared sequencer to order transactions, but this means the sequencer itself may be operated by a single entity. While such a structure can improve efficiency, it implies that the rollup is not perfectly decentralized. Therefore, projects like Espresso are actually working to solve this problem. Espresso provides a shared sequencer structure using a Sequencer as a Service (SaaS) model, but its purpose lies in decentralizing the sequencer itself. It follows the HotShot protocol by utilizing EigenLayer, through which rollup sequencing can be handled in a more distributed and decentralized manner. Nevertheless, the concept of a shared sequencer aims to replace the centralized single sequencer that rollups currently rely on. A shared sequencer network is drawing attention as a structure that provides a more decentralized system along with improved scalability through rollups. Various rollups that may emerge in the future will be able to have their transaction ordering guaranteed by delegating the construction and operation of sequencing to a shared sequencer network.

![](ee19e4-CBoCAGOyZP0VJo7algXrog.jpeg)

*Aggregation Theory for Shared Sequencing (Source: Maven11 Research)*

# 3.2 Benefits

A shared sequencer network provides a modularized system and can play an important role in simplifying rollup construction and providing convenience. To put it simply, among the components of a rollup, the mempool and sequencer can be separated out and outsourced. When rollups order their transactions through a shared sequencer network, they can more easily share and interact with all the transaction data aggregated across rollups, which enables organic interaction across the entire Layer-2 blockchain ecosystem.

- Transaction ordering = shared sequencer
- Transaction execution = rollup

Through this middleware, rollups can enjoy guaranteed censorship resistance, something only a decentralized network can provide, without having to build a sequencing layer themselves. And because a rollup's transaction data is stored on Layer-1 and each rollup full node maintains state and performs execution, updates are easy and the dependency on the shared sequencer is relatively low. This allows each rollup to focus on differentiating and optimizing its state transition function, and to develop unique capabilities that can provide better service for a variety of use cases. For these reasons, a shared sequencer is sometimes referred to as SaaS (Sequencing as a Service).

**While the shared sequencer handles transaction ordering, the rollup handles transaction execution.**

**Sequencing layer (transaction ordering):**

1.  A user sends a transaction to the mempool of the sequencing layer.
2.  The operator of the sequencing layer selects the transactions to include in a block from the mempool.
3.  The operator checks whether the selected transactions are valid.
4.  It places the valid transactions in the order it has determined and generates a block.
5.  It sends the block to the rollup's operator.

**Execution layer (rollup), transaction execution:**

1.  The rollup's operator executes the transactions in order to compute the block's result.
2.  It sends the block's contents and result to Ethereum, requesting verification and storage.

**Settlement layer, settlement (Ethereum):**

1.  Based on the information sent by the rollup, it verifies whether the block's result is valid.
2.  It includes the result in a block and connects it to the blockchain to store the information.
3.  It passes the block containing the rollup's result on to other miners to strengthen the security and decentralization of the result.

**Data availability layer (information storage):**

1.  It stores the information that needs to be retained throughout all processes, simply storing it without verifying it.

A shared sequencer supports rollups in efficiently handling cross-chain messaging and bridging, thereby achieving low cost, high speed, and high security. This improves interoperability between Layer-2s and makes it possible to sequence the transactions of various rollup chains in an integrated manner. This contributes to unified block generation, cross-rollup atomic swaps, and the consolidation of fragmented liquidity. For example, a user can set up an Arbitrum rollup transaction to interact with an Optimism rollup transaction, and such functionality provides new opportunities like atomic cross-rollup arbitrage.

In addition, interoperability through a shared sequencer can reduce the burden on individual rollup chains of each building a client and continuously synchronizing the consensus of interoperating chains.

The main advantages that a shared sequencer offers over a single-sequencer design can be summarized as follows:

1.  **Censorship resistance**: Because a shared sequencer is used together by multiple rollups, it has higher resistance to censorship than the centralized sequencer of an individual rollup.
2.  **Atomic cross-rollup composability**: Transactions can be processed atomically across different rollup chains, allowing users to efficiently process transactions across multiple rollup chains.
3.  **Plug-and-play solution for existing and new rollups**: A shared sequencer helps rollup chains connect easily and assists in simplifying the construction and operation of rollups.

In this way, a shared sequencer can play an important role in improving the scalability, interoperability, and stability of blockchain networks. This is expected to become an important factor as Layer-2 solutions mature further and technological advances are made.

# 4. SUAVE

# 4.1 Idea

From here, we will look at SUAVE, which is structurally similar to the shared sequencer described above and can operate in a complementary manner. Similar to a shared sequencer, SUAVE also has a universal mempool where transactions from multiple chains gather, and it builds blocks based on that mempool. The difference is that while a shared sequencer focuses on outsourcing the sequencing layer of rollups, SUAVE focuses on efficient block building across both Layer-1 and Layer-2.

With these commonalities and differences, SUAVE and shared sequencers can perform complementary functions, but before getting to that, we need to understand what SUAVE is in more detail. As mentioned earlier, SUAVE is a universal plug-and-play solution being developed by Flashbots, which aims to provide mempool and distributed builder functionality for all chains. According to this design, a SUAVE user can send their transaction to the SUAVE mempool rather than to the destination chain's public mempool. SUAVE turns the transactions in the mempool into a block, and this block can be accepted by the chain as a complete block for the destination chain the user intended. The key here is that the block SUAVE creates is a highly efficient block from an MEV perspective. Flashbots has previously presented, through MEV-Boost, a solution that creates blocks which efficiently extract MEV. SUAVE extends this cross-chain while seeking to solve the builder centralization problem that has been raised in the past. Let's look at SUAVE's design intent and architecture below to see how this is possible.

![](ee19e4-LubvheTkZVAb27zSxMloYg.png)

*SUAVE (Source: Flashbots)*

![](ee19e4-k01pQuufr1IvBFgS0eKGBA.png)

*SUAVE (Source: Flashbots)*

# 4.2 Cross-domain MEV

One of SUAVE's design intents is to resolve the difficulty of cross-domain MEV. According to Flashbots, in a multi-chain universe, cross-domain MEV opportunities can be spotted more frequently than before due to the fragmentation of liquidity. However, profiting from cross-domain MEV is difficult.

![](ee19e4-4jVP2SiCvSKWiWCPWspfaQ.png)

*The multichain world is centralized (Source: Alex Obadia (Flashbots))*

For example, suppose the price of ETH on Optimism is 400 DAI and the price of ETH on Arbitrum is 300 DAI. The arbitrage must be performed quickly before the price imbalance disappears. There are several ways to do this. First, using a native bridge or a non-native bridge is too slow for arbitrage. Alternatively, one could hold assets on both domains simultaneously without using a bridge. You would buy DAI with the ETH on Optimism, and at the same time sell the DAI on Arbitrum to buy ETH. But repeating this requires frequent rebalancing of assets, so this too is an inconvenient method.

Because cross-domain MEV opportunities have increased, from a sequencer's perspective one might think the following holds:

> **mev(a+b) \> mev(a) + mev(b)**

mev(a): the MEV profit obtainable by adjusting the transaction order on chain a

When DEXs in different domains are pointing to the same price and then a large swap occurs on one of the DEXs, a situation arises in which the formula above holds. However, assuming a single sequencer, in reality there is a communication cost between sequencers, so the equation above should be written as follows:

> **mev(a+b) \> mev(a) + mev(b) + a**

`alpha : communication cost`

The problem is that this communication cost is very large. This is because the two sequencers are in different domains. Therefore, in order for sequencers to collude and obtain MEV profit, it is important to reduce the communication cost as much as possible.

To summarize, ordinary arbitrageurs demand a solution that makes cross-chain MEV easy, and sequencers demand a solution that can reduce the cost of communicating with sequencers in different domains. As will be explained further, SUAVE's goal is to satisfy both of these demands through free preference expression and a universal preference mempool.

# 4.3 Exclusive Orderflow

![](ee19e4-6dgKC6w7lCE5-0MBzemNg.png)

*Exclusive Orderflow (Source: Volt Capital)*

SUAVE's second problem statement is builder centralization caused by exclusive orderflow. Exclusive orderflow, as the name suggests, means taking order flow exclusively. Order flow is an attempt to change a chain's state, including transactions. A builder can monopolize order flow by providing users with additional features (privacy protection, pre-confirmation, etc.) or by returning a portion of MEV profits.

The problem with EOF is that it accelerates builder centralization. Through EOF, a builder can take more profit than other builders, and based on the increased profit it can provide better transaction processing speed to take even more EOF. It is a structure in which a builder that takes more EOF can, on the basis of that EOF, once again receive even more EOF. Therefore, EOF plays a central role in builder centralization. SUAVE aims to solve this problem by allowing builders to compete openly through an OFA (Orderflow Auction).

# 4.4 Architecture

Now let's break down SUAVE's structure in more detail. SUAVE can be divided into three areas: Universal Preference Environment, Optimal Execution Market, and Decentralized Block Building.

![](ee19e4-63nC-sCkwEF0Ml2D-exJsg.png)

*SUAVE (Source: Flashbots)*

# 4.5 Universal Preference environment

The universal preference environment is the space where users' preferences are aggregated. Here, preference is a core concept in SUAVE and corresponds to SUAVE's basic transaction type. A preference is a message that includes a signature, and this message contains a specific goal the user wants to achieve along with payment conditions. Here, the goal can vary in complexity, from a simple asset transfer to asset bridging to cross-chain MEV. This goal is achieved by a role group called executors, which we will look at later; at that point, when the payment condition is met by the executor, the user's payment is unlocked.

**Example preferences \[exec(preference, s) → outputs b, e (s: state of SUAVE, b: payment amount, e: payment recipient)\]**

![](ee19e4-yuBmzacT4WOFPY6Uj2gIGA.png)

*SUAVE (Source: Flashbots)*

Let's take a closer look at the preference concept, which comes up frequently from here on. Since SUAVE is an EVM fork chain, a preference can be expressed like a smart contract. After writing a preference in the form of a smart contract, the user deposits funds into SUAVE in order to execute the preference. Within the range of the deposited funds, they can attach a bid and send their preference to the preference environment. At this point, the recipient of the bid is dynamically determined after the execution of the smart contract (the fulfillment of the preference). For example, if the content of the preference is “the transaction log of block 2 must contain \[x\],” the recipient of the bid is the originator of the transaction corresponding to \[x\]. However, if the content of the preference is “block 3 must be empty,” the recipient of the bid is the miner.

The reason the bid recipient is determined dynamically like this is to distribute MEV profit to the entity that contributed to generating the MEV. If a user writes a preference to perform cross-chain MEV, part of the profit the user gains returns, in the form of a bid, to the entities that achieved that MEV. From this perspective, SUAVE is designed so that the payment recipient is not statically specified as an executor or miner, etc., but is dynamically determined as a result of execution.

Because the preference environment is where preferences (SUAVE's equivalent of transactions) gather, it can be said to correspond to SUAVE's mempool. According to Flashbots, preferences from multiple chains can gather in this mempool. For example, preferences such as a smart contract call deployed on Ethereum and MEV activity on Polygon can all be contained in SUAVE's single mempool.

The reason for constructing a mempool that is universal across all chains like this is to achieve the following two goals. First, it is to enable executors to capture more opportunities to optimize execution. When preferences for multiple chains accumulate in one mempool, the very amount of preferences accumulating in the mempool increases. Thanks to this increased number of preferences, executors can more frequently perform optimizations such as batch-processing similar trades. Second, it is to lower the communication cost of cross-domain MEV. Because preferences from multiple chains accumulate, the executors that turn preferences into bundles and blocks can easily engage with preferences from other domains. They can see how preferences from other domains are ordered, and they can even order those preferences themselves. This makes it easier for them to capture that same benefit of ordering transactions cross-chain.

# 4.6 Optimal Execution Market

The Optimal Execution Market is a space where the role group called executors listens to the mempool described above and then holds an auction (OFA, Orderflow Auction) to provide the optimal execution for a preference.

First, a quick word on what an executor is. Executors look at a preference and generate the optimal transaction bundle that can achieve the preference's goal. They also build blocks by appending their own bundle to another executor's bundle. Compared to the existing MEV-Boost, there is a similar aspect to a builder in that they build a block based on transaction bundles. The difference is that the process of building a block is carried out not by a single executor but by multiple executors collaborating, and that they are also involved in creating the transaction bundles. In other words, they are an entity that takes on the searcher's role of creating bundles while sharing the builder's role. Below is a diagram showing which entities perform each stage of MEV activity in MEV-Boost and in SUAVE.

![](ee19e4-6L2WfCognY3c7a_2QPnfjg.png)

*(Source: self-produced)*

Here, there has not yet been any specific mention of how a preference is converted into a bundle. More than that, the idea of distributing MEV profit to users through an OFA is the core of SUAVE. In SUAVE, unlike the auction situation in an ordinary blockchain, bidding proceeds from the executor toward the user.

The reason this is possible is that in the special situation of MEV, the user's very creation of a transaction plays an important role. Generally, in a blockchain, an auction takes the form of a user who wants to include a transaction in a block paying a fee toward the proposer. This is because the authority to include a transaction in a block lies with the proposer. In contrast, in an MEV extraction situation, not only the proposer but also the user who creates the transaction becomes important. This is because the user's transaction is the target of MEV extraction.

Currently, the first draft of the OFA is the recently announced MEV-Share. In MEV-Share, there is a trusted entity called the Matchmaker, and the MEV profit rebate is handled not by auction but by a validity condition the Matchmaker specifies. However, this is an elementary stage for implementing an OFA, and going forward it appears that SGX will be used to eliminate the Matchmaker and implement MEV rebates through auctions among executors.

![](ee19e4-32rhlZ2O-pfXm1bgrr6jrA.png)

*SUAVE (Source: Flashbots)*

Although the detailed implementation of the auction has not yet come out, Flashbots is considering the following two options.

The first is an ‘explicit auction,’ an implementation close to the most general concept of an auction. For a certain period of time, users disclose their transactions and executors bid on them, and among these, the executor that attaches the highest bid is allowed to execute the transaction. Even if the user does not carry this out directly, auction-brokerage platforms such as Rook currently implement services that do this on their behalf. This means that SUAVE implementing such an explicit auction is not an impossible option.

The second is a ‘fee escalator’ approach, an implementation in which a transaction's fee gradually increases over time. For example, a user can send a transaction whose fee starts at -\$200. If this transaction is expected to generate \$100 of MEV profit, the executor must take the transaction at the point where the fee rises above -\$100.

The two designs above are possible under the assumption that the executor can reasonably predict the MEV profit of the user's transaction. At the same time, however, SUAVE is trying to hide the mempool from executors, as can be inferred from MEV-Share or SGX-based OFA. If executors could see preferences, then instead of doing an OFA, they could deliver transaction bundles directly to a builder separately. Enabling executors to properly infer MEV profit even in a situation where part of the user's transaction is hidden appears to be the key to the design that remains going forward.

# 4.7 Decentralized Block Building

Decentralized Block Building (DBB) is the space where preferences whose execution paths have been specified by executors are turned into a single block. It is one of the parts that has not yet been made very concrete, but Flashbots has in mind a form in which, rather than one entity building the block, multiple executors collaborate to complete a single block. When an executor specifies the optimal execution method for a preference via OFA, this takes a form like a transaction bundle. Other executors can add the transaction bundles they have created to this bundle, and as this process repeats, a complete block is formed. Because the block is completed through the collaboration of executors, this process can be called decentralized block generation.

# 4.8 After Block Building

So far, we have looked at the three components of SUAVE as divided by Flashbots. However, these three components alone cannot fully explain SUAVE's transaction flow. This is because it has not been clarified how a proposer of a chain external to SUAVE accepts the block generated through DBB, or how a preference's payment is unlocked after the transaction is reflected on the external chain.

First, let's look at how a proposer of an external chain accepts a SUAVE block. To begin with, since SUAVE exists as middleware that produces a complete block, no protocol-level change is needed to accept a SUAVE block. Therefore, a proposer can listen for the blocks SUAVE generates and, if the bid of the SUAVE block is higher than that of a traditional block built from the chain's public mempool, it can choose the SUAVE block. If the proposer is not listening for the blocks generated by SUAVE, the executor can reach the proposer through a third-party channel. For example, it can include its bundle in a block through a PGA (Priority Gas Auction), or it can use MEV-Boost.

In any case, when a block or bundle is submitted to the destination chain and the user's preference is achieved, this fact is conveyed to SUAVE through an oracle. For example, suppose the payment condition of a preference is to transfer 1 ETH to 0xdeadbeef. The evidence indicating that this condition has been met could be a transfer event. In that case, the transfer event is conveyed to SUAVE through an oracle, and SUAVE sees this and carries out the preference's payment.

# 4.9 Transaction Flow

To wrap up the architecture we've covered so far, let's briefly walk through SUAVE's transaction flow.

![](ee19e4-gxF3_C7W7WaVPa1oHdWJww.png)

*SUAVE Preferences (Source: dba:)*

1.  The user writes a preference.
2.  Here, if there is a previously deployed preference or a preference template, it can be reused.
3.  The user deposits funds into SUAVE and sends the preference to the mempool.
4.  The executor turns the preference into a form similar to a transaction bundle through an OFA.
5.  The block proposer of the destination chain adopts the transaction bundle or block created by the executor.
6.  Through an oracle, the fact that the preference's payment-release condition has been met is conveyed to the SUAVE chain.
7.  The SUAVE chain checks the condition and pays the user's funds to the payment recipient.

# 4.10 Pros & Cons

SUAVE is a design that has appeared only recently, and it is said to take four to five years just to achieve the entire roadmap. Even looking at the design above, there are many parts that feel ambiguous, such as SUAVE's payment method and preference processing method. The reason such a complex and hard-to-achieve SUAVE is needed is that it allows one to enjoy the following advantages.

First, as mentioned earlier, cross-chain MEV can be done efficiently. Thanks to the universal preference environment, the communication cost of executors is reduced. In addition, from the user's standpoint as well, they can easily do cross-chain MEV by writing a preference. If they wish, they can eliminate risk by adjusting the payment conditions, or they can even have asset bridging done together in one go after the MEV.

Next, it can solve builder centralization. In SUAVE there is no EOF, and executors compete openly in an auction over order flow. Therefore, the vicious cycle of EOF mentioned earlier and the resulting builder centralization can be prevented.

Using SUAVE, one can also enjoy the decentralization of MEV profit through OFA. This is because, through OFA, MEV profit returns to the user who generates the order flow. Even when a user does MEV such as arbitrage, since the bid recipient of the preference is determined dynamically, the effect is that part of the profit returns to the party that made that MEV possible.

In addition to this, being able to outsource the roles of the mempool and block builder, and being able to increase the block proposer's revenue source without major changes to the logic, can also be advantages.

With no concrete design out yet, here are the parts that could be tricky to implement in SUAVE.

First, similarly to what was pointed out in MEV-Share, there may be cases where it is difficult to determine the recipient to whom a preference's bid is paid. What if it was not a single transaction but a transaction bundle that satisfied the payment condition? It is hard to know how one could dynamically figure out at what ratio the bid should return to the users of the bundle. Since this part is related to the decentralization of MEV profit, it appears that more discussion will be needed going forward.

It is also unclear how execution for a preference will be provided. An executor supposedly turns a preference into something like a transaction bundle, but the process by which this happens is not laid out. So the executor's logic needs to be made more concrete, for example what kind of smart contract writes a preference, and what the transaction bundles created by executors look like.

The two issues above are problems that can be resolved as we watch SUAVE's implementation going forward. In contrast, there is a problem that seems unlikely to be resolved in principle, namely the problem that the atomicity of a preference is not guaranteed. For example, consider a cross-chain MEV situation of buying ETH on R1 and selling ETH on R2. For the MEV to succeed, both the transaction sent to R1 and the transaction sent to R2 must succeed. Only if both transactions can be rolled back when even one of them fails can atomicity be said to be guaranteed.

![](ee19e4-Uz5yWa6c86-iKycNZ2JW3A.png)

*SUAVE X-Chain Atomicity (Source: dba:)*

However, because the executor is not the block proposer of the two chains, this atomicity is not guaranteed at the protocol level. So one of the parties, either the user or the executor, must bear the risk of the case where only one of the two transactions succeeds. For example, if the payment condition is set so that the bid is paid only when both transactions succeed, the executor must bear the risk. On the other hand, if the condition is such that the bid is paid even if only one succeeds, then the risk is borne by the user side. Therefore, while the efficiency of cross-chain MEV in SUAVE may be guaranteed, its safety cannot be said to be guaranteed. Going forward, as a solution that can supplement this atomicity problem, we would like to consider combination with a shared sequencer.

# 5. Shared Sequencer & SUAVE

Through SUAVE, users can use the SUAVE mempool instead of a blockchain's own mempool, and SUAVE provides builders and validators with the opportunity to extract maximum MEV while at the same time protecting users from MEV attacks. However, there is a fundamental difference between a shared sequencer network and Flashbots' SUAVE. A shared sequencer network acts as a proposer and forces block generation onto rollups, whereas SUAVE only acts as a builder and does not forcibly propose SUAVE blocks to rollup chains.

Based on this difference, rollups can use SUAVE and a shared sequencer as middleware at the same time to take the advantages of each. To distinguish this clearly:

- **Shared Sequencer = Proposer**
- **SUAVE = Builder**

Therefore, the two systems can each perform different roles in the blockchain ecosystem while forming a complementary relationship, and can contribute to providing better performance and security. As one example, SUAVE and a shared sequencer can work complementarily to increase the efficiency and safety of cross-chain transactions. SUAVE aggregates and optimizes users' preferences for cross-chain transactions, while the shared sequencer guarantees the atomicity of transactions between rollups.

![](ee19e4-33CXJvP8Zi0AEs7CP-_ObQ.png)

*SUAVE X-Chain Atomicity (Source: dba:)*

> Transaction-1 takes place in Block-1 of Rollup-1, and Transaction-2 takes place in Block-2 of Rollup-2.

SUAVE aggregates the preferences of transactions and identifies which transactions are likely to be executed on another chain. However, SUAVE by itself cannot guarantee the atomicity of X-chain transactions. Here, because the shared sequencer plays the role of a proposer, it can serve to guarantee the atomicity of transactions among selectively onboarded rollups.

# 6. Outro

In the end, we believe that using SUAVE as the ‘Builder’ and the shared sequencer as the ‘Proposer’ to make the two systems cooperate can deliver high efficiency and safety in cross-chain transactions. SUAVE optimizes cross-chain transactions according to users' preferences, while the shared sequencer guarantees that those transactions are processed safely. In this way, by combining SUAVE and a shared sequencer, the blockchain ecosystem can provide a better environment in which users can execute efficient and safe cross-chain transactions. However, we think that, just as with the current Layer-1 (e.g., Ethereum) MEV-Boost, where the existing Ethereum validator set has been decentralized, the problem of centralization has simply flowed down to the builders.

In a cross-chain MEV scenario, a builder must efficiently manage and compose transactions from multiple chains while maintaining high throughput and low latency. This means that the software and hardware resources needed to maintain competitiveness in the cross-chain MEV market are substantial. As the resources that must be invested increase like this, not only does the barrier to market entry rise, but a phenomenon can occur in which a builder that takes more order flow earns more profit and, on that basis, can invest even more resources. In other words, centralization pressure on cross-chain builders arises. This concern also applies to the shared-sequencer builder that plays the role of a cross-chain builder. In a shared sequencer, the builder must handle high throughput and complexity, and as a result it is highly likely that a single high-performance builder will act as the builder for all rollups of the shared sequencer.

When using a shared sequencer, the shared sequencer requires a form of PBS similar to Layer-1, and if a builder builds a single mega block for all shared-sequencer rollups, it may come to require extreme specifications. In the end, due to the high level of resources and requirements needed for builders, merely decentralizing the sequencer may not be enough. Therefore, we will need to seek out ways to decentralize the block building of the cross-chain domain itself. This will become increasingly difficult due to the complexity and diversity of the cross-chain ecosystem, but I think it will become an even more important task.

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
