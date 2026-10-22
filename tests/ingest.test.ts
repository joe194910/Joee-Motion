import {mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import JSZip from 'jszip';
import {describe,it,expect} from 'vitest';
import {ingestSource,stripHtml} from '../src/ingest/parsers';
describe('source ingestion',()=>{
  it('extracts visible HTML and removes executable content',()=>{const text=stripHtml('<h1>Title</h1><script>steal()</script><p>Body &amp; proof</p>');expect(text).toContain('Title');expect(text).toContain('Body & proof');expect(text).not.toContain('steal')});
  it('extracts paragraphs and entities from DOCX without mammoth',async()=>{const dir=mkdtempSync(join(tmpdir(),'joee-docx-'));try{const zip=new JSZip();zip.file('word/document.xml','<?xml version="1.0"?><w:document xmlns:w="x"><w:body><w:p><w:r><w:t>First &amp; proof</w:t></w:r></w:p><w:p><w:r><w:t>Second line</w:t></w:r></w:p></w:body></w:document>');const file=join(dir,'sample.docx');writeFileSync(file,await zip.generateAsync({type:'nodebuffer'}));const result=await ingestSource(file);expect(result.kind).toBe('docx');expect(result.text).toContain('First & proof');expect(result.text).toContain('Second line');expect(result.metadata.parser).toBe('native-ooxml')}finally{rmSync(dir,{recursive:true,force:true})}});
});
