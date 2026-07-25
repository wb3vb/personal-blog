---
title: '[Neurain Dev Log] #5. How to Read Neurain'
category: ai
tags:
  - ai
  - second brain
published: true
date: 2026-07-09 13:30:00
series: 'Neurain Dev Log'
seriesOrder: 5
description: 'The system is called Neurain. Split it into three parts, knowledge, operating rules, and a swappable AI host, and the structure snaps into focus. I took apart nineteen comparable products, and here is what I copied, what I refused, and what moat is left.'
---

This is the manual for anyone who got this far and started wondering what the thing actually looks like. Save it and pull it out when you need it.

The system has a name: Neurain. Internally I just call it the brain.

## TL;DR

> *1) Neurain = knowledge (LLM Wiki) + operating rules + a swappable AI host.\
> 2) A folder alone is not a second brain. The difference lives in the operating layer.\
> 3) I took apart nineteen comparable products. Here is what I copied and what I deliberately did not.\
> 4) The remaining moat compresses to one thing: model independence, with knowledge that stays in my files.*

## 1. The whole picture in three parts

| Part | Role | Replaceable? |
|---|---|---|
| LLM Wiki (knowledge) | Where knowledge lives. Markdown files | Structure stays |
| Neurain (operating rules) | How knowledge changes safely. Commands, search, safeguards | Rules are shared |
| AI host (front end) | The model that reads the knowledge and does the work. Claude, Codex, and so on | Freely swapped |

As a car: knowledge is the body and the cargo, the operating rules are traffic law, and the AI host is the engine. When a better engine arrives you swap it. It is still your car, your cargo, and the same law.

Separating structure from operation is the point of this picture. Laying out good folders (structure) and keeping the knowledge inside them from going wrong over time (operation) are different problems. A folder tells you where things go. It does not tell you who may change what and when, whether private material is leaking, or which side is authoritative when facts conflict. The operating rules answer that. Neurain is really the name of that operating layer.

Something I only understood after building it: what I made over two months was not fundamentally software. It is closer to an employment contract between me and the AI. A rulebook stating what is permitted, what must be asked about, and how to recover from an accident. The code is just the mechanism that enforces the rules. That is why a non-developer could build it. Setting rules was never development. It is operations.

## 2. A caste system for folders

Re-reading the floor plan from post #4 as a hierarchy looks like this. The point is separating what is authoritative from what is auxiliary.

| Folder | Nature | Rank |
|---|---|---|
| raw/ | Original evidence. Immutable after capture | Evidence |
| wiki/ | Shared knowledge map | Authoritative |
| area folders | Operating knowledge per domain | Domain authoritative |
| output/ | Reports, articles, presentations | Deliverable |
| search DB, dashboard | Rebuildable at any time | Cache |

Information flows one way. What comes in lands in raw, the AI organizes it into wiki and area documents, and it becomes output when needed. When a question arrives, search runs the other direction. The route that search takes is the one diagram in post #4.

This hierarchy makes it obvious what is precious and what is disposable. Back up the evidence and the authoritative documents. The cache can be thrown away. Even in an accident, how far to restore is already decided. When I did find the AI had organized something wrong, there was nothing to panic about. The original was sitting in raw, so I just had it organize again.

## 3. The five commands

| Command | When | What happens |
|---|---|---|
| _status | Morning, or returning to the desk | Check current state and pick up where things left off. Read-only, so it is safe |
| _save | When something you must not forget appears | Store the original as-is in the inbox (raw) |
| _compile | When material has piled up | Promote the safe items into knowledge documents |
| _sync | When handing off a session | Refresh the handover another session will pick up |
| _wrap | End of day | Save, organize, sync, and verify in one pass |

The daily routine is simple. In the morning `_status` picks up yesterday. During the day I just talk and work, hitting `_save` whenever something must not be lost. In the evening `_wrap` closes the day. Those three are the daily drivers, and the system calls the other two on its own.

