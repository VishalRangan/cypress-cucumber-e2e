const fs = require('fs');
const fetch = require('node-fetch');

async function main() {
  const prompt = `
Generate 5 test cases for a login form:
- 1 valid user (success)
- 4 invalid (wrong username, password, or blank fields)
Accepted usernames:
- standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user
Password for all: secret_sauce
Return only JSON array:
[{ "username": "standard_user", "password": "secret_sauce", "expected_result": true }, ...]
`;

  const res = await fetch('http://127.0.0.1:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.2:latest',
      prompt,
      stream: false,
    }),
  });

  const data = await res.json();
  let cleaned = data.response.match(/\[.*\]/s); // extract JSON array

  if (!cleaned) {
    console.error('❌ Could not extract JSON array:', data.response);
    process.exit(1);
  }

  try {
    const array = JSON.parse(cleaned[0]);
    fs.writeFileSync('cypress/fixtures/loginTestData.json', JSON.stringify(array, null, 2));
    console.log('✅ Fixture generated with', array.length, 'cases');
  } catch (err) {
    console.error('❌ JSON parse failed:', err.message);
    process.exit(1);
  }
}

main();