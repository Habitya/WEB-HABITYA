// codex-update.js
import { readFileSync, writeFileSync } from 'fs';
import OpenAI from 'openai';

async function run() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const filePath = 'html/index.html';
  const original = readFileSync(filePath, 'utf8');

  const prompt = `
Eres Codex y vas a mejorar este HTML para:
- Añadir meta tags de SEO.
- Hacerlo mobile-first.
Devuélveme solo el HTML completo modificado.

### HTML ORIGINAL:
${original}
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3
  });

  const updated = res.choices[0].message.content;
  writeFileSync(filePath, updated, 'utf8');
  console.log('✅ index.html actualizado correctamente');
}

run().catch(err => {
  console.error('❌ Error al ejecutar Codex:', err);
  process.exit(1);
});
