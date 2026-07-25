---
title: '[Neurain Dev Log] #3. 518 Commits From Someone Who Cannot Write Code'
category: ai
tags:
  - ai
  - second brain
published: true
date: 2026-06-30 08:25:00
series: 'Neurain Dev Log'
seriesOrder: 3
description: 'I state what I want in Korean, Claude builds it, Codex attacks it, and I keep only the rulings and the dangerous buttons. For someone who cannot read code, trusting the output means measuring behavior rather than reading the source.'
---

Over the past two months my knowledge folder accumulated 518 commits. 230 in June, 288 in July. That works out to the system changing about eight times a day.

Not one line of that code was written by me.

## TL;DR

> *1) Development for a non-developer is a division of labor. I specify and I rule, Claude builds, Codex attacks.\
> 2) If you cannot read the code, there is only one way to trust the output: measure the behavior.\
> 3) Every round of trial and error ended the same way. Subtraction builds a system faster than addition.\
> 4) What survives is not the impressive option but the one that won on measurement. Even the scorecard gets measured.*

## 1. The first day was a failure

The start was pathetic. I had Claude Code open and sat there for a long time not knowing what to type. What I eventually typed was this.

"Build me a system that organizes my knowledge. Just make it good."

What came back was good, and it was not what I wanted. Folders appeared, scripts appeared, documentation was attached, and it all looked plausible. Then I tried to actually use it and could not bring myself to. It was not how I work.

The AI had not failed. It did exactly what it was told. The instruction was the problem. What I learned that day went on to govern the entire project. **The one thing you cannot delegate to an AI is knowing what you want.**

So I spent a few days just observing. I took notes on what I talked to AI about over a day, where I got stuck, what I kept explaining over and over. Those notes became the table in post #1, and once my requests got specific the output started changing too. It took several rounds before the approach settled into four steps.

## 2. A non-developer's development protocol

**First, I say what I want in Korean.** As specifically as possible. Half the quality rides on this. "Search is weird" is not a request. You have to get down to "I asked about collateral and it cannot find the document filed under reserves. Make words with the same meaning recognize each other" before the AI moves accurately. Fill in three things, the observed symptom, the desired result, and the thing that must not break (do not damage existing behavior), and the failure rate drops noticeably.

**Second, Claude builds.** It writes the code, edits the files, runs the tests. I watch and steer the direction at a few points along the way.

**Third, Codex attacks.** I hand Claude's output to Codex with this instruction: "Attack this code. Find the holes, the wrong assumptions, the cases it missed." A few minutes later a verdict comes back. If it passes, it says why. If it fails, it comes with a BLOCK label and a list of what is dangerous and why.

What gets caught here is usually something I could never have imagined. One finding I still remember: if the program is force-quit mid-save, a document is left half-written, and the system mistakes that half-document for a valid one and indexes it. The odds are low, but when it happens a quiet lie gets mixed into my knowledge. I do not have the ability to imagine that. Catching it is what cross-verification is worth.

One feature was rejected eight times in this review and passed on the ninth. Honestly, when the eighth BLOCK came up I sighed at the monitor, and there was a temptation to just move on. Only I use this thing anyway. But that feature happened to be the closing command I use every day. In hindsight it is the feature I now trust most.

I did not build this cross-verification because I trusted it from the start. Early on, when Claude said "done," I believed it was done. Then I watched Codex overturn one of those results and learned something. **An AI's confidence and its accuracy are separate things.** Since that day, "done" from either side is treated as a claim, not a verdict, and a verdict only counts once it has survived the other side's attack.

**Fourth, when the two disagree, I rule.** I cannot follow a technical argument, but I can rule on one. I make each side re-explain its position in non-developer language, then pick whichever fits my actual use.

A real ruling looks like this. On a rework meant to speed up saving, Claude says "this way is twice as fast," and Codex counters with "faster, but if it is interrupted mid-save the data can be left half-written." I asked for both arguments in plain language, then summed it up: I can tolerate saving being a few seconds slower. I cannot tolerate my knowledge being cut in half. Safety wins. Whenever the split is speed versus safety, I pick safety almost every time, because it is my knowledge on the line.

And one rule. **I press the dangerous buttons myself.** Deploy, delete, publish externally. I did not block the AI from pressing them. I designed the thing so it never had that authority in the first place. You can delegate the building, but the decisions you are accountable for have to stay with a person, and that is what makes it possible to trust the whole system.

Using Claude and Codex, AIs from different companies rather than two from the same one, is also deliberate. Graduates of the same school make the same mistakes. You have to pit two who learned in different places against each other before their blind spots show. It is not free, of course. Two subscriptions to maintain, and every feature takes twice as long. Still, after two months the conclusion is that it pays. Finding a mistake later costs far more.

Looking back, this protocol is less a development method than a way of assigning work. It is the same as handing a task to a junior colleague: make the request clear, have someone else review it, sign off yourself. I did not learn to develop. I applied the way I already worked to an AI.

