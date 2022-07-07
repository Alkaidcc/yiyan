const colors = [
  '#6E85B7',
  '#898AA6',
  '#5F7161',
  '#68A7AD',
  '#8FBDD3',
  '#655D8A',
  '#D77FA1',
  '#73A9AD',
  '#B983FF',
]
const baseURL = 'https://v1.hitokoto.cn'
const new_quote = document.querySelector('#new_quote');
const body = document.querySelector('body');
const quote_text = document.querySelector('.quote-text');
const quote_author = document.querySelector('.quote-author');
const buttons = document.querySelectorAll('.button');
/**
 * @description - This function is used to get a random color from the colors array
 */
changeColor = () => {
  let color = colors[Math.floor(Math.random() * colors.length)];
  body.style.backgroundColor = color;
  quote_text.style.color = color;
  quote_author.style.color = color;
  for (let button of buttons) {
    button.style.backgroundColor = color;
  }
}

async function get(url=baseURL) {
  const response = await fetch(url)
  return response.json()
}
getQuote = () => {
  get(baseURL).then(data => {
    quote_text.innerHTML = data.hitokoto
    quote_author.innerHTML = data.from
  })
}

new_quote.addEventListener('click', () => {
  changeColor();
  getQuote();
})
window.onload = getQuote;
