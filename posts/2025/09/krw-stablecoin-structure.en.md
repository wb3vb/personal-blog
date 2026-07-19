---
title: "The KRW Stablecoin Issuance Structure That Regulation Designs: What Is Layer-1's Strategy?"
tags:
  - stablecoin
published: true
date: 2025-09-05 01:51:51
description: '1. Overview'
---

# 1. Overview

Drawing on market trends so far and where the major players stand, I want to lay out my hypotheses about how the early Korean won stablecoin (hereafter "KRW stablecoin") market will take shape. Assuming issuance on a public chain, I do think tech-focused small and mid-sized companies could unveil a model where they issue a KRW stablecoin on a particular chain and process every transaction on-chain. But this piece starts from a question anyone would recognize: **"Which KRW stablecoin will seize leadership of the Korean market?"**

The core concept for answering this question is PMF (product-market fit). As the global stablecoin market has proven, its value has exploded around two key use cases. The first is its role as the core quote currency on cryptocurrency exchanges; the second is its role as a **practical financial tool** for payments and remittances. In the same way, I believe the Korean market won't truly be up for grabs until a player emerges that satisfies both of these PMFs.

Seen this way, the recent partnerships between Korea's leading simple-payment operators and cryptocurrency exchanges (Naver Pay & Upbit, Toss & Bithumb) signaled the arrival of the most powerful pairings yet, able to dominate both Web2's overwhelming points of use and Web3's core liquidity.

🔗 ['Upbit–Naver Pay' vs 'Bithumb–Toss'… The Stablecoin Alliance Competition](https://www.dailian.co.kr/news/view/1532183/?sc=Naver&ref=wb3vb.io)

So in what follows I'll focus on forecasting the structure in which the fintech- and exchange-led consortiums, which are expected to hold overwhelming early-market dominance, will issue and operate their KRW stablecoins. Weighing current regulations like the Virtual Asset User Protection Act against business requirements, I think the model they land on is very likely to be a "three-party separation model" that cleanly splits the roles of 1) distribution, 2) issuance, and 3) infrastructure.

Within that structure, I expect the initial mode of operation to be a hybrid model inside a *"walled garden" ecosystem*: all payments and remittances settle instantly on Big Tech's off-chain internal ledger, and only final settlement (deposits and withdrawals) is posted on-chain. I also think it will most likely restrict deposits and withdrawals to and from external (EOA) wallets, heading off at the root the monetary and foreign-exchange policy risks that early on-chain activity could create.

------------------------------------------------------------------------

# 2. Global Benchmark: The PayPal-Paxos Model

The structure I judge most likely to serve as the blueprint for a domestic KRW stablecoin model is the PayPal-Paxos consortium. It's more than a simple partnership. I see it as a system that ***separates the user experience (front-end) from financial regulation (back-end)*** to get the most out of each side's strengths. Before forecasting the domestic KRW stablecoin issuance structure, let's first look at how that model actually works.

## 2-1 Clear R&R: Separating Business from Regulation

The heart of this model is a split of roles: PayPal handles "the customer and the business," while Paxos handles "regulation and stablecoin infrastructure."

**1) PayPal (Distribution/Front-End Layer)**

PayPal manages every touchpoint where customers actually use and experience the stablecoin.

1.  **Platform integration and UX provision**
    1.  Provides an intuitive UI/UX so users can easily buy, sell, pay with, and send PYUSD against fiat currency within the PayPal and Venmo apps
2.  **Off-chain ledger management**
    1.  All transactions between users are recorded not on the blockchain but in PayPal's internal centralized database (ledger)
    2.  This enables 1) instant transaction finality, 2) zero fees, and 3) the handling of large-scale traffic
3.  **Leveraging the merchant network**
    1.  Secures immediate points of use by offering a "Checkout with Crypto" function using PYUSD at the many online/offline merchants where existing PayPal payments are accepted
4.  **Customer support and dispute resolution**
    1.  Exclusively handles first-line customer support and dispute-resolution processes such as user inquiries, transaction errors, and refund requests

### **2) Paxos (Regulated Issuance/Back-End Layer)**

Behind the scenes, Paxos becomes the entity responsible for PYUSD's stablecoin credibility and technical stability.

1.  **Regulatory compliance and legal entity**
    1.  As a "Limited Purpose Trust Company" supervised by the New York Department of Financial Services (NYDFS), it bears the sole legal responsibility to issue and redeem PYUSD
    2.  All activities take place within the supervisory authority's stablecoin regulatory framework
