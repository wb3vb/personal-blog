---
title: '[Neurain Dev Log] #1. My AI Assistant Loses Its Memory Every Morning'
category: ai
tags:
  - ai
  - second brain
published: true
date: 2026-06-15 09:40:00
series: 'Neurain Dev Log'
seriesOrder: 1
description: 'Running an AI as a Telegram assistant widened what I could hand off, but conversations were forgotten, sessions never talked to each other, and switching models reset everything. The bottleneck was not model intelligence. It was the absence of a structure that holds context.'
---

There was a stretch where my day started with a single Telegram message.

I would drop an instruction into a chat room, the work would run on my own computer, and the result would come back as a reply. On the other side of that chat was not a person but an open-source AI agent called OpenClaw.

**The feeling of having an assistant. That was where it started.**

This series is a record of a non-developer who cannot write a line of code building a second brain with AI. There is now a brain on my machine holding roughly 4,700 documents, and the AI in front of it has become a part I swap out whenever I want. Today I start from the beginning of how I got here.

## TL;DR

> *1) The moment you pull AI out of the chat window and run it like an assistant, the range of what you hand off changes.\
> 2) Live with it long enough and the assistant betrays you three ways. It forgets, it fragments, and it resets when you switch models.\
> 3) The problem was never the model's intelligence. It was the absence of a structure that holds context.\
> 4) So I decided: put all my knowledge in one folder, and plug whatever AI I want into that folder.*

## 1. The day I first opened the black window

OpenClaw is an AI agent released as open source. Two things make it different. It runs on my own computer rather than as a cloud service, and it can be wired into a messenger like Telegram.

The install alone was unfamiliar territory. It is not something you download from an app store. You open Terminal, the black window that ships with every Mac, and paste in commands. For a non-developer that black window is a psychological wall. It feels like one wrong keystroke will break the machine. In the end I copied the instructions exactly as written, unreadable text scrolled past, and the bot came alive.

**Looking back, that day was the real turning point.** Until then AI was a website to me. After that day, AI was a program running on my computer. Two months later I was able to open a developer tool called Claude Code without flinching, and the only reason is that I had already beaten the black window once.

The relationship also flipped. Before, AI was something you went into. Open a browser, visit a site, ask, get an answer, close the tab. That was the whole loop. But the moment it hangs off a messenger, you can send an instruction from your phone while you are out and the computer at home gets to work. Search the web and write it up. Summarize a long document. Sort the files I dropped in by type. Work I assigned in transit was finished by the time I walked through the door.

I was no longer going to the AI. The AI lived inside my day.

**I went from someone watching AI to someone running it.**

That is when it got fun. It started with errands like search and summarization, but the list of things it could actually do kept growing. Research, first drafts, thinking out loud, repetitive work. Before long a large part of my day was spent working alongside AI, and the way I worked was quietly reorganizing itself around it. Have the AI assemble background before a meeting, summarize the recording after, then draft the report from that summary. AI use spread from inside a chat window into the whole of my working life.

A seed got planted here too, though I did not recognize it as a seed at the time.

OpenClaw runs locally. It reads and writes files on my computer directly.

That fact changes everything later.

## 2. Three betrayals you only see by living with it

The satisfaction of having an assistant lasted a long while, but the longer we lived together the more odd things surfaced. This was not an OpenClaw problem. ChatGPT, Claude, whichever LLM I used, the same pattern repeated. The more hours I put in and the heavier the work I handed over, the more it hurt.

### Betrayal 1: long conversations forget the beginning first

An AI model has a hard limit on how much it can hold at once. It is called the context window, but think of it as the size of a desk. As the conversation grows the desk fills up, and to put a new document down it has to push an old one onto the floor.

Today's tools are smarter about it. Instead of shoving the old pages off entirely, they fold the early part into a summary. The problem is that whatever the summary drops evaporates with it. In practice it goes like this. You spend several days on a strategy, stacking up premises, checking exceptions, settling on a direction. Then at some point answers start coming back that contradict a premise. Chase down why, and the premise is simply gone, lost somewhere in the summarizing.

What makes it worse is how quietly it happens. If the AI said "I have lost that part," I would just tell it again. Instead it answers confidently while missing the piece. After enough rounds of catching a contradiction long after the fact, you end up re-verifying every important conclusion. The harder you worked on a thread, the more it costs when it disappears.

The deeper the conversation, the shallower the assistant.

### Betrayal 2: sessions are strangers to each other

Anyone who has lived this will recognize it immediately.

At some point my laptop and phone were full of open AI windows. A ChatGPT window, a Claude window, the session where I sorted out work, the session where I drafted household documents, the session where I turned over investment ideas. None of them knew the others existed. Everything I organized until late last night in session A meant nothing to session B today.

I also poked at developer tools like Claude Code and Codex, but the situation was the same. Those tools work by pointing at a folder and operating inside it, which means the session opened in my work folder and the session opened in my family documents folder are strangers too. Memory splits by folder, by session, by tool. My knowledge is one thing. The AI's memory of it was in dozens of pieces.

