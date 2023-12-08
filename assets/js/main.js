const gnbSlide = new Swiper('.header .gnb .swiper', {
    spaceBetween: 10,
    slidesPerView: 4,
});

const visualSlide = new Swiper('.visual .swiper.visual-list', {
    spaceBetween: 20,
});

const hallSlide = new Swiper('.visual .swiper.hall-list', {
    spaceBetween: 20,
    slidesPerView: 5,
});

const dailySlide = new Swiper('.daily .swiper', {
    spaceBetween: 20,
    slidesPerView: 3,
});

const hotdealSlide = new Swiper('.hotdeal .swiper', {
    spaceBetween: 20,
    slidesPerView: 3,
});

const rankingSlide = new Swiper('.ranking .swiper', {
    spaceBetween: 20,
    slidesPerView: 3,
});


const link = document.querySelector('.info-area');
const businessInfoArea = document.querySelector('.businessinfo-area');

link.addEventListener('click', function(event) {
    event.preventDefault();
    const currentDisplay = window.getComputedStyle(businessInfoArea).display;
    businessInfoArea.style.display = currentDisplay === 'none' ? 'block' : 'none';
});

const familyBtn = document.querySelector('.familybtn');
const familyWrapper = document.querySelector('.family-wrapper');

familyBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const currentDisplay = window.getComputedStyle(familyWrapper).display;
    familyWrapper.style.display = currentDisplay === 'none' ? 'block' : 'none';
});





const remainTime = document.querySelector(".timer");

function diffDay() {
    const settingTime = new Date("2023-12-25");
    const todayTime = new Date();
    
    const diff = settingTime - todayTime;

    const diffDay = String(Math.floor(diff / (1000*60*60*24)));
    const diffHour =String(Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0");
    const diffMin = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0");
    const diffSec = String(Math.floor(diff / 1000 % 60)).padStart(2,"0");
    
    remainTime.innerText = `${diffHour}:${diffMin}:${diffSec}초`;
}
diffDay();
setInterval(diffDay, 1000);


$(document).click(function(e){
    if($('.group-familysite').has(e.target).length == 0){
      $('.family-wrapper').hide()
    }

})

$('.recomm .tab-item a').click(function(e){
    e.preventDefault();
    type=$(this).data('type');

    recommlist(type);
})
recommlist("TV역대급할인")
function recommlist(type){
    fetch('./assets/data/product.json')
    .then(res => res.json())
    .then(json => {
        recommList = json.recommList;
        
        sortData = recommList.filter(function(parm){
            return parm.cate.indexOf(type) >= 0;
        })
    
        let recommHTML = '';
        sortData.forEach((element, index) => {
            recommHTML += `<li class="prd-item">
                                <div class="prd-wrap">
                                    <a href="">
                                        <img src="${element.thumbnail}" alt="">
                                    <p>
                                        <span class="vendor">[${element.vendor}]</span>
                                        ${element.title}
                                    </p>
                                    </a>
                                </div>
                                <div class="btn-wrap">
                                    <a href="">
                                        <p>
                                            <span>로그인 특가</span>
                                        </p>
                                    </a>
                                </div>
                            </li>`;
        });
    
        $('.recomm .tab ul').html(recommHTML);
    })
}