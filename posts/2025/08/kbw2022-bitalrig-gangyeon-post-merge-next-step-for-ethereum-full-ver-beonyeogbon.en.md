---
title: "[KBW2022: Vitalik's Talk] Post Merge: Next Step for Ethereum (full ver. translation)"
tags:
  - ethereum
published: true
date: 2025-08-11 13:13:23
description: ''
---

🔗 [\[KBW2022: Vitalik's Talk\] Post Merge: Next Step for Ethereum (full ver. translation)](https://medium.com/@wb3vb.eth/kbw2022-%EB%B9%84%ED%83%88%EB%A6%AD-%EA%B0%95%EC%97%B0-post-merge-next-step-for-ethereum-full-ver-%EB%B2%88%EC%97%AD%EB%B3%B8-ad76a7903910)

Vitalik Buterin, Chief Scientist at Ethereum Foundation

Translated by @web3vibe

## Precautions:

> *1) This material was produced by directly 'typing' out and translating into English the audio file recorded on-site at KBW 2022.\
> 2) Rather than a stiff, literal translation, I tried to paraphrase the sentences to make them as easy to understand as possible in context.\
> 3) Although I originally made this translation for my own personal notes, I'm sharing it in the hope that many people who couldn't attend the event will read it.\
> 4) Since this is not a professional translation, please keep in mind that some sentences may convey the wrong meaning.*

Thank you for the warm welcome.

What I want to talk about today are the things that, I think, everyone is currently excited about when it comes to Ethereum: Proof of Stake, the Merge, and some of the things that will happen after the Merge.

Let's talk about this not just from a technical perspective, but also from the perspective of why people and organizations need Ethereum, and what kind of impact Ethereum can have on the world.

![](ef582c-nsFLej7HfE2g80C77T4BJQ.png)

