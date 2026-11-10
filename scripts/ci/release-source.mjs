/** Local deployment preflight; never read credentials or run a deploy here. */
export function requireCleanReleaseSource(source) {
  if (!source?.sourceCommit || source.worktreeDirty !== false || source.metadataConflict || source.exactCommitBuild !== true) {
    throw new Error('Release blocked: use a reviewed clean checkout with known, matching source identity. No build or deployment was started.');
  }
}
