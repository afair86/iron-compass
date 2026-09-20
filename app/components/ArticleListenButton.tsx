"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ListenButtonProps = {
  title: string;
  /** Plain text extracted for speech (no markdown). */
  text: string;
};

function pickStoicVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const ranked = [...voices].sort((a, b) => {
    const score = (v: SpeechSynthesisVoice) => {
      const name = `${v.name} ${v.lang}`.toLowerCase();
      let s = 0;
      if (/en-au|en_au|australian/.test(name)) s += 6;
      if (/en-gb|en_gb|british|uk english/.test(name)) s += 5;
      if (/en-us|en_us|english/.test(name)) s += 2;
      if (/male|david|daniel|james|george|thomas|alex|fred|microsoft mark|microsoft ryan|google uk english male/.test(name)) {
        s += 4;
      }
      if (/female|zira|samantha|karen|moira/.test(name)) s -= 3;
      if (v.localService) s += 1;
      return s;
    };
    return score(b) - score(a);
  });
  return ranked[0] ?? null;
}

/**
 * Browser speech playback — calm, slightly slow, firm.
 * No API key required. Quality depends on the device voices installed.
 */
export default function ArticleListenButton({ title, text }: ListenButtonProps) {
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const script = useMemo(() => {
    const cleaned = text
      .replace(/\s+/g, " ")
      .replace(/https?:\/\/\S+/g, "")
      .trim();
    return `${title}. ${cleaned}`;
  }, [title, text]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setPlaying(false);
    setPaused(false);
  };

  const play = () => {
    if (!supported || !script) return;
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(script);
    const voice = pickStoicVoice(voices);
    if (voice) utter.voice = voice;
    // Calm but firm: slightly slower, steady pitch
    utter.rate = 0.92;
    utter.pitch = 0.9;
    utter.volume = 1;

    utter.onend = () => {
      setPlaying(false);
      setPaused(false);
      utteranceRef.current = null;
    };
    utter.onerror = () => {
      setPlaying(false);
      setPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utter;
    setPlaying(true);
    setPaused(false);
    window.speechSynthesis.speak(utter);
  };

  const togglePause = () => {
    if (!playing) return;
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  if (!supported) return null;

  return (
    <div className="ic-listen" role="group" aria-label="Listen to this article">
      <p className="ic-listen__label">Listen</p>
      <p className="ic-listen__hint">Calm, firm readout — press play if you’d rather hear it.</p>
      <div className="ic-listen__controls">
        {!playing ? (
          <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={play}>
            Play audio
          </button>
        ) : (
          <>
            <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={togglePause}>
              {paused ? "Resume" : "Pause"}
            </button>
            <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={stop}>
              Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
}
