---
title: '[Awkward with Bitcoin Series] #2. A Deep Dive into Bitcoin Development'
tags:
  - bitcoin
published: true
date: 2025-08-11 13:17:44
description: '[Awkward with Bitcoin Series] #2. A Deep Dive into Bitcoin DevelopmentAuthor:web3vibeDecipher Media ｜Decipher Mediawb3vb'
---

🔗 [\[Awkward with Bitcoin Series\] \#2. A Deep Dive into Bitcoin Development](https://medium.com/decipher-media/%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8%EA%B3%BC-%EC%96%B4%EC%83%89%ED%95%B4%EC%9A%94-%EC%8B%9C%EB%A6%AC%EC%A6%88-2-%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8-%EA%B0%9C%EB%B0%9C-%ED%86%BA%EC%95%84%EB%B3%B4%EA%B8%B0-300a1a64906d)

**This series compiles *the content presented in the final talk given by the "Awkward with Bitcoin" team — formed at Seoul National University's blockchain academy Decipher to try to understand Bitcoin a little more correctly — on the theme of various perspectives on Bitcoin. This article broadly covers everything from who develops Bitcoin, to the funding paths for development costs, and the development process and its application.***

Seoul Nat'l Univ. Blockchain Academy Decipher(@decipher-media)

- Gunhee Lee: [[Awkward with Bitcoin Series] #1. How Far Has Bitcoin Come](https://medium.com/decipher-media/%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8%EA%B3%BC-%EC%96%B4%EC%83%89%ED%95%B4%EC%9A%94-%EC%8B%9C%EB%A6%AC%EC%A6%88-2-%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%EC%99%94%EB%8B%88-7f8ecc71762f)
- **web3vibe** **: \[Awkward with Bitcoin Series\] \#2. A Deep Dive into Bitcoin Development**
- Jaeseok Jang: [[Awkward with Bitcoin Series] #3. A New Bitcoin Layer 2, Ark](https://medium.com/decipher-media/%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8%EA%B3%BC-%EC%96%B4%EC%83%89%ED%95%B4%EC%9A%94-%EC%8B%9C%EB%A6%AC%EC%A6%88-3-%EC%83%88%EB%A1%9C%EC%9A%B4-%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8-%EB%A0%88%EC%9D%B4%EC%96%B4-2-ark-b66b9adcdc0a)

# 1. Introduction

![](19a6cd-e4ar_itw3aCg4omRjHWH3A.png)

*(Bitcoin vs. FinTech Giants l Source: Coindesk)*

While giants of the traditional financial system such as Visa, Mastercard, and PayPal employ tens of thousands of staff, Bitcoin is run by a small development team made up of only a few dozen developers. One of the major challenges that decentralized systems built on a blockchain structure face is that, with no clear responsible party, the process of development and updating the network software tends to drag on. Like many software implementations, the Bitcoin protocol, too, requires regular maintenance and upgrades. Bitcoin is not a system in which a single organization (a specific individual or institution) controls or represents the network and leads development; rather, it is based on the consensus of many globally distributed network participants, and we can see that questions related to this are raised constantly. So we have to consider how a system is structured that can smoothly upgrade the Bitcoin network while guaranteeing backward compatibility so that existing users can keep participating, and what the most efficient way is for the network to upgrade seamlessly.

What kind of strategy continuously optimizes and progressively upgrades a system with a vast decentralized structure like Bitcoin? In contrast to Ethereum, which has a clearly defined EIP (Ethereum Improvement Proposals) process, Bitcoin takes a gradual approach over a long period. Looking at this more concretely, it involves 1) the process of building consensus among developers (developer consensus), 2) the process of miners getting ready (miner readiness), and 3) the stage of user activation. These processes require fine-tuning so that the Bitcoin network can operate stably while still accommodating flexible change.

When individuals or teams spread around the world propose or initiate an upgrade to Bitcoin, hundreds of developers who actively participate in the Bitcoin project perform peer review. This review process determines whether an implementation will be accepted or rejected. Given the nature of such important work, it is important to understand how Bitcoin development proceeds and to gain insight into the individuals and organizations that lead it. Let us thoroughly analyze these processes and take a closer look at the entities that lead development and the organizations that support them.

# 2. The Footprints of Bitcoin Development

