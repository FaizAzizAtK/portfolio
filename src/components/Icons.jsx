/**
 * Hand-drawn SVG icon components.
 * All paths are organic bezier curves that mimic pen-on-paper strokes.
 * Tweak strokeWidth to adjust line weight.
 */

/* Wiggly right-pointing arrow */
export function WigglyArrow({ size = 56, color = 'currentColor', className = '', ...props }) {
  return (
    <svg
      width={size} height={Math.round(size * 0.45)}
      viewBox="0 0 56 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M 2 13 C 8 12 16 14 24 12.5 C 32 11 40 14 48 12"
        stroke={color} strokeWidth="2.2" strokeLinecap="round"
      />
      <path
        d="M 43 6 C 46 8 50 10 52 12 C 50 14 46 16 43 18"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

/* Squiggly underline — stretches to given width */
export function SquiggleUnderline({ width = 180, color = 'currentColor', className = '', ...props }) {
  const path = `M 0 7 C 12 3 24 11 36 7 C 48 3 60 11 72 7 C 84 3 96 11 108 7 C 120 3 132 11 144 7 C 156 3 168 11 ${width} 7`
  return (
    <svg
      width={width} height="14"
      viewBox={`0 0 ${width} 14`}
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d={path} stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

/* Hand-drawn circle — slightly imperfect, doesn't close perfectly */
export function HandCircle({ size = 100, color = 'currentColor', className = '', ...props }) {
  return (
    <svg
      width={size} height={size * 0.9}
      viewBox="0 0 100 90"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M 50 6 C 70 3 90 16 92 36 C 94 56 80 76 58 82 C 36 88 14 76 8 56 C 2 36 14 10 50 6"
        stroke={color} strokeWidth="2.2" strokeLinecap="round"
      />
    </svg>
  )
}

/* 6-line asterisk — slightly uneven strokes */
export function HandAsterisk({ size = 28, color = 'currentColor', className = '', ...props }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M 14 2 L 13.5 26"    stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 2 14 L 26 13.5"    stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 4.5 4.5 L 23 23"   stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 4.5 23.5 L 23 4.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* Scribbly 5-point star */
export function ScribbleStar({ size = 32, color = 'currentColor', className = '', ...props }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M 16 2 L 19 12 L 30 11 L 22 18 L 25 29 L 16 23 L 7 29 L 10 18 L 2 11 L 13 12 Z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"
        fill={color} fillOpacity="0.12"
      />
    </svg>
  )
}

/* Wavy line divider */
export function WavyLine({ width = 120, color = 'currentColor', className = '', ...props }) {
  const path = `M 0 5 C 10 1 20 9 30 5 C 40 1 50 9 60 5 C 70 1 80 9 90 5 C 100 1 110 9 ${width} 5`
  return (
    <svg
      width={width} height="10"
      viewBox={`0 0 ${width} 10`}
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d={path} stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/* Hand-drawn bracket/parenthesis accent */
export function HandBracket({ height = 60, color = 'currentColor', flip = false, className = '', ...props }) {
  return (
    <svg
      width="22" height={height}
      viewBox={`0 0 22 ${height}`}
      fill="none"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : {}}
      aria-hidden="true"
      {...props}
    >
      <path
        d={`M 18 4 C 10 6 6 ${height * 0.3} 4 ${height / 2} C 6 ${height * 0.7} 10 ${height - 8} 18 ${height - 4}`}
        stroke={color} strokeWidth="2" strokeLinecap="round"
      />
    </svg>
  )
}

/* Small arrow-down for scroll indicator */
export function ArrowDown({ size = 24, color = 'currentColor', className = '', ...props }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M 12 2 C 11.5 8 12.5 14 12 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 6 14 C 8 17 10 19 12 20 C 14 19 16 17 18 14"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
