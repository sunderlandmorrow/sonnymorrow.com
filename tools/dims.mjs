import fs from 'fs';
// Returns [width, height] for JPEG or PNG files.
export function dims(p){const b=fs.readFileSync(p);
  if(b.readUInt32BE(0)===0x89504E47)return [b.readUInt32BE(16),b.readUInt32BE(20)];
  let i=2;while(i<b.length){if(b[i]!==0xFF){i++;continue}const m=b[i+1];const len=b.readUInt16BE(i+2);if(m>=0xC0&&m<=0xCF&&![0xC4,0xC8,0xCC].includes(m))return [b.readUInt16BE(i+7),b.readUInt16BE(i+5)];i+=2+len}return null}
if(process.argv[2]){for(const f of fs.readdirSync(process.argv[2]))console.log(f,dims(process.argv[2]+'/'+f)?.join('x'),Math.round(fs.statSync(process.argv[2]+'/'+f).size/1024)+'K')}
