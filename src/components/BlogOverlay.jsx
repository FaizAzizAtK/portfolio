import { useEffect } from 'react'
import './BlogOverlay.css'

const POSTS = {
  'agentic-shift': {
    title: "The Agentic Shift",
    date: "2025",
    readTime: "5 min read",
    body: [
      {
        type: 'lead',
        text: "The shift from co-pilot to autonomous agent is real. But the timeline in your head is probably wrong.",
      },
      {
        type: 'p',
        text: "Every week I'm in a client meeting where someone shows a demo of an AI agent doing something impressive: researching a market, drafting a proposal, executing a workflow end to end. The demo is real. The capability is real. Then the meeting ends and we go back to talking about proof of concepts.",
      },
      {
        type: 'p',
        text: "That's not cynicism. It's just where most enterprises are right now.",
      },
      {
        type: 'h2',
        text: "What's actually changing",
      },
      {
        type: 'p',
        text: "The co-pilot model was the first wave. AI augments a human doing the work: you ask, it responds, you decide. The human stays in the loop at every step. Agents are different. An agent doesn't just respond. It plans, executes, observes the result, and acts again. You give it a goal, not a question.",
      },
      {
        type: 'p',
        text: "The architecture that enables this (perceive, reason, act, observe, repeat) works. I've built systems that use this loop to automate knowledge work that would have taken hours of coordination: reading a document, extracting structured data, updating records, flagging anomalies, drafting a response. When it works, the time savings aren't marginal. They're an order of magnitude.",
      },
      {
        type: 'h2',
        text: "But most clients aren't there yet",
      },
      {
        type: 'p',
        text: "Here's what I see in the field: most enterprise AI projects are still in experimentation mode. There's a POC running in a sandbox somewhere. A small team is excited. The business is cautious.",
      },
      {
        type: 'p',
        text: "And the business is right to be cautious.",
      },
      {
        type: 'p',
        text: "Agents fail differently to traditional software. They don't throw exceptions. They don't return 404s. They confidently produce wrong answers, reasoning correctly through a task and still getting the conclusion wrong because of something subtle in how the problem was framed. The failures are quiet and hard to catch until something important goes wrong.",
      },
      {
        type: 'p',
        text: "The trust problem goes beyond hallucinations. When an agent makes a decision (routes a ticket, updates a record, sends a communication) and it's wrong, who's accountable? That question doesn't have a clean answer yet. Most enterprises I work with aren't avoiding agentic AI because they don't see the value. They're avoiding it because they can't explain the risk to their compliance team.",
      },
      {
        type: 'h2',
        text: "What earning trust actually looks like",
      },
      {
        type: 'p',
        text: "The agent deployments I've seen that are actually in production all share one thing: they're specific.",
      },
      {
        type: 'p',
        text: "Not 'an agent that handles customer queries.' An agent that handles one category of query, for one product, with a defined set of actions it can take and a human escalation path for everything else. Narrow scope. Observable behaviour. Gradual expansion.",
      },
      {
        type: 'p',
        text: "Trust isn't given to agents. It's accumulated through track record. The teams doing this well treat trust as an engineering problem. They measure it. Pass rates on eval sets. Accuracy on held-out cases. Escalation rates. They know what the agent handles reliably and where it needs help.",
      },
      {
        type: 'h2',
        text: "The question nobody answers in the demo",
      },
      {
        type: 'p',
        text: "The hardest thing to show in a demo isn't capability. It's failure mode. What happens when the agent is wrong? How does it fail? How do you know? What happens next?",
      },
      {
        type: 'p',
        text: "Until you can answer those questions for the specific workflow you're automating, you're not ready for production. That's not an indictment of agents, it's how you should approach any system that touches real decisions.",
      },
      {
        type: 'p',
        text: "The agentic shift is real. The architecture is right. But the path to that future goes through the unglamorous work of defining scope, building evals, and earning trust incrementally. It doesn't go through demos. That's slower than the hype suggests. It's also more durable.",
      },
    ],
  },

  'hrag': {
    title: "Is RAG That Simple?",
    date: "Mar 2026",
    readTime: "5 min read",
    body: [
      {
        type: 'lead',
        text: "Most teams implement RAG in an afternoon. Embed your docs, store the vectors, retrieve the top-k at query time. Done. Except in production, it isn't.",
      },
      {
        type: 'p',
        text: "RAG — Retrieval-Augmented Generation — is one of the most practical patterns in production AI. Instead of relying purely on what an LLM was trained on, you give it access to your documents at query time. A question comes in, your system searches a knowledge base, pulls the relevant chunks, and passes them to the model alongside the question. The model answers from retrieved context, not memorised patterns.",
      },
      {
        type: 'p',
        text: "It works. It's useful. And for a lot of teams, the basic version gets them 80% of the way there.",
      },
      {
        type: 'p',
        text: "But that last 20% is where agents live. And flat RAG doesn't survive it.",
      },
      {
        type: 'h2',
        text: "Is RAG that simple?",
      },
      {
        type: 'p',
        text: "The standard approach treats your documents as a flat pool. Every chunk of text gets embedded as a vector and stored in a database. When a query comes in, the system searches the entire pool and returns the chunks semantically closest to the question.",
      },
      {
        type: 'p',
        text: "Simple, right? The problem is that 'semantically close' isn't the same as 'correct'.",
      },
      {
        type: 'p',
        text: "Flat RAG has no concept of document structure. It doesn't know your 40-page technical policy is split into sections, that section 3 covers security and section 7 covers pricing. It sees thousands of chunks of similar-sounding text and picks whichever ones score highest on a similarity metric.",
      },
      {
        type: 'p',
        text: "So when a query is specific but the document is dense, you get a predictable failure: the system retrieves chunks that are on-topic but wrong — from the right document but the wrong section, from an outdated version, or subtly contradicting what was actually asked. The model receives this confused context and either fabricates a confident answer or hedges uselessly. Both are bad in production.",
      },
      {
        type: 'h2',
        text: "What structure gives you",
      },
      {
        type: 'p',
        text: "Hierarchical RAG (HRAG) adds a layer of structure that flat RAG is missing. Instead of one flat index, it builds two: a high-level index of document summaries and sections, and lower-level indexes of the actual content within each section.",
      },
      {
        type: 'p',
        text: "The retrieval process mirrors how a person reads a long document. You don't scan every paragraph looking for the answer. You read the table of contents, find the relevant chapter, then read that chapter closely.",
      },
      {
        type: 'p',
        text: "In practice: a query hits the high-level index first. The system identifies which sections or documents are most relevant — not which chunks. Then it does a targeted search within those sections only. Instead of searching 10,000 chunks and grabbing 5 from across the entire corpus, you search 50 section summaries, pick the 2 most relevant, and retrieve the best 5 chunks from within those 2 sections.",
      },
      {
        type: 'p',
        text: "The context the model receives is focused, coherent, and correct. That's the difference.",
      },
      {
        type: 'h2',
        text: "Why agents can't afford the noise",
      },
      {
        type: 'p',
        text: "Co-pilots can tolerate retrieval noise. A human reading the output catches when something seems off and asks a follow-up. Agents can't do that.",
      },
      {
        type: 'p',
        text: "In an agentic workflow, the retrieved context feeds directly into a reasoning chain that produces a decision: which record to update, which action to take, which message to send. If the retrieval step returns irrelevant or contradictory content, the agent reasons confidently from bad premises. The failure is silent, downstream, and often hard to trace back to the retrieval step.",
      },
      {
        type: 'p',
        text: "The teams building agents that hold up in production treat retrieval as a first-class engineering concern. Not a library call. Not a solved problem. A system with real failure modes that needs to be designed deliberately.",
      },
      {
        type: 'p',
        text: "So — is RAG that simple? For demos and prototypes, yes. For agents that have to be right, the architecture of how they retrieve matters as much as the model powering them. HRAG is what that looks like.",
      },
    ],
  },

  'prompting-interface': {
    title: "Context Is the New Code",
    date: "2025",
    readTime: "5 min read",
    body: [
      {
        type: 'lead',
        text: "Most teams have figured out prompting. The harder problem, the one that actually breaks production agents, is context.",
      },
      {
        type: 'p',
        text: "A year ago, every conversation was about prompts. How to write them, how to structure them, what format to request. That conversation has mostly resolved. There are patterns now: system prompt structure, few-shot examples, chain-of-thought formatting. If you've built more than two LLM applications, you probably have a rough mental model of what makes a prompt work.",
      },
      {
        type: 'p',
        text: "Context is different. Context is harder. And context is where agents actually fail.",
      },
      {
        type: 'h2',
        text: "What context engineering is",
      },
      {
        type: 'p',
        text: "When I say context, I mean everything in the model's context window at inference time. Not just the system prompt: the conversation history, retrieved documents, tool call results, memory summaries, intermediate reasoning. All of it.",
      },
      {
        type: 'p',
        text: "Context engineering is the discipline of managing what goes in there deliberately. What you include. What you cut. How you order it. How you compress older context so it doesn't crowd out what's relevant now. It sounds like an optimisation problem. It's more like an editorial problem. You're deciding what the model gets to know before it has to act.",
      },
      {
        type: 'h2',
        text: "Context rot",
      },
      {
        type: 'p',
        text: "Here's something that doesn't get talked about enough: agents get worse over time.",
      },
      {
        type: 'p',
        text: "Not because the model changes. Because the context accumulates. A long-running agent starts clean: clear instructions, relevant context, good signal. But as it executes, the window fills up. Tool call results from earlier steps pile in. Intermediate reasoning from past actions takes up space. Old context that was relevant three steps ago is still there, slightly contradicting the new context that arrived after it.",
      },
      {
        type: 'p',
        text: "The model doesn't throw an error. It doesn't tell you the context is confusing. It just starts making slightly worse decisions, conflating things it shouldn't, missing details it would have caught at the start of the run.",
      },
      {
        type: 'p',
        text: "I've seen this on live agent deployments: a workflow that performed well in testing starts degrading in production after longer runs. The prompt didn't change. The tools didn't change. The context got messy. That's context rot, silent, gradual, and where a lot of production agent failures actually originate.",
      },
      {
        type: 'h2',
        text: "What to do about it",
      },
      {
        type: 'p',
        text: "Treat context as a first-class engineering concern. In practice, that means four things.",
      },
      {
        type: 'p',
        text: "Retrieval precision matters more than people think. Dumping everything remotely relevant into the context is the RAG equivalent of a prompt that says 'do everything.' The model attends better when retrieved content is specific to the current step. Chunk well. Retrieve precisely.",
      },
      {
        type: 'p',
        text: "Memory design is not optional for long-running agents. If an agent runs for more than a handful of steps, you need an architecture that summarises and compresses earlier context, not just appends to it. What does the agent actually need to remember? What can be discarded?",
      },
      {
        type: 'p',
        text: "Tool call hygiene is underrated. Every tool result that comes back into the context takes up space and can introduce noise. Structure the results. Strip what isn't needed. Be deliberate about what gets returned.",
      },
      {
        type: 'p',
        text: "Context ordering affects reasoning. In long contexts, models attend differently to information at the start versus the middle versus the end. This isn't a bug to work around. It's a property to design for. Put important instructions near the start and end. Noisy content in the middle.",
      },
      {
        type: 'h2',
        text: "The reframe",
      },
      {
        type: 'p',
        text: "Prompting is about writing a good question. Context engineering is about making sure the model has the right information to answer it.",
      },
      {
        type: 'p',
        text: "That distinction matters. You can have a well-crafted prompt and still get poor outputs if the context is cluttered, stale, or badly ordered. Most of the agent failures I've diagnosed in production weren't prompt problems. They were context problems.",
      },
      {
        type: 'p',
        text: "The teams doing this well treat context as a resource to be managed: budgeted, curated, and maintained. Not a buffer that fills up until something breaks.",
      },
    ],
  },
}

export default function BlogOverlay({ blogId, onClose }) {
  const post = POSTS[blogId]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!post) return null

  return (
    <div className="blog-overlay" role="dialog" aria-modal="true" aria-label={post.title}>
      <div className="blog-overlay__bar">
        <span className="blog-overlay__back" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </span>
        <span className="blog-overlay__meta">{post.date} · {post.readTime}</span>
        <button className="blog-overlay__close" onClick={onClose} aria-label="Close article">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="blog-overlay__scroll">
        <article className="blog-overlay__article">
          <header className="blog-overlay__header">
            <span className="blog-overlay__cat">Essay</span>
            <h1 className="blog-overlay__title">{post.title}</h1>
          </header>

          <div className="blog-overlay__body">
            {post.body.map((block, i) => {
              if (block.type === 'lead') return <p key={i} className="blog-overlay__lead">{block.text}</p>
              if (block.type === 'h2')   return <h2 key={i} className="blog-overlay__h2">{block.text}</h2>
              if (block.type === 'p')    return <p key={i} className="blog-overlay__p">{block.text}</p>
              return null
            })}
          </div>
        </article>
      </div>
    </div>
  )
}
