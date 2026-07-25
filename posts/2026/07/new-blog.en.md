---
title: 'I Stopped Before Renewing Ghost: How This Blog Got Built'
category: ai
tags:
  - ai
  - thoughts
published: true
date: 2026-07-25 23:50:00
description: 'Standing on the renewal screen, it occurred to me that I could just build the thing myself. I cannot write code, but I can make judgments, so I split those two apart and cleared three problems on the way to a blog that finally fits.'
---

I had the Ghost annual renewal screen open. The amount, the next billing date, the button underneath. The screen you see once a year. My cursor was on the button and my hand stopped just before pressing it.

It was not about the money. What came back on that screen was everything I had started to do on this blog and quietly dropped. The flowchart I wanted and could not insert, so I made it as an image and uploaded that instead. Once it is an image, fixing one box means redrawing the whole thing, and after going through that twice I stopped using diagrams at all. The series I wanted to group, so I typed numbers into the titles by hand. The Korean and English versions I wanted side by side, until I learned it would take two separate blogs and gave up.

Then a thought landed. Could I not just build this myself?

## TL;DR

> *1) Trying to renew, I saw that everything I had given up on came down to somebody else's rules.\
> 2) I cannot write code but I can make judgments, so I split those apart and kept only the judgment.\
> 3) Taking the writing out whole, pinning my own taste to numbers, security that was now mine. Three problems.\
> 4) This blog is the result.*

## 1. What stopped me was not the price

To be fair, Ghost is a very good blogging platform.

Open the editor and the toolbar disappears, leaving a white page and a cursor. Press publish and you are done, so the word deployment never entered my head, and I never once worried about a server dying or a certificate expiring. For someone whose job is writing, that is worth more than it sounds, and I still recommend it first to anyone starting a blog.

The problem was not the tool. It was what the tool was doing to me.

I am writing and I want to add a flowchart. My hand leaves the text, opens a new tab, and types the platform name and "diagram" into the search box. A few results in, it usually ends with something about editing theme files, so I close the tab, go back to the text, and paper over the gap with a sentence. Do that a few times and the wish to add a diagram stops arriving at all.

It is not that the concessions pile up. It is that the wanting shrinks, which is why I never quite noticed.

