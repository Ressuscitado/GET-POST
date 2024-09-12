//https://jsonplaceholder.typicode.com/posts
async function readPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...';

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if (json.length > 0) {
        postArea.innerHTML = '';

        for(let i in json){
            let postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}<hr/></div>`;
            postArea.innerHTML += postHtml; //o ideal seria criar cd elemento acima e dps usar o append
        }
    } else {
        postArea.innerHTML = 'Nenhum post encontrado';
    }
}

async function addNewPost(title, body) {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 1
            })
        }
    );
    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';
    alert('Post inserido com sucesso!');
    readPosts();
}


document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if(title && body) {
        addNewPost(title, body);
    } else {
        alert('Preencha todos os campos!')
    }
});

readPosts();