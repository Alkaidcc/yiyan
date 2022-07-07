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
const export_button = document.querySelector('#export');
const card = document.querySelector('.card');
const container = document.querySelector('.container');
/**
 * @description - This function is used to get a random color from the colors array
 */
const changeColor = () => {
  let color = colors[Math.floor(Math.random() * colors.length)];
  body.style.backgroundColor = color;
  quote_text.style.color = color;
  quote_author.style.color = color;
  for (let button of buttons) {
    button.style.backgroundColor = color;
  }
  container.style.backgroundColor = color;
}


async function get(url=baseURL) {
  const response = await fetch(url)
  return response.json()
}
const getQuote = () => {
  get(baseURL).then(data => {
    quote_text.innerHTML = data.hitokoto
    quote_author.innerHTML = data.from
  })
}

new_quote.addEventListener('click', () => {
  changeColor();
  getQuote();
})
export_button.addEventListener('click', () => {
  let computed_height = document.querySelector('.card').offsetHeight + 40;
  const options = {
    width: 520,
    height: computed_height
  }
  domtoimage.toJpeg(document.querySelector('.container'),options)
    .then(dataUrl => {
      const link = document.createElement('a');
      link.download = '一言.jpeg';
      link.href = dataUrl;
      link.click();
    }).catch(error => {
      console.error('oops! something went wrong!', error);
    })

})


window.onload = getQuote;
