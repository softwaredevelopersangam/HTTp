let cl = console.log;
const postInfo = document.getElementById("postInfo");
const postFormInfo = document.getElementById("postFormInfo");
const title = document.getElementById("title");
const info = document.getElementById("info");
const btnSubmit = document.getElementById("btnSubmit");
const btnUpdate = document.getElementById("btnUpdate");

let baseUrl = "https://jsonplaceholder.typicode.com/posts";

let postArray = [];

const genericMakeNetworkApiCall = (mName, url, body) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(mName, url);
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 201) {
        resolve(xhr.response);
        // console.log(xhr.response);
        // let data = JSON.parse(xhr.response);
        // templating(data);
      } else {
        reject("something went wrong");
      }
    };
    xhr.send(body);
  });
};
genericMakeNetworkApiCall("GET", baseUrl)
  .then((res) => {
    postArray = JSON.parse(res);
    templating(postArray);
  })
  .catch(cl);
  const onEditHandler = (e) =>{
    // cl('event triggered')
    let getId = +e.dataset.id;
    // cl(getId)
    localStorage.setItem('setEditId', getId);
    let obj = postArray.find(post => post.id === getId);
    // cl(obj)
    title.value = obj.title;
    info.value = obj.body;

    btnSubmit.classList.add('d-none')
    btnUpdate.classList.remove('d-none');
  };
  const onDeleteHandler = (e)=>{
    // cl('event triggered')
    let deleteId = +e.dataset.id;
    let deleteUrl = `${baseUrl}/${deleteId}`;
    genericMakeNetworkApiCall('DELETE', deleteUrl);
    postArray = postArray.filter(post => post.id != deleteId);
    templating(postArray);
  };
const templating = (arr) => {
  let result = "";
  arr.forEach((ele) => {
    result += `
                    <tr>
                        <td>${ele.id}</td>
                        <td>${ele.userId}</td>
                        <td>${ele.title}</td>
                        <td>${ele.body}</td>
                        <td>
                            <button data-id="${ele.id}" class="btn btn-info" onclick="onEditHandler(this)">Edit</button>
                        </td>
                        <td>
                            <button data-id="${ele.id}" class="btn btn-danger" onclick="onDeleteHandler(this)">Delete</button>
                        </td>
                    </tr>
        `;
  });
  postInfo.innerHTML = result;
};

const onSubmitHandler = (e) => {
  e.preventDefault();
  let obj = {
    title: title.value,
    body: info.value,
    userId: Math.floor(Math.random() * 10) + 1,
  };
  genericMakeNetworkApiCall("POST", baseUrl, JSON.stringify(obj))
    .then((res) => {
      obj.id = JSON.parse(res).id;
      postArray.push(obj);
      templating(postArray);
    })
    .catch(cl);
  e.target.reset();
};
const onUpdateHandler = (e) =>{
    let getId = +localStorage.getItem('setEditId');
    postArray.forEach(post =>{
        if(post.id === getId){
            post.title = title.value;
            post.body = info.value;
        };
    })
    templating(postArray);
    let upDateObj = {
        title : title.value,
        body : info.value
    };
    let upDateUrl = `${baseUrl}/${getId}`;
    genericMakeNetworkApiCall('PATCH', upDateUrl, JSON.stringify(upDateObj))
    postFormInfo.reset();
    btnSubmit.classList.remove('d-none')
    btnUpdate.classList.add('d-none');
}

postFormInfo.addEventListener("submit", onSubmitHandler);
btnUpdate.addEventListener('click', onUpdateHandler);