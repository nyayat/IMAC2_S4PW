import * as Data from '@/ts/data'

const url_vocab = 'https://jlpt-vocab-api.vercel.app/api/words'

let listVocab

let lvl

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
  console.log('lvl : ' + lvl)

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

window.onload = function () {
  const page_param = Data.slashParameters()
  if (page_param[0] == '') console.log('vide')
  else if (page_param[0] == 'level') {
    lvl = page_param[1][1]
  } else if (page_param[0] == 'word') console.log('word')

  /*
  page vocab : word/le_mot
  liste vocab : level/N1
  */
}

console.log('lvl' + lvl)
await searchLevel(lvl)

export { search, searchLevel, searchRandom, listVocab, lvl }
