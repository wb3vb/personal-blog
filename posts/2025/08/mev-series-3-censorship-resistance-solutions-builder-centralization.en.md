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

In the previous installment, we looked at the MEV-Boost solution the Flashbots team developed to decentralize MEV, the transaction censorship stemming from OFAC sanctions that has recently become a hot topic, and various measures to prevent censorship. As noted earlier, third-party solutions (MEV-Boost relays) are working toward censorship resistance, but a fundamental fix has to come at the protocol level of the Ethereum network itself. So this article takes a closer look at how two mechanisms work: PBS (Proposer Builder Separation), which appears in the 'The Scourge' section that Vitalik recently updated in the roadmap, and crLists (censorship resistant List), also called 'inclusion lists'.

And while we believe that introducing PBS to the Ethereum network for censorship resistance will resolve many of these concerns, the structure creates yet another problem. The power of block Builders with high computing power could grow very large, and competition among such a small number of Builders could bring about another centralization problem. So this article looks closely at what drives Builder centralization, what problems arise if the network becomes centralized under a handful of Builders, and whether solutions exist.

# 2. PBS (Proposer Builder Separation)

Simply put, Proposer Builder Separation (PBS) is a blockchain architecture that splits the previously combined roles of block proposal and block building. Block proposal here means submitting a block of transactions for the Validator's approval, while block building means selecting transactions from the mempool to construct a block. Separating the two at the protocol level simplifies and specializes the work of each. In most Layer 1 blockchains, a single validator handles both. In Proof of Work Ethereum before The Merge, for example, the Proposer and Builder were not separated, and the miner alone controlled the ordering of transactions to construct and propose new blocks.

On why PBS was chosen for Ethereum's future roadmap as a way to achieve censorship resistance at the protocol level, Vitalik wrote the following in his article [“State of research: increasing censorhsip resistance of transactions under PBS”](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance):

> *In the current transaction market, the block Proposer (currently: miner; after the Merge: Validator) looks at which transactions on the mempool pay the highest priority fees and then directly selects the transactions to include in the block. Through this, the block Proposer decides which transactions from the mempool to include in order to maximize profit by using complex and sophisticated strategies to exploit opportunities such as cross-DEX arbitrage and liquidations (hereafter simply referred to as “MEV”), and even gains the option of whether to include its own transactions. The complexity of these strategies driven by MEV incurs very high fixed costs to operate an effective Miner or Validator and creates an environment favorable to centralized pools that perform these tasks on behalf of ecosystem participants (holders). Proposer & Builder separation (PBS) resolves this problem by separating the block proposal role from the block construction role. A separate actor called the Builder builds the block body (essentially the ordered list of transactions that becomes the main “payload” of the block) and submits a bid.*

Beyond censorship resistance, PBS can play an important role in Ethereum's decentralization because it minimizes the computing overhead required to become a Validator, which lowers the barrier to entry for more Validators. That lets the Ethereum network recruit a more diverse set of participants and extend incentives to a broader range of them. PBS also reflects the overall goal of 'The Merge' to steer Ethereum toward a more modular future, and the transition to a Proof of Stake consensus algorithm in particular reads as a strong commitment to achieving decentralization through modularity. If the different mechanisms for constructing a block can be decomposed, each module can be decentralized on its own. Diverse participants with different areas of expertise can then focus on their particular strengths, and by reducing dependence on external middleware such as MEV-Relay, the network can be reborn as a more decentralized one.

# 2.1 Post Merge: Builder & MEV-Boost

Everyone recognized that separating Proposer and Builder in an in-protocol form would strengthen the Ethereum network's censorship resistance and decentralization, but building it directly on the old Proof of Work base was hard. Ethereum's core developers set out to embed PBS into the protocol through a consensus client overhaul that could run in parallel with the Merge, yet the transition to Proof of Stake was already a huge, difficult task on its own. So as a next-best option, the community decided to first try proto-PBS, a sidecar that can outsource block construction as needed, better known as the 'MEV-Boost' introduced in the previous installment. Flashbots, an MEV research and development organization, leads the design of MEV-Boost and currently maintains it as an open-source project.

