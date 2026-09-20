"use client";

import { useEffect, useRef, useState } from "react";

type ArticleListenButtonProps = {
  title: string;
  /** Fallback plain text for browser speech if no audio file. */
  text: string;
  /** Preferred: pre-rendered neural MP3 (natural voice). */
  audioSrc?: string;
};

/**
 * Prefer hosted neural MP3. Fall back to browser speech only if no file.
 */
export default function ArticleListenButton({ title, text, audioSrc }: ArticleListenButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(Boolean(audioSrc));
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playFile = async () => {
    if (!audioSrc) return;
    setError("");
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.preload = "metadata";
        audioRef.current.onended = () => setPlaying(false);
        audioRef.current.onpause = () => setPlaying(false);
        audioRef.current.onplay = () => setPlaying(true);
        audioRef.current.onerror = () => {
          setError("Audio could not load. Refresh and try again.");
          setPlaying(false);
        };
      }
      await audioRef.current.play();
      setPlaying(true);
      setReady(true);
    } catch {
      setError("Tap play again — browsers sometimes block the first autoplay.");
      setPlaying(false);
    }
  };

  const pauseFile = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const stopFile = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPlaying(false);
  };

  if (audioSrc) {
    return (
      <div className="ic-listen" role="group" aria-label={`Listen to ${title}`}>
        <p className="ic-listen__label">Listen</p>
        <p className="ic-listen__hint">Calm, firm readout — press play if you’d rather hear it.</p>
        <div className="ic-listen__controls">
          {!playing ? (
            <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={playFile}>
              Play audio
            </button>
          ) : (
            <>
              <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={pauseFile}>
                Pause
              </button>
              <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={stopFile}>
                Stop
              </button>
            </>
          )}
        </div>
        {error ? <p className="ic-listen__error">{error}</p> : null}
        {ready ? null : null}
      </div>
    );
  }

  // No neural file yet — hide rather than offer robotic browser voice.
  if (!text) return null;
  return (
    <div className="ic-listen" role="group" aria-label={`Listen to ${title}`}>
      <p className="ic-listen__label">Listen</p>
      <p className="ic-listen__hint">Audio for this article is being prepared.</p>
    </div>
  );
}
