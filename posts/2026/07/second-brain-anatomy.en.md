---
title: '[AI Dev Log] #4. An Anatomy of the Finished Brain'
category: ai
tags:
  - ai
  - second brain
published: true
date: 2026-07-06 21:05:00
series: 'AI Dev Log'
seriesOrder: 4
description: 'Ask one question and search runs four stages over three seconds. Split the words and widen them with synonyms, pull candidates from 4,700 documents, filter down to real evidence, then compose the answer on top of it. Answer quality is decided by the evidence, not the model.'
---

When I ask my AI a question now, this is what happens in the three seconds before the answer appears.

## TL;DR

> *1) The question goes through my roughly 4,700 documents before it goes anywhere near the web.\
> 2) Search runs in four stages: split and widen, narrow, filter, then compose on top of evidence.\
> 3) Answer quality is decided by the quality of the evidence on the desk, not by the model's intelligence.\
> 4) All three betrayals from post #1 are resolved by this structure.*

## 1. The job is preparing an open-book exam

Before the structure, the principle in one sentence.

**Let the AI sit the exam, but make it open book.**

An AI taking a closed-book exam answers only what it knows. When it does not know, it invents something plausible. That is what people call hallucination. Put reference material next to the exam paper and the story changes. It answers from the material, so it is accurate, and it can cite where it looked, so it is verifiable.

The problem is that the reference material runs to 4,700 pages. You cannot put all of it on the desk. So for each question something has to select the handful of pages that belong on the desk, and **that entire selection process is the core of this system.** The answer follows from it automatically.

Once that framing clicked, my priorities changed. I learned that time spent deciding which evidence goes on the desk is worth far more than time spent deciding which model to use.

## 2. The journey of a single question

Say I ask, "what were the collateral rules again?"

**Stage 1, split and widen.** The question is broken into Korean word units and expanded through the synonym dictionary. Ask about 담보금 (collateral) and it still finds the document filed under 준비금 (reserves). That unglamorous synonym dictionary, the one left over after I scrapped fancy semantic search in post #3, is what does the work here. The dictionary keeps growing. Whenever a word fails to find what I meant, I add the pair on the spot, so the system gradually shapes itself to my vocabulary.

**Stage 2, narrow to candidates from my own documents.** This is not a web search. It sweeps the roughly 4,700 documents in the folder in score order. Query words in the title earn points, multiple appearances in the body earn points, a recent document earns points. That produces a short list of candidates. General knowledge is not the primary source. My records are.

**Stage 3, filter down to real evidence.** Being a candidate does not make a document evidence. When several documents cover the same topic, dates and status decide which one is authoritative. Anything marked as an old version drops out. Where documents contradict each other, the more recent one takes priority, but I made the system state in the answer that a contradiction exists. Documents in a private area never surface in another room's search at all.

This stage was the hardest and still gets the most attention. As knowledge accumulates, the dangerous thing is not missing information but stale information. Missing is fine, you answer that it is missing. But presenting a policy scrapped six months ago as the current one is a lie. Saving is easy and judging is hard, a lesson that became clear once the document count passed a thousand.

**Stage 4, compose the answer on top of the evidence.** Only documents that pass the filter go on the desk, and the AI composes an answer to my question on top of that evidence. It cites only what it actually used and does not paper over gaps with general knowledge. When the evidence is thin, I made it say the evidence is thin. Pretending to know is the most dangerous failure.

Written out it is four stages. As a diagram it is one picture.

![Neurain processing flow, from question to answer](neurain-flow.svg)

In practice it looks like this. You ask a question, and the answer arrives with a tail: "Evidence for this answer: Reserve policy summary (12 June), related meeting note (2 July)." If the answer looks off, open the source and check. The structure asks you to trust documents rather than the AI's memory.

I remember the day it first worked. A note I had saved weeks earlier and completely forgotten came back in the evidence list. It was the first time I saw with my own eyes that the system had not forgotten something I had, and from then on I started calling this thing a brain rather than a tool.

This pipeline's report card is managed with the scorecard from post #3. The most recent measurement has it returning the correct document more than nine times out of ten (94 to 95% across 136 test items). That said, this is a score I gave myself on an exam I wrote. It is not a grade certified by anyone external, and I want that stated plainly.

The point is that my own situation is the default. Ask a bare Claude the same question and you get generalities. Route it through my brain and you get an answer with my written rules, my past decisions, and the exceptions specific to our situation layered on top.

## 3. How to notice when search is wrong

It would be dishonest to only tell the good parts, so here is a failure.

