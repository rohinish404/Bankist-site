'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section = document.querySelector('.section')
const nav = document.querySelector('.nav')
const section1 = document.querySelectorAll('.section')


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
document.querySelector('.btn--scroll-to').addEventListener('click',function(e){
    e.preventDefault()

    section.scrollIntoView({behavior:"smooth"})
})

document.querySelector('.nav__links').addEventListener('click',function(e){
    e.preventDefault()

    if(e.target.classList.contains('nav__link')){
        const id = e.target.getAttribute('href')
        console.log(id);
        document.querySelector(id).scrollIntoView({behavior:"smooth"})
    }
})

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')


tabsContainer.addEventListener('click',function(e){
    e.preventDefault()
    const clicked = e.target.closest('.operations__tab')
    console.log(clicked);

    if(!clicked) return
    
    tabs.forEach(tab => {
        tab.classList.remove('operations__tab--active')
    })
    clicked.classList.add('operations__tab--active')

    tabsContent.forEach(t => {
        t.classList.remove('operations__content--active')
    })

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

nav.addEventListener('mouseover',function(e){
    hover(0.5,e)
})
nav.addEventListener('mouseout',function(e){
    hover(1,e)
})


const hover = function(opacity,event){
    event.preventDefault()
    const link = event.target
    console.log(link);
    const targett = link.closest('.nav').querySelectorAll('.nav__link')
    console.log(targett);
    const logo = link.closest('.nav').querySelector('img')

    targett.forEach(function(ele){
        if(ele !== link){
            ele.style.opacity = opacity
        }
    })
    logo.style.opacity = opacity
}
const header = document.querySelector('.header')
const obsFunction = function(entries){
    const [entry]  = entries
    if(!entry.isIntersecting){
        nav.classList.add('sticky')
    }
    else{
        nav.classList.remove('sticky')
    }
    
}
const options = {
    root:null,
    threshold:0,
    rootMargin: '-50px'

}
const headerObserver = new IntersectionObserver(obsFunction,options)
headerObserver.observe(header)

const obsFunction2 = function(entries,observer){
    const [entry] = entries
    // console.log(entry);
    if(!entry.isIntersecting)return;
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}
const options2 = {
    root:null,
    threshold:0.15,
}

const scrollObserver = new IntersectionObserver(obsFunction2,options2)

section1.forEach(function(el){
    el.classList.add('section--hidden')
    scrollObserver.observe(el)
})


const lazy_img = document.querySelectorAll('img[data-src]')


const loading = function(entries,observer){
    const [entry] = entries
    if(!entry.isIntersecting) return

    entry.target.src = entry.target.dataset.src
    
    
    entry.target.addEventListener('load',function(){
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
}

const loadObserver = new IntersectionObserver(loading,{
    root:null,
    threshold:0,
    rootMargin:'-200px'
})

lazy_img.forEach(function(el){
    loadObserver.observe(el)
})



