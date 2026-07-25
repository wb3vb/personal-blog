---
title: '[AI Dev Log] #2. I Put a Brain, Not Code, Into a Coding Tool'
category: ai
tags:
  - ai
  - second brain
published: true
date: 2026-06-19 22:10:00
series: 'AI Dev Log'
seriesOrder: 2
description: 'Karpathy''s LLM Wiki note flips the roles: the wiki is maintained by an AI, not by people. A coding tool that works inside a folder you point it at turned out to be the right vessel. What I changed rather than copied is what became Neurain.'
---

The "strange sentence" from the last post belonged to Andrej Karpathy.

That name carries a particular weight in AI. He led Tesla's self-driving AI, he was a founding member of OpenAI, and he is now widely regarded as the best teacher of AI on YouTube. He is not someone who follows the buzzwords. He is closer to the person whose offhand remark becomes the industry's buzzword a few months later.

And a note that person left about personal knowledge management happened to land on me at exactly the right moment.

## TL;DR

> *1) Karpathy's LLM Wiki note: let the wiki be maintained by an LLM, not by people.\
> 2) The vessel is Obsidian, the material is Markdown. A readable document for humans, the most legible data format for an LLM.\
> 3) Chat apps cannot do this. You need a tool that owns your files, which means a coding tool.\
> 4) I did not copy the original design. What I changed to fit my life is what became the system.*

## 1. The strange note

[The note](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) is not a paper or a product launch. It reads more like someone sketching an idea. But the substance was unusual. Three lines cover it.

| Principle | Meaning |
|---|---|
| raw is immutable | What you collect stays untouched and is preserved as evidence |
| the wiki is maintained by an LLM | The organized knowledge documents are written and revised by AI, not people |
| the schema rules | One rules document governs the whole structure |

I stopped at the second line. The wiki is maintained by an AI?

Think of Wikipedia and the strangeness becomes visible. Wikipedia stays alive because a large number of human editors write and revise its articles. Karpathy's note hands that editor's chair entirely to the AI. I only throw material in, and the editor-in-chief who keeps the documents current is the AI. The human just checks whether the editor did the job properly.

Until then my assumption ran the other way. I organize the knowledge, and the AI is the search assistant that finds it well. This note inverts the roles. Humans collect. AI organizes.

I turned it over in my head for days. Plugging the betrayals from post #1 into it one by one, everything lined up. The problem had always been organizing. Saving is easy. As long as the labor of keeping what you saved current and shaping it into something usable falls on a person, knowledge management will stall at some point. I abandoned dozens of half-built Notion pages. I tore up and rebuilt my folder structure more than once. It was not a diligence problem, it was a structural one. A structure where the organizing labor sits with a human ends the moment that human gets tired. Karpathy's note was saying to hand that labor over wholesale.

It also connected exactly to the hypothesis at the end of post #1. If the bottleneck is structure rather than model intelligence, then what I need is a knowledge structure the AI maintains itself. The direction was set. What remained was where to build it, and out of what.

## 2. The vessel is Obsidian, the material is Markdown

To skip to the answer: the material was Markdown. Files that end in `.md`, plain text with a minimal set of symbols laid on top. It looks like this.

```
# One hash for a heading
**Two asterisks for emphasis**
| Tables are | drawn with pipes |
```

That is the whole thing. There is no complex formatting payload like a Word document, and it opens fine in a plain text editor. The post you are reading now was written in Markdown.

Markdown matters because of its duality. **For a human it is a readable document, and for an LLM it is the most legible data there is.** LLMs were trained on the text of the internet, so they handle Markdown like a native language. Unlike a proprietary app format or a database, you can hand it to any AI and it reads it without conversion. And once things are stacked up in Markdown, what comes next is wide open. It becomes an article, a report, a slide deck, a website. Text is the raw material of every deliverable.

For the vessel I chose Obsidian, an app that opens a folder full of Markdown files and links the documents to each other. I still remember the first impression. Not some dazzling feature set. I opened it and it was just my folder. That is what I liked.

In post #1 I said I looked at document apps like Notion and gave up. Obsidian has one decisive difference. **It does not own the files.** My writing in Notion lives on Notion's servers in Notion's format. My writing in Obsidian is a `.md` file in my own folder, and Obsidian is only a window onto it. Delete the app and the files remain. It matches the first condition from post #1 exactly: memory I own.

A confession here. I am a compulsive organizer by nature. After a meeting I have to turn what I heard into a table before I can relax. When I invest I leave the reasoning behind the call in a document. I line everything up as a list. What is labor to most people is entertainment to me, and I think that is the real reason this project survived past the two-month mark without burning me out. If anything matters more than the technology when you build a system, it is whether the system fits your temperament. For someone who finds organizing painful, this approach may not fit at all, and the adjustment there is to hand more of it to the AI.

## 3. I turned off Obsidian's graph view

Everyone who starts using Obsidian tries the graph view. Documents appear as dots connected by lines, like a constellation. At first it looks like the very symbol of a second brain, because it shows you with your own eyes that your knowledge is connected.

