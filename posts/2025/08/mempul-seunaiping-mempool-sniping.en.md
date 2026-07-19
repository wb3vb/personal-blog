---
title: 'Mempool Sniping'
category: crypto
tags:
  - bitcoin
published: true
date: 2025-08-11 13:19:11
description: 'You have probably had it happen: you clearly buy an Ordinal on Magic Eden, and then it just never arrives.'
---

**You've probably had it happen: you clearly buy an Ordinal on Magic Eden, and then it just never arrives.**

- On a marketplace like Magic Eden, Ordinals are traded through a **PSBT (Partially Signed Bitcoin Transaction)** swap.
- The Ordinal seller partially signs an off-chain PSBT that essentially says, **"If you send N BTC to my address, I'll swap it for the Ordinal."**
- A marketplace like Magic Eden holds and protects the seller's off-chain PSBT until the buyer signs the other half.
- The buyer sends an Ordinal ↔ BTC swap transaction that transfers that amount of BTC.
- That transaction is broadcast to the Bitcoin network.​
- The moment the buyer hits "send" in their Bitcoin wallet, the broadcast transaction lands in a place where transactions gather, called the **"mempool."**
- The mempool is where all the transactions that have been sent but aren't yet confirmed in a block float around.
- So your wallet shows an unconfirmed transaction like this, still sitting in the mempool, as "pending."​

![](d72b98-0-MNjIVIInkWzbg-VL.png)

**The Bitcoin network's 10-minute block confirmation time (mempool.space)**

- Bitcoin blocks are mined about every **10 minutes** on average, which means a transaction can take up to 10 minutes to confirm.
- So there's a good chance the transaction will keep floating around in the mempool for anywhere up to 10 minutes.
- And it's during these 10 minutes that the **"snipers"** start scrambling to seize the opportunity.
- The word "sniper" comes from the military, where it refers to a "marksman first class" (specifically the sharpshooter among them, a highly trained long-range shooting specialist),
- and, true to the nickname, snipers watch the transactions in the mempool, identify transactions that can turn a quick profit, and get ready to snipe them.​
- While a transaction sits in the mempool, anyone can grab the **PSBT**, sign it themselves, and resubmit their own updated transaction.
- If they spot an attractive transaction, the sniper fires off (broadcasts) a competing transaction carrying a higher fee.
- This makes use of the Bitcoin network's **"RBF (Replace-By-Fee)"** feature.
- Normally this feature swaps out an unconfirmed transaction for one with a higher fee, so it confirms quickly.​
- Before Ordinals came along, this was just about bumping the fee to make a transaction faster, so there was nothing wrong with it at all.
- The problem showed up in the way the Magic Eden secondary market handles the "buy" of an Ordinal.
- This is because the UTXO signature of the Ordinal seller's transaction is signed with **"ANYONECANPAY (anyone can pay)."**
- So, as I explained above, you end up with a setup where a sniper can "fairly"(?) snatch the existing transaction away through a PSBT replacement signature.

Bottom line: anyone reading this can become a sniper, as long as they meet the requirements.

![](d72b98-0-5YPi_u6AaqpQTwGY.png)

​**The targets snipers go after are clear.**

1\) Cases where they want to snatch away a transaction that someone fat-fingered and flip it

2\) Cases where they want to snatch away a transaction whose price surges after the initial mint and the start of secondary trading

​

- What struck me is that it's roughly a Bitcoin version of MEV (Maximal Extracted Value).
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

- One option is to set a high fee when you first fire off the "buy" transaction, and just pray it gets confirmed in the next block.
- Another is to watch whether your buy transaction is getting sniped, then jump into the fee war yourself via RBF.

Just as there's active discussion and development around Ethereum MEV protection, I imagine that for mempool sniping too, we'll eventually see monitoring dashboards that even ordinary people can use easily, along with tools for adjusting transaction fees and speeding up transactions.
