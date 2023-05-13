const alltabsbody=document.querySelectorAll('.tab-body-single');
const alltabshead=document.querySelectorAll('.tab-head-single');
const searchform=document.querySelector('.app-header-search');
let seachlist=document.getElementById('search-list');
let activetab=1,alldata;
const init=()=>
{
    showactivetabbody();
    showactivetabhead();

}
const showactivetabhead=()=>
{
    alltabshead[activetab-1].classList.add('active-tab');
}
const showactivetabbody=()=>
{
    hidealltabbody();
    alltabsbody[activetab-1].classList.add('show-tab');
}
const hidealltabbody=()=>
{
    alltabsbody.forEach((s)=>
    {
        s.classList.remove('show-tab');
    });
}
const hidealltabhead=()=>
{
    alltabshead.forEach((s)=>
    {
        s.classList.remove('active-tab');
    });
}

// event listner
window.addEventListener('DOMContentLoaded',()=>
{
    init();
})

// button event listner
alltabshead.forEach((s)=>
{
    s.addEventListener('click',()=>
    {
        hidealltabhead();
        activetab=s.dataset.id;
        showactivetabhead();
        showactivetabbody();


    })
})

// search form submision
const getinputvalue =(e)=>
{
    e.preventDefault();
    let searchText=searchform.search.value;
    // console.log(searchText);
    fetchallsuperhero(searchText);
}
searchform.addEventListener('submit',getinputvalue);


// api key = 752068313021478
const fetchallsuperhero=async(searchText)=>
{
    let url=`https://superheroapi.com/api.php/752068313021478/search/${searchText}`;
    try
    {
        const response=await fetch(url);
        alldata=await response.json();
        if(alldata.response=='success')
        {
            console.log(alldata.results);
            showSearchList(alldata.results);
        }

    }
    catch(error)
    {
        console.log(error);
    }
}

const showSearchList=(data)=>
{
    seachlist.innerHTML="";
    data.forEach(d=>
        {
            const divelem=document.createElement('div');
            divelem.classList.add('search-list-item');
            divelem.innerHTML=`
            <img src="${d.image.url?d.image.url : ""}" alt="">
            <p data-id="${d.id}">${d.name}</p>
            `;
            seachlist.appendChild(divelem);

        })
}

searchform.search.addEventListener('keyup',()=>
{
    if(searchform.search.value.length>1)
    {
        fetchallsuperhero(searchform.search.value);
    }
    else
    {
        seachlist.innerHTML="";
    }
})

seachlist.addEventListener('click',(e)=>
{
    let searchid=e.target.dataset.id;
    let singledata=alldata.results.filter(singledata=>
        {
            return searchid==singledata.id;
        })
        showsuperherodetails(singledata);
        seachlist.innerHTML="";
})
const showsuperherodetails=(data)=>
{
    console.log(data);
    document.querySelector('.app-body-content-thumbnail').innerHTML=`<img src="${data[0].image.url}">`;
    document.querySelector('.name').textContent=data[0].name;
    document.querySelector('.powerstats').innerHTML=`
    <li>
    <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>intelligent</span>
    </div>
    <span>${data[0].powerstats.intelligence}</span>
</li>
<li>
    <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>strength</span>
    </div>
    <span>${data[0].powerstats.strength}</span>
</li>
<li>
    <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>speed</span>
    </div>
    <span>${data[0].powerstats.speed}</span>
</li>
<li>
    <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>durability</span>
    </div>
    <span>${data[0].powerstats.durability}</span>
</li>
<li>
    <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>power</span>
    </div>
    <span>${data[0].powerstats.power}</span>
</li>
<li>
    <div>
        <i class="fa-solid fa-shield-halved"></i>
        <span>combat</span>
    </div>
    <span>${data[0].powerstats.combat}</span>
</li>
    `;

document.querySelector('.biography').innerHTML=`
<li>
<span>full name</span>
<span>${data[0].biography['full-name']}</span>
</li>
<li>
<span>alert-egos</span>
<span>${data[0].biography['alter-egos']}</span>
</li>
<li>
<span>aliases</span>
<span>${data[0].biography['aliases']}</span>
</li>
<li>
<span>place of birth</span>
<span>${data[0].biography['place-of-birth']}</span>
</li>
<li>
<span>first-apperance</span>
<span>${data[0].biography['first-appearance']}</span>
</li>
<li>
<span>publisher</span>
<span>${data[0].biography['publisher']}</span>
</li>
`;


document.querySelector('.appreance').innerHTML=`
<li>
<span>
    <i class="fas fa-star"></i>
    gender
</span>
<span>${data[0].appearance['gender']}</span>
</li>
<li>
<span>
    <i class="fas fa-star"></i>
    race
</span>
<span>${data[0].appearance['race']}</span>
</li>
<li>
<span>
    <i class="fas fa-star"></i>
    height
</span>
<span>${data[0].appearance['height'][0]}</span>
</li>
<li>
<span>
    <i class="fas fa-star"></i>
    weight
</span>
<span>${data[0].appearance['weight'][0]}</span>
</li>
<li>
<span>
    <i class="fas fa-star"></i>
    eye-color
</span>
<span>${data[0].appearance['eye-color']}</span>
</li>
<li>
<span>
    <i class="fas fa-star"></i>
    hair-color
</span>
<span>${data[0].appearance['hair-color']}</span>
</li>
`;

document.querySelector('.connections').innerHTML=`
<li>
 <span>group-affilation</span>
<span>${data[0].connections['group-affiliation']} </span>
</li>
<li>
<span>relative</span>
<span>${data[0].connections['relatices']}</span>
</li>
`;
}