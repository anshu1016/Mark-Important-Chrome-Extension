let myLinks = []
const inputElement = document.getElementById("inputEl")
const inputBtn = document.getElementById("inputBtn")
const deleteBtn = document.getElementById("deleteBtn")
const tabBtn = document.getElementById("tabBtn")
const ulEl = document.getElementById("ul-el")
const linksInLocalStorage = localStorage.getItem('myLinks');

inputBtn.addEventListener('click',function(){
    if(inputElement.value){
     myLinks.push(inputElement.value)
        render(myLinks)
        localStorage.setItem('myLinks',JSON.stringify(myLinks))
        inputElement.value = ""
    }

})

function render(links)
{
    let list =``
    for(let i=0;i<links.length;i++){
       list += `<li><a target="_blank"href = "${links[i]}">${links[i]}</a></li>` 
    }
    ulEl.innerHTML = list
}
if(linksInLocalStorage){
    myLinks = JSON.parse(localStorage.getItem('myLinks'))
    render(myLinks)
}
deleteBtn.addEventListener('dblclick',function(){
    localStorage.clear()
    myLinks =[]
    render(myLinks)
})
tabBtn.addEventListener('click',function(){
    chrome.extension.getURL('links.png')
    chrome.tabs.query({active:true, currentWindow:true},function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem('myLinks',JSON.stringify(myLinks))
        render(myLinks)
    })

})