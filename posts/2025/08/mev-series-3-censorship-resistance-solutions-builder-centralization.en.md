---
title: '[MEV Series]#3: Censorship Resistance Solutions & Builder Centralization'
tags:
  - ethereum
published: true
date: 2025-08-11 13:14:20
description: "We examine PBS (Proposer Builder Separation) and crLists (censorship resistant List), Ethereum's protocol-level roadmap for censorship resistance, and then briefly look at the Builder centralization that may follow and Flashbots' SUAVE."
---

**We examine PBS (Proposer Builder Separation) and crLists (censorship resistant List), Ethereum's protocol-level roadmap for censorship resistance, and then briefly look at the Builder centralization that may follow and Flashbots' SUAVE.**

🔗 [\[MEV Series\]#3: Censorship Resistance Solutions \&amp; Builder Centralization](https://medium.com/decipher-media/mev-series-3-censorship-resistance-solutions-builder-centralization-44d194089633)

Author: [web3vibe](https://twitter.com/web3vibe/)
Reviewer: [Yohan Lim](http://normalmangrc/)

Decipher, the Seoul National University blockchain society, presents a series of articles on MEV, one of Ethereum's roadmap items, through its After the Merge team. This article is Part 3 of the MEV series; if you would like to read the other parts, please check the list below.

Part 1: [Overview of MEV and Strategies to Reduce the Negative Impacts of MEV](https://medium.com/@rejamong/mev-series-1-overview-of-mev-and-strategies-to-reduce-the-negative-impacts-of-mev-247294dcb693)
Part 2: [MEV-Boost &amp; Censorship](https://medium.com/@JwagmiB/mev-series-2-mev-boost-censorship-a0bf00b6f1fe)
Part 3: Censorship Resistance Solutions & Builder Centralization

![](6f1f7a-x-GNlHG0VZRLicOhR5mJ_g.png)

# 1. Introduction

In the previous installment of this article, we looked at the MEV-Boost solution developed by the Flashbots team for the decentralization of MEV, the transaction censorship arising from OFAC sanctions that has recently become a hot topic, and various measures to prevent censorship. As mentioned earlier, although various third-party solutions (MEV-Boost relays) are making efforts toward censorship resistance, a solution to fundamentally address this must ultimately be presented at the protocol level of the Ethereum network itself. Accordingly, this article aims to take a closer look at how PBS (Proposer Builder Separation) — which can be found in the 'The Scourge' section that Vitalik also recently updated in the roadmap — and crLists (censorship resistant List), also called 'inclusion lists', work.

And while we believe that introducing PBS to the Ethereum network to achieve censorship resistance will resolve many of the concerns raised, this structure gives rise to yet another problem. This ultimately means that the power of block Builders with high computing power could grow very large, and that competition among such a small number of Builders could ultimately bring about another centralization problem. Accordingly, this article aims to examine in detail what the factors behind Builder centralization are, what problems arise if the network becomes centralized due to a monopoly of a few Builders, and whether solutions exist.

# 2. PBS (Proposer Builder Separation)

Simply put, Proposer Builder Separation (PBS) is a blockchain architecture that splits the previously combined roles of block proposal and block building. Block proposal here refers to the task of submitting a block composed of transactions for the Validator's approval, while block building can be described as the task of selecting transactions from the mempool to construct a block. Separating these two tasks at the blockchain protocol level offers the advantage of simplifying and specializing the process of completing each task. In most Layer 1 blockchains, a single validator usually completes these tasks. For example, in the Proof of Work-based Ethereum prior to The Merge, the Proposer and Builder were not separated, and the miner alone controlled the ordering of transactions to construct and propose new blocks.

Regarding the reason for deciding to introduce PBS in Ethereum's future roadmap in order to achieve censorship resistance at the protocol level, Vitalik wrote the following in his article [“State of research: increasing censorhsip resistance of transactions under PBS”](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance):

> *In the current transaction market, the block Proposer (currently: miner; after the Merge: Validator) looks at which transactions on the mempool pay the highest priority fees and then directly selects the transactions to include in the block. Through this, the block Proposer decides which transactions from the mempool to include in order to maximize profit by using complex and sophisticated strategies to exploit opportunities such as cross-DEX arbitrage and liquidations (hereafter simply referred to as “MEV”), and even gains the option of whether to include its own transactions. The complexity of these strategies driven by MEV incurs very high fixed costs to operate an effective Miner or Validator and creates an environment favorable to centralized pools that perform these tasks on behalf of ecosystem participants (holders). Proposer & Builder separation (PBS) resolves this problem by separating the block proposal role from the block construction role. A separate actor called the Builder builds the block body (essentially the ordered list of transactions that becomes the main “payload” of the block) and submits a bid.*

Beyond the benefits related to censorship resistance, PBS can play an important role in Ethereum's decentralization because it minimizes the computing overhead required to become a Validator, thereby lowering the barrier to entry for more Validators. Through this, the Ethereum network can recruit a more diverse group of network participants and provide incentives to a broader range of participants. PBS also reflects the overall goal of 'The Merge' of steering Ethereum's network toward a more modular future, and in particular, the transition to a Proof of Stake consensus algorithm can be seen as a strong commitment to achieving decentralization through modularity. If the different mechanisms for constructing a block can be decomposed, each module can be decentralized individually. Through this, diverse network participants with different areas of expertise can focus on their particular strengths, and ultimately, by reducing dependence on external middleware solutions such as MEV-Relay, the network can be reborn as a more decentralized one.

# 2.1 Post Merge: Builder & MEV-Boost

Although it was recognized that implementing the separation of Proposer and Builder in an in-protocol form would promote the Ethereum network's censorship resistance and decentralization, implementing it directly on the previous Proof of Work base was difficult. Accordingly, Ethereum's core developers set a direction to embed PBS into the protocol through a consensus client overhaul that could be carried out in parallel during Ethereum's Merge process, but the transition to Proof of Stake itself was already a very large and difficult task. Therefore, as a next-best option, the Ethereum community decided to first try applying proto-PBS, a sidecar that can outsource block construction as needed, which is known as the 'MEV-Boost' introduced in the previous installment. Flashbots, an MEV research and development organization, is leading the design of MEV-Boost and currently maintains it as an open-source project.

The MEV team recognized that, with the introduction after the Merge of the 'Solo-Validator' that can operate on its own without participating in a staking pool, maintaining a small whitelist of Builders as in the existing MEV-Geth would be impossible, and the operating structure of MEV-Boost developed on this basis is shown in the figure below. An MEV marketplace in the form of this diagram is now known as MEV-Boost: the block Builder delivers the header of the block it created to the block Proposer, and the Builder delivers a bid to the Proposer — a promise to pay a certain amount in return for selecting the block it created. At the center of the marketplace is the Relay, which is responsible for verifying the validity of the block created by the Builder. However, to receive proposals from Builders participating in the MEV-Boost market, the Validator must run the MEV-Boost program alongside the consensus and execution clients. Through this, the Validator can have the authority to choose which Relay to connect to.

![](6f1f7a-2GtSZ5QXOQqIW8HJqo8FAA.jpeg)

*(Post Merge block building \| Source: Devcon presentation)*

# 2.2 Towards in-protocol PBS structure

Vitalik ultimately thought that the potential for a Relay's validation failure and the aspect that could act as a new single point of failure (essentially a centralizing element) in such an MEV-Boost system needed to be fixed, and he introduced the idea of 'in-protocol (embedded)' PBS. In this design, the Validator once again performs a blind commit in order to use the block provided by the Builder. However, instead of the Relay that previously mediated this process, the Ethereum protocol itself provides two kinds of guarantees.

1.  **As for the Builder, once the Proposer commits to the bid, that commitment can be reversed only by a consensus failure (e.g., a block reorg).**
2.  **The Builder's promise to pay the Proposer is fulfilled regardless of any action the Builder takes thereafter (e.g., not disclosing the block contents or disclosing an invalid block).**

![](6f1f7a-nPsEbxRNzySB_V0wWR8Ogw.jpeg)

*(A possible design for in-protocol PBS l Source: Devcon presentation)*

# 3. crList (censorship resistant List)

If the PBS model is applied to the Ethereum protocol, the relays that served as the intermediary bridge seen in the existing MEV-Boost disappear. The Builder therefore conducts a direct auction with the Proposer within the Ethereum protocol. If we think a little more deeply about what this means, the PBS model unfortunately hands the Builder greater authority to compose a block through the ordering of transactions, and thus provides the Builder with a greater opportunity to censor transactions. For example, an efficient Builder with high computing power can, at its own discretion, choose not to include in a block transactions originating from a particular dApp it dislikes, or transactions on OFAC's sanctions list. Even though a censoring Builder's block is less able to extract the maximum MEV, if it writes a highly efficient algorithm to overwhelm other Builders, or genuinely wants a particular transaction excluded, it will 'over-bid' on the block.

If a feature called crLists is introduced here, it can weaken and limit the aforementioned power of Builders to censor transactions. The idea of this 'inclusion list' is still being designed and its exact implementation timeline is also hard to pin down, but a 'hybrid PBS design' is emerging as a strong candidate. The Proposer composes a summary by specifying a list of all eligible transactions visible in the mempool, and the Builder is forced to include that 'summary hash' delivered by the Proposer unless the block is full.

# 3.1 crList Design

![](6f1f7a-TsNSaLDU6BHLunTD5226eA.png)

*(crList : Hybrid PBS Design diagram \| Source: Delphi Digital)*

1.  The Proposer publishes a crList and a crList summary containing all eligible transactions visible in the mempool.
2.  As in the existing PBS model, the Builder creates the block body and then submits its bid including a crList summary hash that proves it checked the crList.
3.  The Proposer accepts the winning builder's bid and block header (the Proposer cannot yet see the block body).
4.  The Builder publishes the block and includes 1) proof that it included all transactions of the presented crList, or 2) evidence that the block is full. Otherwise, the block is not accepted under the **'fork-choice'** rule.
5.  The Attestor verifies the validity of the published block body.

However, one can pose the following question here: “What happens if the Proposer submits an empty crList that contains no valid transactions?” If, for economic reasons, the Proposer and Builder collude to include an empty crList summary, then a censoring Builder still has a very high probability that its bid will succeed. Several methods to resolve this question will need to be proposed.

# 4. Builder Centralization

So then, let us assume that in the future the PBS model and crList feature mentioned above have been perfectly implemented in the Ethereum protocol and the problem of transaction censorship has been solved. Has every problem been solved? Perhaps we may need to prepare to face an entirely different kind of difficulty that we had not anticipated. Of course, crList allowed us to distribute a little of the block-composition authority to the Proposer, but it is true that Builders gained more power through that scheme. We come to have a need to begin thinking about Builder centralization. What is Builder centralization? If a few Builders monopolize the market, should we consider it centralized? Or should we consider an ecosystem built by a small number of efficient Builders to be bad? These are the questions we will explore.

# 4.1 Exclusive Order Flow

Order Flow (OF), also called order flow within the Ethereum network, actually means everything that can change state on the blockchain. A typical example is the **'intent'** of dApp users to execute something, and the bundle of countless transactions commonly found in the mempool can be seen as order flow (OF). If order flow can be described this way, then having exclusive access to order flow is something we can define by attaching the modifier 'Exclusive' to call it 'Exclusive Order Flow', i.e., EOF. It is noted that EOF ultimately has the potential to weaken the competitiveness of the Builder market. In the PBS model, the weakening of competition among Builders in the Builder market and its centralization can cause rent extraction, poor user experience, the entrenchment of builders with excessive influence over network incentives, and so on.

A Builder can arrange for certain transactions to be sent only to itself. For example, it can promise not to front-run — which poses a threat to users — and provide them with some incentive from back-run profits. We can see a few early cases currently in operation, such as SushiSwap's 'Sushi Guard'. Such a Builder can justify bidding more through its profits, winning more blocks, and obtaining more exclusive contracts (EOF). A block Builder centralized in this manner can cause serious harm to the network.

![](6f1f7a-wXxKVKPDv1blpdkWJftp0Q.png)

*(Exclusive Order Flow \| Source: Delphi Digital)*

Consider a user who sends exclusive order flow (EOF) to a single Builder, as in the figure above. For an ordinary user's executed transaction to be executed, the Builder that receives the transaction must include it as quickly as possible and bid the block it creates onto the chain, and this process may not happen as quickly as users expect. What users of blockchain dApps want first and foremost is speed, and no user likes their transaction being delayed. Moreover, a delayed transaction also makes the gas fee much harder to estimate. As a result, users send their OF to a superior Builder with the highest block inclusion rate in order to minimize such delays, and the Builder, incentivized by the advantages this position confers, gradually increases its market dominance further. This phenomenon can be seen as Builder centralization, and it is accelerating more and more.

There are, I think, several reasons a user makes such a decision. First, the most obvious is that it can be seen as a transaction through the conclusion of a contract over OF between the Builder and the user. The user can very easily obtain a portion of the revenue through the contract while at the same time granting the Builder exclusive rights over the OF it generates. Alternatively, it may be exchanged for a particular feature (e.g., pre-confirmation) offered by a highly efficient Builder. From the user's perspective, one could argue there is no particular reason to integrate with other small Builders besides the most powerful, dominant, and trustworthy Builder. This phenomenon can ultimately justify exclusive contracts (EOF). So then, is such order flow something that only users can generate? The actors capable of controlling order flow that could have this kind of motivation are not limited to users. For example, a dApp that generates enormous OF, such as MetaMask, can be seen as being in a very similar position.

# 4.2 Properties of PBS

First, before explaining that exclusive order flow (EOF) has an undesirable impact on the MEV market, let us understand what properties the PBS model described above requires.

1.  **Proposer-centric:** In fact, this can be seen as the most important goal and idea that the PBS model aims for. Looking at the ultimate goal from a high level, from the Proposer's perspective the best strategy that can be executed is to either build blocks through the Builder market, or to create blocks of one's own that generate higher revenue than what the Builder market offers. However, surpassing efficient Builders is currently unrealistic.
2.  **Return to the ecosystem:** Most of the MEV extracted by Builders or Searchers should not be monopolized and owned by the extracting party but should flow back into the ecosystem. Where should this extracted value ultimately flow? Many opinions exist, but ultimately these values go to the Validators that maintain the network, the dApp protocols, or the users.
3.  **Censorship resistance:** As the Ethereum network has always aimed for, it is essential to the PBS model's goal that the intents created by users — that is, valid transactions — must ultimately be included in blocks. Ideally, they should also be included in blocks without much delay.
4.  **Improving user experience:** In truth, improving UX is close to a wish across every blockchain domain. However, in order to improve the ecosystem areas known to be weak in the Ethereum ecosystem, we must actively find and fix UX improvements.

# 4.3 The Problem: Builder’s Market Domination

Exclusive order flow (EOF) can enable a highly efficient Builder, or a small group of Builders banded together through collusion, to monopolize the Builder market, and it gradually causes the Builder market to lose its competitiveness. We will look at these problems more deeply below, but this will have a considerably negative impact on the Builder market, one of the core parts of the PBS model.

Let us first consider the Builder market becoming concentrated among a small number of Builders. In a normal scenario where Builders compete with one another, a Builder uses most of the profit from the extracted MEV through bidding in order to offer a higher price for a block than its competitors. However, Builders that band tightly together and collude can drastically lower each other's bids and share the profit gained through this, which can violate the PBS property of 'return to the ecosystem' described above. Let us look at the two scenarios below:

1.  A new Builder named Bob enters the Builder market. Bob finds Builders colluding in that market, but because collusion has driven bids to a very low level, Bob can easily bid higher. That colluding Builder group could include Bob in the group to share more of the profit, but as more Builders enter the market, the colluding group finds it hard to maintain low bids in order to compete, and as a result the MEV value is returned to the ecosystem.
2.  Bob has entered the Builder market as a new Builder, but cannot access most of the order flow (OF). This is because all the transactions being generated are sent **directly** to the established Builders. As a result, no matter how efficient Bob's block-building algorithm is or how excellent its user features are, the Builders that dominated the existing market have no need to make an effort to surpass Bob. So Bob too tries to secure order flow (EOF) from various users, but the users have already entered into contracts with existing Builders, and it is difficult to breach a contract to switch over. Also, from the user's perspective, there is a high likelihood that the block inclusion rate of the just-starting Bob is not high, so they see no reason to enter into a contract with Bob. Furthermore, dApp wallet managers also do not think integrating with Bob is worth it. In the end, Bob is unable to produce blocks on the chain.

The second scenario above can be seen as a negative one, given that the existing Builder continues to take most of the MEV profit and the profit it gains is not returned to the ecosystem.

# 4.4 Additional Problem

# 1) UX Perspective

Ultimately, exclusive access to order flow provides the Builder with a competitive advantage. If Builders cannot secure PFOF (Payment-For Order Flow), an environment would be created in which they can compete to implement ever more convenient and intuitive user features in order to attract OF. However, at present, most of the features that a potential Builder could offer users have not been clearly identified. To consider a few, one can think of ideas such as backrunning-as-a-service, gasless cancellation, gasless order, pre-confirm, and so on. If the order flow is bound by contract due to PFOF, or the user does not want these new features for other reasons, there is no point at all in the Builder implementing and developing such features.

We must accurately grasp that having more order flow than other Builders because of superior features is different from having more order flow because of PFOF. In the former case, the barrier to entry would be having to implement more competitive and efficient features, whereas in the latter case, the barrier to entry for a new Builder is persuading users to break their contracts with existing Builders and drawing those contracts to itself. In other words, the aspect of a Builder's monopoly over order flow falls under PFOF, not under feature development and provision.

# 2) Proposer Incentive

In the Builder market, control over most of the MEV value affects Proposer incentives. Let us think about the crLists mentioned above. When a Proposer publishes a crList (generally assuming it acts honestly), some Builders may choose not to send a block to that Proposer, because they want to censor the addresses and accounts on their own lists at will or suppress them from being published. If the Builder market were competitive, a withheld block should easily be replaced with a block of similar MEV value through a non-censoring Builder. However, if the number of Builders capable of producing valuable blocks is very small and such monopolistic builders choose to withhold their blocks, the Proposer must choose between the rational behavior of pursuing profit alone and the honest behavior of being subjected to censorship. Forcing the Proposer to choose between honest behavior and high revenue encourages behavior the Ethereum network ultimately does not want; it is not right that such a dishonest Proposer earns higher revenue and grows faster while the honest Proposer must suffer losses on the network.

# 5. Decentralize Builder Role

So then, **how can we resolve the negative impact on Ethereum's network neutrality and censorship resistance caused by the centralization of block Builders?** The inherent role of a Layer 1 blockchain is to guarantee that every valid transaction that has paid its fee is reliably included in a block. However, the reality is that recently a small number of block Builders have composed 80% of all Ethereum blocks. Such a select few block Builders can choose to have transactions they do not want go unprocessed, and they come to hold considerable control over block composition. To promote competition in the Builder market, it must be easy for new Builders to enter the market, but a low barrier to entry does not necessarily mean that a diverse range of Builders exists. In the already-established, large-scale MEV economy, the influence of a small number of Builders is likely to be dominant, and as a result, negative outcomes such as rent-seeking by Builders from users can occur. As described above, a Builder can further boost its market share by offering network users other convenient and new features such as 'pre-confirmation', or by paying users a fee for EOF. Let us take a brief look at Flashbots' SUAVE, which is working to solve this problem.

# 5.1 Flashbots, SUAVE

The future options can be divided into two directions: the first is to once again change the structure of the MEV solution to find a way to reduce the influence of centralized forces at the block-construction stage and achieve the potential benefits of blockchain; the second is to go along with what is to come, allow a centralized regime of a few block Builders, and give up part of the decentralization that crypto aims for.

However, the ultimate purpose of the MEV solution that Flashbots envisions is a structure of cooperation to build an infrastructure in which honest participants earn more network rewards than dishonest ones and fair competition can be maintained. Because there are countless actors who, like in the traditional financial system, prefer being able to centralize and control the system for their own private gain, Flashbots has continually argued that we must protect the blockchain system it has painstakingly built and maintain decentralization.

Accordingly, Flashbots has continuously researched the ideal structure of an MEV solution and realized that the following principles are necessary. First, to counter EOF, users keep private information such as their transactions confidential before transaction confirmation. Thus, the generated transaction is private, yet it must be made accessible to all block Builders. Second, to counter Cross-Domain MEV, Builders of different blockchains must be able to freely integrate with one another in an open and permissionless manner, identical to the existing Flashbots auction method. Finally, it explained that, from a long-term perspective, the transaction system and the block-construction system must themselves be decentralized.

Based on these principles, Flashbots, through extensive research and community collaboration, put forward a solution to the Builder centralization problem called SUAVE (the Single Unified Auction for Value Expression), that is, a 'single unified auction for value expression'. SUAVE is a new blockchain designed to become the mempool and block Builder for all blockchains; by connecting MEV activity through the network Flashbots has developed, it seeks to serve as the economic foundation of the MEV market as an entirely new EVM-compatible blockchain.

# 5.2 Structure of SUAVE

![](6f1f7a-rHligiHvIu1YQtIJZXMYvA.png)

*(Architecture of SUAVE \| Source: Flashbot: The Future of MEV is SUAVE)*

SUAVE's structure can be broadly divided into three core parts: the 'expression' part, which can represent the preferences of users and Searchers; the 'execution' part, which handles optimized execution from the SUAVE mempool; and 'settlement'.

At the core of SUAVE is the idea of 'preference'. A preference is a message that shows what the user wants and includes a signature indicating a willingness to pay a fee if the conditions are met. A preference can be as simple as transferring and swapping tokens within a single system, or it can be more complex and involve multiple steps across different blockchains. To give a simple example, it can be seen as an intent such as “I hold A worth of assets, I want to buy an asset called B, and I am willing to pay C,” or “I would like the transaction order to be processed in the order C, B, A.”

# 1) Preference Environment

The 'Preference Environment' part can be described as a single decentralized environment optimized for expressing the above preferences. As an expanded concept of the 'bundle' that has been used in existing MEV systems, it seeks to improve the mempool so that more complex preferences can be expressed. A great deal of activity and development is expected around users' expression of preferences going forward; for example, an actor called the Executor can offer user preferences such as grouping similar transactions together, or 'pre-confirmation' that pays the user fee upfront to execute a transaction on a priority basis.

# 2) Execution Market

Once a user's preferences are first reflected in SUAVE, it then moves on to the 'Execution Market'. Here, a special and diverse set of actors called 'Executors' compete to provide the best service to users across multiple blockchains and to process as many user preferences as possible. For example, we could describe 'Orderflow' auctioneers, Builders, and RPC providers as 'Executors'. When a particular user's transaction generates MEV, Executors can compete to return the highest proportion of the MEV profit to the user. If, through this free competition, the Execution Market provides optimal MEV, then the originator that generates the order flow has less reason to direct EOF to a single builder as in the existing approach, which in turn can become a basis for mitigating builder centralization.

# 3) Decentralized Block Building

The final part is the Decentralized Building Network, which generates full blocks from the results collected in SUAVE's Preference Environment and Execution Market. Bundles reflecting the collected preferences are converted into blocks across various blockchains in the decentralized block-building network. This market aims to maximize the MEV of Builders and Validators while at the same time ensuring that Builders are decentralized.

# 6. Conclusion

As Ethereum transitioned from Proof of Work to Proof of Stake through the Merge, the MEV Supply Chain has gradually evolved, and as a result of The Merge, new challenges and risk vectors have emerged, particularly with regard to decentralization and censorship resistance. To respond to these, there were attempts at the Flashbots Auction, MEV-Geth, and MEV-Boost, and the open-sourcing of these solutions to foster a competitive market; and now the new network SUAVE is also poised for launch in order to decentralize the risks posed by the centralization of block builders through EOF and cross-chain MEV. In this way, there are challenges that each roadmap stage of Ethereum seeks to solve, and I think now is a time when constant reflection is needed on what further problems the solutions being developed to solve them may cause. Through this, we must continuously reduce the risks that can arise.

# 7. References

- [Censorship… wat do?: The Devil You Know vs. The Devil You Don’t](https://joncharbonneau.substack.com/p/censorship-wat-do)
- [Decentralizing the Builder Role](https://joncharbonneau.substack.com/p/decentralizing-the-builder-role)
- [Order flow, auctions and centralisation II: order flow auctions](https://collective.flashbots.net/t/order-flow-auctions-and-centralisation-ii-order-flow-auctions/284)
- [Order flow, auctions and centralisation I: a warning](https://collective.flashbots.net/t/order-flow-auctions-and-centralisation-i-a-warning/258)
- [https://www.coindesk.com/tech/2022/11/23/ethereum-rd-firm-flashbots-shares-details-about-its-next-gen-block-builder/](https://www.coindesk.com/tech/2022/11/23/ethereum-rd-firm-flashbots-shares-details-about-its-next-gen-block-builder/)
- [https://www.youtube.com/watch?v=FqalnLJTdCc](https://www.youtube.com/watch?v=FqalnLJTdCc&amp;ref=wb3vb.io)
- [https://writings.flashbots.net/the-future-of-mev-is-suave/](https://writings.flashbots.net/the-future-of-mev-is-suave/)