The MEV team recognized that once the Merge brought the 'Solo-Validator', which can operate on its own without joining a staking pool, maintaining a small whitelist of Builders as in the old MEV-Geth would be impossible. The operating structure of MEV-Boost, built on that realization, is shown in the figure below. An MEV marketplace in this form is now known as MEV-Boost: the block Builder delivers the header of the block it created to the block Proposer, along with a bid, a promise to pay a certain amount in return for having its block selected. At the center of the marketplace sits the Relay, which verifies that the Builder's block is valid. To receive proposals from Builders in the MEV-Boost market, though, the Validator has to run the MEV-Boost program alongside its consensus and execution clients. That gives the Validator the authority to choose which Relay to connect to.

![](6f1f7a-2GtSZ5QXOQqIW8HJqo8FAA.jpeg)

*(Post Merge block building \| Source: Devcon presentation)*

# 2.2 Towards in-protocol PBS structure

Vitalik came to think that a Relay's potential validation failure, and the way it could act as a new single point of failure (essentially a centralizing element) in such an MEV-Boost system, needed to be fixed, so he introduced the idea of 'in-protocol (embedded)' PBS. In this design, the Validator again performs a blind commit to use the block the Builder provides. But instead of the Relay that used to mediate the process, the Ethereum protocol itself provides two kinds of guarantees.

1.  **As for the Builder, once the Proposer commits to the bid, that commitment can be reversed only by a consensus failure (e.g., a block reorg).**
2.  **The Builder's promise to pay the Proposer is fulfilled regardless of any action the Builder takes thereafter (e.g., not disclosing the block contents or disclosing an invalid block).**

![](6f1f7a-nPsEbxRNzySB_V0wWR8Ogw.jpeg)

*(A possible design for in-protocol PBS l Source: Devcon presentation)*

# 3. crList (censorship resistant List)

If the PBS model is applied to the Ethereum protocol, the relays that acted as the intermediary bridge in the existing MEV-Boost disappear. The Builder then runs a direct auction with the Proposer inside the Ethereum protocol. Think a little harder about what this means, and you see that the PBS model unfortunately hands the Builder more authority to compose a block through the ordering of transactions, which gives it a bigger opening to censor transactions. An efficient Builder with high computing power can, on its own, choose to leave out transactions from a particular dApp it dislikes, or transactions on OFAC's sanctions list. A censoring Builder's block extracts less of the maximum MEV, but if it writes a highly efficient algorithm to overwhelm other Builders, or genuinely wants a particular transaction excluded, it will 'over-bid' on the block.

Introduce a feature called crLists here, and it can weaken and limit that power of Builders to censor transactions. This 'inclusion list' idea is still being designed and its exact implementation timeline is hard to pin down, but a 'hybrid PBS design' is emerging as a strong candidate. The Proposer composes a summary listing all eligible transactions visible in the mempool, and the Builder is forced to include that 'summary hash' from the Proposer unless the block is full.

# 3.1 crList Design

![](6f1f7a-TsNSaLDU6BHLunTD5226eA.png)

*(crList : Hybrid PBS Design diagram \| Source: Delphi Digital)*

1.  The Proposer publishes a crList and a crList summary containing all eligible transactions visible in the mempool.
2.  As in the existing PBS model, the Builder creates the block body and then submits its bid including a crList summary hash that proves it checked the crList.
3.  The Proposer accepts the winning builder's bid and block header (the Proposer cannot yet see the block body).
4.  The Builder publishes the block and includes 1) proof that it included all transactions of the presented crList, or 2) evidence that the block is full. Otherwise, the block is not accepted under the **'fork-choice'** rule.
5.  The Attestor verifies the validity of the published block body.

But this raises a question: “What happens if the Proposer submits an empty crList that contains no valid transactions?” If the Proposer and Builder collude for economic reasons to include an empty crList summary, a censoring Builder still has a very high chance of winning its bid. Several methods to resolve this will need to be proposed.

# 4. Builder Centralization

So let's assume that in the future the PBS model and crList feature described above have been perfectly implemented in the Ethereum protocol and transaction censorship has been solved. Is every problem solved? Maybe we need to brace for an entirely different kind of difficulty we hadn't anticipated. Sure, crList let us hand a little of the block-composition authority to the Proposer, but Builders gained more power through that scheme. Now we have to start thinking about Builder centralization. What is it? If a few Builders monopolize the market, should we call it centralized? Or should we treat an ecosystem built by a small number of efficient Builders as a bad thing? These are the questions we'll explore.

# 4.1 Exclusive Order Flow

