"use client";

import { Box, Flex, HStack, Link, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <Box as="header" w="full" bg="ic.bg" borderBottomWidth={1} borderColor="ic.border" zIndex={20} position="relative">
      <Flex
        as="nav"
        maxW="820px"
        mx="auto"
        align="center"
        justify="center"
        px={4}
        py={4}
        aria-label="Main navigation"
        gap={8}
      >
        {/* Statement Banner */}
        <Box
          w="full"
          textAlign="center"
          px={{ base: 2, md: 0 }}
          py={2}
          as="h1"
          fontFamily="var(--font-heading), Oswald, Arial, sans-serif"
          fontWeight={900}
          fontSize={{ base: 'md', md: '2xl', lg: '2.2rem' }}
          letterSpacing="0.13em"
          textTransform="uppercase"
          lineHeight={1.1}
          bgGradient="linear(to-r, ic.blue, ic.teal, ic.purple)"
          bgClip="text"
          color="ic.blue"
          style={{
            textShadow: '0 4px 24px #2EC4F1cc, 0 2px 0 #000, 0 0 8px #2EC4F199',
            WebkitTextStroke: '0.8px #232325',
            fontStretch: 'expanded',
          }}
        >
          A MAN&#39;S LIFE IS FORGED IN DISCIPLINE, TESTED IN ADVERSITY, AND DEFINED BY THE STRENGTH OF HIS PURPOSE.
        </Box>
        {/* Desktop Nav */}
        <HStack
          as="ul"
          spacing={6}
          display={{ base: 'none', md: 'flex' }}
          fontSize="md"
          fontWeight={800}
          alignItems="center"
          textTransform="uppercase"
          letterSpacing="0.08em"
          color="ic.textMuted"
          justifyContent="center"
        >
          <Box as="li">
            <Link as={NextLink} href="/" _hover={{ color: 'ic.gold' }}>Home</Link>
          </Box>
          <Box as="li">
            <Link as={NextLink} href="/about" _hover={{ color: 'ic.gold' }}>About</Link>
          </Box>
          <Box as="li">
            <Link as={NextLink} href="/domains" _hover={{ color: 'ic.gold' }}>Domains</Link>
          </Box>
          <Box as="li">
            <Link as={NextLink} href="/blog" _hover={{ color: 'ic.gold' }}>Blog</Link>
          </Box>
          <Box as="li">
            <Link as={NextLink} href="/contact" _hover={{ color: 'ic.gold' }}>Contact</Link>
          </Box>
        </HStack>
        {/* CTA Button */}
        <Box display={{ base: 'none', md: 'block' }} ml={6} textAlign="center">
          <Button
            as={NextLink}
            href="/domains"
            bg="ic.red"
            color="#fff"
            px={6}
            py={2}
            borderRadius="full"
            fontWeight={900}
            fontSize="md"
            letterSpacing="0.08em"
            textTransform="uppercase"
            boxShadow="none"
            _hover={{ bg: '#8a0c12' }}
            _active={{ bg: '#6a090e' }}
            transition="background 0.2s"
          >
            Start Your Rise
          </Button>
        </Box>
      </Flex>
      {/* Blue accent separator line */}
      <Box w="full" h="0" borderBottom="2.5px solid #2EC4F1" boxShadow="0 0 8px #2EC4F199" />

      {/* IRON COMPASS AI logo and heading under the blue line */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        py={4}
        gap={1}
        w="full"
        bg="transparent"
      >
        <Box mx="auto" mb={1} w="64px" h="64px" display="flex" alignItems="center" justifyContent="center" position="relative" zIndex={3}
          style={{
            filter: 'drop-shadow(0 6px 24px #232325cc) drop-shadow(0 1.5px 0 #fff) drop-shadow(0 0 12px #B0B3B8cc)',
            background: 'transparent',
          }}>
          <Image
            src="/iron-compass-logo.png"
            alt="Iron Compass Logo"
            fill
            sizes="64px"
            style={{ objectFit: 'contain', background: 'transparent' }}
            priority
          />
        </Box>
        <Box
          as="h1"
          fontFamily="var(--font-heading), Oswald, Arial, sans-serif"
          fontWeight={950}
          fontSize={{ base: 'xl', md: '2xl', lg: '2.2rem' }}
          letterSpacing="0.15em"
          textTransform="uppercase"
          lineHeight={1.05}
          zIndex={2}
          textAlign="center"
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
        </Box>
      </Flex>
    </Box>
  );
}
