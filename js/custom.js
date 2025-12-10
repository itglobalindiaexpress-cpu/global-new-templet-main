
//scroll to top js start
$(document).ready(function(){
resizeBody();
IndustriesSlider();
BannerSlider();

  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('#myBtn').fadeIn(200);
      } else {
      $('#myBtn').fadeOut(200);
     }
  });

  $('#myBtn').click(function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, 500);
  });

//   window.onscroll = function (e) {  
//     if(document.documentElement.scrollTop>100){
//         $(".header").addClass("fixed-top");
//       }
//       else{
//         $(".header").removeClass("fixed-top");
//       }
// }

$(window).resize(function(){
  resizeBody();
});

}); 

//scroll to top js end


let i = 0;

const randomizeText = () => {
  const phrase = document.querySelector('.random-word');
  const compStyles = window.getComputedStyle(phrase);
  const animation = compStyles.getPropertyValue('animation');
  const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;
  //const animationTime = 4000;
  const phrases = ['15+ years of experience', '40,000+ satisfied clients', '200+ contries we provide services','For Best Option Choose Global  India Express'];
  
  //i = randomNum(i, phrases.length);
  const newPhrase = phrases[i];
  i++
  if(i==4)
  {
    i=0;
  }
  setTimeout(() => {
    phrase.textContent = newPhrase;
  }, 120); // time to allow opacity to hit 0 before changing word
}

const randomNum = (num, max) => {
  let j = Math.floor(Math.random() * max);
  
  // ensure diff num every time
  if (num === j) {
    return randomNum(i, max);
  } else {
    return j;
  }
}

const getAnimationTime = () => {
  const phrase = document.querySelector('.random-word');
  const compStyles = window.getComputedStyle(phrase);
  let animation = compStyles.getPropertyValue('animation');
  
  // firefox support for non-shorthand property
  animation != "" ? animation : animation = compStyles.getPropertyValue('-moz-animation-duration');
  
    // webkit support for non-shorthand property
  animation != "" ? animation : animation = compStyles.getPropertyValue('-webkit-animation-duration');
  
  
  const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;
  return animationTime;
}

randomizeText();
setInterval(randomizeText, getAnimationTime());


//menu js start
function resizeBody(){
  let width = $(window).width();
  console.log(width);
  if(width>1600){
    console.log($("#menu-header").attr("class"));
    $("#menu-header").attr("class","container-fluid");
  }
  else{
    console.log($("#menu-header").attr("class"));
    $("#menu-header").attr("class","container-fluid");
  }
console.log(width);
   if(width<992){
    $(".menu-submenu ul").addClass("sub-menu");
    $(".menu-submenu").removeClass("sub-menu");
  }
  else{
    $(".menu-submenu").addClass("sub-menu");
    $(".menu-submenu ul").removeClass("sub-menu");
  }
    if(width>1600){
    console.log($("#bannercont").attr("class"));
    $("#bannercont").attr("class","container");
  }
  else{
    console.log($("#bannercont").attr("class"));
    $("#bannercont").attr("class","container-fluid");
  }
}

//menu js end

//banner slider js start
function BannerSlider(){
$('#banner-slider').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    nav:false,
    dots:true,
    autoplaySpeed: 1000,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:1,
        },
        1000:{
            items:1,
        }
    }
})
}
//banner slider js end


//industries slider js start
function IndustriesSlider(){
$('#industries-slider').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    nav:false,
    dots:false,
    autoplaySpeed: 1000,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
        },
        600:{
            items:3,
        },
        1000:{
            items:6,
        }
    }
})
}
//industries slider js end