Order Flow (OF), sometimes just called order flow within the Ethereum network, really means everything that can change state on the blockchain. A typical example is a dApp user's **'intent'** to execute something, and the bundle of countless transactions you find in the mempool counts as order flow (OF) too. If order flow works this way, then exclusive access to it is what we get by tacking on the modifier 'Exclusive' to call it 'Exclusive Order Flow', or EOF. EOF has the potential to weaken competition in the Builder market. Under the PBS model, weaker competition among Builders and the resulting centralization can cause rent extraction, poor user experience, the entrenchment of builders with excessive influence over network incentives, and so on.

A Builder can arrange for certain transactions to be sent only to itself. It can promise, for example, not to front-run (a real threat to users) and to share some of its back-run profits with them as an incentive. A few early cases are already running, such as SushiSwap's 'Sushi Guard'. A Builder like this can justify bidding more out of its profits, winning more blocks, and locking up more exclusive contracts (EOF). A block Builder that centralizes this way can do serious harm to the network.

![](6f1f7a-wXxKVKPDv1blpdkWJftp0Q.png)

*(Exclusive Order Flow \| Source: Delphi Digital)*

Consider a user who sends exclusive order flow (EOF) to a single Builder, as in the figure above. For an ordinary user's transaction to go through, the Builder that receives it has to include it as fast as possible and bid the resulting block onto the chain, and that may not happen as quickly as users expect. Speed is what dApp users want first and foremost, and nobody likes seeing their transaction delayed. A delayed transaction also makes the gas fee much harder to estimate. So users send their OF to a superior Builder with the highest block inclusion rate to keep delays down, and the Builder, rewarded by the edge this gives it, keeps expanding its market dominance. This is Builder centralization, and it's accelerating.

A user makes this decision for several reasons, I think. The most obvious is that it amounts to a transaction, a contract over OF struck between the Builder and the user. The user very easily pockets a share of the revenue through the contract while handing the Builder exclusive rights over the OF it generates. Or it might be traded for a particular feature (say, pre-confirmation) that a highly efficient Builder offers. From the user's point of view, you could argue there's no real reason to integrate with any of the smaller Builders instead of the most powerful, dominant, and trustworthy one. This is ultimately what justifies exclusive contracts (EOF). So is such order flow something only users can generate? The actors who can control order flow and might share this motivation aren't limited to users. A dApp that generates enormous OF, such as MetaMask, sits in a very similar position.

# 4.2 Properties of PBS

Before explaining how exclusive order flow (EOF) hurts the MEV market, let's pin down what properties the PBS model described above requires.

1.  **Proposer-centric:** This is arguably the most important goal and idea behind the PBS model. At a high level, the Proposer's best available strategy is either to build blocks through the Builder market or to build its own blocks that earn more than the Builder market offers. Beating efficient Builders, though, is unrealistic right now.
2.  **Return to the ecosystem:** Most of the MEV that Builders or Searchers extract should not be monopolized by whoever extracts it but should flow back into the ecosystem. Where should that value end up? Opinions differ, but it ultimately goes to the Validators that maintain the network, the dApp protocols, or the users.
3.  **Censorship resistance:** As the Ethereum network has always aimed for, the PBS model's goal depends on the intents users create, meaning valid transactions, ultimately making it into blocks. Ideally they should get in without much delay too.
4.  **Improving user experience:** Better UX is close to a universal wish across every blockchain domain. But to shore up the areas the Ethereum ecosystem is known to be weak in, we have to actively hunt down and ship UX improvements.

# 4.3 The Problem: Builder’s Market Domination

Exclusive order flow (EOF) can let a highly efficient Builder, or a small group of Builders banded together through collusion, monopolize the Builder market, and it gradually erodes the market's competitiveness. We'll dig into these problems below, but the upshot is a serious blow to the Builder market, one of the core parts of the PBS model.

Let's first consider the Builder market becoming concentrated among a few Builders. Normally, when Builders compete, a Builder spends most of the profit from extracted MEV on its bid so it can outprice its competitors. But Builders that band tightly together and collude can slash each other's bids and split the savings, which violates the PBS property of 'return to the ecosystem' described above. Look at the two scenarios below:

1.  A new Builder named Bob enters the market. He finds Builders colluding there, but since collusion has driven bids very low, Bob can easily bid higher. The colluding group could pull Bob in to share more of the profit, but as more Builders show up, the group struggles to keep bids low and still compete, and the MEV value ends up flowing back to the ecosystem.
2.  Bob has entered the market as a new Builder but can't access most of the order flow (OF), because all the transactions being generated go **directly** to the established Builders. So no matter how efficient Bob's block-building algorithm is or how good its user features are, the Builders that already dominate the market feel no pressure to outdo him. Bob tries to secure order flow (EOF) from various users too, but they've already signed contracts with existing Builders, and breaking one to switch over is hard. From the user's side, a just-starting Builder like Bob probably has a low block inclusion rate, so they see no reason to sign with him. dApp wallet managers don't think integrating with Bob is worth it either. In the end, Bob can't get blocks onto the chain.

