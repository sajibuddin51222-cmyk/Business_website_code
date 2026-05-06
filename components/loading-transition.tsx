"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function LoadingTransition() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Short splash — long delays compete with route chunk compilation in dev and feel sluggish in prod
    const timer = setTimeout(() => setIsLoading(false), 380)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Pulsing Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 1],
                opacity: 1,
              }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut",
              }}
              className="relative w-24 h-24 md:w-32 md:h-32"
            >
              <Image
                src="/logo_app_bar.png"
                alt="FusionBytePro"
                fill
                className="object-contain"
                priority
              />
              {/* Outer glow pulse */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0, 0.2]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
              />
            </motion.div>

            {/* Premium Loading Bar */}
            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/60"
            >
              Initializing Excellence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