Taking `_wrap` apart shows the character of the system. One closing command runs four things in order. It saves what came up today, organizes it into knowledge documents, refreshes the handover for tomorrow's session, and finally verifies. It checks whether what was saved actually turns up in search and whether anything sensitive like a password got mixed in, then hands over a receipt. It is one command doing what you would otherwise do by hand: clear the desk, lock the drawer, and stick a note on the monitor for tomorrow.

Commands start with an underscore to separate them from ordinary conversation. That rule exists because I once lived through the system springing into action on the phrase "organize this."

## 4. The line between automatic and manual

Everything safe is automatic. Saving, organizing, index refresh, and sync all run without asking. An assistant who asks permission for everything is not an assistant.

Conversely, decisions that change meaning always come back to a human. I nailed the list down. Moving private material into a public area or another domain, overturning an established fact, choosing which of two conflicting sources is authoritative, creating a new area, deleting or making a large move, and changing the deepest official memory. And when it asks, it does not say "shall I proceed?" It brings the specific document, the specific content at issue, and the options.

Underneath all of that sits accident insurance. Automatic restore points before changes, deletion routed through a 30-day trash, rollback when something goes wrong. If a password or account number ends up in the material, the save itself is refused. Being blocked is a stop, not a pass. Handing organizing to an AI does not mean trusting the AI. It means building a fence you can trust first and delegating only inside it.

Where you draw that line is, honestly, the whole of operating this system. Make it ask about everything and you have an approval machine, not an assistant. Delegate everything and one day your knowledge has changed without you knowing. I moved this line several times over two months. The current answer is the list above. Safe is automatic, meaningful is manual.

## 5. I took nineteen of them apart

Building alone makes you anxious that you are reinventing the wheel. So I did a full survey of what people building similar things had done. It came to nineteen products.

The reading method was fixed. Three questions per product. What is this built to be good at? Is there anything to learn? Where will we deliberately go the other way?

### The one I dissected deepest

The one I spent longest on was an open-source project called **agentmemory**. It has close to 20,000 stars and the feature list is dazzling. It runs keyword, vector, and graph search together and merges the results. It imitates the human forgetting curve to gradually cool down old memories. It integrates with more than thirty AI tools.

Honestly, at first I thought there was no comparison. So I dug into the internals, and what I found there settled the direction of this project. It is introduced as needing no external database, but in practice it is tightly bound to its own engine's state store. Which means: no engine, no memory.

That was the moment I understood what I had. **My knowledge is just Markdown files. No database, no resident program. Copy the folder and walk out, and that is everything.**

That is not to say I dismissed it. I took eight things from it directly. Ship install and diagnostic commands. Cap the volume of reference material pushed into the AI, because otherwise cost and speed collapse. Label every document with confidence, source, and supersedes relationships. Rework word splitting for Korean search. Things of that kind.

Conversely I wrote down six things as explicitly not copied. A program running resident in the background, an interface with fifty tools, automatic deletion of old memories, and citing their performance numbers as if they were mine. I thought that last one mattered most. Borrowing someone else's benchmark does not make it your performance.

### What I learned from the rest

| Product | What I took | What I left |
|---|---|---|
| Basic Memory | Sharing local Markdown across multiple AIs. I grant they are strong on this axis too | Putting restore behind a paid cloud |
| Mem0 | Vocabulary for layering memory (session memory, settled knowledge, official state, operational lessons) | Automatically applying what it learned |
| Letta (MemGPT) | The tiered split between working memory, long-term memory, and archived evidence | A resident agent architecture |
| Zep | A knowledge graph with a time dimension. The idea of handling when something was true | Adopting a graph database |
| Cursor Memories | The warning not to store every conversation as memory | Automatic saving |
| NotebookLM | The experience of answering with citations | Keeping the knowledge inside their workspace |
| SwarmVault | The approval queue and the viewer UX | Forcing developer commands on the user |
| RAGFlow | Deep parsing of document structure | Running full analysis on every save |

Building that table made my position clear. A single line I wrote while reviewing a product called Khoj turned out to be the conclusion.

**"Theirs is a product for talking to your notes. This is a product for keeping a body of knowledge current."**

### And the big-company default features

