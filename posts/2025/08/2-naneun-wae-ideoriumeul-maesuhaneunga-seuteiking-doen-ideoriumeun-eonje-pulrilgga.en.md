---
title: "#2. Why Do I Buy Ethereum?: When Will Staked Ethereum Be Unlocked?"
tags:
  - ethereum
published: true
date: 2025-08-11 13:08:17
description: 'The answer to "What will happen once the Merge is complete?" is very commonly the FUD that "all the Ethereum locked in the ETH 2.0 Beacon Chain staking contract will be released at once, causing the Ethereum price to crash." Let us take an objective look at this below.'
---

**As the answer to “What will happen once the Merge is complete?”, one can very commonly find the FUD that “all the Ethereum locked in the ETH 2.0 Beacon Chain staking contract will be released at once, causing the Ethereum price to crash.” Let us take an objective look at this below.**

🔗 [\[Ethereum Note\]#2. Why Do I Buy Ethereum?: When Will Staked Ethereum Be Unlocked?](https://medium.com/@wb3vb.eth/ethereum-note-2-%EB%82%98%EB%8A%94-%EC%99%9C-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80%EC%9D%84-%EB%A7%A4%EC%88%98%ED%95%98%EB%8A%94%EA%B0%80-%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%82%B9-%EB%90%9C-%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80%EC%9D%80-%EC%96%B8%EC%A0%9C-%ED%92%80%EB%A6%B4%EA%B9%8C-3120f5e6848d)

## TL;DR

> *1) Ethereum cannot be unstaked immediately right after the Merge.\
> 2) Afterward, Ethereum unstaking is enabled through the Shanghai fork.\
> 3) The unstaked amount of Ethereum is released slowly and is not sold off in full.*

Countless crypto investors currently show infinite interest in “Wen Merge?” regarding Ethereum, but pay little attention to what comes afterward. So this time, let us look a bit more into **“So what next? Big Short?”**

## 1. What Will Happen Right After the Merge?

Ethereum staked in ETH 2.0 is not unstaked right after the Merge. After the Merge is complete, roughly 6 to 12 months later, the ‘Shanghai’ upgrade—a Post-Merge Cleanup fork—takes place.

Through this upgrade, the key withdrawal functionality that allows unstaking of Ethereum staked on the Beacon Chain, as well as improvements to EVM and Layer-2 fees, are carried out. Therefore, even once the Merge is complete, staked Ethereum and its interest cannot be withdrawn right away.

## 2. Ethereum Staked in ETH 2.0 Is Released Slowly

Moreover, even once the Ethereum unstaking function is enabled through the Shanghai upgrade, the staked amount of Ethereum cannot all be withdrawn by every validator at once. Let us look at this in more detail below.

Currently there is no limit on the amount of Ethereum staked on the Beacon Chain, but there is no benefit to depositing more than 32 ETH per validator. This is because, to increase decentralization, the effective staking balance for each validator is capped at 32 ETH, and beyond that no additional interest rewards are paid.

![](6047ca-7pWndIkEYgAwJk-iWzhbCg.jpeg)

*(Ethereum staking effective balance \| Source: Attestant.io)*

We can therefore surmise two cases for unstaking: the first is a ‘partial unstaking’ that withdraws the interest earnings, excluding the 32 ETH effective staking balance; the second is a ‘full unstaking’ of the staked amount, exiting (EXIT) entirely.

## 3. Partial Withdrawal

According to the Beacon Chain’s consensus rules, the number of validators that can withdraw Ethereum per epoch is limited to 256. Because the ETH 2.0 network records in units of ‘epochs’ rather than ‘blocks,’ with each cycle being 6.4 minutes and the day divided into a total of 225 epochs, a maximum of 57,600 validators can withdraw per day.

![](6047ca-uOp1uuNLp-aiJTpedst3SQ.jpeg)

*(Ethereum 2.0 spec \| Source: Ethereum GitHub)*

As of now, referring to the image below, the average balance held per staking validator is about 33.67 ETH. If we predict the held balance to be around 34 ETH at the time unstaking becomes possible, taking into account newly added validators and PoS rewards, then the withdrawable balance per validator can be thought of as about 2.X ETH.

![](6047ca-qfxFcqlEoWAIKa8b29TjFA.png)

*(Ethereum Beacon Chain dashboard \| Source: Beaconcha.in)*

From the chart below, we can estimate the number of active validators at the time of the Shanghai upgrade after the Merge (6 to 12 months later) at roughly 800,000 to 900,000. Early in the withdrawal period, based on the maximum of 57,600 validators per day calculated above, over about 13.8 to 15.6 days a daily maximum of roughly 116,000 ETH could be withdrawn, and spot selling pressure could arise.

![](6047ca-KbpbVuMCKmDmLPXN91fMaw.png)

*(Total number of Ethereum 2.0 validators \| Source: glassnode)*

However, on the assumption that users who staked Ethereum through exchanges could become the primary sellers, if we calculate the overall staking share from the image below, the three largest exchanges (Coinbase, Kraken, Binance) together account for about 40% of the total staking share. If we assume there is a probability that the 60% portion—excluding those exchanges’ share—of the daily maximum withdrawal of 116,000 ETH could be re-staked and re-participate as validators, then in effect the actual daily selling pressure can be seen as smaller than that amount.

![](6047ca-VwlhBm5gRjXCgeRyQfLfbA.png)

*(Staking share by platform \| Source: pools.invis.cloud)*

## 4. Full Withdrawal

![](6047ca-YGtvtx-dndeCz-Pyj0SZOA.jpeg)

*(Ethereum 2.0 CHURN_LIMIT \| Source: Ethereum GitHub)*

In the case of giving up validator status by withdrawing one’s entire holdings rather than a ‘partial withdrawal,’ a ‘churn limit’ exists to maintain the stability and security of the Ethereum network. This is the floor value of the total number of active validators divided by 65,536, granting the right to give up that many validators per epoch.

As of now, with validators at 403,335/65,536 = 6.1544, only 6 validators—the floor value—can fully withdraw their Ethereum per epoch. Therefore, if we calculate based on an expected 800,000 validators at the time unstaking becomes possible, 12 validators can withdraw per epoch, and it would take at least about 296 days or more for all validators to exit.

## 5. Wrapping Up

The model for the amount of Ethereum unstaked must be calculated as a mixed model of partial and full withdrawals. Right after the unstaking function is enabled, the intensity of selling pressure may differ depending on the market narrative—whether withdrawals are for profit-taking or cashing out—but after unstaking is enabled, the Ethereum price is highly likely to stabilize quickly within a few months.

## 6. References

- [https://www.attestant.io/posts/understanding-validator-effective-balance/](https://www.attestant.io/posts/understanding-validator-effective-balance/)
- [https://studio.glassnode.com/metrics?a=ETH&amp;m=eth2.StakingTotalValidatorsCount&amp;resolution=24h](https://studio.glassnode.com/metrics?a=ETH&amp;m=eth2.StakingTotalValidatorsCount&amp;resolution=24h&amp;ref=wb3vb.io)
- [https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md)
- [https://pools.invis.cloud/](https://pools.invis.cloud/)
- [https://medium.com/r?url=https%3A%2F%2Ftim.mirror.xyz%2FM_3JZXBkvXnr3W1222WIDo1ipMuFymszjH-FP40CO5c](https://medium.com/r?url=https%3A%2F%2Ftim.mirror.xyz%2FM_3JZXBkvXnr3W1222WIDo1ipMuFymszjH-FP40CO5c&amp;ref=wb3vb.io)
