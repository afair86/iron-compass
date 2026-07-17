import type { PropsWithChildren } from "react";
import "@/styles/stoic-dispatch.css";
import PageShell from "@/app/components/PageShell";
import { PageContainer } from "@/app/components/LayoutPrimitives";
import ArticleSchema from "./ArticleSchema";
import ArticleRelatedLinks from "./ArticleRelatedLinks";
import { getGriefArticleByPath, getRelatedGriefArticles } from "@/lib/articleHubs";

interface ArticleLayoutProps extends PropsWithChildren {
  eyebrow?: string;
  title: string;
  intro: string;
  path: string;
}

export default function ArticleLayout({ eyebrow = "Iron Compass Field Guide", title, intro, path, children }: ArticleLayoutProps) {
  const griefArticle = getGriefArticleByPath(path);
  const relatedArticles = getRelatedGriefArticles(path);

  return (
    <PageShell>
      <ArticleSchema
        title={title}
        description={intro}
        path={path}
        datePublished={griefArticle?.datePublished}
        dateModified={griefArticle?.datePublished}
      />
      <PageContainer width="narrow">
        <div className="ic-dispatch">
          <header className="ic-dispatch-hero space-y-5">
            <p className="ic-dispatch-label">{eyebrow}</p>
            <h1 className="ic-page-title mx-auto">{title}</h1>
            <p className="ic-dispatch-lede">{intro}</p>
            <div className="ic-dispatch-meta">
              <span>Field Guide</span>
              <span aria-hidden="true">·</span>
              <span>Grief &amp; Honour</span>
            </div>
            <div className="ic-stoic-rule ic-stoic-rule--wide" aria-hidden="true" />
          </header>
          <div className="ic-dispatch-body space-y-8">
            <div className="ic-dispatch-prose space-y-8">{children}</div>
            {relatedArticles.length > 0 ? <ArticleRelatedLinks articles={relatedArticles} /> : null}
          </div>
        </div>
      </PageContainer>
    </PageShell>
  );
}