The second scenario is the bad one: the established Builder keeps taking most of the MEV profit, and none of it flows back to the ecosystem.

# 4.4 Additional Problem

# 1) UX Perspective

Exclusive access to order flow gives the Builder a competitive advantage. Without PFOF (Payment-For Order Flow) to fall back on, Builders would have to compete by shipping ever more convenient, intuitive user features to attract OF. Right now, though, most of the features a Builder might offer users haven't been clearly identified. A few candidates come to mind: backrunning-as-a-service, gasless cancellation, gasless order, pre-confirm, and so on. If the order flow is locked up by a PFOF contract, or the user doesn't want these new features for some other reason, there's no point in the Builder building them at all.

We have to be clear that winning more order flow than other Builders through superior features is not the same as winning it through PFOF. In the first case, the barrier to entry is having to build more competitive, efficient features; in the second, the barrier for a new Builder is persuading users to break their contracts with existing Builders and pull those contracts over to itself. In other words, a Builder's monopoly over order flow comes down to PFOF, not to developing and shipping features.

# 2) Proposer Incentive

In the Builder market, control over most of the MEV value shapes Proposer incentives. Think back to the crLists mentioned above. When a Proposer publishes a crList (assume for now that it acts honestly), some Builders may refuse to send it a block, because they want the freedom to censor the addresses and accounts on their own lists or keep them from being published. If the Builder market were competitive, a withheld block could easily be swapped for a block of similar MEV value from a non-censoring Builder. But if only a handful of Builders can produce valuable blocks and those monopolistic builders choose to withhold, the Proposer is stuck choosing between the rational move of chasing profit and the honest move of accepting censorship. Forcing the Proposer to pick between honesty and high revenue encourages exactly the behavior the Ethereum network doesn't want. It isn't right for a dishonest Proposer to earn more and grow faster while the honest one takes losses on the network.

# 5. Decentralize Builder Role

So **how do we fix the damage that block-Builder centralization does to Ethereum's network neutrality and censorship resistance?** A Layer 1 blockchain's core job is to guarantee that every valid transaction that has paid its fee reliably makes it into a block. Yet lately a small number of block Builders have built 80% of all Ethereum blocks. Those few Builders can leave transactions they don't want unprocessed, and they end up holding considerable control over block composition. Promoting competition in the Builder market means making it easy for new Builders to enter, but a low barrier to entry doesn't guarantee a diverse set of Builders. In the already-established, large-scale MEV economy, a small number of Builders will likely dominate, and that opens the door to bad outcomes like Builders rent-seeking from users. As noted above, a Builder can push its market share even higher by offering users convenient new features such as 'pre-confirmation', or by paying them a fee for EOF. Let's take a quick look at Flashbots' SUAVE, which is working to solve this problem.

# 5.1 Flashbots, SUAVE

The future breaks down into two directions. The first is to reshape the MEV solution once more, finding a way to curb the influence of centralized forces at the block-construction stage and unlock blockchain's potential benefits. The second is to go along with what's coming, let a few block Builders run a centralized regime, and give up part of the decentralization crypto is after.

But the ultimate purpose of the MEV solution Flashbots envisions is a cooperative structure, an infrastructure where honest participants earn more network rewards than dishonest ones and fair competition holds. Because countless actors, just like in the traditional financial system, would rather centralize and control the system for their own private gain, Flashbots has argued again and again that we have to protect the blockchain system it has painstakingly built and keep it decentralized.

Along the way, Flashbots kept researching the ideal structure for an MEV solution and settled on a few necessary principles. First, to counter EOF, users keep private information such as their transactions confidential until the transaction is confirmed. The transaction stays private, yet it still has to be accessible to every block Builder. Second, to counter Cross-Domain MEV, Builders on different blockchains must be able to integrate with one another freely, in the same open and permissionless way as the existing Flashbots auction. Finally, over the long term, the transaction system and the block-construction system themselves must be decentralized.