2.  **Reserve management**
    1.  Safely holds reserves of 100% or more (cash, U.S. short-term Treasuries, etc.) in segregated accounts
    2.  Issues monthly audit reports on the composition of reserves through an accounting firm
3.  **Operations**
    1.  Deploys the PYUSD smart contract on the public blockchain and, at PayPal's request, performs the *settlement role of technically minting and burning tokens*

------------------------------------------------------------------------

## 2-2. Back-End Fund and Data Flows: The Reality of the Hybrid Model

In short, this model runs on two core concepts: the *"omnibus account"* and the *"internal ledger."*

> ***\*PayPal Cryptocurrency Terms and Conditions:\
> -* *PayPal combines your Crypto Asset balance with the Crypto Asset balances of other PayPal accountholders and holds those Crypto Assets as your agent in one or more omnibus accounts, directly or with a Service Provider***

1.  **Omnibus account**
    1.  A single, massive integrated wallet that PayPal manages on-chain, gathering and holding every user's PYUSD in this one wallet, with Paxos serving as the custodian
2.  **Internal ledger**
    1.  A database on PayPal's central servers that records which user holds how large a PYUSD balance, which PayPal manages

With those two in place, the stablecoin's lifecycle works like this:

### 1) On-Ramp (USD → Buying PYUSD)

1.  *User request: A user requests to buy PYUSD with USD 100 in the PayPal app*
2.  *Fund withdrawal (PayPal): PayPal withdraws USD 100 from the user's linked bank account or card*
3.  *Reserve transfer (PayPal → Paxos): PayPal transfers that USD 100 to Paxos's reserve-management account*
4.  *Token issuance (Paxos): After confirming the USD 100 deposit, Paxos mints 100 PYUSD on-chain and sends it to PayPal's omnibus account*
5.  *Balance update (PayPal): PayPal updates that user's PYUSD balance to "+100" on its internal ledger*
6.  *The off-ramp proceeds in reverse order*

### **2) Internal Transactions (Transfers Between PayPal Users)**

1.  *A sends 10 PYUSD to B*
2.  *This transaction is processed solely on PayPal's internal ledger (A's balance −10, B's balance +10)*
3.  *Because no transaction occurs on the blockchain, it is instant and fee-free*

### **3) Connecting to the External Ecosystem (Deposits and Withdrawals)**

1.  **External withdrawal:**
    1.  *A user requests to withdraw 50 PYUSD to their own MetaMask wallet*
    2.  *PayPal deducts 50 PYUSD from the internal ledger*
    3.  *An on-chain transaction occurs sending 50 PYUSD from the omnibus account to the user's MetaMask address (\*any gas fees incurred are borne by the user)*
2.  **External deposit:**
    1.  *A user transfers PYUSD from an external wallet to their PayPal deposit address*
    2.  *PayPal's system detects that on-chain transaction*
    3.  *Once confirmation is complete, the user's internal-ledger balance is updated*

------------------------------------------------------------------------

# **3. What Is the Optimal Korea-Style Issuance Model?**

Given the tangled domestic regulatory and market environment, I judge it virtually impossible, and highly risky, for a single company to lead every part of issuance. That's why I believe a "three-party separation structure" that plays to each player's strengths and clarifies who is responsible will be the most realistic market model.

## 3-1. Distribution/Use: Big Tech Channels

1.  I expect Big Tech to clearly show a market approach oriented toward ***"issuance \< distribution,"*** building on the strengths it already has. Its core goal looks like folding the KRW stablecoin seamlessly into its own and its partners' ecosystems (shopping, content, advertising, offline payments) to boost payment activity and keep capital from leaking out to outside platforms. On top of that, firms with an overwhelming user base will provide the distribution rails that lead on payment UX, KYC, and demand creation.

## 3-2. Technology/Infrastructure Engine: The Exchange

1.  I think the best fit for Upbit is to serve not as the issuer but as the "core infrastructure partner," a role essential to the consortium's success, drawing on its know-how in exchange custody and in running and managing member wallets.
    1.  **Issuance support and virtual-asset custody back-end**
        1.  Takes charge of providing the technical foundation on which the KRW stablecoin will operate, including large-scale digital-asset custody know-how, the creation and management of millions of custodial wallets, and deposits/withdrawals
    2.  **Risk-management engine**
        1.  Supports risk-management systems such as on-chain security (AML/Travel Rule) and the real-time reflection of address blacklists and sanctions lists
    3.  **B2B operations for fintech integration**
        1.  Provides the technical standards needed for integration with Big Tech firms, such as user UID mapping, the issuance and management of custodial wallets for users/merchants, and the generation of settlement reports

