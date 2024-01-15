
async function loadDB() {
  const response = await fetch('https://genshin.jmp.blue');
  const test = await response.json();

  console.log(test); 
  // logs [{ name: 'Joker'}, { name: 'Batman' }]
}

loadDB();