Building on these principles, Flashbots, through extensive research and community collaboration, put forward a solution to the Builder centralization problem called SUAVE (the Single Unified Auction for Value Expression), a 'single unified auction for value expression'. SUAVE is a new blockchain designed to become the mempool and block Builder for every blockchain. By connecting MEV activity through the network Flashbots has built, it aims to serve as the economic foundation of the MEV market, an entirely new EVM-compatible blockchain.

# 5.2 Structure of SUAVE

![](6f1f7a-rHligiHvIu1YQtIJZXMYvA.png)

*(Architecture of SUAVE \| Source: Flashbot: The Future of MEV is SUAVE)*

SUAVE's structure can be broadly divided into three core parts: the 'expression' part, which can represent the preferences of users and Searchers; the 'execution' part, which handles optimized execution from the SUAVE mempool; and 'settlement'.

At the heart of SUAVE is the idea of 'preference'. A preference is a message that shows what the user wants, with a signature indicating a willingness to pay a fee if the conditions are met. It can be as simple as transferring and swapping tokens within a single system, or as complex as multiple steps across different blockchains. A simple example is an intent like “I hold A worth of assets, I want to buy an asset called B, and I am willing to pay C,” or “I would like the transaction order to be processed in the order C, B, A.”

# 1) Preference Environment

The 'Preference Environment' is a single decentralized environment optimized for expressing the preferences above. Extending the 'bundle' concept from existing MEV systems, it aims to improve the mempool so more complex preferences can be expressed. Expect a lot of activity and development around how users express preferences going forward. An actor called the Executor, for instance, can offer user preferences like grouping similar transactions together, or 'pre-confirmation' that pays the user fee upfront to execute a transaction on a priority basis.

# 2) Execution Market

Once a user's preferences are first captured in SUAVE, they move on to the 'Execution Market'. Here a special and diverse set of actors called 'Executors' compete to serve users best across multiple blockchains and to process as many user preferences as they can. 'Orderflow' auctioneers, Builders, and RPC providers all count as 'Executors', for example. When a user's transaction generates MEV, Executors can compete to return the largest share of that profit to the user. If this free competition lets the Execution Market deliver optimal MEV, then whoever originates the order flow has less reason to funnel EOF to a single builder as before, which in turn helps ease builder centralization.

# 3) Decentralized Block Building

The final part is the Decentralized Building Network, which assembles full blocks from the results gathered in SUAVE's Preference Environment and Execution Market. Bundles reflecting those collected preferences are turned into blocks across various blockchains in the decentralized block-building network. This market aims to maximize MEV for Builders and Validators while keeping Builders themselves decentralized.

# 6. Conclusion

As Ethereum moved from Proof of Work to Proof of Stake through the Merge, the MEV Supply Chain has gradually evolved, and the Merge brought new challenges and risk vectors, especially around decentralization and censorship resistance. The Flashbots Auction, MEV-Geth, and MEV-Boost were all attempts to answer them, and open-sourcing these solutions helped foster a competitive market. Now the new network SUAVE is poised to launch as well, meant to decentralize the risks that block-builder centralization creates through EOF and cross-chain MEV. Each stage of Ethereum's roadmap sets out to solve its own challenges, and I think this is a moment that calls for constant reflection on what new problems the solutions we build might create. That's how we keep steadily reducing the risks that can arise.

# 7. References

- [Censorship… wat do?: The Devil You Know vs. The Devil You Don’t](https://joncharbonneau.substack.com/p/censorship-wat-do)
- [Decentralizing the Builder Role](https://joncharbonneau.substack.com/p/decentralizing-the-builder-role)
- [Order flow, auctions and centralisation II: order flow auctions](https://collective.flashbots.net/t/order-flow-auctions-and-centralisation-ii-order-flow-auctions/284)
- [Order flow, auctions and centralisation I: a warning](https://collective.flashbots.net/t/order-flow-auctions-and-centralisation-i-a-warning/258)
- [https://www.coindesk.com/tech/2022/11/23/ethereum-rd-firm-flashbots-shares-details-about-its-next-gen-block-builder/](https://www.coindesk.com/tech/2022/11/23/ethereum-rd-firm-flashbots-shares-details-about-its-next-gen-block-builder/)
- [https://www.youtube.com/watch?v=FqalnLJTdCc](https://www.youtube.com/watch?v=FqalnLJTdCc&amp;ref=wb3vb.io)
- [https://writings.flashbots.net/the-future-of-mev-is-suave/](https://writings.flashbots.net/the-future-of-mev-is-suave/)
