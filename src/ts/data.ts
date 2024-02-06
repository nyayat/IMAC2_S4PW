import * as JVocab from '@/ts/JlptVocab'
let lvl = 0

function slashParameters() {
  const page = window.location.pathname
  console.log('page')
  console.log(page.split('/').slice(1))
  console.log('---page---')
  return page.split('/').slice(1)
}

async function changePage() {
  const page_param = slashParameters()
  if (page_param[0] == '') console.log('vide')
  else if (page_param[0] == 'level') {
    lvl = Number(page_param[1][1])
  } else if (page_param[0] == 'word') console.log('word')
}

/* function init() {
  changePage()
}

window.onload = init() */

async function redirectPage(menu: string, option: string, numPage: number = 1) {
  const page = window.location.origin
  console.log(page + '/' + menu + '/' + option + '/' + numPage)
  //location.replace(page + '/' + menu + '/' + option)
  const stateObj = { foo: 'bar' }
  history.pushState(stateObj, '', page + '/' + menu + '/' + option + '/' + numPage)
  changePage()

  //location.replace(page + '/' + menu + '/' + option)
}

//await getData()

export { redirectPage, slashParameters, lvl, changePage }

/*
https://jlpt-vocab-api.vercel.app/, https://github.com/mistval/unofficial-jisho-api
*/
