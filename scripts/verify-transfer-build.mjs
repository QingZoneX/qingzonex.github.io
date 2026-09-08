import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'); const npm=process.platform==='win32'?'npm.cmd':'npm'; const env={...process.env,GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:'QingZoneX/qingzonex.github.io',GITHUB_REPOSITORY_OWNER:'QingZoneX',SITE_URL:''};
function run(command,args){const result=spawnSync(command,args,{cwd:root,env,stdio:'inherit'});if(result.error)throw result.error;if(result.status!==0)throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`)}
run(npm,['run','build']); run(npm,['run','verify:dist']);
const dist=path.join(root,'dist'); const samples=[['index.html','zh-CN'],['en/index.html','en'],['zh-tw/index.html','zh-TW'],['docs/index.html','zh-CN'],['en/docs/index.html','en'],['zh-tw/docs/index.html','zh-TW']];
for(const [rel,lang] of samples){const html=fs.readFileSync(path.join(dist,rel),'utf8');if(!html.includes('https://qingzonex.github.io/'))throw new Error(`${rel} does not contain the QingZoneX canonical origin.`);if(html.includes('https://qingzonex.github.io/qingzonex.github.io/'))throw new Error(`${rel} retained the personal project-site base path.`);if(!new RegExp(`<html[^>]+lang=["']${lang}["']`,'i').test(html))throw new Error(`${rel} has the wrong HTML language.`);}
for(const rel of ['docs/index.html','en/docs/index.html','zh-tw/docs/index.html']){const html=fs.readFileSync(path.join(dist,rel),'utf8');if(!html.includes('https://github.com/QingZoneX/qingzonex.github.io/edit/main/'))throw new Error(`${rel} edit links do not target the transferred QingZoneX repository.`)}
const htmlFiles=[];function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(entry.name.endsWith('.html'))htmlFiles.push(full)}}walk(dist);for(const file of htmlFiles){const html=fs.readFileSync(file,'utf8');if(/(?:href|src)=["']\/qingzonex\.github\.io\//i.test(html))throw new Error(`${path.relative(dist,file)} still emits the temporary project-site base path.`)}
console.log(`Organization transfer build verified across ${htmlFiles.length} multilingual HTML files at https://qingzonex.github.io/.`);
