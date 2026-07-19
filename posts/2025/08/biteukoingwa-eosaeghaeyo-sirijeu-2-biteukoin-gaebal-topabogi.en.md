---
title: '[Awkward with Bitcoin Series] #2. A Deep Dive into Bitcoin Development'
category: crypto
tags:
  - bitcoin
published: true
date: 2025-08-11 13:17:44
description: 'Bitcoin has no leader, so code changes move through the mailing list and the BIP process. This traces that path, the groups funding it, and a Korean developer''s account.'
---

🔗 [\[Awkward with Bitcoin Series\] \#2. A Deep Dive into Bitcoin Development](https://medium.com/decipher-media/%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8%EA%B3%BC-%EC%96%B4%EC%83%89%ED%95%B4%EC%9A%94-%EC%8B%9C%EB%A6%AC%EC%A6%88-2-%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8-%EA%B0%9C%EB%B0%9C-%ED%86%BA%EC%95%84%EB%B3%B4%EA%B8%B0-300a1a64906d)

**This series compiles *the content presented in the final talk, on the theme of various perspectives on Bitcoin, given by the "Awkward with Bitcoin" team, which formed at Seoul National University's blockchain academy Decipher to try to understand Bitcoin a little more correctly. This article broadly covers everything from who develops Bitcoin, to the funding paths for development costs, to the development process and its application.***

Seoul Nat'l Univ. Blockchain Academy Decipher(@decipher-media)

- Gunhee Lee: [[Awkward with Bitcoin Series] #1. How Far Has Bitcoin Come](https://medium.com/decipher-media/%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8%EA%B3%BC-%EC%96%B4%EC%83%89%ED%95%B4%EC%9A%94-%EC%8B%9C%EB%A6%AC%EC%A6%88-2-%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%EC%99%94%EB%8B%88-7f8ecc71762f)
- **web3vibe** **: \[Awkward with Bitcoin Series\] \#2. A Deep Dive into Bitcoin Development**
- Jaeseok Jang: [[Awkward with Bitcoin Series] #3. A New Bitcoin Layer 2, Ark](https://medium.com/decipher-media/%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8%EA%B3%BC-%EC%96%B4%EC%83%89%ED%95%B4%EC%9A%94-%EC%8B%9C%EB%A6%AC%EC%A6%88-3-%EC%83%88%EB%A1%9C%EC%9A%B4-%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8-%EB%A0%88%EC%9D%B4%EC%96%B4-2-ark-b66b9adcdc0a)

# 1. Introduction

![](19a6cd-e4ar_itw3aCg4omRjHWH3A.png)

*(Bitcoin vs. FinTech Giants l Source: Coindesk)*

While giants of the traditional financial system like Visa, Mastercard, and PayPal employ tens of thousands of staff, Bitcoin runs on a small development team of only a few dozen developers. One of the major challenges facing decentralized systems built on a blockchain is that, with no clear responsible party, developing and updating the network software tends to drag on. Like most software, the Bitcoin protocol needs regular maintenance and upgrades. No single organization (a specific individual or institution) controls or represents the network and leads its development. Instead, Bitcoin rests on the consensus of many globally distributed participants, and questions about how that works come up constantly. So we have to think about how to structure a system that can smoothly upgrade the Bitcoin network while guaranteeing backward compatibility, so existing users can keep participating, and about what the most efficient way is for the network to upgrade seamlessly.

What kind of strategy continuously optimizes and progressively upgrades a system as vast and decentralized as Bitcoin? Unlike Ethereum, which has a clearly defined EIP (Ethereum Improvement Proposals) process, Bitcoin takes a gradual approach over a long period. More concretely, it involves 1) building consensus among developers (developer consensus), 2) getting miners ready (miner readiness), and 3) the stage of user activation. These processes need fine-tuning so the Bitcoin network can run stably while still accommodating flexible change.

When individuals or teams spread around the world propose or initiate an upgrade to Bitcoin, hundreds of developers who actively participate in the Bitcoin project perform peer review. This review decides whether an implementation is accepted or rejected. Given how important such work is, it helps to understand how Bitcoin development proceeds and to get a sense of the individuals and organizations that lead it. So let's take a thorough look at these processes, along with the entities that lead development and the organizations that support them.

