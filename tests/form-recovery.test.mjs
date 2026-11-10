import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import ts from 'typescript';

const source=readFileSync(new URL('../app/components/FormRecoveryNotice.tsx',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
const exports={};new Function('require','exports',compiled)(createRequire(import.meta.url),exports);
const render=props=>renderToStaticMarkup(createElement(exports.default,{id:'recovery-error',error:'Could not confirm delivery.',...props}));

test('Contact recovery preserves uncertain delivery and exposes the already-approved support route',()=>{
  const html=render({kind:'contact'});
  assert.match(html,/id="recovery-error" role="alert"/);
  assert.match(html,/Your details are still here/);
  assert.match(html,/Review them before trying again/);
  assert.match(html,/href="mailto:/);
  assert.match(html,/Email us instead/);
  assert.doesNotMatch(html,/Message sent|not delivered|not sent|automatically retry/i);
});

test('Signup recovery links to support without putting an email or customer input in a URL',()=>{
  const html=render({kind:'signup'});
  assert.match(html,/Your email is still here/);
  assert.match(html,/href="\/contact"/);
  assert.match(html,/Get help/);
  assert.doesNotMatch(html,/href="[^\"]*[?&]/);
});

test('Provider error text remains escaped, never executable HTML or false acknowledgement',()=>{
  const html=render({kind:'contact',error:'<img src=x onerror=alert(1)>'});
  assert(!html.includes('<img'));
  assert(html.includes('&lt;img'));
  assert.match(html,/role="alert"/);
});
