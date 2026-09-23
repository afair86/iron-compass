import "@/styles/stoic-dispatch.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageShell from "@/app/components/PageShell";
import { PageContainer } from "@/app/components/LayoutPrimitives";
import ShiftWorkerRoutineBuilder from "@/app/components/ShiftWorkerRoutineBuilder";

export const metadata: Metadata = {
  title: "LOCAL REVIEW — 5 A.M. article + Shift Worker Routine",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  const parsed = new Date(value);
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(parsed);
}

export default function FiveAmRoutineReviewPage() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content/blog/_reviews/5am-standard/05-article-draft-v3.mdx"),
    "utf8",
  );
  const { data, content } = matter(raw);
  const [beforeTool, afterTool = ""] = content.split("<!-- BUILD_ROUTINE_TOOL -->");

  const title = String(data.title || "The 5 A.M. Standard");
  const description = String(data.description || data.metaDescription || "");
  const image = typeof data.image === "string" ? data.image : undefined;
  const date = String(data.date || "");

  return (
    <PageShell>
      <PageContainer width="narrow">
        <div className="ic-dispatch py-8">
          <p className="ic-review-banner">
            Local review only — not indexed, not live. Published article at{" "}
            <a className="underline" href="/blog/5am-standard-own-your-morning">
              /blog/5am-standard-own-your-morning
            </a>{" "}
            is unchanged until you approve this draft. Listen audio is hidden until narration is regenerated to match
            this draft (needs your approval).
          </p>

          <header className="ic-dispatch-hero space-y-5">
            <h1 className="ic-page-title mx-auto">{title}</h1>
            {image ? (
              <figure className="ic-dispatch-hero-media">
                <Image
                  src={image}
                  alt="Quiet morning energy — calm, ready, and set for a good day"
                  width={1600}
                  height={900}
                  priority
                  className="ic-dispatch-hero-media__img"
                  sizes="(max-width: 768px) 100vw, 720px"
                />
              </figure>
            ) : null}
            <p className="ic-dispatch-lede">{description}</p>
            <div className="ic-dispatch-meta">
              {date ? <time dateTime={date}>{formatDate(date)}</time> : null}
              <span aria-hidden="true">·</span>
              <span>Field Dispatch · Review draft</span>
            </div>
            <div className="ic-stoic-rule ic-stoic-rule--wide" aria-hidden="true" />
          </header>

          <article className="ic-dispatch-prose">
            <MDXRemote
              source={beforeTool}
              components={{
                Link,
                h1: (props) => <h2 {...props} />,
              }}
            />
          </article>

          <ShiftWorkerRoutineBuilder showReviewBuild />

          <article className="ic-dispatch-prose">
            <MDXRemote
              source={afterTool}
              components={{
                Link,
                h1: (props) => <h2 {...props} />,
              }}
            />
          </article>
        </div>
      </PageContainer>
    </PageShell>
  );
}
