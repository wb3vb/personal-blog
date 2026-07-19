---
title: "#2. Why Do I Buy Ethereum?: When Will Staked Ethereum Be Unlocked?"
category: crypto
tags:
  - ethereum
published: true
date: 2025-08-11 13:08:17
description: 'One of the most common answers to "What will happen once the Merge is complete?" is the FUD that "all the Ethereum locked in the ETH 2.0 Beacon Chain staking contract will be released at once, causing the Ethereum price to crash." This post takes an objective look at that claim.'
---

**One of the most common answers to “What will happen once the Merge is complete?” is the FUD that “all the Ethereum locked in the ETH 2.0 Beacon Chain staking contract will be released at once, causing the Ethereum price to crash.” Let’s take an objective look at that claim.**

🔗 [\[Ethereum Note\]#2. Why Do I Buy Ethereum?: When Will Staked Ethereum Be Unlocked?](https://medium.com/@wb3vb.eth/ethereum-note-2-%EB%82%98%EB%8A%94-%EC%99%9C-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80%EC%9D%84-%EB%A7%A4%EC%88%98%ED%95%98%EB%8A%94%EA%B0%80-%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%82%B9-%EB%90%9C-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80%EC%9D%80-%EC%96%B8%EC%A0%9C-%ED%92%80%EB%A6%B4%EA%B9%8C-3120f5e6848d)

## TL;DR

> *1) Ethereum cannot be unstaked immediately right after the Merge.\
> 2) Afterward, Ethereum unstaking is enabled through the Shanghai fork.\
> 3) The unstaked amount of Ethereum is released slowly and is not sold off in full.*

Plenty of crypto investors are endlessly curious about “Wen Merge?” when it comes to Ethereum, yet they pay little attention to what comes afterward. So this time, let’s dig into **“So what next? Big Short?”**

## 1. What Will Happen Right After the Merge?

Ethereum staked in ETH 2.0 does not get unstaked right after the Merge. Once the Merge is complete, roughly 6 to 12 months later, the ‘Shanghai’ upgrade (a Post-Merge Cleanup fork) takes place.

This upgrade delivers the key withdrawal feature that lets you unstake Ethereum from the Beacon Chain, along with improvements to EVM and Layer-2 fees. So even after the Merge wraps up, you still can’t withdraw your staked Ethereum or the interest on it right away.

## 2. Ethereum Staked in ETH 2.0 Is Released Slowly

And even after the Shanghai upgrade turns on unstaking, validators can’t all pull out their staked Ethereum at once. Let’s look at why in more detail.

Right now there’s no cap on how much Ethereum can be staked on the Beacon Chain, but there’s no point in depositing more than 32 ETH per validator. To encourage decentralization, each validator’s effective staking balance is capped at 32 ETH, and anything above that earns no extra interest rewards.

![](6047ca-7pWndIkEYgAwJk-iWzhbCg.jpeg)

*(Ethereum staking effective balance \| Source: Attestant.io)*

So we can picture two kinds of unstaking. The first is a ‘partial unstaking’ that pulls out the interest earnings while leaving the 32 ETH effective staking balance in place. The second is a ‘full unstaking’ that withdraws the whole staked amount and exits (EXIT) completely.

## 3. Partial Withdrawal

Under the Beacon Chain’s consensus rules, only 256 validators can withdraw Ethereum per epoch. The ETH 2.0 network keeps time in ‘epochs’ rather than ‘blocks,’ and since each epoch runs 6.4 minutes and a day splits into 225 epochs, at most 57,600 validators can withdraw in a single day.

![](6047ca-uOp1uuNLp-aiJTpedst3SQ.jpeg)

*(Ethereum 2.0 spec \| Source: Ethereum GitHub)*

As the image below shows, the average balance held per staking validator is currently about 33.67 ETH. Factoring in newly added validators and PoS rewards, if we assume that balance sits around 34 ETH by the time unstaking opens up, then each validator can withdraw roughly 2.X ETH.

![](6047ca-qfxFcqlEoWAIKa8b29TjFA.png)

*(Ethereum Beacon Chain dashboard \| Source: Beaconcha.in)*

The chart below puts the number of active validators at the Shanghai upgrade (6 to 12 months after the Merge) at roughly 800,000 to 900,000. Early in the withdrawal window, using the daily cap of 57,600 validators we calculated above, up to about 116,000 ETH a day could come out over some 13.8 to 15.6 days, and that could create spot selling pressure.

![](6047ca-KbpbVuMCKmDmLPXN91fMaw.png)

*(Total number of Ethereum 2.0 validators \| Source: glassnode)*

Still, if we assume the people most likely to sell are those who staked through exchanges, the image below shows that the three largest exchanges (Coinbase, Kraken, Binance) together hold about 40% of all staking share. The remaining 60% (everything outside those exchanges) of that 116,000 ETH daily maximum could plausibly be re-staked and rejoin as validators, which means the real daily selling pressure is likely smaller than the headline number.

![](6047ca-VwlhBm5gRjXCgeRyQfLfbA.png)

*(Staking share by platform \| Source: pools.invis.cloud)*

## 4. Full Withdrawal

![](6047ca-YGtvtx-dndeCz-Pyj0SZOA.jpeg)

*(Ethereum 2.0 CHURN_LIMIT \| Source: Ethereum GitHub)*

When you give up validator status by withdrawing everything rather than doing a ‘partial withdrawal,’ a ‘churn limit’ kicks in to keep the Ethereum network stable and secure. It’s the floor of the total active validators divided by 65,536, and it sets how many validators can be given up per epoch.

Right now, with validators at 403,335/65,536 = 6.1544, only 6 validators (the floor value) can fully withdraw their Ethereum each epoch. So if we run the numbers on an expected 800,000 validators when unstaking opens, 12 validators can withdraw per epoch, and it would take at least around 296 days for every validator to exit.

## 5. Wrapping Up

The amount of Ethereum that gets unstaked has to be modeled as a mix of partial and full withdrawals. Right after unstaking turns on, how hard the selling pressure hits will depend on the market narrative, whether people are withdrawing to take profit or to cash out, but once unstaking is live, the Ethereum price is very likely to settle down within a few months.

## 6. References

- [https://www.attestant.io/posts/understanding-validator-effective-balance/](https://www.attestant.io/posts/understanding-validator-effective-balance/)
- [https://studio.glassnode.com/metrics?a=ETH&amp;m=eth2.StakingTotalValidatorsCount&amp;resolution=24h](https://studio.glassnode.com/metrics?a=ETH&amp;m=eth2.StakingTotalValidatorsCount&amp;resolution=24h&amp;ref=wb3vb.io)
- [https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md)
- [https://pools.invis.cloud/](https://pools.invis.cloud/)
- [https://medium.com/r?url=https%3A%2F%2Ftim.mirror.xyz%2FM_3JZXBkvXnr3W1222WIDo1ipMuFymszjH-FP40CO5c](https://medium.com/r?url=https%3A%2F%2Ftim.mirror.xyz%2FM_3JZXBkvXnr3W1222WIDo1ipMuFymszjH-FP40CO5c&amp;ref=wb3vb.io)