Given the complexity and vastness of Bitcoin development, the scale of this activity is enormous at present, so it is not easy to survey every participant thoroughly. This is because there are no standardized qualification criteria for becoming a Bitcoin developer; countless people can actively join or quit development, and they can choose the field of development they want to devote themselves to. It is not essential for developers to disclose their identity when contributing to Bitcoin development. People who wish to immerse themselves in development this way mostly jump into the process freely, in a spirit of volunteering, and enjoy the freedom to quit at any time by their own choice. For this reason, compiling a comprehensive roster of past and present Bitcoin developers cannot be regarded as a simple task.

Moreover, Bitcoin is open-source software: it grants users the rights of ownership and verification in a form that anyone can modify, distribute, and utilize, and because there is a firm belief that this can free people from centralization, that characteristic is reflected similarly in the development environment as well.

# 2.1 The Path Toward Decentralization

![](19a6cd-7EedRTxexsDqkBJftljgog.jpeg)

*(Gavin Andresen l Source: Google Images)*

After Bitcoin's creator Satoshi Nakamoto stepped away, Bitcoin's guardianship — in both technical and spiritual terms — shifted from the creator to the community. However, this could not be taken to mean that development had become fully decentralized. Over several years, Gavin Andresen led the Bitcoin project, and despite occasional opposition from parts of the community, he exercised his influence to apply important changes to the code — for example, the **'Pay-to-Script-Hash'** soft fork.

In 2014, Andresen handed over the Lead Maintainer role to the Dutch developer Wladimir van der Laan in order to work as Chief Scientist at the nonprofit Bitcoin Foundation. Van der Laan saw himself as a coordinator within the team rather than a leader, and he carried out work through the team's consensus. However, his leadership came to be challenged by the debate over whether Bitcoin's transaction-processing capacity should be increased — the 'scalability debate' — and this debate threw the developer community into disarray.

![](19a6cd-KiHN5GDYi9Ik40Or1xoYiQ.jpeg)

*(Wladimir Van der Laan l Source: Google Images)*

While the debate escalated, Gavin Andresen (who at the time had not participated in Bitcoin Core for several months) supported a larger block size, and as a result his commit access to the Bitcoin code was revoked by Wladimir van der Laan. This debate was eventually resolved in part as the "Big Blocker" community rallied around Bitcoin Cash, which supported a larger block size. In 2021, Wladimir van der Laan decided to step down from the Lead Maintainer role, and this role was subsequently delegated not to a specific individual but to a group of developers. With this, Bitcoin took another step toward decentralization. This change can be seen as a representative example showing that Bitcoin's development and governance structure is moving in a direction that further emphasizes community participation and diversity.

![](19a6cd-O9KdA38U7vN7aOA1Y_NEWQ.png)

*(Bitcoin Historical Maintainership l Source: NYDIG)*

# 2.2 [Bitcoin Core](https://bitcoincore.org/)

![](19a6cd-FMR3tqzgIksKv15ueWkTMQ.jpeg)

