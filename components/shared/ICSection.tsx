


import { Box } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const MotionBox = motion(Box);

/**
 * ICSection: Alternating block section wrapper
 * - Alternates background: #0A0A0B (matte black) and #1A1A1C (dark grey)
 * - Large vertical spacing (64px default)
 * - Centers content, max-width 740px
 * - Accepts optional 'alt' prop for background switch
 */

export default function ICSection({
  children,
  alt = false,
  className = "",
}: {
  children: React.ReactNode;
  alt?: boolean;
  className?: string;
}) {
  // Reveal on scroll using Intersection Observer
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } });
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <MotionBox
      as="section"
      w="full"
      display="flex"
      flexDir="column"
      alignItems="center"
      py={{ base: 12, md: 16 }}
      bgGradient={alt ? "linear(135deg, ic.card 100%, ic.blueDark 100%)" : "linear(135deg, ic.bg 100%, ic.blueDark 100%)"}
      className={className}
      pt={0}
      pb={0}
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={controls}
      position="relative"
      overflow="visible"
    >
      {/* Reduce overlay/fade by 80% (was 0.18, now 0.04) */}
      <Box position="absolute" inset={0} borderRadius="2xl" zIndex={0} pointerEvents="none" opacity={0.04} boxShadow="0 0 32px #F3EBDD, 0 0 24px #B01015" />
      <Box w="full" maxW="700px" px={4} position="relative" zIndex={1}>
        {children}
      </Box>
    </MotionBox>
  );
}
