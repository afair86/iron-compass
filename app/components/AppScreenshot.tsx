"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import styles from "./app-screenshot.module.css";

type AppScreenshotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  plan: string;
};

/** Inspect an existing product image without leaving the feature or simulating app use. */
export default function AppScreenshot({ title, plan, ...image }: AppScreenshotProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  function close() {
    dialog.current?.close();
  }

  return (
    <div className={styles.preview}>
      <a
        href={image.src}
        className={styles.open}
        aria-label={`View full screen: ${title}`}
        aria-haspopup="dialog"
        onClick={(event) => {
          // Preserve open-in-new-tab and an ordinary image link without JavaScript.
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          if (!dialog.current?.showModal) return;
          event.preventDefault();
          dialog.current.showModal();
        }}
      >
        <Image {...image} alt={image.alt} sizes="(min-width: 900px) 320px, 75vw" />
        <span className={styles.hint}>View full screen</span>
      </a>
      <dialog
        ref={dialog}
        data-app-preview
        className={styles.dialog}
        aria-labelledby={headingId}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
        }}
      >
        <div className={styles.toolbar}>
          <div>
            <h2 id={headingId}>{title}</h2>
            <p>{plan} · Iron Compass AI app example</p>
          </div>
          <button type="button" onClick={close} autoFocus>Close</button>
        </div>
        {/* The full image is fetched on demand, rather than preloading four extra screenshots. */}
        <Image {...image} alt={image.alt} unoptimized loading="lazy" className={styles.fullImage} />
      </dialog>
    </div>
  );
}
