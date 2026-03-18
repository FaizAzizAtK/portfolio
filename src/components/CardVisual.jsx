import { Player } from '@remotion/player'
import { AgenticShift } from '../remotion/AgenticShift'
import { ContextRot }   from '../remotion/ContextRot'
import { HragTree }     from '../remotion/HragTree'

const CONFIGS = {
  'agentic-shift':      { component: AgenticShift, durationInFrames: 240, fps: 30 }, // HALF=120, ping-pong
  'prompting-interface':{ component: ContextRot,   durationInFrames: 300, fps: 30 }, // HALF=150, ping-pong
  'hrag':               { component: HragTree,     durationInFrames: 360, fps: 30 }, // HALF=180, ping-pong
}

export default function CardVisual({ blogId }) {
  const cfg = CONFIGS[blogId]
  if (!cfg) return null

  return (
    <Player
      component={cfg.component}
      durationInFrames={cfg.durationInFrames}
      fps={cfg.fps}
      compositionWidth={800}
      compositionHeight={350}
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
