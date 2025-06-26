// codex-update.js
const fs = require('fs');
const { OpenAI } = require('openai');

async function run() {
  // 1. Instancia el cliente con tu clave de entorno
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // 2. Lee el HTML que quieras actualizar
  const filePath = 'html/index.html';
  const original = fs.readFileSync(filePath, 'utf8');

  // 3. Prepara el prompt
  const prompt = `
Eres Codex y vas a mejorar este HTML para:
- Añadir meta tags de SEO.
- Hacerlo mobile-first.
Devuélveme solo el HTML completo modificado.

### HTML ORIGINAL:
${original}
`;

  // 4. Llamada a la API
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3
  });

  // 5. Escribe el resultado
  const updated = res.choices[0].message.content;
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log('✅ index.html actualizado correctamente');
}

run().catch(err => {
  console.error('❌ Error al ejecutar Codex:', err);
  process.exit(1);
});