The scariest competitor is not open source. It is the built-in memory features from the large AI companies. I compared five of them across ten criteria. There is something to concede honestly.

**Their advantages, no setup, free, on by default, are genuinely large.** If the use case is remembering a light preference like "I use pnpm," you should use that. There is no reason to build a system like this.

The one row where Neurain clearly loses in my own comparison table was also obvious: setup burden. It is the heaviest of the five. That sentence is one I wrote into the table myself, and I still think it is true.

## 6. So why does it need to exist?

The differentiators that survive narrow to five.

**One, it is model independent.** This is the biggest. The same command runs on Claude and on Codex, and the output is generated in one place so even the result screen matches. I ran an experiment giving the same evidence bundle to three models from different companies and having each answer, and it passed. Whatever sits in front, the brain behind it is one.

**Two, the knowledge is in my files.** No database, no resident program, no transmission to a server. There is nothing to negotiate when leaving a service. Copy the folder and you are done.

**Three, visible documents rather than hidden memory.** Big-company memory does not let you open it up and see what it kept and why. Here everything is a file, so you can open, edit, and delete it. What is authoritative and what is cache is also written down.

**Four, there is a record.** What changed and when accumulates in an append-only log and in commit history. Among the five products I compared, this was the only one with an audit trail.

**Five, it re-finds what it saved and proves it.** The closing command actually searches for the documents saved today and reports anything it cannot find. It exists to prevent the failure where the system says it saved something and then cannot retrieve it. None of the compared products had this either.

Big-company memory sells **convenience**. This system buys **ownership and portability**. They are different goods, and the second one becomes necessary once the accumulated context gets large.

## 7. How is this different from the usual second brain?

Since [Karpathy's note](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) there have been plenty of second-brain build logs. Most stop at a folder structure with prompts layered on top. Structure without operation.

| | Folder + prompt style | Neurain |
|---|---|---|
| Storing knowledge | Yes | Yes |
| Telling current from outdated | None | Judged by date and status |
| Protecting private material | None | Blocked at the area boundary |
| Search quality | Checked by feel | Measured with a scorecard (self-measured) |
| Model swapping | Usually possible | A premise of the design |

A folder takes a day. What took two months is the four rows below the first. Without them, stale information gradually buries current information, private material leaks, search becomes untrustworthy, and eventually you stop using the system. That is the standard path by which a second brain gets abandoned within a month.

## 8. Google confirmed the answer

In July 2026, while I was mid-build, Google announced something called the Open Knowledge Format (OKF), a proposed standard for storing knowledge in an AI-legible way. I still remember opening the announcement. Markdown with labels layered on, index and log files alongside. It even cited Karpathy. It was the same direction as the structure I had been running for two months.

There is a particular anxiety that comes with building alone: nobody can tell you whether the approach is right. Being a non-developer made it worse, because I had no colleague to ask what the industry standard was or how other people do it. A single standards document from a large company took most of that anxiety away.

I immediately handed the OKF spec to Claude and Codex and had them compare it against my system. The verdict: my document label scheme is a superset of OKF's required fields, so it already complies without changes, and the content structure is if anything more granular on my side.

I did not win everything, so here is what I learned and lost. The Google standard deliberately leaves file naming conventions unspecified, and that gap is one my own rules fill. On the other hand, their skill at writing up and distributing a spec is not comparable to mine. I took the lessons and applied them: an exporter to the standard format, a label mapping table, that sort of thing. Someday I might export the entire brain into the standard format. As a bonus I picked up a free line for the business card: compatible with Google's standard.

## 9. If you want to build one

There is no need to start big. The minimum version is three steps.

1. Make one folder, and inside it create an inbox (raw), knowledge (wiki), and deliverables (output).
2. Write one rules document. Two lines is enough to start: raw is never edited, wiki is organized by the AI.
3. Starting today, put what you hear and see into the inbox and have the AI organize it.

One caution. Do not try to build tools first. Live for a month on nothing but folders and the rules document, and when a specific friction repeats, automate that one point. My five commands came out exactly that way. Start the structure simple and grow it when needed. Habit does the rest.
