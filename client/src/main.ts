import bot from './assets/bot.png';
import user from './assets/user.png';

const form = document.querySelector('form');
const chatContainer = document.getElementById('chat-container')

if (chatContainer === null) {
  throw new Error('chatContainer is null');
}

if (form === null) {
  throw new Error('form is null');
}


let loadInterval: any;


//loading animation for the bot
function loader(element: HTMLElement) {
  element.textContent = '';
  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300)
}

// typewriter effect on bot message
function typeText(element: HTMLElement, text: string) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;

    } else {

      clearInterval(interval);
    }
  })
}

// create unique id for each user
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// insert user profile and message in div
function chatStripe(isAi: boolean, value: string, uniqueId?: string) {
  return (
    `
  <div class="wrapper ${isAi && 'ai'}">
    <div class="chat">
      <div class="profile">
        <img
          src="${isAi ? bot : user}"
          alt="${isAi ? 'bot' : 'user'}"
          />
      </div>
      <div class="message" id="${uniqueId}">${value}</div>
    </div>
  </div>
  `
  )
}
//submit form
const handleSubmit = async (event: any) => {
  event.preventDefault();


  let data = new FormData(form);

  const uniqueId = generateUniqueId();


  //user's chatstripe



  chatContainer.innerHTML += chatStripe(false, data.get('prompt') as string || '');

  form.reset();

  //bot's chatstripe
  chatContainer.innerHTML += chatStripe(true, '', uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId) as HTMLElement;

  loader(messageDiv);

  //fetch data from the server

  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })

  })

  //clear loading animation
  clearInterval(loadInterval);
  messageDiv.innerHTML = '';
  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = 'There was an error';

    alert(err);

    chatContainer.scrollTop = chatContainer.scrollHeight;
  };
};
//add event listeners
form.addEventListener('submit', (event) => {
  handleSubmit(event)
});
form.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleSubmit(event);
  }
});
