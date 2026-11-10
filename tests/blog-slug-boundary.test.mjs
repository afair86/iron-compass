import test from 'node:test';
import assert from 'node:assert/strict';
import { getAllPosts, tryGetPostBySlug, getPostBySlug } from '../lib/blog.ts';

test('All published article slugs still load through the public helper',()=>{
 const posts=getAllPosts();assert(posts.length>80);
 for(const post of posts){assert.equal(tryGetPostBySlug(post.slug)?.meta.title,post.title);assert.equal(getPostBySlug(post.slug).meta.title,post.title);}
});
test('Filesystem paths and reserved aliases cannot bypass the public article boundary',()=>{
 for(const slug of ['_reviews/5am-standard/01-article-draft','../blog/_reviews/5am-standard/01-article-draft','..\\blog\\_reviews\\5am-standard\\01-article-draft','./_template','../blog/_template','%2e%2e%2fblog','/first-useful-ai-assistant','First-Useful-Ai-Assistant','a'.repeat(201),'',null,{},['first-useful-ai-assistant']]){
  assert.equal(tryGetPostBySlug(slug),null);
  assert.throws(()=>getPostBySlug(slug),/Invalid blog slug/);
 }
 for(const slug of ['_template','sample-post','hello-world','cash-buffer-system','quality-definitely-missing-post'])assert.equal(tryGetPostBySlug(slug),null);
});
