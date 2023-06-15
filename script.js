const content = document.querySelector('#content');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');

btn1.onclick = () => {
    showLoadingMessage();

    fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(data => {
            const memes = data.data.memes;
            const randomIndex = Math.floor(Math.random() * memes.length);
            const randomMeme = memes[randomIndex];

            const contentImg = document.createElement('img');
            contentImg.setAttribute('id', 'content-img');
            contentImg.setAttribute('src', randomMeme.url);

            clearAll();

            content.appendChild(contentImg);
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
        });
};

btn2.onclick = () => {
    showLoadingMessage();

    const jokeContainer = document.createElement('div');
    const firstPart = document.createElement('p');
    const secondPart = document.createElement('p');

    jokeContainer.setAttribute('id', 'joke-container');
    firstPart.setAttribute('id', 'first-part');
    secondPart.setAttribute('id', 'second-part');


  
    fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious')
      .then(response => response.json())
      .then(data => {
        if (data.type === 'single') {
            const joke = data.joke;
            firstPart.innerText = '- ' + joke;

            clearAll();
            
            jokeContainer.appendChild(firstPart);
            content.appendChild(jokeContainer);
        } 
        else if (data.type === 'twopart') {
            const setup = data.setup;
            const delivery = data.delivery;
            firstPart.innerText = '- ' + setup;
            secondPart.innerText = '- ' + delivery;

            clearAll();
            
            jokeContainer.appendChild(firstPart);
            jokeContainer.appendChild(secondPart);
            content.appendChild(jokeContainer);
        } 
        else {
            showErrorMessage();
        }
      })
      .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
      });
  };

btn3.onclick = () => {
    showLoadingMessage();

    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            const quote = data.content;
            const author = data.author || 'Unknown';

            const quoteContainer = document.createElement('div');
            const contentQuote = document.createElement('p');
            const contentAuthor = document.createElement('p');

            quoteContainer.setAttribute('id', 'quote-container');
            contentQuote.setAttribute('id', 'content-quote');
            contentAuthor.setAttribute('id', 'content-author');

            quoteContainer.appendChild(contentQuote);
            quoteContainer.appendChild(contentAuthor);

            contentQuote.textContent = '" ' + quote + ' "';
            contentAuthor.textContent = '- ' + author;

            clearAll();

            content.appendChild(quoteContainer);
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage();
        });
};

btn4.onclick = () => {
    showLoadingMessage();

    fetch('https://riddles-api.vercel.app/random')
        .then(response => response.json())
        .then(data => {
            const riddle = data.riddle;
            const answer = data.answer;

            const riddleContainer = document.createElement('div');
            const contentRiddle = document.createElement('p');
            const contentAnswer = document.createElement('p');
            const answerButton = document.createElement('button');

            riddleContainer.setAttribute('id', 'riddle-container');
            contentRiddle.setAttribute('id', 'content-riddle');
            contentAnswer.setAttribute('id', 'content-answer');
            answerButton.setAttribute('id', 'answer-button');
            riddleContainer.appendChild(contentRiddle);
            riddleContainer.appendChild(answerButton);
            riddleContainer.appendChild(contentAnswer);

            clearAll();

            answerButton.innerText = 'Reveal Answer';
            contentRiddle.innerText = riddle;
            contentAnswer.innerText = answer;
            contentAnswer.hidden = true;


            content.appendChild(riddleContainer);
            

            answerButton.onclick = () => {
                answerButton.disabled = true;
                contentAnswer.hidden = false;
            };
        })
        .catch(error => {
            console.log('Error: ', error);
            errorMsg();
        }); 
};



function clearAll() {
    content.innerHTML = '';
}

function showLoadingMessage() {
    clearAll();
    const loadingMsg = document.createElement('h1');
    loadingMsg.setAttribute('id', 'loadingMsg');
    loadingMsg.innerText = 'Loading...';
    content.appendChild(loadingMsg);
}

function showErrorMessage() {
    clearAll();
    const errorMsg = document.createElement('h1');
    errorMsg.setAttribute('id', 'errorMsg');
    errorMsg.innerText = 'Network Error!';
    content.appendChild(errorMsg);
}
