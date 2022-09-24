let cl = console.log;
const postInfo = document.getElementById('postInfo');
const postFormInfo = document.getElementById('postFormInfo');
const title = document.getElementById('title');
const info = document.getElementById('info');
let baseUrl = 'https://jsonplaceholder.typicode.com/posts';

let postArray = [];

const genericMakeNetworkApiCall = (mName, url, body)=>{
    return new Promise((resolve, reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open(mName, url)
        xhr.onload = function(){
            if(xhr.status === 200 || xhr.status === 201){
                resolve(xhr.response)
                // console.log(xhr.response);
                // let data = JSON.parse(xhr.response);
                // templating(data);
            }else{
                reject('something went wrong');
            }
        }
        xhr.send(body)
    });
};
genericMakeNetworkApiCall('GET', baseUrl)
    .then(res => {
        postArray = (JSON.parse(res));
        templating(postArray);
        localStorage.setItem('stdArray', JSON.stringify(postArray));
    })
    .catch(cl)

const templating = (arr)=>{
    let result ='';
    arr.forEach(ele =>{
        result += `
                    <tr>
                        <td>${ele.id}</td>
                        <td>${ele.userId}</td>
                        <td>${ele.title}</td>
                        <td>${ele.body}</td>
                    </tr>
        `;
    });
    postInfo.innerHTML = result;
};

const onSubmitHandler = (e) =>{
    e.preventDefault();
    let obj ={
        title : title.value,
        body : info.value,
        userId : Math.floor(Math.random()*10) + 1,
    };
    genericMakeNetworkApiCall('POST', baseUrl, JSON.stringify(obj))
        .then(res => {
            obj.id = JSON.parse(res).id;
            postArray.push(obj);
            templating(postArray);
        })
        .catch(cl)
    e.target.reset();
}

postFormInfo.addEventListener('submit', onSubmitHandler);