# 2. The Footprints of Bitcoin Development

Bitcoin development is complex and vast, and the scale of this activity is enormous today, so surveying every participant thoroughly is hard. There are no standardized qualification criteria for becoming a Bitcoin developer. Countless people can join or quit development at will, and they can pick the area of development they want to devote themselves to. Developers do not have to disclose their identity when contributing. Most who want to immerse themselves this way jump in freely, in a spirit of volunteering, and are free to walk away at any time by their own choice. For all these reasons, compiling a comprehensive roster of past and present Bitcoin developers is no simple task.

Bitcoin is also open-source software. It grants users the rights of ownership and verification in a form anyone can modify, distribute, and use, and because there is a firm belief that this can free people from centralization, the same character shows up in the development environment too.

# 2.1 The Path Toward Decentralization

![](19a6cd-7EedRTxexsDqkBJftljgog.jpeg)

*(Gavin Andresen l Source: Google Images)*

After Bitcoin's creator Satoshi Nakamoto stepped away, Bitcoin's guardianship, in both technical and spiritual terms, shifted from the creator to the community. But this didn't mean development had become fully decentralized. For several years Gavin Andresen led the Bitcoin project, and despite occasional opposition from parts of the community, he used his influence to apply important changes to the code, such as the **'Pay-to-Script-Hash'** soft fork.

In 2014, Andresen handed the Lead Maintainer role to the Dutch developer Wladimir van der Laan so he could work as Chief Scientist at the nonprofit Bitcoin Foundation. Van der Laan saw himself as a coordinator within the team rather than a leader, and he got work done through the team's consensus. But his leadership came to be challenged by the debate over whether Bitcoin's transaction-processing capacity should be increased, the 'scalability debate,' which threw the developer community into disarray.

![](19a6cd-KiHN5GDYi9Ik40Or1xoYiQ.jpeg)

*(Wladimir Van der Laan l Source: Google Images)*

