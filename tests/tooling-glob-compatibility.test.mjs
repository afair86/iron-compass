import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
const require=createRequire(import.meta.url);
const estreeRequire=createRequire(require.resolve('@typescript-eslint/typescript-estree'));
const {minimatch}=estreeRequire('minimatch');
const version=JSON.parse(require('node:fs').readFileSync(join(dirname(estreeRequire.resolve('minimatch/package.json')),'package.json'),'utf8')).version;

test('Scoped tooling override resolves patched named API without changing legacy consumers',()=>{
  assert.equal(version,'11.0.1');assert.equal(typeof minimatch,'function');
  const eslintRequire=createRequire(require.resolve('eslint'));
  assert.equal(eslintRequire('minimatch/package.json').version,'3.1.5','unrelated legacy function API is not overridden');
});

test('Project-service default-project glob semantics remain compatible for repository paths',()=>{
  const cases=[
    ['config.ts','*.ts',true],['config.js','*.ts',false],['.config.ts','*.ts',true],
    ['nested/config.ts','*.ts',false],['nested/config.ts','**/*.ts',true],['config.ts','**/*.ts',true],
    ['app/page.tsx','app/**/*.tsx',true],['app/nested/page.tsx','app/**/*.tsx',true],
    ['lib/x.ts','app/**/*.tsx',false],['app/page.jsx','app/**/*.tsx',false],
    ['config.ts','config.{ts,js}',true],['config.js','config.{ts,js}',true],['config.json','config.{ts,js}',false],
    ['a.ts','[ab].ts',true],['c.ts','[ab].ts',false],['a.ts','?.ts',true],
    ['node_modules/thing.ts','!node_modules/**',false],['lib/thing.ts','!node_modules/**',true],
    ['.hidden/file.ts','**/*.ts',true],['folder/a.TS','**/*.ts',false],
  ];
  for(const [file,pattern,expected]of cases)assert.equal(minimatch(file,pattern,{dot:true}),expected,`${pattern} -> ${file}`);
});

test('Actual TypeScript parser still analyses project-service and ordinary TypeScript input',()=>{
  const parser=require('@typescript-eslint/parser');
  const ast=parser.parse('const value: number = 1;', {ecmaVersion:2022,sourceType:'module'});
  assert.equal(ast.body[0].type,'VariableDeclaration');
  assert.throws(()=>parser.parse('const = ;',{ecmaVersion:2022,sourceType:'module'}));
  const project=parser.parseForESLint('export const value = 1;',{
    filePath:join(process.cwd(),'quality-fixture.config.mjs'),tsconfigRootDir:process.cwd(),
    projectService:{allowDefaultProject:['quality-fixture.config.mjs'],loadTypeScriptPlugins:false},
    ecmaVersion:2022,sourceType:'module',
  });
  assert(project.services.program,'actual project-service default-project path must produce a program');
});