## 3. How do you trust it if you cannot read the code?

This is the question everyone lands on. If you cannot read the code, how do you know what the AI built is any good?

Two months in, my answer is this. **Instead of reading the code, measure the behavior.**

A developer reads code and judges "this logic is correct." I cannot do that. What I can do is ask: how did search accuracy change before and after this feature landed? Does a save actually turn up in search? If I feed it deliberately malformed input, does the system hold?

So I installed two things before anything else. One is automated tests. Every time something is changed, a machine confirms the existing features still run. The other is a scorecard, which I cover below. Search quality gets a numeric score, and any change that lowers the score is reverted no matter how convincing it sounds.

Those two are a non-developer's only line of defense. I cannot read the code, so I cannot trust the code. I cannot trust the code, so I have to trust the result. To trust the result, I have to measure it. Without measurement all you are left with is the AI's "done," and as noted above, that is a claim rather than a verdict.

## 4. Trial and error 1: the command diet

The first design was ambitious. No commands at all, everything in natural language. A system that saves and organizes just because you said something.

I abandoned it within a week. "Organize this" was read as saving one day, summarizing another, and moving files a third. At one point the system responded diligently to a passing remark and I found organizing had run that I never asked for. Even between people the meaning of "organize this" splits. There is no reason an AI would be different. Ambiguous input produces ambiguous behavior.

So I started making commands, and the opposite problem hit. Every new feature added a command. One for saving, one for summarizing, one for checking, one for cleanup, one for indexing. At some point I was looking at the command list and had to admit reality: even I, who built it, could not remember them all. A system meant for non-developers that keeps adding things to memorize is a signal you are going the wrong way.

I cut it down to five. Check status, save, organize, sync, wrap up. That is it. Every other capability was hidden behind those five so the system calls them when needed. It is the same logic as a remote with dozens of buttons where you only ever use five. Buttons you never press are worse than no button at all, because they make you stop and think about which one to press.

## 5. Trial and error 2: the expensive part was worse

I wanted to make search smarter. There happened to be a thing called semantic search, an AI component that finds material by meaning even when the words differ. It sounded exactly right, so I built a model and wired it in.

Then I measured it. The result was not what I expected. It was worse than plain keyword search.

In Korean it could not even tell that 준비금 (reserves) and 리저브 (reserve, transliterated) are the same thing. Their similarity score was 0.003. On a scale where 1 is a perfect match, that is a verdict of total strangers. A light, fast semantic model built in the English-speaking world was helpless in front of Korean business documents.

It took me a while to accept. The phrase "AI search" carries expectations, so even after seeing the numbers I kept adjusting settings for a few days hoping it would improve. It did not. A 27.9MB component was scrapped before it ever shipped.

What I kept instead was far more primitive: a synonym dictionary, a managed list of word pairs that mean the same thing. Collateral and reserves, 스테이블 and stablecoin. When I hit a word it fails to find, I add the pair right then. It is unglamorous. But it won on measurement, and as a bonus I can now explain why a given document came back. Nobody knows why a semantic model produced a particular score. Open the dictionary and the reason is written down.

A principle came out of that day. **What survives is not the impressive option but the one that won on measurement.** Bolting AI onto something does not make it better. Only what measures better is better.

## 6. Trial and error 3: the day two scorecards fought

While on the subject of measurement, one more. Search quality is managed with a scorecard, essentially a practice exam. You write dozens of items that say this question should return this document, then make the system sit the exam every time you change it and score the result. If the score drops, the change is reverted.

One day the score fell sharply after a search rework. From 0.941 to 0.890. I dug through the code and found no cause. After a long hunt the culprit turned out to be the exam, not the code.

One test set demanded a retired old document as the correct answer, while another demanded the same document be treated as wrong. The scorecards were fighting each other. Satisfying either one lost points on the other, so the system was innocent. The student was studying fine, and two answer keys were insisting on different answers.

The score only recovered after I fixed the test sets and added a check that automatically catches contradictions between them. 0.949. The lesson that day was a big one. **If you are going to govern an AI by measurement, start by doubting the measuring instrument.** In section 3 I said measurement is a non-developer's line of defense. This is where I learned that the line of defense needs its own periodic inspection.

## 7. A record of subtraction

Looking back, every decision that grew the system was a subtraction.

I removed universal natural language and kept five commands. I removed fancy semantic search and kept a synonym dictionary. I removed a broken scorecard and kept a contradiction check. Plenty of those 518 commits added features, but the days the system noticeably improved were mostly the days something was thrown away.

The reason is obvious once you think about it. A non-developer cannot control a complex system. The more parts there are, the less you can tell where a problem came from. A system you do not understand is one you cannot trust, and you cannot hand your knowledge to a system you do not trust. Simplicity was not a preference. It was a survival condition.

What a non-developer learned in two months also compresses into three sentences.

Say it precisely. Have a different AI verify it. Make the decisions yourself.