## 3-3. Issuance/Custody: An Independent Trust/SPV

1.  Considering the difficulty for banks to directly undertake public-chain-based KRW stablecoin issuance and the risks under the **Virtual Asset User Protection Act**, I believe the issuer will be an independent legal entity (a trust company or SPV) that is fully separated in legal terms.
    1.  **Transparent custody and management of the won reserves**

    {/* */}

    1.  1.  Transparently deposits and manages won reserves matched 1:1 with the issued volume of the KRW stablecoin through a bank ↔ issuer linkage
        2.  Takes exclusive charge of periodically proving this (Proof of Reserve)
    2.  **Exclusive charge of issuing and burning the KRW stablecoin**
        1.  Based on the distributor's (Big Tech's) periodic net-settlement results, mints or burns a corresponding amount of the KRW stablecoin on-chain

------------------------------------------------------------------------

# 4. How Key Regulations Affect the Structure

I believe the structure of the KRW stablecoin three-party consortium will be not a simple business choice but an inevitable product of complying with a complex regulatory framework.

## 4-1. Two Key Regulatory Hurdles

The forecast that the issuer will be a fully separate, independent legal entity rests on two key regulatory frameworks, given the difficulty commercial banks face in undertaking KRW stablecoin issuance and the risks under the Virtual Asset User Protection Act.

1.  According to the **capital-adequacy regulation of the BIS (Basel Committee on Banking Supervision)**, if a bank directly issues a **public-blockchain**-based stablecoin and holds its reserves, it must bear an additional burden. Even if the bank holds KRW 1 trillion in safe cash as reserves, the BIS does not regard these reserves as a perfectly safe asset of "0% risk," but assesses them as carrying a certain level of risk (risk-weighted assets, RWA). In the end, the bank must tie up more of its own capital to prepare for this hypothetical risk, which greatly reduces the practical benefit of direct issuance, and that is why it is unlikely to issue a KRW stablecoin on a public chain. Some will point to cases where a bank has issued one, like JPMorgan's JPM Coin, but I see that as a different animal, since it is closer to an "internal settlement system" run for institutional clients on a fully controlled private blockchain. The fact that, to date, no commercial bank anywhere in the world has directly issued a stablecoin to the general public on a public blockchain clearly shows just how large a barrier this regulatory burden is in practice.
2.  **Article 10 (Prohibition of Conflict-of-Interest Conduct) of the "Virtual Asset User Protection Act,"** which took effect on July 19, 2024, **strictly prohibits virtual-asset service providers (exchanges, etc.) from brokering transactions in virtual assets issued by "themselves or a related party."** For the exchange, the consortium's key point-of-use partner, not to fall foul of this provision, the issuer must be completely insulated from it in legal terms.

So the only realistic way to resolve both the banks' reluctance to issue and the exchange's legal risk within the consortium is, I believe, to put forward an independent issuer that doesn't qualify as a related party of any of them.

## 4-2. The Solution: Separating Roles and Legal Entities

To avoid these regulatory risks, the market is very likely to adopt the following **structural solution**. Some in the legal community may read the prohibition as limited to "trading within an exchange," but I think the early KRW stablecoin business model has no choice but to follow the most conservative structure to minimize regulatory uncertainty.

1.  **Complete independence of the issuer**
    1.  An independent trust entity/SPV that does not qualify as a related party of the exchanges (Upbit, Bithumb, etc.) or the distributors (Big Tech, etc.) takes exclusive charge of issuance. I believe this is a structure designed to comply with Article 10 of the `Virtual Asset User Protection Act`.
2.  **Limiting the exchange's role to that of a technology provider**
    1.  An exchange such as Upbit enters into a "technology-supply and outsourced-operation contract" with the issuer and the distributor, positioning itself legally not as the "issuer" but as an "infrastructure operations agent."
3.  **Securing the possibility of an exchange listing**
    1.  Under this structure, because the issuer is not a related party of the exchange, even if the KRW stablecoin is later listed on that exchange, the possibility of legal conflict is markedly lower, thereby guaranteeing future usability.

