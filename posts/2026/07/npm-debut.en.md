---
title: '[Neurain Dev Log] #7. Too Good to Keep to Myself: An npm Debut and the Homework Left'
category: ai
tags:
  - ai
  - second brain
published: true
date: 2026-07-25 23:15:00
series: 'Neurain Dev Log'
seriesOrder: 7
description: 'I got all the way to npm chasing a one-line install, and then an independent audit scored it 42.7 out of 100. Here is the two-month report card and the nine things left to fix, in priority order.'
---

Once it was built I got greedy. Greedy in the sense that it felt like a waste to keep it to myself.

After two months of living with it, this thing was clearly not for developers. It was for people like me: people who cannot write code but have a lot of knowledge to organize. Office workers whose meeting notes pile up, students whose studying piles up, creators whose material piles up. I started thinking about what those people would need in order to use it.

## TL;DR

> *1) I published to npm with a one-line install as the target. The final deploy button stays a human's job.\
> 2) An independent audit scored it 42.7 out of 100. I am publishing the report card as-is.\
> 3) Nine things left to fix, written down in priority order.\
> 4) I asked my own system about my weaknesses. The most uncomfortable finding was the most accurate.*

## 1. The bar was a one-line install

A non-developer built it, so the bar was a non-developer's bar. If explaining the install takes a page, that is a failure. One line in a terminal installs it, and five commands are enough to run it. That was the target.

The bar does not stop at installation. No developer jargon in the messages. Anything the system asks a human has to be an ordinary sentence. When something goes wrong, instead of "error code 47" you should see what failed, why, and what to do about it. The goal is for the next person not to feel the helplessness I felt in front of the black window in post #1. That is a perspective available precisely because a non-developer built it.

Holding the line was not easy. Building things makes settings multiply and options accrete. Every time, I went back to the principle from post #3. Subtraction wins.

## 2. The npm debut

npm is the world's largest repository where developers publish and download software components. Think of it as the developers' app store. Someone who did not know what npm was two months earlier was suddenly publishing a package there.

The order went like this. In mid-June I registered the name `neurain` in the registry. Good names are first come, first served, and I was told the local custom is to claim the name before the product is finished. Then I packaged it up and pressed publish for the first time. Version `0.1.0-alpha`. That is when I learned the leading zero and the alpha label are a gesture of humility, a way of saying this is not a finished product.

To be precise, I only pressed the final button. Claude and Codex built and verified the package. Two-factor authentication, the last step of pushing something out into the world, was designed from the start so only a human can press it. That is the principle from post #3. The AI builds and verifies. A human presses the button that carries responsibility. Typing the six digits from my phone, those few seconds are the most accurate picture of what my role in this project actually is.

The feeling of watching `npx neurain` install a package I made is hard to describe. Something like debuting in the developers' world with a single account to my name.

## 3. The report card: 42.7

Ending the post here would make it a lie.

In late July I had the whole system audited independently. I put eighty-two AI agents on it, each from a different angle, and kept them blind to each other's results. Then I had the opposite side try to refute every finding.

84 findings. Zero successfully refuted. Overall score: **42.7 out of 100**.

The most consequential discovery was this. **Automatic search had been quietly dead for a week.** A character check added in mid-July while hardening security misjudged line breaks and tabs as dangerous characters. So any multi-line question caused the system to skip searching my documents entirely. 30.5% of conversations that attempted a search came back empty-handed.

The problem is that the answers were plausible the whole time. I believed I was using my brain and I was not. When I wrote in post #4 that a quiet failure is more dangerous than a loud one, this is the incident I meant.

The one-line conclusion in the audit report was exact.

> "The foundation work is top tier for the category, and three layers that make you believe things are working (automatic search, the scorecard, the health indicator) are broken simultaneously."

To be fair, there were good marks too. The mechanisms that keep data intact even if the process dies mid-write were rated "top tier for a personal system." All 1,454 automated tests passed. So the frame was solid and the instrument panel was broken. A car with a broken instrument panel is the more dangerous one.

In the same session I fixed fourteen urgent items and the estimated score moved to 69.7. Still under 70. That is the honest position of this system right now.

## 4. The nine things to fix

Combining the audit findings with what I felt while using it, here is the improvement list, in priority order.

| Rank | What | Why it is a problem | Status |
|---|---|---|---|
| 1 | Nobody but me has used it | A system fitted to one person breaks on the second one | Recruiting prepared, execution pending |
| 2 | There is no interface | Terminal only. No onboarding flow, so a first-time user does not last 30 minutes | Not started |
| 3 | Unusable away from the desk | The brain lives only inside the MacBook. No phone access | Not started |
| 4 | Safeguards switch off on a second computer | My machine's paths are baked into the code, so a restored vault silently loses protection | Not started |
| 5 | Answer correctness is not measured | I measure whether search finds the right document, not whether the answer built from it is right | Not started |
| 6 | Editing one document re-reads everything | Every question starts from scratch, wasting seconds each time | Not started |
| 7 | "Is this still true?" checks fall behind | Facts needing re-verification sat untouched for up to 77 days. This is where a knowledge system's core promise collapses | Not started |
| 8 | It jams at 12,500 documents | Past the ceiling, answers get refused. There is room now, but there is a ceiling | Needs confirmation |
| 9 | No remote backup repository | Rewind the history by mistake and there is nowhere to recover from | Alert added only |