*(Ethereum's Upgrade Path \| Source: @Vitalik Buterin)*

The Merge is coming soon, and it is probably the largest upgrade in all of Ethereum's history. The Merge is the final step in moving Ethereum's state from Proof of Work (PoW) to Proof of Stake (PoS), and Proof of Stake is something we've been working on almost from the very beginning, going back to the start of 2018, before the first version of Ethereum had even launched, even before the crowd sale began.

Since then, through our research, we came to understand which kinds of Proof of Stake protocols are feasible, whether they can actually be used, and what provides the highest level of security. In 2018 we started actually building and deploying the current version of Ethereum's Proof of Stake, the Beacon Chain, and in December 2020 the Beacon Chain, Ethereum's Proof of Stake chain, launched.

So the Ethereum Beacon Chain, which has been running successfully for close to two years now, will soon go through its final step. The existing Ethereum Proof of Work (PoW) chain will come to an end, and from that point on, all of the applications, transactions, and smart contracts on it will move inside the Ethereum Proof of Stake (PoS) chain.

So after the Merge, Ethereum will become a pure, 100% Proof of Stake (PoS) system. The Merge is a very important step, but it is only one of the truly big steps in the Ethereum ecosystem. I've been following a strategy focused on layer 2. You've got the Ethereum base layer, and then layer 2 projects sitting on top of it. Projects like Optimism, Arbitrum, StarkNet, zkSync, Polygon Hermez, and Loopring are layer 2 scaling solutions that sit on top of layer 1. They get their security from Ethereum layer 1, but they have their own features that build much more scalability on top.

![](ef582c-_h84pbnwb3GbZjXJf4qvmQ.png)

*(Proto-Danksharding \| Source: ethereum.org)*

'Proto-danksharding' is a feature aimed at improving the Ethereum blockchain. A lot of people are already working on it, and once the Merge is complete, everyone will be working to expand the amount of data the Ethereum blockchain can hold. This is needed to increase the space available for rollups so that layer 2 solutions can process even more transactions.

At the same time, rollups are also advancing. The image (below) is one I shared a few days ago, essentially discussing the 'data compression' that rollups perform. The basic idea is that the more you compress data transactions, the more transactions you can fit into a block. Since 'data' is the main cost driver in on-chain 'computation,' a lot of work is underway to reduce the amount of data a transaction requires.

![](ef582c-NEF7qu9lavEHGgVcsBP0Iw.jpeg)

*(Data Compression Vitalik \| Source: @Vitalik Buterin)*

In fact, 'Optimism' released 'zero-byte compression' a few months ago, which improved scalability considerably. The more complex a transaction is, the greater the benefit of zero-byte compression. For complex operations you get roughly 15% more compression, going up to 40% or even more. Various other forms of compression are also currently being researched and developed.

So, fundamentally, both the Ethereum base layer and rollups are being improved with the goal of massively increasing scalability and maximizing the number of transactions that can go on-chain. These are the two things we are currently focused on. The Merge switches Ethereum to Proof of Stake, making the chain more secure, more decentralized, and far more environmentally friendly. The Merge will reduce Ethereum's energy consumption by more than 99.9%, and as I just mentioned, proto-danksharding, danksharding, and improvements in rollup technology will increase scalability enormously.

Today, the Ethereum chain processes about 20 transactions per second, and on rollups today you can get somewhere between 500 and 1,000 TPS. If all of the data compression upgrades I've described are implemented, this could rise to about 6,000 TPS, and with full 'danksharding' it could go up to 100,000 TPS or even more.

Several steps are currently underway in parallel to greatly increase how much Ethereum can scale. So what does this mean for Ethereum? The Merge reduces energy consumption, makes Ethereum more secure, and opens the path to doing much more in the future. And danksharding brings more scalability, and more scalability means transactions will become cheaper. So the question we basically have to ask is something like: **'What can we do with a safer blockchain and much cheaper transaction costs?'**

I think one of the very simple yet very important things we can do is **'to make blockchain affordable for everyone.'** Over the past few years, Ethereum's transaction costs have been quite expensive. If transactions on a blockchain are expensive, how many blockchains can really succeed?

![](ef582c-_d5LjOLOWMWcE9K4cLB5qg.jpeg)

So I brought a few numbers for comparison. The median daily income in Canada is \$113, and in Korea I think it's a little less. In Poland it's \$42 a day, in Mongolia \$16 a day, and in Zambia \$4 a day. Now, over the past few years, Ethereum transaction fees have generally ranged between \$1 and \$20 depending on network congestion. Just sending ETH? Sending an ERC20 token? Making a trade on Uniswap? Minting an NFT? The cost varies by the type of transaction, but it tends to be fairly expensive. It's perhaps a level you could still afford even if you're in a developing country. But if you're in Zambia and you basically have to pay the equivalent of five hours of work just to send a transaction, would you really want to use a system like that?

I remember visiting Argentina last December, and I personally saw huge interest in blockchain and cryptocurrency there. Argentina has a big inflation problem, and many people genuinely rely on cryptocurrency to save money, run businesses, receive money, and hold savings, so they can take part in the economy without losing half their money every year just by holding it. They were all using cryptocurrency, but most of them had Binance wallets, and they were using Bitcoin and Ethereum through those Binance wallets: zero fees, very fast transfers, and a lot of convenience. If you compare that with an on-chain transaction that costs \$4, then even if it's more centralized, people are going to choose the zero-fee option.

So if we want to create a blockchain space where people can actually enjoy the benefit of not depending on many centralized institutions, then I think we genuinely have to be competitive on cost. Because these centralized alternatives exist, the cost of an on-chain transaction has to be at a level people can actually afford. This is why we need to achieve high scalability. As I mentioned, over the past few years Ethereum transaction fees have been between \$1 and \$20, and Bitcoin has been very expensive too. I recall Bitcoin transaction fees reaching up to \$15 for a while in 2017. I think everyone now recognizes that scaling is the only way forward. For example, in Bitcoin there is a lot of work being done on the Lightning Network, and in Ethereum this kind of work is being done through rollups.

Today, rollup transaction fees are generally around 25 cents, sometimes 10 cents. In the future, with all the 'efficiency' improvements I mentioned, rollups are projected to bring transaction costs down to 5 cents or nearly 0.2 cents. This could be a game changer that makes blockchain far more affordable. (\*The presentation slide indicated the cost could go as low as 0.002 cents.)

Now, what else can we do? 'Payments' are the original use case of cryptocurrency. Bitcoin described itself as 'electronic cash.' It wasn't meant to be something you simply buy and hold in the hope that its value goes up, and it wasn't even meant to be 'digital gold.' Its primary use case was to be money, to pay people, but that becomes difficult once you realize how high transaction fees are.

![](ef582c-93AfNVq_CnmewfICWlU7oA.jpeg)

I remember it was around 2013–2014. I lived through many years of 'movements' trying to make Bitcoin a payment system. This photo is from a bar in Berlin called 'Group Seventy-Seven.' In that area, there were about ten restaurants facing each other, and they worked very hard to get all of them to accept Bitcoin, to persuade many Bitcoin users to move there, and to build a community where Bitcoin payments could actually happen. And this was just one of many such examples.

But cryptocurrency payments faded in popularity after that. And I clearly think this is basically one of the reasons why: if you remember 2013, one of the main arguments in favor of crypto payments was that they were 'much cheaper.' PayPal charges 29 cents plus 2.9%, and even more for international payments, so you could see that the blockchain was very cheap. But this was only true until 2013; from 2018 onward it was no longer true. So once the argument that 'blockchains are cheaper' stopped being true and transactions started getting more expensive, it became harder and harder for people to believe it.

But now, if scaling technology becomes robust as a very powerful field, it will become feasible, and crypto payments will once again establish themselves as an industry. I believe there are places where crypto payments can be even more useful. In lower-income countries the existing financial system isn't very effective, and the inflation problem isn't well connected to developing countries. So there's plenty of room for crypto payments to prove valuable. International businesses already use cryptocurrency quite a lot for payments.

Small payments made over the internet (crypto), something like tuition fees for example, carry the digital-technology benefits of efficiency and stability, as you know, while at the same time not relying on any centralized corporation.

In fact, these are things people have been talking about from the very beginning. And it feels like a vision that has been somewhat forgotten. One of the reasons it was forgotten is basically that transaction fees rose. But now we have blockchain scalability. We now have the tools to actually make this happen, and I think this is the right moment to start thinking about many of these ideas again.

Let's talk about non-financial applications. I think 'crypto payments' are very valuable. It matters a great deal that we can make many people's lives much easier. But financial applications are not the only kind of application a blockchain can have. I've been saying this for a long time. Anyone who has read the Ethereum whitepaper will remember that I listed a long set of applications that aren't just about moving money around, things like decentralized domains, a decentralized monument system, and decentralized insurance.

And ENS is probably the most successful non-financial application today. Is there anyone here who has an ENS account? And is there anyone here who has used an Ethereum application that isn't financial? There are protocols you sign in with using Ethereum, like Proof of Humanity (PoH) and Proof of Attendance (PoA), and a few others. It seems clear to me that ENS provides the most value to people. Basically, with ENS, instead of having to ask for a complicated 40-character Ethereum address that is very easy to misplace or get wrong, people can interact with you on-chain or even off-chain just by using your name. So ENS is very useful when you want to pay people using ETH or other Ethereum assets, and it's also useful for off-chain applications.

Let's talk about 'account management.' There's a project called 'Sign-In with Ethereum Now' that lets you use your Ethereum account to log in to Web2 services. Basically, instead of logging in with 'Facebook' or your 'Google' account, it lets you log in to Web2 with 'Ethereum.' An account you log in with using Ethereum is one you control yourself. It doesn't depend on an operating intermediary, and you can use it to interact with existing web services. And because Ethereum lets your wallet function as your account through smart contract work within the wallet, your account can be much smarter than before.

One of the ideas I'd like to talk about is 'social recovery.' If your wallet's private key is hacked or you lose it, you can designate the people who will be part of a group that can reset and change your key. So instead of a backup-and-recovery function handled by a centralized company (which could essentially control your account however it wants), that function would be in the hands of a group of people you trust.

These applications all combine together. Because if you have an Ethereum account and you want to use it to log in to other services, you now need a username. How do you have a username in a decentralized world? You have ENS. And how do you convince people that your account is a human, and not just one of 100,000 bots (programs) controlled by the same program? This is exactly the purpose of 'on-chain attestation.' I recently talked about 'Soulbound Tokens,' and there are already on-chain projects like 'Proof of Humanity.' Even something as simple as checking whether an account has sent transactions before can make it very difficult for someone to spin up 100,000 fake accounts.

So these applications are all part of this 'network effect,' and they all interact with one another. This is basically being built and has already started to grow. For this to be possible, the expected costs have to be cheap. To create 'state,' you actually have to send a transaction. To recover your account, you actually have to send a transaction. To satisfy some of these attestations, you ultimately have to send a transaction for each. If doing these things costs \$11, people won't do it. But if it costs 11 cents, many people will, and if it costs 0.11 cents, even more people will.

So 'scalability' is not just that boring concept of lowering costs that you already know about. I think scalability will actually make possible the things that everyone has thought about theoretically for a long time but that simply weren't feasible yet. Take micro-scale DAOs. I think DAOs will continue to be a fascinating crypto application. Fundamentally, they make it very simple and easy for a group of people to come together. For various reasons it's easy to work with companies, but I think there are many smaller, easier use cases too. But here as well, sending transactions has to actually be cheap.

![](ef582c-PxYyKDDE5iIcMRWjfhH0hA.jpeg)

Let's talk about enterprise blockchain use cases. Many enterprises and institutions (sometimes government institutions) and many companies across many industries are asking how they can use this technology. How can they make use of the 'trustlessness' benefit this technology offers? Just five years ago, everyone was building 'permissioned blockchains.' Essentially they said: 'We don't like the public Ethereum chain,' 'It's too public,' 'It doesn't offer enough scalability,' and so 'we're going to build our own permissioned network chain, we'll have 25 nodes, and we'll choose who those 25 nodes are.'

As far as I can tell, nothing in that category has actually succeeded. Almost every project I know of either gave up and became a public blockchain project, or gave up and became an ordinary centralized project. I do think the idea of striking a good compromise between centralization and decentralization is important for some use cases, but I think there are other ways to make those compromises.

Along with the many advances in zero-knowledge proofs and zk-STARKs over the past few years, an interesting concept called 'Validium' has emerged. The basic idea is that you keep an existing centralized server and let it keep doing what it did before, except you 'commit,' for example by publishing hashes on-chain, and each hash comes with a cryptographic proof showing that the data going into that hash is actually the result of operations that follow the rules.

This could even be a potential use case within the crypto space itself. Suppose a cryptocurrency exchange wants to convince its users that the exchange's assets are not being run on a 'fractional reserve.' If the exchange wants to give users confidence that it honestly holds every amount they've deposited, how would it do that? One way to make this possible is to use zero-knowledge proofs. You run as a 'Validium' and regularly publish these hashes on-chain, and what the hashes do is serve as complete proof about the deposits. They show that the deposits the system actually holds equal the amounts in users' balances, that the sum of the balances shown to users really equals the amount the exchange holds.

And going further, you can even put users' balances into the smart contract, making it impossible to withdraw funds unless the user authorizes it. So you can do these kinds of things, reducing the chance of fraud like fractional reserves, and you can tell on-chain whether any of these things happen. A 'Validium' can be operated on a single computer and server. You also don't need to figure out a consensus network, and because it sits on top of existing technology, it's very easy to deploy.

The things above are already possible today. So I think the work being done on scalability will make them much cheaper. Cheaper transactions will make it far easier to run one of these networks, where activity happens on a server but gets published on-chain. I also think the work being done to scale blockchains can be applied to make systems more scalable and efficient internally as well.

Let's talk about zero-knowledge proofs. So much work has been done that I think they are now extremely powerful. A lot of testing is being done with the goal of improving blockchains, and I think much of that work will feed back out and improve people's ability to use this technology even outside of a blockchain context.

![](ef582c-inlZ3S0I20v2_wSScrPIlA.jpeg)

Let's look at a few forward-looking questions. The examples I have in mind will come out of a blockchain ecosystem with much higher scalability and much greater security. As you know, much cheaper transaction costs will make blockchains (both cryptocurrency and non-financial applications) far more accessible to everyone, especially to people in developing countries, and will finally unlock the many applications that people have long wanted to build.

There are also other improvements coming soon. We can improve Ethereum further to provide faster transaction 'confirmation,' not one minute or even 30 seconds. What would happen if we could confirm a transaction within 3 seconds? Improvements to 'privacy' are also happening inside many base layer 1 protocols. What could we do with even more improvements in 'privacy'?

There are already people building blockchain-based 'privacy-preserving voting protocols' that protect privacy and maintain security at the same time. So what could we do if we had digital voting systems that were both efficient and secure?

What could we gain from better 'middleware' applications? Many applications that exist on Ethereum today are ones that other applications can benefit from. 'Proof of Humanity' is probably a good example. Basically, you submit your proof to a DAO, the DAO verifies your submission, and if it accepts it, it gives you a token proving that you are a human. This is an application that many other applications can plug into. If you want to create a new token and distribute the supply fairly, 'Proof of Humanity' would be a good way to do it.

Then there's 'on-chain arbitration.' Many projects are trying to do this. On-chain oracles are working to provide information in a secure, decentralized way. So what happens when we have applications that exist not just for users but also for other applications? The answer is that we don't know yet. But at the same time, we can start thinking now, and we can start building now. If we do, maybe within two or three years we'll actually start to see the answers to some of these questions.

Thank you.