After two months I counted, and I had opened the graph view a handful of times. It is pretty, and there was nothing I could do with it. A graph tells you "connections exist." It does not tell you what to do next. Past 4,000 documents the screen is just a ball of lint.

So I rethought visualization, and landed here.

**A screen that is good for a human and a structure that is good for an AI are different things. Forcing them into one breaks both.**

So I made two maps.

| | The map humans read | The map the AI reads |
|---|---|---|
| What | Guide documents per folder, area summaries, one operational dashboard | Labels at the head of each document, rules files placed in each room, the search index |
| When | When I need to find where I put something | When the AI decides which document to open first |
| Form | Sentences and links to read | Fields a machine parses |

A single Markdown file does both at once. The body is for the human, and the few lines of label at the top of the file (which area it belongs to, when it was last updated, whether it is safe to publish) are for the AI. I almost never look at the labels. The AI looks at them first. Two readers live in one file.

On top of that sits the operational dashboard, a one-page HTML view of the vault's state. It shows how many documents there are, what came in recently, and what organizing is overdue. It answers the "what should I do right now" question that the graph view never could. I traded a pretty constellation for an instrument panel.

I found out later that practitioners overseas working in a similar way had flatly concluded that the Obsidian graph view is unnecessary. We each got to the same place, and for the same reason. What matters in knowledge management is not a picture of connections. It is the order in which you make decisions.

## 4. Why a chat app cannot do this

At first I tried to solve it inside the ChatGPT or Claude app. It does not work, and the reason is simple. **A chat app cannot own my files.**

You can attach a file to a conversation, but the AI cannot open your folder, read it, edit it, and create new files in it. For an AI to maintain a wiki, it needs hands. You have to give the editor-in-chief the keys to the newsroom, and the AI inside a chat app can only be met in the visiting room.

There was a tool with those hands: the developer coding tools, Claude Code and Codex.

Their intended use goes like this. A developer points the tool at a project folder, and the AI reads the code in it, edits it, creates new files, and helps build the software. Every change is recorded as a unit called a commit, leaving a history of what changed, when, and why.

Which is where the shift happened. What if I put my knowledge in that folder instead of code?

Mapping it out one by one, every item lined up.

| Coding tool capability | Translated to knowledge management |
|---|---|
| Reads and edits files inside a folder | The AI maintains the wiki |
| Reads and obeys a rules file first | Karpathy's "the schema rules" |
| Every change recorded as a commit | Change history for knowledge, revert at any time |
| Sweeps and edits many files at once | New information reflected across documents simultaneously |

Every capability the coding tools had matched, item for item, a capability knowledge management needs. Where developers commit code, I would commit meeting notes and decisions and thinking.

The seed planted in post #1 germinated here. I had marveled at OpenClaw reading and writing my local files, and the coding tools had that same ability in a far more refined form. It was just that nobody was using it for knowledge management.

It sounds tidy in a few paragraphs now, but at the time there was nobody to confirm the direction. It was not the sort of question you ask a developer friend either, because the pitch is that you want to use a coding tool for something other than coding. Confirmation could only come from experiments.

## 5. I did not copy the original design

A night in late May 2026. I found a write-up on running Claude Code through a folder structure and took eight screenshots back to back. Looking back, that night was the groundbreaking ceremony.

The next evening I wrote the first design document. In truth I had been running similar experiments in one work folder for months and had built up conviction, so the decision came fast.

Here is something important. I did not copy Karpathy's design as-is. His version pictures an individual researcher handling their own material. What I had to handle was a life where company strategy, family documents, and investment records all sit on one machine. So I changed four things.

| Item | Karpathy's original | What I changed |
|---|---|---|
| Layers | raw + wiki + schema | Added output (deliverables) and split rooms by area of life |
| Maintenance | The LLM manages the wiki | The LLM manages it, but asks a human before changes that alter meaning |
| Rules | One schema file governs | Shared rules + a guide in each room + five commands |
| Quality check | Not mentioned | Search quality measured against a scorecard, rolled back when it degrades |

Why I changed them is the rest of this series. Briefly: the original answers "where should knowledge live" and stops. The problems I hit were downstream of that. Who is allowed to change what and when, whether private material leaks, which side is authoritative when two facts conflict. Those are operational problems, not structural ones.

I also added a condition the original did not have, the goal defined in post #1. The AI in front has to be swappable for any model. So the rules documents are not written for one specific AI. They are written so that whichever AI walks in reads the same rules and works the same way.

The structure ended up as three layers.

![The three layers of Neurain](neurain-layers.svg)

The bottom two layers live in my folder. Only the top one gets replaced. That single diagram is the conclusion of two months of design.

The design document from that time contains this sentence.

**"The human keeps owning the files, and the AI reads that file structure, saves into it, organizes it, verifies it, and picks it up again."**

Reading it now, that one sentence is still the whole thing. What remained was making it actually run.

There was one problem. I cannot write a single line of code.