I checked the price. The cheapest Ghost(Pro) plan is 18 dollars a month billed yearly. ([source](https://ghost.org/pricing/)) That is 216 dollars a year. Not a large sum, and what stopped me at that screen was not the number but what exactly I was buying with it. Convenience, yes. Except the convenience came with a condition attached, which was that I do not get to set the rules.

I also weighed moving to one of the Korean platforms that day, and the thinking ended quickly. All of them are convenient and all of them are somebody else's house. The only difference is which parts I decide and which parts they decide.

| | Domain | Design | New features | Ads | Form of the writing |
|---|---|---|---|---|---|
| Naver Blog | Platform's | Fixed skins | No | Platform decides | Only inside the platform |
| Tistory | Mine | Partial editing | Limited | Platform decides | Exportable |
| Ghost | Mine | Within the theme | Within the theme | None | Exportable |
| Building it myself | Mine | All of it | No limit | I decide | Files from the start |

## 2. I split what I cannot do from what I can

Having decided to build it, the first thing I did was not learn to code. It was work out whether I could do this at all.

I cannot write code. I cannot read it either, so for "I built it myself" to mean anything, I had to settle which part of the building I could actually own. I drew a line down the middle of the screen and wrote what I cannot do on the left, what I can do on the right.

| What I cannot do | What I can do |
|---|---|
| Write code | Decide what to build |
| Judge whether code is correct | Judge whether the result is what I wanted |
| Know why something fails | Notice that something failed |

Written out, the left column was all about code and the right column was all about judgment. Which narrows the question to one thing. Is the right column enough to build a blog?

So I turned on Claude Code and ran it for a while. I say what I want in Korean, Claude turns it into code, and I open the result and say yes or no. Beyond typing my requirements into a terminal, I did nothing.

One scene, to make it concrete. I type into the terminal that the tag list page looks flat. A changed screen comes back a moment later. I refresh the browser, pick a tag and click it, then report how many seconds it took to find what I was after. I never learn what code that page is made of or how it was changed, and it turned out that none of that was in the way. **I may not be able to judge whether the code is right, but nobody is better placed than me to judge whether the result is what I wanted.**

Confirming that this division of labor holds was, in effect, the whole job. The rest was clearing problems one at a time, and there were three of them.

## 3. First problem: can I take everything with me?

The first thing to check was not design or features. It was the exit. If the writing breaks during the move there is no way back. This is not the kind of work you can simply redo after a failure. Get it wrong once and the original goes with it.

What had to come out was not just 22 posts. There were 74 images tucked through the text, 4 attachments, and the old URLs already out in the world. The first two are files and moving files is nothing. The last one was the hard part. A link somebody dropped in a group chat, an address sitting in search results, a URL quoted in someone else's post. I cannot recall any of those. What shows up for the person who clicks is not my writing but a 404 page, and at that point the post has effectively left the world.

So I set one condition before starting. **If a single old URL breaks, the move counts as a failure.**

That condition changed the order of the work. I pulled every old URL into a list first and set up 40 rules pointing them at their new addresses. Then I moved the writing, and once it was moved I had Claude check every image and attachment the text calls for, one by one, against what had actually arrived.

I briefly considered doing that comparison by eye and dropped it after doing the arithmetic. Opening twenty-two posts one at a time to confirm seventy-four images are all in place means scrolling several hundred screens, and the odds of missing the one that failed to load are close to certain. Checks you cannot afford to miss belong to a machine, not a person.

There was one more thing I did while moving. English versions of all 22 posts, which is the exact request I had abandoned on Ghost after learning it would take two separate blogs. Here it came down to a single rule about putting the language in the filename. Today there are 30 Korean posts with 30 English versions paired to them.

## 4. Second problem: I did not know my own taste

The real problem showed up after the move was done. I could now change anything, and I had no idea what I wanted to change it to.

There was a stretch where I sat looking at a cursor blinking on a settings screen. It was asking me to set the body text size, and I had no basis for saying whether the current value was right. The hand that stopped at the renewal screen had stopped again.

On a platform I never needed to know this. You pick from what is offered, so taste only exists inside the available options. Once the constraints were gone, it became clear that I had nothing to answer "do I like this" with.

Line height was the clearest case. The starting value looked cramped, so I widened it, and then the paragraphs looked scattered. I tightened it the other way and it went past cramped into lines pressing against each other and reading as one block. I could clearly spend all day on this without arriving anywhere, so I changed approach.

I pushed the value all the way out on one side and all the way in on the other, then actually read a long post I had written before, start to finish, at each setting. On the tight side, my eyes kept rereading the line they had just finished as they dropped to the next one. On the loose side, paragraphs stopped holding together and the sentences floated separately. Somewhere between them was a band where my eyes did not lose the line and the paragraph still read as one, and I took the value from there.

Judged by the result I ended up near where I started, so it looks like nothing happened. Except now I can say why that value is that value, and that is the difference.

Working through the rest the same way, I found out that Korean and English need entirely different conditions to read well. Korean wants tighter letter spacing and slightly heavier weight to look solid, and the same settings applied to English push the letters together until it reads as cramped. So I split the values by the language of the page. On a platform this was not a request you could even raise.

If letter spacing and line height needed that much, design goes without saying. Color, spacing, type size, the arrangement of the page. Everything visible is now a value I set.

## 5. Third problem: once it was mine, it was my responsibility

One thing was still waiting right before I shipped it. I had never checked whether this house was safe.

It is a worry I never had once on Ghost. They handled it, or more precisely, that was part of what the fee covered.

Not an external certification. I ran the audit myself. There were 73 findings, none of the kind where the whole site gets taken over, and one of them was actually leaking data.

I asked Claude to check whether there were holes anyone could get through by design, and it handed back a strange looking URL to paste into the address bar. A post URL with two dots and some unfamiliar characters in the middle. I pasted it, pressed enter, and what appeared in the browser was not a post but a document of mine. Notes on how the site is put together, something I had no intention of showing anyone, laid out on screen from beginning to end. No login required. Anyone who knew the address could read it.

What matters here is not the hole but how it surfaced. I cannot read the code and I have no way to verify the answers that come back. What I do have is **a sense of what to ask.** Ask "is this safe" and you will be told it is safe, and that is where it ends. Ask "what happens if I put a strange value into this URL" and you get an answer you can confirm with your own eyes.

Working with AI turned out to be less about knowing code and more about designing questions. Turning a vague want into something checkable, narrowing again based on what comes back, deciding how far to trust an answer and where to start doubting it. Not far off from what working with people asks for.

Once that one was closed I went looking for the same species. Where it stands now:

| Problem | What was done |
|---|---|
| Files outside the posts folder readable | Blocked in two layers, reconfirmed with real requests |
| Unpublished drafts opening by URL | Now closed even to a directly typed address |
| Security settings scattered | Consolidated so they can be verified locally |
| Executable code slipping into a post | Checked automatically before deploy, build halts |

**This kind of work was always in the platform fee.** Leave the platform and the line item disappears from the invoice and reappears on my to-do list. I made that trade knowingly, and so far I do not regret it.

## 6. Here is the shape of it

Having cleared three problems in order, this is what was left.

![From stopping at the renewal screen to where things stand now](new-blog-flow-en.svg)

That flowchart above is the thing I used to make as an image and upload because I could not insert it. Now it just goes into the text, and if I want to fix one box I fix that box.

The writing lives as files, grouped by tag and searchable. Series connect. Share a link and the card I designed is what comes up. At night it reads on a dark screen, and Korean and English swap in the same place with a toggle.

Set that list next to any other platform and most of it exists there too, which means what actually changed is not on the list.

Say the line height in this post bothers me. Before, I would open a new tab, search, look for the setting in the theme, and give up if it was not there. Now I open a file, change one number, and save.

I have no plans to go back to Ghost. Wear off-the-rack for long enough and then put on something cut to your measurements, and you find out where the shoulders were loose and where the sleeves ran short. Once you know, you do not go back.

## 7. The screen that would not exist if I had pressed renew

If I had pressed that button, I would still be on the same blog today. Nothing would feel particularly wrong, and I would still not know what was impossible. The things I assumed could not be done would have stayed undone, not because they cannot be done but because I had never once checked.

I still cannot write a line of code. That has not changed. What changed is that the fact is no longer a conclusion. Once I was in it, writing code was the only thing I could not do, and everything else was judgment. Judgment is what I have been doing at work every day.

This blog is where I write about crypto, real estate, investing, AI, and whatever I have run into along the way. I have spent years arguing that you should not accept conclusions handed to you and should measure things for yourself, while the writing itself sat somewhere I could decide nothing about. **The writing and the place it sits finally say the same thing.**

I have been quiet for a while. From here I want to put down, one at a time, how far I have managed to push the edge of what I can do with AI.

In the end you only find out by trying.

> NOTHING\
> HAPPENS\
> UNLESS I ACT.
