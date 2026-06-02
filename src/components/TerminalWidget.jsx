import { useState, useEffect } from 'react'

const STATUS_LINES = [
  { timestamp: '09:14', text: 'Therapist onboarding pipeline → ready', hasCheck: true },
  { timestamp: '09:31', text: 'AI memory engine → initialised', hasCheck: true },
  { timestamp: '10:02', text: 'Privacy layer → end-to-end encrypted', hasCheck: true },
  { timestamp: '10:45', text: 'Session matching model → training', hasCheck: true },
  { timestamp: '11:20', text: 'Beta access queue → open', hasCheck: false }, // stays with blinking cursor
]

export default function TerminalWidget() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [completedLines, setCompletedLines] = useState([])
  const [cursorVisible, setCursorVisible] = useState(true)

  // Blinking cursor frequency
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 450)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let charTimeout
    let linePauseTimeout
    const lineObj = STATUS_LINES[currentLineIndex]

    if (!lineObj) return

    // If typed text length is less than target text, keep typing
    if (typedText.length < lineObj.text.length) {
      const nextChar = lineObj.text[typedText.length]
      const speed = Math.floor(Math.random() * (100 - 60 + 1)) + 60 // 60-100ms random speed

      charTimeout = setTimeout(() => {
        setTypedText((prev) => prev + nextChar)
      }, speed)
    } else {
      // Completed typing current line!
      if (lineObj.hasCheck) {
        // If it should have a checkmark, wait 400ms then add check and move to next
        linePauseTimeout = setTimeout(() => {
          setCompletedLines((prev) => [...prev, currentLineIndex])
          setTypedText('')
          if (currentLineIndex < STATUS_LINES.length - 1) {
            setCurrentLineIndex((prev) => prev + 1)
          }
        }, 400)
      } else {
        // Last line, doesn't have a check, never resolves. Wait 4s, then loop/restart
        linePauseTimeout = setTimeout(() => {
          // Restart typewriter
          setCompletedLines([])
          setTypedText('')
          setCurrentLineIndex(0)
        }, 4000)
      }
    }

    return () => {
      clearTimeout(charTimeout)
      clearTimeout(linePauseTimeout)
    }
  }, [currentLineIndex, typedText])

  return (
    <div 
      className="w-full h-[280px] bg-[#0D1F12] border border-[#2A4A30] rounded-xl shadow-xl overflow-hidden font-mono flex flex-col text-left transition-all duration-300 hover:border-[#3D9A50]/40"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
    >
      {/* Terminal Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A4A30]/50 bg-[#09150C]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-75" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-75" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-75" />
        </div>
        <span className="text-[11px] font-semibold text-[#4A6B4F] uppercase tracking-wider">
          hovio / status
        </span>
        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Terminal Body */}
      <div className="p-5 flex-1 flex flex-col gap-2.5 overflow-y-auto text-[13px] md:text-[14px] leading-relaxed">
        {/* Render fully completed lines */}
        {STATUS_LINES.map((line, idx) => {
          // Is this line in the past / already fully typed?
          const isDone = completedLines.includes(idx)
          // Is this line currently typing?
          const isCurrent = currentLineIndex === idx

          if (isDone) {
            return (
              <div key={idx} className="flex items-start gap-3 text-[#7FBA8A]">
                <span className="text-[#4A6B4F] select-none">[{line.timestamp}]</span>
                <span className="flex-1">
                  {line.text} <span className="text-[#3D9A50] font-bold">✓</span>
                </span>
              </div>
            )
          }

          if (isCurrent) {
            return (
              <div key={idx} className="flex items-start gap-3 text-[#C8F0CD]">
                <span className="text-[#4A6B4F] select-none">[{line.timestamp}]</span>
                <span className="flex-1 font-medium">
                  {typedText}
                  <span 
                    className={`inline-block w-[8px] h-[15px] bg-[#C8F0CD] ml-0.5 align-middle transition-opacity duration-75 ${
                      cursorVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </span>
              </div>
            )
          }

          // Not typed yet
          return null
        })}
      </div>
    </div>
  )
}