Search fails in two ways. It finds nothing, or it finds the wrong thing. The dangerous one is the second. When it finds nothing, the AI says "no relevant material," so I know. When it finds the wrong thing, a plausible answer gets built on top of that wrong evidence, and I believe it.

This actually happened. For a while, any long question containing a line break caused search to not run at all. The system quietly skipped search and answered from general knowledge, and I did not notice for some time, because the answers were plausible. I only found it much later, during a check. I believed I was using my brain and I was not.

So I added two things. One, answers always carry the evidence list. An empty evidence list means search did not run, which my eyes catch. Two, a self-check at wrap-up time that verifies search is healthy. It re-searches what was just saved and tells me if it cannot find it.

The lesson: **a quiet failure is more dangerous than a loud one.** And a system that does not report its own state cannot be trusted.

## 4. Floor plan of the brain

The folder structure this search runs over is three layers plus areas.

| Layer | Role | Rule |
|---|---|---|
| raw | Originals of what I heard and received | Immutable after capture. Preserved as evidence |
| wiki | Knowledge the AI organizes and maintains | AI writes, human reviews |
| output | Deliverables made from the knowledge | Reports, articles, presentations |
| area folders | A room per domain of life | Work, redevelopment, investing, family, and so on. Nine of them |

There are nine areas. Company strategy, apartment redevelopment, investing, family, the blog. Different parts of life live inside a single folder, each with its own room, connected only when needed.

Opening one room looks like this. The redevelopment room has an inbox where association notices and press clippings pile up untouched, the knowledge documents the AI organized out of them (floor-area terms, project stages, the cost-share structure), and the blog post made from that knowledge sitting in output. The whole room runs like a small brain, and nine small brains make one large one.

Each room has a notice on the door: a rules document stating what the room covers, which document is authoritative, and what to watch out for. Whichever AI walks in reads that notice before starting work. Claude reads it, Codex reads it, so both work by the same rules. The "same rules whichever AI shows up" idea from post #2 is implemented by these notices.

Rooms marked private are blocked from leaking into other rooms. A document in the family room must never surface in a work-room search. One roof, locked doors.

One rule became urgent over two months of operation: keeping originals separate from organized versions. raw is never edited. That way, when the wiki the AI organized turns out to be wrong, there is an original to return to. I did once find an AI summary that differed subtly from the source, and because the original sat untouched in raw, comparing and correcting was trivial. Memory (wiki) can be edited. Evidence (raw) cannot.

## 5. Three betrayals, three fixes

Here is how the betrayals from post #1 got resolved by this structure.

| Betrayal from post #1 | How this structure fixes it |
|---|---|
| Long conversations forget the beginning | Memory lives in files, not conversations. Files have no size limit |
| Sessions are strangers | Every session looks at the same folder. Today's session picks up yesterday's record |
| Switching models resets everything | The brain is in my folder. The model gets swapped in front of it |

Take the first line. Conversations forget as they lengthen. Files do not. Anything important settles into a file before the conversation ends, and the next conversation starts by reading that file. If the conversation is volatile memory, the folder is the hard drive. The "size of the desk" limit from post #1 is not a problem in this structure either, because only the documents you need right now go on the desk and the rest are pulled from the cabinet as required.

Second line. Sessions cannot talk to each other directly, but making them read and write the same folder connects them in effect. When a session ends it leaves the day's work and decisions as a handover document, and the next session starts by reading it. The handover contains the same things a handover between colleagues does: how far it got, what is unfinished, what to do next, what to be careful about. The briefing I used to keep in a notes file and paste in every time, from post #1, is now produced by the system. Structure has taken over the handover a human used to do.

The third line is why this system exists. I really do move between Claude and Codex using the same brain. Meeting notes Claude organized in the morning get picked up by Codex in the afternoon and turned into a report. News of a new model no longer scares me. It is exciting, because if it is good I just plug it in.

## 6. Five switches

The switches for operating this brain are the same five that survived the diet in post #3. Check status in the morning, save while working, organize the accumulation into knowledge, sync across sessions, wrap up the day. Most of the time I just talk to it and only press a switch at the moments that need one. In driving terms, I hold the wheel the whole time and only the ignition and parking are buttons.

Forgetting a switch is not a disaster. Forget to save and the next wrap-up finds the unorganized items and tells me. Forget to wrap up and the next morning's status check reports that yesterday was never closed. I know a system that depends on human diligence does not last, so I put real effort into making it run even when the human is lazy.

The principle compresses into one sentence.

**Knowledge lives in my files. Intelligence gets swapped.**

I stacked 518 commits over two months to protect that one sentence.