Bitcoin Core stands out as the software client of choice for network participants when it comes to building nodes on the Bitcoin network, storing coins, and carrying out transactions and various other tasks. It is easiest to understand it as the interface or gateway through which network participants interact with the Bitcoin blockchain. Bitcoin Core works by a mechanism similar to the way various internet browser software programs connect to the internet and provide basic functionality. Likewise, just as Ethereum has various clients such as Geth and Parity, there are also numerous Bitcoin software clients besides Bitcoin Core. However, Bitcoin Core is widely accepted around the world and wields enormous influence, because Bitcoin's anonymous creator Satoshi Nakamoto developed the client software by forking from Bitcoin Core (the last version Satoshi developed was 0.3.9). Accordingly, Bitcoin Core is recognized as the Bitcoin software client that most faithfully preserves Satoshi's philosophy, and it benefits from the ceaseless efforts of a large global developer community. As a result, Bitcoin Core frequently sets the standard for other Bitcoin software clients. Bitcoin Core is still being actively developed today, and it is confirmed that [as of May 2023 the version is 25.0](https://bitcoin.org/en/version-history).

Upgrades put forward by Bitcoin Core developers are calibrated to fit Bitcoin's philosophy and spirit, and they must go through a peer-review process to confirm they are free of bugs. Once such a proposal successfully passes the peer-review process, implementing that upgrade within Bitcoin Core becomes the responsibility of the Maintainer. The Bitcoin Core maintenance team operated under the guidance of Wladimir van der Laan, and Pieter Wuille, Marco Falke, Michael Ford, Jonas Schnelli, and Samuel Dobson, among others, took part as members of the team. Because participants in the Bitcoin network can remove a maintainer judged not to align with the community's shared vision, that position cannot necessarily be regarded as permanent.

# 2.3 Core Developers

The number of developers who have contributed to the Bitcoin Core project reaches roughly 1,140. The fact that this many developers have contributed is impressive and can be seen as a great achievement realized just 13 years after Bitcoin's birth. However, if we compare Bitcoin Core's number of contributors with other famous open-source projects, such as Linux, we can see that it is a relatively very small scale. Notably, Linux has been developed over several decades and is a large project in which nearly 100,000 contributors have participated; it can be regarded as a pioneer of open-source development.

From a broader perspective on the Bitcoin ecosystem, 13,057 unique developers appear to have participated, and this includes contributions to various projects and applications other than Bitcoin Core. However, this figure does not include developers who build closed-source solutions that are not disclosed to the public.

If we define active developers based on recent commits, the number of active developers on the Bitcoin Core project can be estimated at roughly 40–60. They continuously contribute to protocol improvements, bug fixes, optimizations, and other features. Because Bitcoin Core development is conservative and changes are carefully reviewed and adopted, the developer community is relatively small but professional and focused on the quality of development.

![](19a6cd-JO_I-1f7Yt1yFwNitUqXcw.png)

*(Monthly Active Developers l Source: NYDIG)*

If we take a broader scope that includes private developers, the number of monthly active developers is somewhere between about 600 and 1,000. Interestingly, on closer observation, the increase in active developers correlates to some degree with the magnitude of Bitcoin's four-year price swings.

To note a few interesting points: since 2010, Satoshi Nakamoto has not ranked among the top 10 contributors to the Bitcoin code (in fact, Satoshi has not contributed to the code at all since 2010). Also, many prominent Bitcoin developers have steadily held their place as top commit contributors throughout Bitcoin's history up to the present. While some Bitcoin developers have become more famous, there are also many who lost their renown as they moved to other cryptocurrency projects. And although some developers used online pseudonyms to protect their identities, ironically the real identities of most top Bitcoin developers are publicly known. Thus, while many developers have contributed to building Bitcoin over the years, a small number of developers handle most of the development: the top 37 developers account for 80% of all code commits to Bitcoin, and the top 50 developers account for 84% of the code commits. Finally, by region, the Bitcoin developer ranking is 1) the United States (35.1%), 2) Germany (13.3%), 3) the Netherlands (8.9%), and 4) Australia (5.0%).

# 3. How Bitcoin Development Proceeds

![](19a6cd-YTn50FTty1SKFe6Fd1FhbQ.jpeg)

*(In 2008, Satoshi Nakamoto's Bitcoin paper is posted to the cryptocurrency mailing list)*

Today, Bitcoin has established itself as a fully open-source software project built and maintained by developers around the world. You can contribute to the Bitcoin code in various ways: by joining discussions on a mailing list, a forum, or IRC chat; by participating in meetups and study groups; or by proposing updates to the software itself via GitHub. A major update to Bitcoin generally begins with a Bitcoin Improvement Proposal (BIP), a design document that outlines the proposed code change. These proposals are then discussed and developed by the community, undergo rigorous testing, and are merged into the Bitcoin code. Bitcoin's review process is highly complex, and this careful scrutiny can be seen as an important differentiator from other cryptocurrency projects. Among these, let us first take a detailed look at the Bitcoin Improvement Proposal (BIP), which began in 2011.

# 3.1 BIP (Bitcoin Improvement Proposals)

Bitcoin network upgrades, official changes, and idea proposals are all carried out through Bitcoin Improvement Proposals (BIPs). Bitcoin as software is constantly being upgraded. For example, errors that arise must be fixed, and algorithms can be made more efficient. Code can also be simplified, compatibility with other software must be maintained, and new features can be added. In the case of ordinary software belonging to a centralized project, a manager or lead developer can simply assign tasks and dictate the changes to be implemented. But Bitcoin, as an open-source, consensus-based system, has no leader. That is why this BIP process serves to organize the Bitcoin development community without a centralized authority. Everyone would agree that the security of the Bitcoin network is extremely important for maintaining trust. Accordingly, Bitcoin's development process is deliberately very slow and cautious compared with other cryptocurrency projects. The process — from an initial proposal, through a formalized BIP submission, to network activation and adoption — proceeds from a long-term perspective.

![](19a6cd-uZVNPxDB9DZNR4atzS5m7Q.png)

*( BIP Process l Source: River Financial )*

Bitcoin is a truly open system in which anyone can propose a BIP regardless of particular qualifications or reputation. Generally, as described above, BIPs begin as informal proposals on the [Bitcoin mailing list](https://lists.linuxfoundation.org/mailman/listinfo/bitcoin-dev). A developer can send their idea to the mailing list, and interested people exchange feedback with one another. Some ideas remain in this discussion stage for years because the community fails to reach consensus, because fine-tuning is needed, or because Bitcoin is not yet ready for the proposed change. When a proposal conforms to the BIP format and the BIP maintainer judges that it is not spam, a BIP number is assigned and it is posted to the Bitcoin Core GitHub repository called BIP. At this point, you must understand that the proposed BIP can be viewed officially but has not yet been approved or implemented.

![](19a6cd-Fxf60oK5X5oeJcdx18YRkA.png)

*( Bitcoin BIP GitHub homepage )*

Once a BIP is officially posted to GitHub like this, it begins to be discussed both by the developer community and by the broader Bitcoin user community. If that BIP requires code changes to Bitcoin Core, the core developers cooperate to write, test, and integrate that code. However, if legitimate controversy about the proposal is raised by the community or by users, the BIP is typically withdrawn or rejected, and its process must be abandoned or restarted after revision. Conversely, if a BIP reaches the community's rough consensus (\* consensus on an idea follows the [IETF's Rough Consensus method](https://www.rfc-editor.org/rfc/rfc7282)) and no problems are found, work begins on activating the BIP. This process takes various forms depending on the type of BIP being handled.

# 3.2 Types of BIPs

There are broadly three types of Bitcoin Improvement Proposals, and the classification criteria by proposal type are as follows:

# Standard BIP

Some BIPs (such as SegWit and Taproot) do not propose direct code changes to Bitcoin Core; instead, they establish standards to be used by other Bitcoin software, such as wallets or exchanges. Such BIPs may propose an encoding scheme or propose practices for securely protecting the Bitcoin network. Because Bitcoin is an open system, every software provider can choose whether to adopt these standards. Some standards require universal adoption to ensure interoperability. For example, a wallet that cannot interpret Bitcoin addresses is useless as a Bitcoin wallet, and a wallet that uses an address format different from the one adopted by the Bitcoin community would be difficult to use.

For example, BIP 39 and BIP 174 can be seen as optional BIPs. The mnemonic backup phrase defined in BIP 39 has been adopted by many wallet providers but is not used in Bitcoin Core itself. Likewise, not every wallet has adopted the PSBT standard defined in BIP 174. Such optional, per-software adoption can be inconvenient, but it does not become much of a problem because it does not harm the software's utility or security. In addition, standard BIPs often appear alongside consensus changes. In the case of SegWit, BIP 142 established a standard format for SegWit addresses but did not directly change the rules of the Bitcoin network.

# Informational BIP

An informational BIP shares information about Bitcoin's future plans. Such a document provides general guidelines, design issues, or information relevant to the Bitcoin community. Because this kind of BIP is an informational document, it does not require separate community consensus.

# Process BIP

Finally, some BIPs are created to streamline Bitcoin development or community discussion. Such BIPs usually do not require code changes to Bitcoin Core or other Bitcoin software. For example, BIP 1 and BIP 2 specify the lifecycle and format of future BIPs and how their activation should be handled. If we pick the two most important process BIPs, they would be BIP 8 and BIP 9. These proposals describe two potential processes for activating soft-fork upgrades in Bitcoin consensus. However, these proposals are not classified as standard BIPs. This is because they do not propose changes to Bitcoin consensus itself; rather, they are BIPs proposed to set out rules for how to introduce consensus changes into Bitcoin, thereby seeking to avoid conflict and potential splits within the network.

# 3.3 Applying BIPs

Ultimately, because changes require review by multiple maintainers — the developers who have the authority to directly change Bitcoin Core's code — as well as a period of open community comment, it takes a notoriously long time for changes to be merged. The full review process for consensus-related changes frequently takes months or years. Generally, review ranges from cryptographic analysis, to usability assessment, to software design, and finally to the code. Sometimes a series of changes to the Bitcoin code are aggregated together and formed into an executable Bitcoin version called a "Release."

Until Bitcoin Core v22.0 was released in September 2021, every final release was cryptographically signed by either Van der Laan or Andresen (Satoshi never signed his own releases). People who download Bitcoin Core can verify the authenticity of the code by checking it against the widely used public key of the lead maintainer. In v22.0, Bitcoin also added a feature that lets users verify Bitcoin's authenticity by comparing it against the keys of other trusted developers besides Van der Laan. These developers' public keys verify the authenticity of Bitcoin Core, guaranteeing that the code has not been tampered with. However, since Bitcoin is an open-source project to which anyone can contribute code, there must also be a process that ensures the collaborative code process produces functional, non-malicious code.

(\* Previously, everyone who wanted to participate would build and sign using gitian, and these days they [build and then sign with guix](https://github.com/bitcoin-core/guix.sigs/tree/main/builder-keys).)

Bitcoin's source code can be found on GitHub, a collaborative software website. Proposed changes to the Bitcoin code are applied by developers through "pull requests"; each request is manually reviewed, and if finally accepted, a maintainer "merges" it into the codebase. A pull request generally consists of several small, individual code updates called "commits." As shown above, the Bitcoin Improvement Proposal (BIP) mechanism makes Bitcoin's development process structured, maximizing transparency and community decision-making and keeping Bitcoin as open and decentralized as possible. Of course, one might counter that a small group of core developers writes most of Bitcoin's code and proposes the BIPs, but one must understand that the activation of these proposals is determined entirely by the network's nodes, and anyone can run a node.

# 4. Funding Bitcoin Development

As with most software development, regular maintenance and upgrades are very important for Bitcoin as well. Because Bitcoin is not controlled by a single entity, development and maintenance are carried out through consensus among network participants. Fundamentally, there is no individual or company that manages the development of the Bitcoin project; it is initiated by individuals or teams around the world. The resources and scale of the Bitcoin ecosystem continue to grow, and various organizations have emerged to contribute to the advancement of the Bitcoin protocol. In what follows, let us briefly look at the main organizations and individuals that fund the development of the Bitcoin protocol and ecosystem.

# 4.1 Organizations That Support Developers

# Bitcoin Foundation

The Bitcoin Foundation is a nonprofit established in 2012 by Bitcoin Core developers Gavin Andresen and Jon Matonis, and it mainly funds a portion of developers. The foundation aims to promote Bitcoin development and adoption, and it represents the Bitcoin community in communications with governments, companies, and other organizations. The foundation is dedicated to advancing Bitcoin technology and innovation and plays an important role in the Bitcoin ecosystem. One of the foundation's main sources of funding can be seen as membership fees. However, even though the foundation's funds were nearly exhausted in early 2015, it has made significant contributions to advancing Bitcoin technology and promoting Bitcoin adoption worldwide. **(\*It is not currently in operation.)**

![](19a6cd-Di8RA-srHRx4bszBnJEQvw.png)

*Bitcoin Foundation Membership*

# [Chaincode Labs](https://chaincode.com/)

Chaincode Labs, founded in 2016 by two Bitcoin developers and based in New York, is a nonprofit research institution focused on digital currency, and it contributes to the growth and development of the Bitcoin network. Chaincode Labs provides financial support to independent Bitcoin developers as well as to the Bitcoin developers on its own full-time team, and it has contributed to development projects such as Bitcoin Core and BIPs and to educational programs (\*Summer of Bitcoin, Qala, Chaincode seminars). Among the Bitcoin Core developers it financially supports, some notable figures include Pieter Wuille, Russ, and Yanofsky.

# Opensats

Opensats is a nonprofit that funds free, open-source projects and other initiatives related to Bitcoin and other education and research. It provides a platform that transfers 100% of donations to projects and to a general fund without fees. It is dedicated to funding Bitcoin-related software development, improvements to existing open-source software, Bitcoin-related education and outreach, and research on Bitcoin-related topics. This past May, Jack Dorsey donated $10 million to Opensats through his philanthropic initiative 'Startsmall,' and this donation is to be used to support the development of open-source software and projects focused on Bitcoin, the decentralized social protocol Nostr, and related technologies

# MIT Digital Currency Initiative (MIT DCI):

MIT's Digital Currency Initiative is a cryptocurrency development research organization that funds external developers and its own dedicated Bitcoin Core development team. Unlike most Bitcoin development sponsors, MIT DCI relies on donations. Bitcoin Core developers associated with this organization include Wladimir van der Laan, Cory Fields, and Anthony Towns. Since April 2015, developers working with DCI's support have contributed 14% of the Bitcoin Core code. In 2016, it announced the launch of a $9 million Bitcoin development fund and drew donations from several large exchanges.

# [Blockstream](https://blockstream.com/)

Blockstream is a blockchain technology company, backed by venture capital (VC), founded by famous Bitcoin Core developers including CEO Adam Back, Gregory Maxwell, Jorge Timón, Matt Corallo, Pieter Wuille, and Mark Friedenbach. In its early days, Blockstream raised $21 million in Series A funding. The company's core objective focuses on building Bitcoin-dedicated sidechains that enable interoperable transactions, and it has published an academic paper on this. Blockstream currently employs developers who contribute to projects such as Bitcoin Core, libsecp256k1, Rust Bitcoin, and clightning.

# [BitMEX](https://blog.bitmex.com/grants/)

BitMEX, an exchange founded in 2014, has been at the forefront of supporting Bitcoin development through its 'Open Source Developer Grant Program,' launched in July 2019. BitMEX is well known as an exchange that greatly contributes to the advancement of Bitcoin Core by providing developers with the resources they need (\*BitMEX currently provides support to roughly [five developers](https://twitter.com/BitMEXResearch/status/1585636192875266048)). In addition, it has provided sponsorship to [Michael Ford](https://github.com/fanquake/) (who moved to brink.dev in 2021), one of the standout figures in the Bitcoin Core developer community. In line with such moves, Coinbase, a major U.S. exchange, has also declared that it will launch its own Bitcoin Core development grant program to keep pace with this trend.

# Square Crypto

This is an independent research team created by Square to improve Bitcoin's open-source software. Square Crypto has funded several developers dedicated to proposing and implementing Bitcoin Core upgrades. Bitcoin Core developers funded by Square Crypto include John Atack and Vasil Dimo, among others. Also, Matt Carlo is a permanent member of the Square Crypto team.

# [Brink](https://brink.dev/)

A nonprofit foundation established in 2020, it operates by raising 100% of its development funding from companies and hiring developers. It is currently located in London, UK, and mainly focuses on the Bitcoin Core project, supporting about 10 developers. Through a fellowship program, it supports and mentors people newly contributing to Bitcoin development, and through a grants program, it supports the work of established Bitcoin protocol engineers.

Beyond these, since Bitcoin's birth various institutions, companies, and organizations — such as the Human Rights Foundation (HRF), Okcoin, and Lightning Labs — have contributed to the advancement of the Bitcoin protocol through technical or financial support. As Bitcoin's market capitalization continues to grow, the ecosystem will gradually expand, and developers, companies, and organizations will develop broader businesses around this support.

# 5. Interview with a Korean Bitcoin Developer: Calvin Kim

Behind the Bitcoin that is widely known to the public lies an immensely complex development process. Yet, ironically, information about this Bitcoin development process is inconveniently hard for ordinary people to find. Even on the internet, entering the search term 'Bitcoin' brings up all kinds of information, but most of it explains its basic concept or definition. However, such explanations alone make it difficult to gain a substantive understanding of how Bitcoin actually works or how it is developed. Moreover, the tech world changes ever faster over time, and much of the material has become "outdated," failing to reflect the latest development trends.

So this time, to help provide a more substantive and realistic understanding of the Bitcoin development process, we conducted an interview with Calvin, a Bitcoin developer who is actively working in Korea. As a skilled developer working on the front lines of Bitcoin development, his story lets us hear the practical realities of the Bitcoin development process. From here, let us listen together to the hidden stories of Bitcoin development through our interview with Calvin.

# 5.1 Introduction

Calvin, a Korean Bitcoin developer, first learned about Bitcoin in 2013, but after the Mt. Gox incident he temporarily set aside his interest in Bitcoin. However, through the Seoul Bitcoin Meetup in 2017 he reignited his interest in Bitcoin protocol development, and in 2019 he met *Thaddeus Dryja* (co-founder of Lightning Labs and developer of Utreexo) at a conference and joined the Utreexo project. Since then, he has continuously carried out research, development, and contributions on the Utreexo project, which aims to improve the scalability of Bitcoin's base layer. He also promotes Bitcoin-related activities in Korea and carries out technical presentations and co-organizing at the Seoul Bitcoin Meetup. In 2020, he received development support through a grant from the BitMEX exchange, and he is currently continuing his development with support from the Human Rights Foundation (HRF).

# 5.2 The Mailing List

The way Bitcoin exchanges development-related ideas is unusual. Protocol-level development is carried out mainly through the mailing list, and it is assumed that all participants are subscribed to the mailing list. Anyone can view what is posted to the mailing list, but if you are not subscribed, it is hard to have your idea submission reviewed (\*to subscribe, you just enter your email on the website). Also, besides Bitcoin's mailing list, a separate Lightning Network mailing list is operated, and not all development ideas related to Bitcoin are managed on a single mailing list. Anyone with a development idea can write to the mailing list at any time to propose it, and if that idea focuses on implementation rather than the protocol, it is posted to the mailing list of the project it is based on (Bitcoin Core, a Lightning implementation).

In each project there is a 'champion' who acts as the representative for an idea, and they lead the development process and build consensus. The champion writes a BIP and posts it to the mailing list, and they are generally required to comply with the BIP format (defined in BIP-1 and 2). There is no separate criterion for a BIP to be accepted; complying with the format is what matters most. On the mailing list, two or three maintainers review ideas and also serve to filter out ordinary spam.

# 5.3 BIP (Bitcoin Improvement Proposals)

So, how can you check whether an idea submitted through the mailing list follows the BIP format? BIPs have their own maintainers, and currently Kalle Alm in Tokyo and Luke Dashjr Jr. in Florida hold that role. However, they only judge whether a submitted BIP followed the format; they are not granted the authority to force changes. Because of this, even a BIP of relatively low development importance — such as \*\*[BIP-0716](https://en.bitcoin.it/wiki/BIP_0176)\*\*, which defines a Bitcoin unit — can be included.

Generally, those submitting a BIP first decide the BIP category and then begin writing. Since the purpose of writing a BIP is to share information through technical documentation, a culture has formed that encourages a BIP's purpose to be clearly delineated. BIPs are classified by considering issues such as how SegWit is defined and how the P2P protocol works, and Utreexo, too, is planned to be split into four BIPs. Interestingly, one might think that the numbering of BIPs posted to GitHub reflects the order in which ideas were submitted, but no one other than Luke Dashjr knows the details of that numbering process and policy. It is generally understood that subclassification is done according to numeric ranges such as 1XX, 2XX, and so on, but no precise guideline exists.

Writing a BIP is not mandatory when implementing a particular project. For example, Bitcoin Core did not implement BIP-39 (seed phrase) and implemented only BIP-32. In Bitcoin Core's case, when something brings an important change to the protocol, rather than writing a BIP, it is shared among developers and proceeds according to priority. The [<strong>assumeUTXO</strong>](https://github.com/bitcoin/bitcoin/issues/15605) project did not write a BIP and existed only as a GitHub issue (\*instead of a BIP, there was a separate [github repository](https://github.com/jamesob/assumeutxo-docs) that organized it in writing), and in Taproot's case the BIP document was updated after development was complete. However, in general, for consensus-related development matters, Bitcoin developers tend to prefer the BIP, a documented explanation.

# 5.4 What Does It Take to Become a Bitcoin Developer?

This may be a bit disappointing, but in fact there is no standardized path to becoming a Bitcoin developer. This is because there are hard-to-clear barriers, such as submitting a portfolio and interviewing in English. Given that, it would be good to share Calvin's experience. Calvin became interested in Bitcoin, joined related meetups, and started developing. Empathizing with Bitcoin's importance and necessity, for the first year he did development as a hobby for four to five hours every day. It was only in 2019 that grant programs (BitMEX) began to appear; before that, there was almost no path to receive open-source funding. Of course, there were a few companies even before then, such as ChainCode in New York, but there was almost no form of paying out open-source funding to someone not affiliated with any organization. After that, he applied to BitMEX on the topic of Utreexo development, and at the time, the person at BitMEX who decided on funding and the desire to recruit new developers aligned well, so he was selected.

The goals of companies that give developers grants or funding vary. In BitMEX's case, it selected developers with an emphasis on the benefits that changes to the Bitcoin protocol bring to users. On the other hand, \*\*[brink.dev](http://brink.dev/)\*\* focused on cultivating Bitcoin Core developers, judging with an emphasis on how one can contribute to Bitcoin Core and how it can be securely protected. Spiral (Jack Dorsey, Block) focuses on supporting the development of Bitcoin wallets with an emphasis on user convenience and safety. After a document screening, you submit a proposal about the funding program and go through a video interview in English.

As far as is currently known, I think the number of full-time developers worldwide (developers who are open-source and work on the protocol) is probably around 50–100. But beyond these, there are also many Bitcoin-related wallet, infrastructure, and mining companies, so all together the number would be higher than this.

# 5.5 Bitcoin Core Developers and Maintainers

The role of Bitcoin maintainers and core developers is to develop, maintain, and manage the core elements of the Bitcoin network. In the software called Bitcoin Core, there are maintainers for various areas, and currently five maintainers each handle a different area — for example, Wallet, Mempool (the transaction memory pool), Build Process, GUI (graphical user interface), Test, and so on.

Each maintainer has the authority to review and approve code in their own area. They do not arbitrarily approve code in areas they are not responsible for. This preserves the expertise and accountability of each area. The Bitcoin Core project is carried out mainly on GitHub, and there is a separate page where code is proposed.

The term "core developer" is sometimes used somewhat ambiguously. This is because it can refer to developers who work on the software called Bitcoin Core, and it can also refer to developers who actually handle the core development of Bitcoin. The former can mean people who mainly do code review and examination, while the latter can mean developers trying to add new features.

# 5.6 Other Notes

There can be shared interests between miners and developers, but that relationship can be complex and unclear. This is because most mining-rig manufacturers provide mining software separately, so miners do not need to run Bitcoin Core themselves. Mining protocols exist separately, and in mining systems network latency acts as an important factor. Because better connectivity between mining pools improves performance, research on this topic is also underway.

Other projects where research and development are actively underway on Bitcoin's Layer 2 include Drivechain, Statechain, Spacechain, and Liquid. Each of these projects takes a different approach to issues such as centralization and security, so various trade-offs exist in each project.

Through this short conversation with Calvin, who works directly on the front lines of Bitcoin development, we had the chance to learn about Bitcoin's practical development process. Calvin's story brought us close to the vivid reality of Bitcoin development, which had previously been hard to access. Once again, I sincerely thank Calvin for taking his valuable time, and I hope this article has given you interesting information about Bitcoin development.

Finally, I want to mention that at Bitcoin meetups there were not many opportunities for code-level conversations. To the extent that being interested in an interview about Bitcoin development was itself unusual, most attendees tend to be more interested in the economic and social aspects of Bitcoin than in development. While exchange around Bitcoin development is active in various cities abroad, that tendency seems weaker in Seoul. I hope more Bitcoin developers will become active in Korea, and anyone interested in Bitcoin development is welcome to reach out anytime at **@kcalvinalvinn**.

# 6. Conclusion

From the above, I think the Bitcoin Improvement Proposal (BIP), like the Ethereum Improvement Proposal (EIP), demonstrates a structured and systematic developer approach to protocol upgrades in the Bitcoin ecosystem. Fundamentally, they share the same purpose of facilitating, standardizing, and documenting a chain's upgrade proposals, but I see subtle differences that distinguish BIPs from EIPs. For example, in the big picture, Ethereum's EIP structure is more progressive about upgrades and has a more active development ecosystem because of Ethereum's plan to become a 'World Computer,' and to that end it actively pursues continuous updates and adjustments. Bitcoin's upgrades, on the other hand, are grounded in stability and tradition, and it seeks to preserve its role as a decentralized store of value.

Another difference lies in the development consensus mechanism. Ethereum's development and decision-making process often involves various stakeholders, such as dApp developers and Ethereum holders. Bitcoin's development, by contrast, strongly adheres to decentralization, and implementing major changes often requires broad consensus among various node operators and miners. Because Bitcoin's development ecosystem, following its core principle of decentralization, has several key players dispersed, it tends to be the case that no single entity can control everything.

Considering these factors, Bitcoin's future looks promising. The decentralized nature of the development process ensures that diverse voices are heard and that change can be driven through broad community consensus. This approach is sometimes slow, but in the ever-changing world of blockchain technology, it should ensure that Bitcoin's integrity and core vision can keep evolving without compromise.

# 7. Sources

- [https://nydig.com/research](https://nydig.com/research)
- [http://wiki.hash.kr/index.php/BIP](http://wiki.hash.kr/index.php/BIP)
- [https://coinsutra.com/bip-bitcoin-improvement-proposa/](https://coinsutra.com/bip-bitcoin-improvement-proposa/)
- [https://twitter.com/kcalvinalvinn](https://twitter.com/kcalvinalvinn)
- [https://medium.com/@BevmFoundation/who-supports-bitcoin-ecosystem-developers-3f234cab23f5](https://medium.com/@BevmFoundation/who-supports-bitcoin-ecosystem-developers-3f234cab23f5)