The thing stitching the pieces back together was me. The first message of every new session kept getting longer. Project background, past decisions, things to watch out for. Whenever a sentence felt familiar it was because I had pasted it into a different window last week. Eventually I kept these briefings in a notes file and copied them in every time I opened a window. I was hand-writing a handover document for my assistant, over and over. Do that for a few months and it starts to feel absurd. Am I running an assistant or training one?

### Betrayal 3: switching models resets everything

The last one was the biggest.

The AI field turns over every few weeks. One side ships a new model this month, the other answers next month, and the top spot changes hands constantly. Watching a launch video and weighing whether to switch became a recurring event, and what held me back every time was not performance. It was the memory I would have to leave behind.

Upgrading inside the same company was fine. Moving from Claude Opus to the better Fable when it arrived cost me nothing. Same program, same memory.

The real problem is when the model next door gets dramatically better. On performance alone, switching is correct. But the moment you switch, everything you have built stays inside the old program. The new model is brilliant and knows nothing about me, and I have to teach it from scratch.

It is moving house with nothing but the clothes on your back.

The memory features bolted onto each service were not the answer either. You cannot look inside to see what it kept and what it dropped, and you cannot carry it to another service. You do not even know why it remembered a given thing. It is my memory, and it is not mine.

## 3. The things I said every day back then

Later, once I started building the system, I wrote these symptoms up as a problem-definition document. To keep from romanticizing the memory, here is the table straight out of that file, written in mid-May 2026.

| What I said every day | What the symptom actually was |
|---|---|
| "Do I have to explain this again?" | Work context vanishes when the session changes |
| "Isn't that the old version?" | Past state and present state get mixed together |
| "Is this answer current?" | The AI does not know which source is authoritative |
| "Just save it so I don't lose it" | Saving requires too much organizing up front |
| "Why does it remember this but not that?" | AI memory gives you no view of what it stored |
| "Where did the work from the other session go?" | Sessions and tools do not share state |

Six lines compress into one.

**The models kept getting smarter, and my context started from zero every time.**

## 4. Things I tried before building anything

Knowing the problem did not send me straight to building a system. First I went looking for something off the shelf.

| What I tried | Why it failed |
|---|---|
| Memory features in chat services | You cannot see what was stored, and it cannot leave that service |
| Organizing in a document app like Notion | Great for a human to read, but the AI has no idea which document to open first |
| Piling files into a folder | Things accumulate, and the AI cannot tell the current version from an old one |

I held onto Notion the longest. I built pages, designed databases, set up a tagging scheme. It looked impressive to a human. But to ask the AI anything I still had to find the page myself, copy it, and paste it in. I had built a beautifully organized cabinet, and the person opening the drawers was still me.

After all three, the common thread was obvious. Storage was never the issue. What was missing was everything after storage: the AI pulling things out on its own, judging what is current, and carrying it into the next session.

There was plenty of storage. There was no brain.

## 5. Redefining what I actually wanted

Having lived through all that, I admitted it. No amount of effort inside that approach was going to produce a second brain. As long as memory is scattered across services and sessions and models, it is not a brain. It is a pile of sticky notes.

So I wrote down what I wanted as a single sentence.

**Put all my knowledge in one folder. That folder is the brain. The AI in front of it is swappable.**

Unpacked, that is three conditions.

Second brain = 1) memory I own x 2) context that does not break x 3) intelligence I can swap

- 1\) Memory has to live in my files, not in a particular service. I have to be able to open it and see what is being remembered.
- 2\) Work, home, investing, whichever session I ask from, it has to look at the same brain.
- 3\) When Claude gets better I plug in Claude. When Codex gets better I plug in Codex. The brain stays put.

I wrote it as multiplication for a reason. If any one of the three is zero, the whole thing is zero. If the memory sits on someone else's server, the first term is zero and the rest does not matter because it is not my brain. If it breaks at every session boundary, the second is zero and nothing compounds. If it is bound to one model, the third is zero and the next generation takes it all. Most of the solutions on the market satisfied exactly one of the three.

And at this point I had a hypothesis.

**The bottleneck is not the model's intelligence. It is the absence of a structure to hold context and verify it.**

It turned out this was not just my problem. Around the same time, terms like context engineering and agent memory started appearing, and papers and products aimed at this one issue began pouring out. Everyone was arriving at the same realization at roughly the same moment: the next bottleneck after model intelligence is context management.

The models are already smart enough. I had simply been working with a genius who loses his memory every morning. What that calls for is not a smarter genius. It is a well-organized file to put in his hands.

I was stuck on how to build that file when I came across a short piece of writing.

It was a brief note from one of the most well-known AI researchers in Silicon Valley, and it contained a strange sentence: let the wiki be maintained by an LLM, not by people.