Number one matters far more than the rest. The other eight are things I can hand to an AI. Only number one cannot be delegated: sitting a real person down, watching them use it, and seeing where they get stuck. I have the interview profiles, a 60-minute script, and the question set all prepared, and I have not run it.

I know why, honestly. I am reluctant to show it to anyone. Two months went into this thing, and the thought of watching a stranger flounder for three minutes and give up is not a comfortable one. But if I never watch that scene, this system stays a private hobby forever.

## 5. I asked my system about my weaknesses

A maker cannot see their own thing objectively. So I had the AI that spent two months looking inside this system with me run a final diagnosis, with instructions to skip the praise and give me only the weaknesses. Here is what came back.

> **Your strength is not where you claim it is.** You lead with model portability, but that will be an industry standard in time. What is actually unusual is the measurement culture. It is rare for a personal knowledge tool to have regression tests and a scorecard, and rarer for it to reverse its own decisions when performance drops. Scrapping a sophisticated component on the strength of one measurement, and doubting the scorecard itself, are the evidence. That is a habit rather than a feature, which makes it the hardest thing for anyone to copy.
>
> **The most uncomfortable finding was already inside your own documents.** One of your evaluation files contains this sentence: "the area where you claim the most differentiation is in reality the most ordinary." I agree. Your memory today is passive. It answers when asked and never volunteers "you need to check this." That is where the 77 days of overdue re-verification comes from. Storage and retrieval are finished. Active management has not started.
>
> **The biggest risk comes from success.** This system is fitted precisely to one person's way of working, which is why it works well. It is also why it is likely to break on the second user. There really are specific folder names and machine paths baked into the code. Item 4 on your list is that symptom.
>
> **The next move is not a feature.** What you need now is not a new capability but a second user. Where that person gets stuck will write the next two months of roadmap for you.

That it is now possible to ask my own system about my own system's weaknesses is itself evidence that these two months were not wasted.

## 6. What remains anyway

I should note that the road ahead is not rosy.

The large AI companies have started shipping memory as a default feature. Free, automatic, no setup. Over time I expect built-in features to absorb a substantial part of what I built by hand. An individually built tool going head to head with a big company's default feature and winning is, coldly speaking, not a picture that exists.

Two things remain anyway.

First, **the knowledge is in my files rather than a company's server.** Big-company memory lives inside that company's account. Leave the service and you leave it behind, and you cannot open it to see what it remembers. My brain is mine, folder and all. I can open it, back it up, and carry it out.

Second, **the freedom to swap models belongs to me.** That company's memory works only with that company's model. My brain runs whichever company's model I plug in. As Google's knowledge-format announcement in post #5 shows, the industry is looking in the same direction on keeping knowledge in open files. What divides things at the end of that direction is ownership. Be comfortable and locked in, or take on the friction and own it.

Two likely questions, answered in advance.

"So why not just use the big-company memory feature?" If it is for remembering light preferences, that is the right call. Only, that convenience is valid inside that company. Stack years of context with one company, then watch a better model appear at another, and you are back at exactly the problem from post #1.

"Doesn't this ultimately require knowing how to develop?" Two months ago I did not know what npm was, and I still cannot read code. What it required was not development knowledge but the protocol from post #3. Specify, have it verified, decide. That is not a development skill, it is a skill for assigning work. Anyone who has ever managed work already has half of it.

## 7. To the me of a year ago

I once wrote a post on this blog called [The AI Era](/en/2025/08/ai-sidae). I wrote that in an age where AI does everything better than us, the last capability standing is communication. I also wrote that when it goes wrong, the failure is the questioner's, not the AI's.

Back then that was an abstraction. Now I know what it looks like in practice.

Looking back there were three versions of me. A year ago, the one who only wrote about the AI era arriving. Two months ago, the one who got tired of an assistant that lost its memory daily and made a folder. And now, the one with thousands of documents in that folder who can install it for someone else. The line connecting the three is not coding ability. It is exactly the capability the me of a year ago described in the abstract.

This whole series has really been a footnote to that sentence. I found the problem in an assistant that forgot every day (#1), learned the role reversal from Karpathy's note (#2), stacked 518 commits without writing a line of code (#3), built a structure where one question passes through thousands of my documents to become an answer (#4), named that structure and wrote its manual (#5), and now live by a routine that picks up yesterday every morning (#6). Across all of it, what I did was not coding. I specified, I had it verified, and I decided.

As a formula:

**Non-developer building ability = asking x verifying x deciding**

I still cannot write a line of code. But we have reached an age where not being able to write code no longer means not being able to build. Define the problem, specify it precisely, get it verified, and take responsibility for the decision, and a non-developer builds a system.

The AI assistant that lost its memory every morning now picks up yesterday every morning.

Rewriting that one sentence took two months and 518 commits. What is left is a 42.7 report card and nine pieces of homework. The next series will be the story of crossing them off one at a time.
