"use client";

import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Link as ChakraLink,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import ICLayout from "../components/shared/ICLayout";
import ICSection from "../components/shared/ICSection";
import ICCard from "../components/shared/ICCard";
import ICButton from "../components/shared/ICButton";
import ICFooter from "../components/shared/ICFooter";
import EmailCaptureForm from "./components/EmailCaptureForm";

const domains = [
  {
    title: "STRENGTH",
    desc: "Physical power, resilience, and the will to push through adversity.",
  },
  {
    title: "DISCIPLINE & MINDSET",
    desc: "Mental toughness, focus, and the habits that forge greatness.",
  },
  {
    title: "PURPOSE & DIRECTION",
    desc: "Clarity of mission, vision, and the drive to pursue your calling.",
  },
  {
    title: "LEADERSHIP & CHARACTER",
    desc: "Integrity, influence, and the ability to lead yourself and others.",
  },
  {
    title: "FINANCIAL POWER",
    desc: "Wealth-building, stewardship, and the freedom to create impact.",
  },
  {
    title: "AI MASTERY & LIFE OPTIMIZATION",
    desc: "Harnessing technology and systems for a high-performance life.",
  },
];

export default function HomePage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <>
      <ICLayout>
        {/* HERO SHOWCASE UNDER NAV */}
        <ICSection>
          <ICCard>
            <Box mx="auto" mb={2} w="88px" h="88px" display="flex" alignItems="center" justifyContent="center" position="relative" zIndex={3}
              style={{
                filter: 'drop-shadow(0 6px 24px #232325cc) drop-shadow(0 1.5px 0 #fff) drop-shadow(0 0 12px #B0B3B8cc)',
                background: 'transparent',
              }}>
              <Image
                src="/iron-compass-logo.png"
                alt="Iron Compass Logo"
                fill
                sizes="88px"
                style={{ objectFit: 'contain', background: 'transparent' }}
                priority
              />
            </Box>
            <Heading
              as="h1"
              size="2xl"
              fontFamily="var(--font-heading), Oswald, Arial, sans-serif"
              fontWeight={950}
              letterSpacing="0.15em"
              mb={1}
              textTransform="uppercase"
              lineHeight={1.05}
              zIndex={2}
              style={{
                background: 'linear-gradient(180deg, #F3F4F7 0%, #B0B3B8 60%, #6B6E74 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 8px #232325cc, 0 1px 0 #fff, 0 0 16px #B0B3B8cc, 0 4px 24px #232325cc',
                WebkitTextStroke: '1.2px #232325',
                filter: 'none',
              }}
            >
              IRON COMPASS AI
            </Heading>
            <Heading
              as="h2"
              size="xl"
              fontFamily="var(--font-heading), Oswald, Arial, sans-serif"
              fontWeight={950}
              letterSpacing="0.13em"
              mb={2}
              textTransform="uppercase"
              lineHeight={1.05}
              zIndex={2}
              style={{
                background: 'linear-gradient(180deg, #F3F4F7 0%, #B0B3B8 60%, #6B6E74 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 8px #232325cc, 0 1px 0 #fff, 0 0 16px #B0B3B8cc, 0 4px 24px #232325cc',
                WebkitTextStroke: '1.2px #232325',
                filter: 'none',
              }}
            >
              RISE BEYOND LIMITS
            </Heading>
            <Text
                              fontWeight={800}
                              fontSize={{ base: 'md', md: 'xl' }}
                              color="#CFE6F7"
                              letterSpacing="0.08em"
                              textTransform="uppercase"
                              style={{textShadow:'0 0 4px #2EC4F1cc, 0 0 1px #CFE6F7'}}
                              zIndex={2}
                              mb={4}
                            >
                              A MAN&#39;S LIFE IS FORGED IN DISCIPLINE, TESTED IN ADVERSITY, AND DEFINED BY THE STRENGTH OF HIS PURPOSE.
                            </Text>
                            <Box w="56px" h="3px" bgGradient="linear(to-r, #2EC4F1, #8B5CF6)" borderRadius="full" mx="auto" mb={4} boxShadow="0 0 8px #2EC4F199" zIndex={2} />
                          </ICCard>
                        </ICSection>
                        {/* SIX DOMAINS SECTION */}
                        <ICSection alt>
                          <Text color="#2EC4F1" fontWeight={800} fontSize="lg" letterSpacing="0.18em" textTransform="uppercase" mb={1}>
                            THE SIX DOMAINS
                          </Text>
                          <Box w="40px" h="2px" bg="#2EC4F1" borderRadius="full" mb={5} />
                          <Text color="ic.textMuted" fontSize="md" mb={6}>
                            A complete, disciplined life requires mastery across six domains. Iron Compass guides men to develop strength, discipline, purpose, leadership, financial power, and AI mastery—so you can rise beyond limits and lead with purpose and integrity.
                          </Text>
                          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8}>
                            {domains.map((domain) => {
                              let icon = null;
                              switch (domain.title) {
                                case "STRENGTH":
                                  icon = (
                                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none"><rect x="6" y="6" width="20" height="20" rx="8" fill="#B01015" stroke="#F3EBDD" strokeWidth="2"/><path d="M12 20l8-8M20 20l-8-8" stroke="#F3EBDD" strokeWidth="2" strokeLinecap="round"/></svg>
                                  ); break;
                                case "DISCIPLINE & MINDSET":
                                  icon = (
                                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="#F3EBDD" strokeWidth="2"/><path d="M16 8v8l6 3" stroke="#B01015" strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="16" r="3" fill="#F3EBDD"/></svg>
                                  ); break;
                                case "PURPOSE & DIRECTION":
                                  icon = (
                                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#F3EBDD" strokeWidth="2"/><polygon points="16,6 20,26 16,22 12,26" fill="#B01015" stroke="#F3EBDD" strokeWidth="1.5"/><circle cx="16" cy="16" r="2" fill="#F3EBDD"/></svg>
                                  ); break;
                                case "LEADERSHIP & CHARACTER":
                                  icon = (
                                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none"><rect x="8" y="8" width="16" height="16" rx="8" fill="#B01015" stroke="#F3EBDD" strokeWidth="2"/><path d="M16 12v8M16 12l-4 4M16 12l4 4" stroke="#F3EBDD" strokeWidth="2" strokeLinecap="round"/></svg>
                                  ); break;
                                case "FINANCIAL POWER":
                                  icon = (
                                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="12" ry="10" fill="#B01015" stroke="#F3EBDD" strokeWidth="2"/><ellipse cx="16" cy="16" rx="6" ry="4" fill="#F3EBDD"/><text x="16" y="20" textAnchor="middle" fontSize="10" fill="#B01015" fontWeight="bold">$</text></svg>
                                  ); break;
                                case "AI MASTERY & LIFE OPTIMIZATION":
                                  icon = (
                                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none"><rect x="6" y="6" width="20" height="20" rx="8" fill="#B01015" stroke="#F3EBDD" strokeWidth="2"/><circle cx="16" cy="16" r="4" fill="#F3EBDD"/><path d="M16 6v6M16 26v-6M6 16h6M26 16h-6" stroke="#F3EBDD" strokeWidth="2"/></svg>
                                  ); break;
                                default:
                                  icon = null;
                              }
                              return (
                                <ICCard key={domain.title}>
                                  <Box mb={3} zIndex={1} position="relative">{icon}</Box>
                                  <Heading as="h3" size="md" mb={2} zIndex={1} position="relative">
                                    {domain.title}
                                  </Heading>
                                  <Box w="24px" h="2px" bg="#2EC4F1" borderRadius="full" mb={2} zIndex={1} position="relative" />
                                  <Text color="ic.textMuted" fontSize="sm" zIndex={1} position="relative">{domain.desc}</Text>
                                </ICCard>
                              );
                            })}
                          </SimpleGrid>
                        </ICSection>
                        {/* PHILOSOPHY SECTION */}
                        <ICSection>
                          <ICCard>
                            <Text color="#2EC4F1" fontWeight={700} fontSize="sm" letterSpacing="0.18em" textTransform="uppercase" mb={2}>
                              Philosophy
                            </Text>
                            <Box w="32px" h="2px" bg="#2EC4F1" borderRadius="full" mx="auto" mb={4} />
                            <Heading as="h2" size="lg" mb={6} textTransform="uppercase" style={{
                              background: 'linear-gradient(180deg, #F3F4F7 0%, #B0B3B8 60%, #6B6E74 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              textShadow: '0 2px 8px #232325cc, 0 1px 0 #fff, 0 0 16px #B0B3B8cc, 0 4px 24px #232325cc',
                              WebkitTextStroke: '1.2px #232325',
                              filter: 'none',
                            }}>
                              The Iron Compass Philosophy
                            </Heading>
                            <Text color="ic.textMuted" fontSize="md" mb={4}>
                              At Iron Compass, we believe every man is called to rise above mediocrity. Our system is built on timeless principles—discipline, strength, purpose, and integrity—combined with modern tools for a rapidly changing world.
                            </Text>
                            <Text color="ic.textMuted" fontSize="md" mb={4}>
                              We guide you to lead yourself and others, to build unshakeable character, and to achieve financial and personal freedom. With AI mastery and life optimization, you’ll unlock new levels of performance and fulfillment.
                            </Text>
                            <Text color="ic.textMuted" fontSize="md">
                              This is more than self-improvement. It’s a brotherhood, a mission, and a way of life.
                            </Text>
                          </ICCard>
                        </ICSection>
                        {/* CTA SECTION */}
                        <ICSection alt>
                          <ICCard>
                            <Text color="#2EC4F1" fontWeight={700} fontSize="sm" letterSpacing="0.18em" textTransform="uppercase" mb={2}>
                              Begin
                            </Text>
                            <Box w="32px" h="2px" bg="#2EC4F1" borderRadius="full" mx="auto" mb={4} />
                            <Heading as="h2" size="lg" mb={6} textTransform="uppercase" style={{
                              background: 'linear-gradient(180deg, #F3F4F7 0%, #B0B3B8 60%, #6B6E74 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              textShadow: '0 2px 8px #232325cc, 0 1px 0 #fff, 0 0 16px #B0B3B8cc, 0 4px 24px #232325cc',
                              WebkitTextStroke: '1.2px #232325',
                              filter: 'none',
                            }}>
                              Ready to Begin Your Journey?
                            </Heading>
                            <Stack direction={isMobile ? "column" : "row"} spacing={4} justify="center" align="center">
                              <ChakraLink as={NextLink} href="/domains" _hover={{ textDecoration: "none" }}>
                                <ICButton>Start Your Rise</ICButton>
                              </ChakraLink>
                              <ChakraLink as={NextLink} href="/domains" _hover={{ textDecoration: "none" }}>
                                <ICButton>Explore the Domains</ICButton>
                              </ChakraLink>
                            </Stack>
                          </ICCard>
                        </ICSection>
                        {/* EMAIL CAPTURE SECTION */}
                        <ICSection>
                          <ICCard
                            header={
                              <Text color="#2EC4F1" fontWeight={900} fontSize="xl" mb={2} textTransform="uppercase">
                                Start Your Rise
                              </Text>
                            }
                          >
                            <Box w="24px" h="2px" bg="#2EC4F1" borderRadius="full" mx="auto" mb={4} boxShadow="0 0 8px #2EC4F199" />
                            <Text color="ic.textMuted" mb={6} textAlign="center">
                              Join the early list for the 7-Day Discipline Challenge and Iron Compass updates.
                            </Text>
                            <EmailCaptureForm />
                          </ICCard>
                        </ICSection>
                        <ICFooter />
                      </ICLayout>

                    </>

                  );
}

