const url_vocab = 'https://jlpt-vocab-api.vercel.app/api/words'

let listVocab

await searchLevel(5)

function sortJ(a: { furigana: string; word: string }, b: { furigana: string; word: string }) {
  const a_tmp = a.furigana == '' ? a.word : a.furigana
  const b_tmp = b.furigana == '' ? b.word : b.furigana
  return a_tmp > b_tmp
}

async function search(word: string) {
  const url_word = url_vocab + '?word=' + word
  console.log(url_word)
  listVocab = res(url_word)

  const response = await fetch(url_word)
  const json = await response.json()
  listVocab = json.sort(sortJ)
}

async function searchLevel(level: number) {
  const url_level = url_vocab + '/all?level=' + level
  console.log(url_level)

  const response = await fetch(url_level)
  const json = await response.json()
  listVocab = json.sort(sortJ)
  console.log('list : ')
  console.log(listVocab)
}

async function searchRandom() {
  const url_random = url_vocab + '/random'
  console.log(url_random)

  const response = await fetch(url_random)
  const json = await response.json()
  listVocab = json.sort(sortJ)
}

async function res(url: string) {
  const response = await fetch(url)
  const json = await response.json()
  console.log(json)
  return json
}

export { search, searchLevel, searchRandom, listVocab }