As the debate escalated, Gavin Andresen (who at the time hadn't participated in Bitcoin Core for several months) supported a larger block size, and Wladimir van der Laan responded by revoking his commit access to the Bitcoin code. The debate was eventually resolved in part as the "Big Blocker" community rallied around Bitcoin Cash, which supported a larger block size. In 2021, Wladimir van der Laan decided to step down from the Lead Maintainer role, which was then handed not to a specific individual but to a group of developers. With that, Bitcoin took another step toward decentralization. The change is a good example of how Bitcoin's development and governance structure keeps moving toward more community participation and diversity.

![](19a6cd-O9KdA38U7vN7aOA1Y_NEWQ.png)

*(Bitcoin Historical Maintainership l Source: NYDIG)*

# 2.2 [Bitcoin Core](https://bitcoincore.org/)

![](19a6cd-FMR3tqzgIksKv15ueWkTMQ.jpeg)

Bitcoin Core is the software client most network participants reach for when they build nodes on the Bitcoin network, store coins, and carry out transactions and various other tasks. The easiest way to think of it is as the interface, or gateway, through which participants interact with the Bitcoin blockchain. Bitcoin Core works much the way an internet browser connects to the internet and provides basic functionality. And just as Ethereum has various clients such as Geth and Parity, there are plenty of Bitcoin software clients besides Bitcoin Core. Even so, Bitcoin Core is widely accepted around the world and wields enormous influence, because Bitcoin's anonymous creator Satoshi Nakamoto developed the client software by forking from Bitcoin Core (the last version Satoshi worked on was 0.3.9). That is why Bitcoin Core is recognized as the client that most faithfully preserves Satoshi's philosophy, and it benefits from the tireless efforts of a large global developer community. So Bitcoin Core often sets the standard for other Bitcoin software clients. It is still being actively developed today, and [as of May 2023 the version is 25.0](https://bitcoin.org/en/version-history).

Upgrades put forward by Bitcoin Core developers are tuned to fit Bitcoin's philosophy and spirit, and they have to pass a peer-review process that confirms they are free of bugs. Once a proposal clears that review, implementing the upgrade within Bitcoin Core falls to the Maintainer. The Bitcoin Core maintenance team operated under the guidance of Wladimir van der Laan, with Pieter Wuille, Marco Falke, Michael Ford, Jonas Schnelli, and Samuel Dobson, among others, taking part as members. And because participants in the Bitcoin network can remove a maintainer judged out of step with the community's shared vision, the position isn't necessarily permanent.

# 2.3 Core Developers

Roughly 1,140 developers have contributed to the Bitcoin Core project. That's an impressive number and a real achievement just 13 years after Bitcoin's birth. But set Bitcoin Core's contributor count next to other famous open-source projects like Linux, and it's a relatively tiny scale. Linux has been developed over several decades and is a huge project with nearly 100,000 contributors, a pioneer of open-source development.

Looking at the wider Bitcoin ecosystem, 13,057 unique developers appear to have taken part, counting contributions to various projects and applications beyond Bitcoin Core. That figure still leaves out developers who build closed-source solutions that never go public.

If we define active developers by recent commits, the Bitcoin Core project has roughly 40 to 60 of them. They keep contributing protocol improvements, bug fixes, optimizations, and other features. Bitcoin Core development is conservative, and changes are reviewed and adopted carefully, so the developer community stays relatively small but professional and focused on quality.

![](19a6cd-JO_I-1f7Yt1yFwNitUqXcw.png)

*(Monthly Active Developers l Source: NYDIG)*

Widen the scope to include private developers and the monthly active count runs somewhere between about 600 and 1,000. Look closely and something interesting shows up: the rise in active developers tracks, to some degree, the size of Bitcoin's four-year price swings.

A few interesting points are worth pulling out. Since 2010, Satoshi Nakamoto hasn't ranked among the top 10 contributors to the Bitcoin code (in fact, Satoshi hasn't touched the code at all since 2010). Many prominent Bitcoin developers have held their place as top commit contributors throughout Bitcoin's history right up to today. Some developers have grown more famous, while plenty of others faded from view as they moved on to other cryptocurrency projects. And though some used online pseudonyms to protect their identities, the real names of most top Bitcoin developers are, ironically, public knowledge. So while many developers have contributed to building Bitcoin over the years, a small number handle most of the work: the top 37 developers account for 80% of all code commits to Bitcoin, and the top 50 account for 84%. By region, the Bitcoin developer ranking runs 1) the United States (35.1%), 2) Germany (13.3%), 3) the Netherlands (8.9%), and 4) Australia (5.0%).

# 3. How Bitcoin Development Proceeds

![](19a6cd-YTn50FTty1SKFe6Fd1FhbQ.jpeg)

*(In 2008, Satoshi Nakamoto's Bitcoin paper is posted to the cryptocurrency mailing list)*

Today Bitcoin has established itself as a fully open-source software project built and maintained by developers around the world. You can contribute to the Bitcoin code in several ways: by joining discussions on a mailing list, a forum, or IRC chat, by taking part in meetups and study groups, or by proposing updates to the software itself via GitHub. A major update to Bitcoin usually starts with a Bitcoin Improvement Proposal (BIP), a design document that lays out the proposed code change. The community then discusses and develops these proposals, puts them through rigorous testing, and merges them into the Bitcoin code. Bitcoin's review process is highly complex, and that careful scrutiny is one thing that sets it apart from other cryptocurrency projects. Let's start with a detailed look at the Bitcoin Improvement Proposal (BIP), which began in 2011.

# 3.1 BIP (Bitcoin Improvement Proposals)

Bitcoin network upgrades, official changes, and idea proposals all run through Bitcoin Improvement Proposals (BIPs). Bitcoin as software is constantly being upgraded. Errors that crop up have to be fixed, algorithms can be made more efficient, code can be simplified, compatibility with other software has to be maintained, and new features can be added. With ordinary software in a centralized project, a manager or lead developer can just assign tasks and dictate the changes to be made. But Bitcoin, as an open-source, consensus-based system, has no leader. That's why the BIP process exists: to organize the Bitcoin development community without a centralized authority. No one would dispute that the security of the Bitcoin network is vital for maintaining trust. So Bitcoin's development process is deliberately very slow and cautious next to other cryptocurrency projects. The whole thing, from an initial proposal through a formal BIP submission to network activation and adoption, plays out over the long term.

![](19a6cd-uZVNPxDB9DZNR4atzS5m7Q.png)

*( BIP Process l Source: River Financial )*

Bitcoin is a genuinely open system where anyone can propose a BIP, no particular qualifications or reputation required. As noted above, BIPs usually begin as informal proposals on the [Bitcoin mailing list](https://lists.linuxfoundation.org/mailman/listinfo/bitcoin-dev). A developer sends their idea to the mailing list, and interested people trade feedback. Some ideas sit in this discussion stage for years, because the community can't reach consensus, because fine-tuning is needed, or because Bitcoin isn't yet ready for the proposed change. When a proposal fits the BIP format and the BIP maintainer decides it isn't spam, it gets a BIP number and is posted to the Bitcoin Core GitHub repository called BIP. Keep in mind, though, that a posted BIP is officially viewable but not yet approved or implemented.

![](19a6cd-Fxf60oK5X5oeJcdx18YRkA.png)

*( Bitcoin BIP GitHub homepage )*

Once a BIP is officially posted to GitHub like this, both the developer community and the broader Bitcoin user community start to discuss it. If the BIP calls for code changes to Bitcoin Core, the core developers work together to write, test, and integrate that code. But if the community or users raise legitimate controversy about the proposal, the BIP is usually withdrawn or rejected, and its process has to be abandoned or restarted after revision. If instead a BIP reaches the community's rough consensus (\* consensus on an idea follows the [IETF's Rough Consensus method](https://www.rfc-editor.org/rfc/rfc7282)) and nothing turns up, work begins on activating it. That work takes various forms depending on the type of BIP.

# 3.2 Types of BIPs

There are broadly three types of Bitcoin Improvement Proposals, sorted by what they set out to do:

# Standard BIP

Some BIPs (such as SegWit and Taproot) don't propose direct code changes to Bitcoin Core. Instead they establish standards for other Bitcoin software to use, like wallets or exchanges. A BIP like this might propose an encoding scheme or practices for securely protecting the Bitcoin network. Because Bitcoin is an open system, every software provider gets to choose whether to adopt these standards. Some standards need universal adoption to guarantee interoperability. A wallet that can't read Bitcoin addresses is useless as a Bitcoin wallet, for instance, and a wallet using an address format different from the one the Bitcoin community adopted would be hard to use.

Take BIP 39 and BIP 174 as optional BIPs. The mnemonic backup phrase defined in BIP 39 has been adopted by many wallet providers but isn't used in Bitcoin Core itself. In the same way, not every wallet has adopted the PSBT standard defined in BIP 174. Optional, per-software adoption like this can be inconvenient, but it doesn't cause much trouble, since it doesn't hurt the software's utility or security. Standard BIPs also often show up alongside consensus changes. With SegWit, BIP 142 set a standard format for SegWit addresses but didn't directly change the rules of the Bitcoin network.

# Informational BIP

An informational BIP shares information about Bitcoin's future plans. A document like this offers general guidelines, design issues, or information relevant to the Bitcoin community. Since it's purely informational, it doesn't require separate community consensus.

# Process BIP

Finally, some BIPs exist to streamline Bitcoin development or community discussion. These usually don't require code changes to Bitcoin Core or other Bitcoin software. BIP 1 and BIP 2, for instance, specify the lifecycle and format of future BIPs and how their activation should be handled. If you had to pick the two most important process BIPs, they'd be BIP 8 and BIP 9, which describe two possible processes for activating soft-fork upgrades in Bitcoin consensus. Neither one is classified as a standard BIP, though, because they don't propose changes to Bitcoin consensus itself. They set out rules for how to introduce consensus changes into Bitcoin, aiming to head off conflict and potential splits within the network.

# 3.3 Applying BIPs

Because changes require review by multiple maintainers (the developers with the authority to directly change Bitcoin Core's code), plus a period of open community comment, it takes a notoriously long time for changes to be merged. The full review process for consensus-related changes often takes months or years. Review generally covers cryptographic analysis, usability assessment, software design, and finally the code itself. Sometimes a series of changes to the Bitcoin code are bundled together into an executable Bitcoin version called a "Release."

Until Bitcoin Core v22.0 shipped in September 2021, every final release was cryptographically signed by either Van der Laan or Andresen (Satoshi never signed his own releases). Anyone who downloads Bitcoin Core can verify the code by checking it against the widely used public key of the lead maintainer. v22.0 also added a feature that lets users verify Bitcoin's authenticity against the keys of other trusted developers besides Van der Laan. These developers' public keys confirm that Bitcoin Core is authentic and hasn't been tampered with. And since Bitcoin is an open-source project anyone can contribute code to, there also has to be a process that makes sure the collaborative code effort produces functional, non-malicious code.

(\* Previously, everyone who wanted to participate would build and sign using gitian, and these days they [build and then sign with guix](https://github.com/bitcoin-core/guix.sigs/tree/main/builder-keys).)

Bitcoin's source code lives on GitHub, a collaborative software website. Developers apply proposed changes to the Bitcoin code through "pull requests." Each request is reviewed by hand, and if it's finally accepted, a maintainer "merges" it into the codebase. A pull request generally consists of several small, individual code updates called "commits." As we've seen, the Bitcoin Improvement Proposal (BIP) mechanism gives Bitcoin's development process structure, maximizing transparency and community decision-making and keeping Bitcoin as open and decentralized as possible. Sure, you might counter that a small group of core developers writes most of Bitcoin's code and proposes the BIPs. But the key point is that whether these proposals ever activate is decided entirely by the network's nodes, and anyone can run a node.

# 4. Funding Bitcoin Development

As with most software development, regular maintenance and upgrades matter a lot for Bitcoin too. Since no single entity controls Bitcoin, development and maintenance happen through consensus among network participants. At bottom, no individual or company manages development of the Bitcoin project. It's initiated by individuals or teams around the world. The resources and scale of the Bitcoin ecosystem keep growing, and various organizations have sprung up to help advance the Bitcoin protocol. Let's take a quick look at the main organizations and individuals that fund development of the Bitcoin protocol and ecosystem.

# 4.1 Organizations That Support Developers

# Bitcoin Foundation

The Bitcoin Foundation is a nonprofit set up in 2012 by Bitcoin Core developers Gavin Andresen and Jon Matonis, and it mainly funds a portion of developers. The foundation works to promote Bitcoin development and adoption, and it represents the Bitcoin community in dealings with governments, companies, and other organizations. Dedicated to advancing Bitcoin technology and innovation, it plays an important role in the ecosystem. Membership fees are one of its main sources of funding. And even though its funds were nearly exhausted in early 2015, it has done a great deal to advance Bitcoin technology and promote Bitcoin adoption worldwide. **(\*It is not currently in operation.)**

![](19a6cd-Di8RA-srHRx4bszBnJEQvw.png)

*Bitcoin Foundation Membership*

# [Chaincode Labs](https://chaincode.com/)

Chaincode Labs, founded in 2016 by two Bitcoin developers and based in New York, is a nonprofit research institution focused on digital currency, and it helps grow and develop the Bitcoin network. It funds independent Bitcoin developers as well as the Bitcoin developers on its own full-time team, and it has contributed to development projects like Bitcoin Core and BIPs and to educational programs (\*Summer of Bitcoin, Qala, Chaincode seminars). Notable names among the Bitcoin Core developers it funds include Pieter Wuille, Russ, and Yanofsky.

# Opensats

Opensats is a nonprofit that funds free, open-source projects and other initiatives tied to Bitcoin, along with education and research. It runs a platform that passes 100% of donations through to projects and to a general fund, with no fees. It's dedicated to funding Bitcoin-related software development, improvements to existing open-source software, Bitcoin education and outreach, and research on Bitcoin topics. This past May, Jack Dorsey donated $10 million to Opensats through his philanthropic initiative 'Startsmall,' to support the development of open-source software and projects focused on Bitcoin, the decentralized social protocol Nostr, and related technologies

# MIT Digital Currency Initiative (MIT DCI):

MIT's Digital Currency Initiative is a cryptocurrency development research organization that funds external developers and its own dedicated Bitcoin Core development team. Unlike most Bitcoin development sponsors, MIT DCI runs on donations. Bitcoin Core developers tied to the organization include Wladimir van der Laan, Cory Fields, and Anthony Towns. Since April 2015, developers working with DCI's support have contributed 14% of the Bitcoin Core code. In 2016, it announced a $9 million Bitcoin development fund and drew donations from several large exchanges.

# [Blockstream](https://blockstream.com/)

Blockstream is a venture-backed (VC) blockchain technology company founded by famous Bitcoin Core developers, including CEO Adam Back, Gregory Maxwell, Jorge Timón, Matt Corallo, Pieter Wuille, and Mark Friedenbach. Early on, Blockstream raised $21 million in Series A funding. Its core goal is building Bitcoin-dedicated sidechains that enable interoperable transactions, and it has published an academic paper on the idea. Blockstream currently employs developers who contribute to projects like Bitcoin Core, libsecp256k1, Rust Bitcoin, and clightning.

# [BitMEX](https://blog.bitmex.com/grants/)

BitMEX, an exchange founded in 2014, has led the way in supporting Bitcoin development through its 'Open Source Developer Grant Program,' launched in July 2019. It's well known as an exchange that does a lot to advance Bitcoin Core by giving developers the resources they need (\*BitMEX currently supports roughly [five developers](https://twitter.com/BitMEXResearch/status/1585636192875266048)). It has also sponsored [Michael Ford](https://github.com/fanquake/) (who moved to brink.dev in 2021), one of the standout figures in the Bitcoin Core developer community. Following moves like these, Coinbase, a major U.S. exchange, has said it will launch its own Bitcoin Core development grant program to keep pace.

# Square Crypto

This is an independent research team Square created to improve Bitcoin's open-source software. Square Crypto has funded several developers dedicated to proposing and implementing Bitcoin Core upgrades. Bitcoin Core developers it funds include John Atack and Vasil Dimo, among others, and Matt Carlo is a permanent member of the Square Crypto team.

# [Brink](https://brink.dev/)

A nonprofit foundation set up in 2020, Brink raises 100% of its development funding from companies and uses it to hire developers. It's based in London, UK, and focuses mainly on the Bitcoin Core project, supporting about 10 developers. Through a fellowship program it supports and mentors people newly contributing to Bitcoin development, and through a grants program it backs the work of established Bitcoin protocol engineers.

Beyond these, since Bitcoin's birth various institutions, companies, and organizations, such as the Human Rights Foundation (HRF), Okcoin, and Lightning Labs, have helped advance the Bitcoin protocol through technical or financial support. As Bitcoin's market capitalization keeps growing, the ecosystem will gradually expand, and developers, companies, and organizations will build broader businesses around this support.

# 5. Interview with a Korean Bitcoin Developer: Calvin Kim

Behind the Bitcoin the public knows lies an immensely complex development process. Yet, ironically, information about that process is oddly hard for ordinary people to find. Search 'Bitcoin' online and you'll turn up all kinds of information, but most of it explains the basic concept or definition. Explanations like that alone make it hard to really grasp how Bitcoin works or how it's developed. On top of that, the tech world moves faster and faster over time, and much of the material has gone "outdated," out of step with the latest development trends.

So this time, to give a more substantive, realistic picture of the Bitcoin development process, we interviewed Calvin, a Bitcoin developer working actively in Korea. As a skilled developer on the front lines, he can speak to the practical realities of Bitcoin development. Let's listen in on the hidden stories of Bitcoin development through our interview with Calvin.

# 5.1 Introduction

Calvin, a Korean Bitcoin developer, first learned about Bitcoin in 2013, but after the Mt. Gox incident he set his interest aside for a while. Through the Seoul Bitcoin Meetup in 2017 he rekindled his interest in Bitcoin protocol development, and in 2019 he met *Thaddeus Dryja* (co-founder of Lightning Labs and developer of Utreexo) at a conference and joined the Utreexo project. Since then he has kept up research, development, and contributions on Utreexo, which aims to improve the scalability of Bitcoin's base layer. He also promotes Bitcoin activities in Korea and handles technical presentations and co-organizing at the Seoul Bitcoin Meetup. In 2020 he received development support through a grant from the BitMEX exchange, and he's currently continuing his work with support from the Human Rights Foundation (HRF).

# 5.2 The Mailing List

The way Bitcoin trades development ideas is unusual. Protocol-level development happens mainly through the mailing list, and the assumption is that everyone taking part is subscribed. Anyone can read what's posted, but if you're not subscribed, it's hard to get your idea submission reviewed (\*to subscribe, you just enter your email on the website). And besides Bitcoin's mailing list there's a separate Lightning Network mailing list, so not every Bitcoin-related development idea sits on a single list. Anyone with a development idea can write to the mailing list at any time to propose it, and if that idea is about implementation rather than the protocol, it goes on the mailing list of the project it builds on (Bitcoin Core, a Lightning implementation).

Each project has a 'champion' who acts as the representative for an idea, leading the development process and building consensus. The champion writes a BIP and posts it to the mailing list, and they generally have to follow the BIP format (defined in BIP-1 and 2). There's no separate bar for a BIP to be accepted. Following the format is what matters most. On the mailing list, two or three maintainers review ideas and also filter out the usual spam.

# 5.3 BIP (Bitcoin Improvement Proposals)

So how do you check whether an idea submitted through the mailing list follows the BIP format? BIPs have their own maintainers, and right now Kalle Alm in Tokyo and Luke Dashjr Jr. in Florida hold that role. But they only judge whether a submitted BIP followed the format; they aren't given the authority to force changes. That's why even a BIP of relatively minor development importance, such as **[BIP-0716](https://en.bitcoin.it/wiki/BIP_0176)** (which defines a Bitcoin unit), can make it in.

Generally, people submitting a BIP first decide its category and then start writing. Because the point of a BIP is to share information through technical documentation, a culture has grown up around spelling out a BIP's purpose clearly. BIPs are classified around questions like how SegWit is defined and how the P2P protocol works, and Utreexo, too, is meant to be split into four BIPs. Here's something curious: you might assume the numbering of BIPs posted to GitHub follows the order ideas were submitted, but no one except Luke Dashjr knows the details of that numbering process and policy. It's generally understood that sub-classification runs by numeric ranges like 1XX, 2XX, and so on, but there's no precise guideline.

Writing a BIP isn't mandatory when you implement a particular project. Bitcoin Core, for instance, didn't implement BIP-39 (seed phrase) and implemented only BIP-32. In Bitcoin Core's case, when something brings an important change to the protocol, developers tend to share it among themselves and proceed by priority rather than write a BIP. The [<strong>assumeUTXO</strong>](https://github.com/bitcoin/bitcoin/issues/15605) project wrote no BIP and existed only as a GitHub issue (\*in place of a BIP, a separate [github repository](https://github.com/jamesob/assumeutxo-docs) organized it in writing), and with Taproot the BIP document was updated after development was done. In general, though, for consensus-related development, Bitcoin developers tend to prefer the BIP, a documented explanation.

# 5.4 What Does It Take to Become a Bitcoin Developer?

This might be a little disappointing, but there really is no standardized path to becoming a Bitcoin developer. There are hard-to-clear barriers, like submitting a portfolio and interviewing in English. Given that, Calvin's own experience is worth sharing. He got interested in Bitcoin, joined related meetups, and started developing. Convinced of Bitcoin's importance and necessity, for the first year he developed as a hobby, four to five hours every day. It was only in 2019 that grant programs (BitMEX) started to appear; before that, there was almost no way to receive open-source funding. Sure, a few companies existed even earlier, like ChainCode in New York, but there was almost no form of paying out open-source funding to someone unaffiliated with any organization. He then applied to BitMEX on the topic of Utreexo development, and at the time the person at BitMEX deciding on funding and the drive to recruit new developers lined up well, so he was selected.

The goals of companies that give developers grants or funding vary. BitMEX picked developers with an eye on the benefits that changes to the Bitcoin protocol bring to users. **[brink.dev](http://brink.dev/)**, by contrast, focused on cultivating Bitcoin Core developers, weighing how you can contribute to Bitcoin Core and how it can be securely protected. Spiral (Jack Dorsey, Block) focuses on supporting Bitcoin wallet development, with an emphasis on user convenience and safety. After a document screening, you submit a proposal about the funding program and go through a video interview in English.

As best anyone knows right now, I'd put the number of full-time developers worldwide (the open-source ones who work on the protocol) at maybe 50 to 100. But on top of that there are plenty of Bitcoin-related wallet, infrastructure, and mining companies, so all together the figure would run higher.

# 5.5 Bitcoin Core Developers and Maintainers

The job of Bitcoin maintainers and core developers is to develop, maintain, and manage the core elements of the Bitcoin network. The software called Bitcoin Core has maintainers for various areas, and currently five of them each handle a different one, for example Wallet, Mempool (the transaction memory pool), Build Process, GUI (graphical user interface), Test, and so on.

Each maintainer has the authority to review and approve code in their own area. They don't approve code willy-nilly in areas they aren't responsible for, which preserves the expertise and accountability of each area. The Bitcoin Core project runs mainly on GitHub, with a separate page where code is proposed.

The term "core developer" gets used a bit loosely. It can mean developers who work on the software called Bitcoin Core, and it can also mean developers who actually handle the core development of Bitcoin. The former tend to be people who mostly do code review and examination, while the latter tend to be developers trying to add new features.

# 5.6 Other Notes

Miners and developers can share interests, but the relationship can be tangled and murky. Most mining-rig manufacturers ship mining software separately, so miners don't need to run Bitcoin Core themselves. Mining protocols exist on their own, and in mining systems network latency is an important factor. Since better connectivity between mining pools improves performance, research on this is underway too.

Other projects with active research and development on Bitcoin's Layer 2 include Drivechain, Statechain, Spacechain, and Liquid. Each takes a different approach to issues like centralization and security, so each comes with its own set of trade-offs.

This short conversation with Calvin, who works directly on the front lines of Bitcoin development, gave us a chance to learn about Bitcoin's practical development process. His story brought us close to the vivid reality of Bitcoin development, which had been hard to reach before. Again, I sincerely thank Calvin for his valuable time, and I hope this article has told you something interesting about Bitcoin development.

One last thing: at Bitcoin meetups there weren't many chances for code-level conversations. The fact that being up for an interview about Bitcoin development was itself unusual says a lot; most attendees are more interested in the economic and social sides of Bitcoin than in development. Exchange around Bitcoin development is lively in various cities abroad, but the same energy seems thinner in Seoul. I hope more Bitcoin developers become active in Korea, and anyone interested in Bitcoin development is welcome to reach out anytime at **@kcalvinalvinn**.

# 6. Conclusion

Pulling all this together, I think the Bitcoin Improvement Proposal (BIP), like the Ethereum Improvement Proposal (EIP), shows a structured, systematic developer approach to protocol upgrades in the Bitcoin ecosystem. At heart they share the same purpose: making a chain's upgrade proposals easier to handle, standardizing them, and documenting them. But I see subtle differences that set BIPs apart from EIPs. In the big picture, Ethereum's EIP structure is more forward-leaning about upgrades and has a busier development ecosystem, thanks to Ethereum's plan to become a 'World Computer,' which it pursues through continuous updates and adjustments. Bitcoin's upgrades, on the other hand, are grounded in stability and tradition, and it aims to preserve its role as a decentralized store of value.

Another difference is the development consensus mechanism. Ethereum's development and decision-making often pulls in various stakeholders, like dApp developers and Ethereum holders. Bitcoin's development, by contrast, sticks firmly to decentralization, and making major changes often takes broad consensus among various node operators and miners. Because Bitcoin's development ecosystem, true to its core principle of decentralization, spreads several key players around, no single entity tends to be able to control everything.

Weigh all this and Bitcoin's future looks promising. The decentralized nature of the development process makes sure diverse voices are heard and that change can be driven by broad community consensus. The approach is slow at times, but in the ever-changing world of blockchain technology it should let Bitcoin's integrity and core vision keep evolving without compromise.

# 7. Sources

- [https://nydig.com/research](https://nydig.com/research)
- [http://wiki.hash.kr/index.php/BIP](http://wiki.hash.kr/index.php/BIP)
- [https://coinsutra.com/bip-bitcoin-improvement-proposa/](https://coinsutra.com/bip-bitcoin-improvement-proposa/)
- [https://twitter.com/kcalvinalvinn](https://twitter.com/kcalvinalvinn)
- [https://medium.com/@BevmFoundation/who-supports-bitcoin-ecosystem-developers-3f234cab23f5](https://medium.com/@BevmFoundation/who-supports-bitcoin-ecosystem-developers-3f234cab23f5)
