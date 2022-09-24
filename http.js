let cl = console.log;
const postInfo = document.getElementById('postInfo');

let baseUrl = 'https://jsonplaceholder.typicode.com/posts';


const genericMakeNetworkApiCall = (mName, url, body)=>{
    return new Promise((resolve, reject) =>{
        let xhr = new XMLHttpRequest();
        xhr.open(mName, url)
        xhr.onload = function(){
            if(xhr.status === 200 || xhr.status === 201){
                resolve(xhr.response)
                // console.log(xhr.response);
                let data = JSON.parse(xhr.response);
                templating(data);
            }else{
                reject('something went wrong');
            }
        }
        xhr.send(body)
    });
};
genericMakeNetworkApiCall('GET', baseUrl)
    .then(res => cl(res))
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