To me, this envisioned structure does more than simply "avoid" regulatory risk. Right now, it is the best strategy for clarifying each participant's role and securing the stability and scalability of the whole business model.

------------------------------------------------------------------------

# **5. The Initial Blueprint: A "Hybrid Model" Within a "Walled Garden"**

The initial way the KRW stablecoin operates is very likely to be designed to hit two goals at once: **"user experience"** and **"regulatory compliance."** In the end, that most likely means implementing the hybrid model PayPal has proven, inside a "walled garden" ecosystem.

1.  **Off-chain-first payments: securing speed and convenience**
    1.  **Internal-ledger transactions**
        1.  Every KRW stablecoin transaction occurring within the fintech app (user-to-user transfers, merchant payments, etc.) is not recorded directly on the blockchain but **processed instantly on the company's internal ledger (DB)**. This makes it possible to give users a **fee-free, instant transaction experience**.
    2.  **Dispute handling**
        1.  One trait of blockchains, and at the same time a drawback, is the "irreversibility of transactions." In a payment system this actually works as a very large drawback. Since on-chain transactions can't be reversed, disputes like refunds and order cancellations can instead be handled flexibly by creating a new "corrective transaction" on the internal ledger, the way PayPal does.
2.  **On-chain settlement: securing transparency and trust**
    1.  **Periodic net settlement**
        1.  The blockchain is used as a "settlement layer for trust and audit." The distributor (Big Tech) calculates only the net amount of all off-chain transactions that occurred on a daily basis or at specific intervals, and settles this with the issuer on-chain. For example, even if one million transactions occurred over a day, only a few transactions, the final result, are recorded on-chain, securing both efficiency and transparency.
3.  **Gradual opening**
    1.  **Blocking external integration initially**
        1.  In the very earliest stage of the KRW stablecoin business, it is very highly likely to begin as a "walled garden" in which deposits and withdrawals to external personal wallets (MetaMask, etc.) are fundamentally blocked. Given Korea's strict monetary policy, the Foreign Exchange Transactions Act (capital-outflow controls), the Act on Reporting and Use of Specific Financial Transaction Information (anti-money-laundering), and the Bank of Korea's conservative stance on private money, this is the most reasonable choice for minimizing regulatory uncertainty.
    2.  **Phased permission**
        1.  Once the relevant laws and systems stabilize going forward, I believe transfers may be permitted in phases, starting with those between domestic virtual-asset service providers (VASPs, e.g., other exchanges) whose identities are verified through a Travel Rule solution. Even so, reaching full opening looks likely to take considerable time.

------------------------------------------------------------------------

# 6. Which Chain Can Become the Partner of the KRW Stablecoin?

To sum up, I believe the early KRW stablecoin will run on a model that processes most transactions through Big Tech's internal ledger and settles only the final result on-chain. So the initial issuance chain is very likely to function not as a transaction-processing layer but as a primary layer for trust.

Under this premise, the consortium's chain choice can be divided into two stages: the path of **"Stage 1: the initial settlement chain,"** which proves the market's stability, and **"Stage 2: the strategic expansion chain,"** for ecosystem expansion. And I believe the conditions each stage demands of the chain are completely different.

## **Stage 1: The Initial Settlement Chain (Primary Chain), the First Issuance Chain**

The chain a company first issues its KRW stablecoin on can't be a testbed for technical experimentation. To win over regulators, partners, and the whole market, in practical terms it has no choice but to make the most conservative, proven pick. So Ethereum, which holds the issuance track record for the global benchmark stablecoins (USDC, USDT, PYUSD, etc.) and boasts the strongest economic security and neutrality, is very likely to be adopted.

The reasons an issuer would choose Ethereum at this stage are that it satisfies the following key requirements:

1.  **Stability and proven security:** Ethereum's security model, which has maintained close to 100% uptime over the past several years and stably protected value worth thousands of trillions of won, provides non-negotiable "trust." For a KRW stablecoin that must periodically settle large sums of money, it appears there is no value more important than this.
2.  **The trust conferred by neutrality and precedent:** Ethereum is positioned as a "neutral chain" not subordinate to any particular company or country. On top of that, the fact that dollar stablecoins have already operated stably for several years and left numerous precedents for regulators and the market can relieve the issuing consortium of the burden of choosing a new technology.

