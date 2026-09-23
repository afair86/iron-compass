"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

type ArticleListenButtonProps = {
  title: string;
  /** Kept for compatibility; unused when audioSrc is present. */
  text?: string;
  /** Pre-rendered neural MP3. */
  audioSrc?: string;
  /** Optional revision id so stale audio can be flagged later. */
  audioVersion?: string;
  /** Optional short hint under the Listen label. */
  hint?: string;
  /** Sticky compact bar while scrolling (default true on full player). */
  enableSticky?: boolean;
  /** Compact card for review grids. */
  compact?: boolean;
  /** Quiet inline prompt for article tops. */
  subtle?: boolean;
};

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;
const SKIP_SECONDS = 15;
const PLAY_EVENT = "ic-listen-play";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const m = Math.floor(whole / 60);
  const s = whole % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function storageKey(src: string, version?: string) {
  return `ic-listen:${version || "v1"}:${src}`;
}

function SpeakerIcon() {
  return (
    <svg className="ic-listen__speaker" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.2-3.9v7.8A4.5 4.5 0 0 0 16.5 12zM14.3 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"
      />
    </svg>
  );
}

/**
 * Pre-generated neural MP3 player.
 * No browser speechSynthesis primary path — robotic fallback stays hidden.
 */
export default function ArticleListenButton({
  title,
  text = "",
  audioSrc,
  audioVersion,
  hint = "Prefer to hear it?",
  enableSticky = true,
  compact = false,
  subtle = false,
}: ArticleListenButtonProps) {
  const instanceId = useId();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const progressId = useId();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onOtherPlay = (event: Event) => {
      const detail = (event as CustomEvent<{ id: string }>).detail;
      if (!detail || detail.id === instanceId) return;
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setPlaying(false);
      }
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => {
      window.removeEventListener(PLAY_EVENT, onOtherPlay);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [instanceId]);

  useEffect(() => {
    if (!audioSrc || !enableSticky || subtle || typeof window === "undefined") return;
    const onScroll = () => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSticky(rect.bottom < 0 && (playing || current > 0));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [audioSrc, enableSticky, subtle, playing, current]);

  const ensureAudio = () => {
    if (!audioSrc) return null;
    if (audioRef.current) return audioRef.current;

    const audio = new Audio(audioSrc);
    audio.preload = "metadata";
    audio.playbackRate = speed;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
      try {
        const saved = localStorage.getItem(storageKey(audioSrc, audioVersion));
        if (saved) {
          const t = Number(saved);
          if (Number.isFinite(t) && t > 0 && t < (audio.duration || Infinity) - 2) {
            audio.currentTime = t;
            setCurrent(t);
          }
        }
      } catch {
        /* ignore storage */
      }
      setLoading(false);
    };
    audio.ontimeupdate = () => {
      setCurrent(audio.currentTime);
      try {
        localStorage.setItem(storageKey(audioSrc, audioVersion), String(audio.currentTime));
      } catch {
        /* ignore */
      }
    };
    audio.onended = () => {
      setPlaying(false);
      try {
        localStorage.removeItem(storageKey(audioSrc, audioVersion));
      } catch {
        /* ignore */
      }
    };
    audio.onpause = () => setPlaying(false);
    audio.onplay = () => setPlaying(true);
    audio.onwaiting = () => setLoading(true);
    audio.onplaying = () => setLoading(false);
    audio.onerror = () => {
      setError("Audio could not load. Refresh and try again.");
      setPlaying(false);
      setLoading(false);
    };

    audioRef.current = audio;
    return audio;
  };

  const playFile = async () => {
    if (!audioSrc) return;
    setError("");
    setLoading(true);
    setExpanded(true);
    try {
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: { id: instanceId } }));
      const audio = ensureAudio();
      if (!audio) return;
      await audio.play();
      setPlaying(true);
    } catch {
      setError("Tap play again — browsers sometimes block the first attempt.");
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  };

  const pauseFile = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const restart = () => {
    const audio = ensureAudio();
    if (!audio) return;
    audio.currentTime = 0;
    setCurrent(0);
    void playFile();
  };

  const skip = (delta: number) => {
    const audio = ensureAudio();
    if (!audio) return;
    const next = Math.min(Math.max(0, audio.currentTime + delta), audio.duration || 0);
    audio.currentTime = next;
    setCurrent(next);
  };

  const onSeek = (value: number) => {
    const audio = ensureAudio();
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  };

  const onSpeed = (value: number) => {
    setSpeed(value);
    if (audioRef.current) audioRef.current.playbackRate = value;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return;
    if (event.code === "Space") {
      event.preventDefault();
      if (playing) pauseFile();
      else void playFile();
    } else if (event.code === "ArrowRight") {
      event.preventDefault();
      skip(SKIP_SECONDS);
    } else if (event.code === "ArrowLeft") {
      event.preventDefault();
      skip(-SKIP_SECONDS);
    }
  };

  if (!audioSrc) {
    if (!text) return null;
    return null;
  }

  const showPanel = !subtle || expanded || playing || current > 0;

  if (subtle) {
    return (
      <>
        <div
          ref={rootRef}
          className="ic-listen ic-listen--subtle"
          role="group"
          aria-label={`Listen to ${title}`}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className="ic-listen__subtle-row">
            <button
              type="button"
              className="ic-listen__subtle-prompt"
              onClick={() => {
                if (playing) pauseFile();
                else void playFile();
              }}
              aria-label={playing ? `Pause ${title}` : `Listen to ${title}`}
            >
              <SpeakerIcon />
              <span>{loading ? "Loading…" : playing ? "Pause" : current > 0 ? "Resume listening" : "Listen"}</span>
            </button>
            {!playing && current === 0 ? <span className="ic-listen__subtle-hint">{hint}</span> : null}
            {playing || current > 0 ? (
              <span className="ic-listen__subtle-time" aria-hidden="true">
                {formatTime(current)}
                {duration ? ` / ${formatTime(duration)}` : ""}
              </span>
            ) : null}
          </div>

          {showPanel ? (
            <div className="ic-listen__subtle-panel">
              <div className="ic-listen__controls">
                <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => skip(-SKIP_SECONDS)} aria-label={`Skip back ${SKIP_SECONDS} seconds`}>
                  −{SKIP_SECONDS}s
                </button>
                <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => skip(SKIP_SECONDS)} aria-label={`Skip forward ${SKIP_SECONDS} seconds`}>
                  +{SKIP_SECONDS}s
                </button>
                <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={restart} aria-label="Restart audio">
                  Restart
                </button>
              </div>
              <div className="ic-listen__progress">
                <label className="sr-only" htmlFor={progressId}>
                  Playback position
                </label>
                <input
                  id={progressId}
                  className="ic-listen__range"
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(current, duration || 0)}
                  onChange={(e) => onSeek(Number(e.target.value))}
                />
              </div>
              <div className="ic-listen__speed">
                <span className="ic-listen__speed-label" id={`${progressId}-speed`}>
                  Speed
                </span>
                <div className="ic-listen__speed-options" role="group" aria-labelledby={`${progressId}-speed`}>
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={s === speed ? "ic-listen__speed-btn is-active" : "ic-listen__speed-btn"}
                      onClick={() => onSpeed(s)}
                      aria-pressed={s === speed}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
              {error ? <p className="ic-listen__error">{error}</p> : null}
            </div>
          ) : null}
        </div>
        {enableSticky && sticky ? (
          <div className="ic-listen ic-listen--sticky" role="group" aria-label={`Continue listening to ${title}`}>
            <div className="ic-listen__sticky-row">
              <p className="ic-listen__sticky-title">{title}</p>
              <div className="ic-listen__controls">
                {!playing ? (
                  <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={() => void playFile()}>
                    Resume
                  </button>
                ) : (
                  <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={pauseFile}>
                    Pause
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  const controls = (
    <>
      <p className="ic-listen__label">{compact ? title : "Listen"}</p>
      {!compact ? <p className="ic-listen__hint">{hint}</p> : hint ? <p className="ic-listen__hint">{hint}</p> : null}

      <div className="ic-listen__controls">
        {!playing ? (
          <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={() => void playFile()} aria-label={`Play ${title}`}>
            {loading ? "Loading…" : current > 0 ? "Resume" : "Play audio"}
          </button>
        ) : (
          <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={pauseFile} aria-label={`Pause ${title}`}>
            Pause
          </button>
        )}
        <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => skip(-SKIP_SECONDS)} aria-label={`Skip back ${SKIP_SECONDS} seconds`}>
          −{SKIP_SECONDS}s
        </button>
        <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => skip(SKIP_SECONDS)} aria-label={`Skip forward ${SKIP_SECONDS} seconds`}>
          +{SKIP_SECONDS}s
        </button>
        <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={restart} aria-label="Restart audio">
          Restart
        </button>
      </div>

      <div className="ic-listen__progress">
        <label className="sr-only" htmlFor={progressId}>
          Playback position
        </label>
        <input
          id={progressId}
          className="ic-listen__range"
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(current, duration || 0)}
          onChange={(e) => onSeek(Number(e.target.value))}
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={current}
          aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
        />
        <div className="ic-listen__time" aria-live="off">
          <span>{formatTime(current)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="ic-listen__speed">
        <span className="ic-listen__speed-label" id={`${progressId}-speed`}>
          Speed
        </span>
        <div className="ic-listen__speed-options" role="group" aria-labelledby={`${progressId}-speed`}>
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              className={s === speed ? "ic-listen__speed-btn is-active" : "ic-listen__speed-btn"}
              onClick={() => onSpeed(s)}
              aria-pressed={s === speed}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="ic-listen__error">{error}</p> : null}
    </>
  );

  return (
    <>
      <div
        ref={rootRef}
        className={compact ? "ic-listen ic-listen--compact" : "ic-listen"}
        role="group"
        aria-label={`Listen to ${title}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {controls}
      </div>
      {enableSticky && sticky ? (
        <div className="ic-listen ic-listen--sticky" role="group" aria-label={`Continue listening to ${title}`}>
          <div className="ic-listen__sticky-row">
            <p className="ic-listen__sticky-title">{title}</p>
            <div className="ic-listen__controls">
              {!playing ? (
                <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={() => void playFile()}>
                  Resume
                </button>
              ) : (
                <button type="button" className="ic-btn-primary text-[0.62rem]" onClick={pauseFile}>
                  Pause
                </button>
              )}
              <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => skip(-SKIP_SECONDS)}>
                −{SKIP_SECONDS}s
              </button>
              <button type="button" className="ic-btn-ghost text-[0.6rem]" onClick={() => skip(SKIP_SECONDS)}>
                +{SKIP_SECONDS}s
              </button>
            </div>
          </div>
          <input
            className="ic-listen__range"
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(current, duration || 0)}
            onChange={(e) => onSeek(Number(e.target.value))}
            aria-label="Playback position"
          />
        </div>
      ) : null}
    </>
  );
}
