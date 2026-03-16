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
        text: "Every week I'm in a client meeting where someone shows a demo of an AI agent doing something impressive — researching a market, drafting a proposal, executing a workflow end to end. The demo is real. The capability is real. Then the meeting ends and we go back to talking about proof of concepts.",
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
        text: "The co-pilot model was the first wave. AI augments a human doing the work — you ask, it responds, you decide. The human stays in the loop at every step. Agents are different. An agent doesn't just respond — it plans, executes, observes the result, and acts again. You give it a goal, not a question.",
      },
      {
        type: 'p',
        text: "The architecture that enables this — perceive, reason, act, observe, repeat — works. I've built systems that use this loop to automate knowledge work that would have taken hours of coordination: reading a document, extracting structured data, updating records, flagging anomalies, drafting a response. When it works, the time savings aren't marginal. They're an order of magnitude.",
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
        text: "Agents fail differently to traditional software. They don't throw exceptions. They don't return 404s. They confidently produce wrong answers — reasoning correctly through a task and still getting the conclusion wrong because of something subtle in how the problem was framed. The failures are quiet and hard to catch until something important goes wrong.",
      },
      {
        type: 'p',
        text: "The trust problem goes beyond hallucinations. When an agent makes a decision — routes a ticket, updates a record, sends a communication — and it's wrong, who's accountable? That question doesn't have a clean answer yet. Most enterprises I work with aren't avoiding agentic AI because they don't see the value. They're avoiding it because they can't explain the risk to their compliance team.",
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
        text: "Not 'an agent that handles customer queries' — an agent that handles one category of query, for one product, with a defined set of actions it can take and a human escalation path for everything else. Narrow scope. Observable behaviour. Gradual expansion.",
      },
      {
        type: 'p',
        text: "Trust isn't given to agents — it's accumulated through track record. The teams doing this well treat trust as an engineering problem. They measure it. Pass rates on eval sets. Accuracy on held-out cases. Escalation rates. They know what the agent handles reliably and where it needs help.",
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
        text: "Until you can answer those questions for the specific workflow you're automating, you're not ready for production. That's not an indictment of agents — it's how you should approach any system that touches real decisions.",
      },
      {
        type: 'p',
        text: "The agentic shift is real. The architecture is right. But the path to that future goes through the unglamorous work of defining scope, building evals, and earning trust incrementally. It doesn't go through demos. That's slower than the hype suggests. It's also more durable.",
      },
    ],
  },

  'hrag': {
    title: "Why HRAG Is How Production Agents Should Retrieve",
    date: "2025",
    readTime: "5 min read",
    body: [
      {
        type: 'lead',
        text: "Traditional RAG scans everything and guesses. Hierarchical RAG reads like a human — table of contents first, then drill down. Here's why that distinction matters when you're building agents that have to be right.",
      },
      {
        type: 'h2',
        text: "What RAG actually is",
      },
      {
        type: 'p',
        text: "RAG stands for Retrieval-Augmented Generation. The idea is simple: instead of relying on what an LLM already knows, you give it access to your documents at query time. Ask the system a question, it searches your knowledge base, retrieves the relevant bits, and passes them to the model alongside the question. The model then answers using that retrieved context rather than just pattern-matching from training data.",
      },
      {
        type: 'p',
        text: "It's one of the most practical patterns in production AI today. It makes LLMs useful for specific knowledge domains — internal documentation, product specs, legal policies, anything the model wasn't trained on.",
      },
      {
        type: 'h2',
        text: "Why flat RAG breaks in practice",
      },
      {
        type: 'p',
        text: "The traditional approach treats your entire document set as a flat pool. Every chunk of text is embedded as a vector, stored in a database, and searched all at once when a query comes in. The system finds the chunks semantically closest to the question and returns them.",
      },
      {
        type: 'p',
        text: "This works well when your documents are small and well-structured. It starts breaking when they're not.",
      },
      {
        type: 'p',
        text: "The core problem: flat RAG has no concept of document structure. It doesn't know that a 40-page technical report is organised into sections, that section 3 is about security and section 7 is about pricing. It just sees thousands of chunks of similar-sounding text and picks the ones that seem most related to the query.",
      },
      {
        type: 'p',
        text: "When the query is specific but the document is dense, this leads to a common failure mode: the system retrieves chunks that are on-topic but wrong — text that mentions the right concepts but from the wrong section, or from an outdated version, or that contradicts what the user actually needed. The model receives this confused context and either hallucinates a confident answer or hedges uselessly.",
      },
      {
        type: 'h2',
        text: "How HRAG changes the retrieval logic",
      },
      {
        type: 'p',
        text: "Hierarchical RAG introduces structure. Instead of a single flat index, it builds a two-level retrieval system: a high-level index of document summaries or sections, and lower-level indexes of the actual content within each section.",
      },
      {
        type: 'p',
        text: "The process mimics how a human reads a long document: scan the table of contents first, decide which chapter is relevant, then read that chapter carefully.",
      },
      {
        type: 'p',
        text: "In practice: when a query comes in, the system first searches the high-level index to identify which sections or documents are most relevant. Then it does a targeted search within those specific sections only. Instead of searching 10,000 chunks and grabbing the 5 most similar ones from across the entire corpus, you search 50 section summaries, identify the 2 most relevant, and retrieve the 5 best chunks from within those 2 sections.",
      },
      {
        type: 'p',
        text: "The context the model receives is focused, coherent, and correct.",
      },
      {
        type: 'h2',
        text: "Why this matters for agents",
      },
      {
        type: 'p',
        text: "Co-pilots can tolerate retrieval noise. A human reading the AI's response can catch a wrong citation, notice when the answer seems off, and ask a follow-up. Agents can't.",
      },
      {
        type: 'p',
        text: "In agentic workflows, the retrieved context is often passed directly into a reasoning chain that produces a decision — which record to update, which action to take, which response to send. If the retrieval step returns irrelevant or contradictory content, the agent reasons confidently from bad premises. The failure is silent and downstream.",
      },
      {
        type: 'p',
        text: "The teams building agents that work in production treat retrieval as a first-class engineering concern. HRAG is a structural solution to a structural problem. It gives agents a retrieval mechanism that's suited to the precision requirements of autonomous decision-making.",
      },
      {
        type: 'p',
        text: "If you're building agents that have to be right — not just plausible — the architecture of how they read matters as much as the model powering them.",
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
        text: "Most teams have figured out prompting. The harder problem — the one that actually breaks production agents — is context.",
      },
      {
        type: 'p',
        text: "A year ago, every conversation was about prompts. How to write them, how to structure them, what format to request. That conversation has mostly resolved. There are patterns now — system prompt structure, few-shot examples, chain-of-thought formatting. If you've built more than two LLM applications, you probably have a rough mental model of what makes a prompt work.",
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
        text: "When I say context, I mean everything in the model's context window at inference time. Not just the system prompt — the conversation history, retrieved documents, tool call results, memory summaries, intermediate reasoning. All of it.",
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
        text: "Not because the model changes. Because the context accumulates. A long-running agent starts clean — clear instructions, relevant context, good signal. But as it executes, the window fills up. Tool call results from earlier steps pile in. Intermediate reasoning from past actions takes up space. Old context that was relevant three steps ago is still there, slightly contradicting the new context that arrived after it.",
      },
      {
        type: 'p',
        text: "The model doesn't throw an error. It doesn't tell you the context is confusing. It just starts making slightly worse decisions — conflating things it shouldn't, missing details it would have caught at the start of the run.",
      },
      {
        type: 'p',
        text: "I've seen this on live agent deployments: a workflow that performed well in testing starts degrading in production after longer runs. The prompt didn't change. The tools didn't change. The context got messy. That's context rot — it's silent, gradual, and where a lot of production agent failures actually originate.",
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
        text: "Memory design is not optional for long-running agents. If an agent runs for more than a handful of steps, you need an architecture that summarises and compresses earlier context — not just appends to it. What does the agent actually need to remember? What can be discarded?",
      },
      {
        type: 'p',
        text: "Tool call hygiene is underrated. Every tool result that comes back into the context takes up space and can introduce noise. Structure the results. Strip what isn't needed. Be deliberate about what gets returned.",
      },
      {
        type: 'p',
        text: "Context ordering affects reasoning. In long contexts, models attend differently to information at the start versus the middle versus the end. This isn't a bug to work around — it's a property to design for. Put important instructions near the start and end. Noisy content in the middle.",
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
        text: "The teams doing this well treat context as a resource to be managed — budgeted, curated, and maintained. Not a buffer that fills up until something breaks.",
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