At this stage, Ethereum's high gas fees (cost) may not be a decisive consideration. In a model that gathers numerous off-chain transactions and settles them in a few transactions per day, the "safe finality" of assets that can amount to trillions of won is overwhelmingly more important than transaction cost.

## **Stage 2: The Expansion Chain (Secondary Chain), Multi-Chain Expansion**

Once the KRW stablecoin is settling stably on the settlement chain, the next task naturally becomes "growth." That's because it's hard to branch out into varied Web3 services beyond payment/settlement on top of Ethereum's expensive transaction costs and limited scalability. This is exactly where I see a strategic opening for a next-generation Layer-1 blockchain to become the "optimal expansion partner."

The core values that the expansion chain must provide, differentiating itself from the initial settlement chain, are as follows.

1.  **Tailored, hands-on technical support for regulatory compliance:**
    1.  Unlike a neutral foundation, it must be able to rapidly develop regulation-tailored solutions solely for the KRW stablecoin consortium and provide hands-on technical support. For example, a close "technology partnership" that proactively proposes and jointly develops functions needed only for Korea's particular financial regulations is, I believe, a powerful value of an expansion chain that no one else can provide.
2.  **A rich ecosystem in which the KRW stablecoin can be "used"**
    1.  The expansion chain's greatest role is to provide "sources of demand" for the KRW stablecoin. It must secure an environment and ecosystem in which the KRW stablecoin can be used like a reserve currency on the chain. This provides the KRW stablecoin with immediate use cases and supplies the expansion-chain ecosystem with a stable won-based asset, creating a powerful win-win structure.
3.  **Economic efficiency and scalability**
    1.  It must provide the technical environment (Gas Abstraction, etc.) to implement, on a KRW stablecoin basis, new business models that require high transaction throughput and low cost, like micropayments, in-game item trading, and streaming rewards, which faced high barriers on the settlement chain.

So a Layer-1 blockchain can position itself to become a KRW stablecoin issuance chain along two paths. If it can, it should of course also explore becoming the "Stage 1 initial settlement and KRW stablecoin issuance chain." But the bigger, more realistic opportunity, and where strategy should press hardest, is, I think, positioning as **"the essential partner for Stage 2 expansion."** By pairing tailored regulatory solutions, an immediate-use ecosystem, hands-on support, and economic efficiency as a multi-chain expansion chain, a chain can secure the KRW stablecoin's substantive on-chain scalability and create added value.

------------------------------------------------------------------------

# **7. Conclusion: The KRW Stablecoin Market, and Layer-1 Positioning**

The KRW stablecoin issuance market seems likely, in the end, to become a **market whose design is driven by regulation**. I believe the regulatory framework appearing in the `Virtual Asset User Protection Act` and in recently introduced bills can naturally lead to the emergence of a "three-party separation model" in which the roles of distribution (Big Tech), infrastructure (the exchange), and issuance (an independent trust company) are separated.

Within this environment, the positioning strategy for a Layer-1 blockchain to become a partner of the KRW stablecoin consortium seems worth considering with a two-stage approach at its center.

In the "Stage 1 settlement chain" race, where early-market stability matters more than anything, you have to keep firmly in mind the chance that it converges on a global-standard chain like Ethereum, one with absolute trust and proven precedent.

So, personally, I think the spot where the opportunity is realistically greater and where strategy should be concentrated is the role of the "Stage 2 expansion-chain (multi-chain) partner" that will drive the KRW stablecoin's growth. Maybe the key to market entry is adding, on top of the value the initial settlement chain provides, the kind of differentiated value only an expansion chain can offer?

What I've laid out here is just one of several hypothetical paths worth considering for the KRW stablecoin to grow in earnest and for a Layer-1 chain to establish itself in the market. I'll keep watching with interest to see how the coming regulatory proposals, and the structure of the Big Tech-based KRW stablecoin consortiums that are highly likely to seize market leadership, end up unfolding.

------------------------------------------------------------------------

# 8. References

1.  ["Whoever Seizes Upbit Will Triumph in the KRW Stablecoin [ASA Opinion #3]." 4Pillars, 2025](https://4pillars.io/ko/issues/whoever-partners-with-upbit-wins-the-krw-stablecoin-race)
2.  [PayPal Cryptocurrency Terms and Conditions](https://www.paypal.com/us/legalhub/paypal/cryptocurrencies-tnc)
