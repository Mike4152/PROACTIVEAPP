"use client"

import { useEffect, useRef } from "react"

interface HealthGaugeProps {
  value: number
}

export function HealthGauge({ value }: HealthGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Draw background arc with gradient
    const bgGradient = ctx.createLinearGradient(0, 0, rect.width, 0)
    bgGradient.addColorStop(0, "#1E2430")
    bgGradient.addColorStop(1, "#2A3441")

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 2.25, false)
    ctx.lineWidth = 8
    ctx.strokeStyle = bgGradient
    ctx.lineCap = "round"
    ctx.stroke()

    // Calculate color based on value
    let gradient
    if (value >= 80) {
      // Green to teal gradient for good health
      gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
      gradient.addColorStop(0, "#10B981")
      gradient.addColorStop(1, "#00F0FF")
    } else if (value >= 60) {
      // Yellow to orange gradient for warning
      gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
      gradient.addColorStop(0, "#F59E0B")
      gradient.addColorStop(1, "#D97706")
    } else {
      // Red gradient for critical
      gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
      gradient.addColorStop(0, "#EF4444")
      gradient.addColorStop(1, "#DC2626")
    }

    // Draw value arc
    const valueAngle = (value / 100) * Math.PI * 1.5 + Math.PI * 0.75
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, valueAngle, false)
    ctx.lineWidth = 8
    ctx.strokeStyle = gradient
    ctx.lineCap = "round"
    ctx.stroke()

    // Add glow effect
    ctx.shadowColor = value >= 80 ? "#00F0FF" : value >= 60 ? "#F59E0B" : "#EF4444"
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI * 0.75, valueAngle, false)
    ctx.lineWidth = 2
    ctx.strokeStyle = value >= 80 ? "#00F0FF" : value >= 60 ? "#F59E0B" : "#EF4444"
    ctx.lineCap = "round"
    ctx.stroke()
    ctx.shadowBlur = 0

    // Draw center text
    ctx.font = "bold 16px Inter, sans-serif"
    ctx.fillStyle = "#FFFFFF"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${value}%`, centerX, centerY)

    // Add small label
    ctx.font = "10px Inter, sans-serif"
    ctx.fillStyle = "#AAB1B7"
    ctx.fillText("HEALTH", centerX, centerY + 16)
  }, [value])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
