"use strict";

function loadScript(path) {
    return new Promise(function( resolve, reject){
        const axiosScriptTag = document.createElement('script');
        axiosScriptTag.setAttribute('src', path);
        axiosScriptTag.setAttribute("defer", "defer");                  
        axiosScriptTag.onload = ()=> resolve(path);       
        axiosScriptTag.onerror = ()=>reject( new Error('Whoops!') ); 
        document.head.append(axiosScriptTag);                         
    });    
}

let loadAxios = loadScript('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');

loadAxios
    .then( ()=> {
        axios.get("https://randomuser.me/api")

        .then( response => {            
            if (response.status === 200) {
              let data = response.data.results; 
              for (const randomuser of data) {
                const personName = document.createElement('h1');
                personName.setAttribute('style',`display: block; text-align: center; padding-bottom: 20px;`);
                personName.innerText = `${randomuser.name.first} ${randomuser.name.last} `;
                document.body.appendChild(personName);
                const imgTag = document.createElement('img');
                imgTag.setAttribute('src',randomuser.picture.large);
                imgTag.setAttribute('style',`display: block; margin: 0 auto; border-radius: 50%;`);
                document.body.appendChild(imgTag);
              }                
            } 
          })

        .catch( error => {
            if (error.response) {
                if(error.response.status === 404){
                    {
                        alert(`API Adress error ${ error.response.status }`);
                    }
                }else{
                    console.log(error.response.status);
                }
            }
        })  
    })
    
    .catch( reject => console.log(reject))
