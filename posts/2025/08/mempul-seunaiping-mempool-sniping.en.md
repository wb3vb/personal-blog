---
title: 'Mempool Sniping'
tags:
  - bitcoin
published: true
date: 2025-08-11 13:19:11
description: 'Some people have surely had the experience of clearly buying an Ordinal on Magic Eden, only for it never to arrive.'
---

**Some people have surely had the experience of clearly buying an Ordinal on Magic Eden, only for it never to arrive.**

- On a marketplace like Magic Eden, Ordinals are traded through a **PSBT (Partially Signed Bitcoin Transaction)** swap.
- The Ordinal seller partially signs an off-chain PSBT that essentially says, **"If you send N BTC to my address, I'll swap it for the Ordinal."**
- A marketplace like Magic Eden plays the role of protecting the seller's off-chain PSBT until the buyer signs the other half.
- The buyer sends an Ordinal ↔ BTC swap transaction that transfers that amount of BTC.
- That transaction is broadcast to the Bitcoin network.​
- The moment the buyer presses the "send" button in their Bitcoin wallet, the broadcast transaction moves to a place where transactions gather together, called the **"mempool."**
- The mempool is a space where all the "transactions" that have been sent but are not yet confirmed in a block float around.
- Accordingly, a personal wallet displays such an unconfirmed transaction in the mempool as being in a "pending" state.​

![](d72b98-0-MNjIVIInkWzbg-VL.png)

**The Bitcoin network's 10-minute block confirmation time (mempool.space)**

- Bitcoin blocks are mined at an average interval of **10 minutes**, which means that transaction can take up to 10 minutes to confirm.
- Therefore, there is a high chance the transaction will keep floating around in the mempool for at least up to 10 minutes.
- It is during these very 10 minutes that the **"snipers"** begin to scramble to seize the opportunity.
- The word "sniper" comes from the military, where it refers to what is called a "marksman first class"—specifically the sharpshooter among them, a highly trained long-range shooting specialist—
- and, true to the nickname, snipers watch the transactions in the mempool, identify transactions that can turn a quick profit, and get ready to snipe them.​
- While a transaction is waiting in the mempool, anyone can take the** PSBT** from the mempool, sign it themselves, and resubmit their own updated transaction to the mempool.
- If they spot an attractive transaction, the sniper fires off (broadcasts) a competing transaction carrying a higher fee.
- This makes use of the Bitcoin network's **"RBF (Replace-By-Fee)"** feature.
- Normally, this feature replaces an unconfirmed transaction with another transaction carrying a raised fee, so that it can be confirmed quickly.​
- In fact, before Ordinals came along, this was simply about raising the fee to make a transaction faster, so there was nothing problematic about it at all.
- The problem, however, arose in the way the Magic Eden secondary market handles the "buy" of an Ordinal.
- This is because the UTXO signature of the Ordinal seller's transaction is signed with **"ANYONECANPAY (anyone can pay)."**
- Therefore, as explained above, it becomes a structure in which a sniper can "fairly"(?) snatch away the existing transaction through a PSBT replacement signature.

In the end, anyone reading this can become a sniper, as long as they meet the requirements.

![](d72b98-0-5YPi_u6AaqpQTwGY.png)

​**The targets snipers go after are clear.**

1\) Cases where they want to snatch away a transaction that someone fat-fingered and flip it

2\) Cases where they want to snatch away a transaction whose price surges after the initial mint and the start of secondary trading

​

- In the end, what struck me is that it's roughly akin to a Bitcoin version of MEV (Maximal Extracted Value).
- *(\*Not the same concept as arbitrarily changing the order of transactions)*
- So then, what about my Bitcoin that I already sent by hitting the buy button first…?

\- It gets pushed out by the RBF transaction, dropped, and I get all of it back

\- But the Ordinal I was trying to buy gets taken (infuriating point #1)

\- The upshot is that even pressing the buy button gives no guarantee I'll receive it

​

**So is there really no way to prevent sniping in the mempool in the first place?**

\- Nope

\- The Ordinals OGs and Magic Eden are also actively discussing this topic.

**Or else…**

- There's the method of setting a high fee when firing off the initial "buy" transaction in the first place, and just praying it gets confirmed in the next block.
- There's also the method of watching whether your buy transaction is getting sniped and then jumping into the fee war yourself via RBF.

Just as there is active discussion and development around Ethereum MEV protection, I imagine that for mempool sniping too, monitoring dashboards that even ordinary people can easily use, along with tools for adjusting transaction fees and accelerating transactions, will eventually emerge.
