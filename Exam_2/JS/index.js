$(document).ready(function () {
    $("#loading .sk-chase").fadeOut(1000, function () {
        $("#loading").fadeOut(700, function () {
            $("#loading").remove();
            $("body").css("overflow", "auto");
        })
    });
});


$(".button-navbar").click(function () {

    let Check = document.querySelector(".button-navbar i").classList;

    if (Array.from(Check).includes("fa-times")) {
        Close_Navbar();
    }
    else {
        Check.add("fa-times");
        $("nav").animate({ left: "0" }, 600);
        Start_Animat_Nav_Item();
    }
})

function Close_Navbar() {
    let Check = document.querySelector(".button-navbar i").classList;

    Check.remove("fa-times");
    $("nav").animate({ left: "-227px" }, 600);
    End_Animat_Nav_Item();
}

function Start_Animat_Nav_Item() {
    $(".nav-item-list-1").animate({ top: "0", opacity: "1" }, 800);
    $(".nav-item-list-2").animate({ top: "0", opacity: "1" }, 900);
    $(".nav-item-list-3").animate({ top: "0", opacity: "1" }, 1000);
    $(".nav-item-list-4").animate({ top: "0", opacity: "1" }, 1100);
    $(".nav-item-list-5").animate({ top: "0", opacity: "1" }, 1200);
}

function End_Animat_Nav_Item() {
    $(".nav-item-list-1").animate({ top: "300%", opacity: "0" }, 800);
    $(".nav-item-list-2").animate({ top: "300%", opacity: "0" }, 900);
    $(".nav-item-list-3").animate({ top: "300%", opacity: "0" }, 1000);
    $(".nav-item-list-4").animate({ top: "300%", opacity: "0" }, 1100);
    $(".nav-item-list-5").animate({ top: "300%", opacity: "0" }, 1200);
}

// ----------------------------------------------------------------

var Show_Page = document.querySelector("#Show-Page");
var Home_Div = document.querySelector(".Home-page");
var Search_Div = document.querySelector(".Search-1");
var Categories_Div = document.querySelector(".Categories-2");
var Area_Div = document.querySelector(".Area-3");
var Ingredients_Div = document.querySelector(".Ingredients-4");
var ContactUs_Div = document.querySelector(".ContactUs-5");


document.querySelector(".nav-item-list-1").addEventListener("click", function () {
    Show_Page.innerHTML = Search_Div.innerHTML;
    Close_Navbar();

    document.querySelector("#Show-Page .Search-by-name").addEventListener('keyup', function () {
        Search_By_Name(document.querySelector("#Show-Page .Search-by-name").value);
    })

    document.querySelector("#Show-Page .Search-by-first-lettr").addEventListener('input', function () {
        Search_By_First_Lettr($("#Show-Page .Search-by-first-lettr").val());
    })
})
document.querySelector(".nav-item-list-2").addEventListener("click", function () {
    Show_Page.innerHTML = Categories_Div.innerHTML;
    Close_Navbar();
})
document.querySelector(".nav-item-list-3").addEventListener("click", function () {
    Show_Page.innerHTML = Area_Div.innerHTML;
    Close_Navbar();
})
document.querySelector(".nav-item-list-4").addEventListener("click", function () {
    Show_Page.innerHTML = Ingredients_Div.innerHTML;
    Close_Navbar();
})
document.querySelector(".nav-item-list-5").addEventListener("click", function () {
    Show_Page.innerHTML = ContactUs_Div.innerHTML;
    Close_Navbar();
})

// --------------------------------------------------------------------

async function Search_By_Name(word) {

    var Result = ``;

    var Url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`);

    var Res = await Url.json();

    console.log(Res);

    for (var i = 0; i < Res.meals.length; i++) {
        Result += `<div class="item col-md-6 col-lg-3" onclick="Add_Event(${Res.meals[0].idMeal})">
                    <img src="${Res.meals[i].strMealThumb}" />
                    <div class="Home-item-Layer d-flex justify-content-center align-items-center">
                        <h5 class = "item-header">${Res.meals[i].strMeal}</h5>
                    </div>
                </div>
            `
    }

    console.log(Result);

    document.querySelector("#Show-Page .display-search").innerHTML = Result;
}

async function Search_By_First_Lettr(word) {

    let Result = ``;

    var Url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${word}`);
    var Res = await Url.json();

    console.log(Res);

    for (var i = 0; i < Res.meals.length; i++) {
        Result += `<div class="item col-md-6 col-lg-3" onclick="Add_Event(${Res.meals[0].idMeal})">
                    <img src="${Res.meals[i].strMealThumb}" />
                    <div class="Home-item-Layer d-flex justify-content-center align-items-center">
                        <h5 class = "item-header">${Res.meals[i].strMeal}</h5>
                    </div>
                </div>
            `
    }
    console.log(Result);

    document.querySelector("#Show-Page .display-search").innerHTML = Result;
}

// -----------------------------------------------------------------


async function Get_Random_Meal() {

    document.querySelector("#Show-Page").innerHTML = `<div class="row d-flex justify-content-center g-5">
    </div>`;

    let Show_Webside = document.querySelector("#Show-Page .row");


    for (var i = 0; i < 20; i++) {
        var Url = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        var Res = await Url.json();

        Show_Webside.innerHTML += `
                                    <div class="item col-md-6 col-lg-3" onclick="Add_Event(${Res.meals[0].idMeal})">
                                <img src="${Res.meals[0].strMealThumb}" />
                                <div class="Home-item-Layer d-flex justify-content-center align-items-center">
                                    <h5 class = "item-header">${Res.meals[0].strMeal}</h5>
                                </div>
                            </div>
                        `;
    }

    Add_Event();
}

Get_Random_Meal();



//////////////////////////////////////////////////////////////////////////
// finish All the above

async function Add_Event(ID) {
    var List = document.querySelectorAll("#Show-Page .item");
    console.log(List);

    var Url = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
    var Res = await Url.json();

    console.log(Res);

    document.querySelector("#Show-Page").innerHTML = `
    <section class="Show-details m-auto pb-5 text-white">
                <div class="container">
                    <div class="row">
                        <div class="col-4 half-1 text-center">
                            <img src="${Res.meals[0].strMealThumb}" alt="">
                            <h2 class="mt-5">${Res.meals[0].strMeal}</h2>
                        </div>
                        <div class="col-7 half-1">
                            <h2>Instructions</h2>
                            <p>${Res.meals[0].strInstructions} </p>
                            <b>Area : </b> <span id="Area">${Res.meals[0].strArea}</span>
                            <p><b>Category :</b> <span id="Category">${Res.meals[0].strCategory}</span></p>
                            <h4>Recipes :</h4>
                            <div class="Recipes">
                                <span>${Res.meals[0].strIngredient1}</span>
                                <span>${Res.meals[0].strIngredient2}</span>
                                <span>${Res.meals[0].strIngredient3}</span>
                                <span>${Res.meals[0].strIngredient4}</span>
                                <span>${Res.meals[0].strIngredient5}</span>
                                <span>${Res.meals[0].strIngredient6}</span>
                                <span>${Res.meals[0].strIngredient7}</span>
                            </div>
                            <b><h4>Tags :</h4></b>
                            <div class="Tags w-auto"><h5>${Res.meals[0].strTags}</h5></div>
                            <button class="btn-det"><a href="${Res.meals[0].strSource}" target = "_blank">Source</a></button>
                            <button class="btn-det"><a href="${Res.meals[0].strYoutube}  target = "_blank"">Youtube</a></button>
                        </div>
                    </div>
    
                </div>
            </section>
    `
}

document.querySelector(".nav-item-list-2").addEventListener("click", function () {
    Categories();
})

async function Categories() {
    var Url = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var Res = await Url.json();

    console.log(Res);

    var Result = ``;

    // `
    // <div class="item col-md-6 col-lg-3" onclick="Add_Event(${Res.meals[0].idMeal})">
    //     <img src="${Res.meals[0].strMealThumb}" />
    //     <div class="Home-item-Layer d-flex justify-content-center align-items-center">
    //         <h5 class="item-header">${Res.meals[0].strMeal}</h5>
    //     </div>
    //     `

    for (var i = 0; i < Res.categories.length; i++) {
        Result += `<div class="item col-3 Category-event p-4" onclick="show_Category_meals(${Res.categories[i].strCategory})">
        <img src="${Res.categories[i].strCategoryThumb}"class="w-100" alt="">
        <div class="Home-item-Layer d-flex justify-content-center align-items-center">
    <div><h3>${Res.categories[i].strCategory}</h3>
    <p class="Categories-p">${(Res.categories[i].strCategoryDescription).split(" ").splice(0, 10)}</p></div>
        </div>
    </div>
    
    `
    }

    document.querySelector("#Show-Page").innerHTML = `<div class="container text-white">
    <div class="row">
        ${Result}
    </div>
    </div>
`;
}

async function show_Category_meals(word) {

    document.querySelector("#Show-Page").innerHTML = `<div class="row d-flex justify-content-center g-5">
    </div>`;

    let Show_Webside = document.querySelector("#Show-Page .row");


    for (var i = 0; i < Res.meals.length; i++) {
        var Url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${word}`);
        var Res = await Url.json();

        Show_Webside.innerHTML += `
                                    <div class="item col-md-6 col-lg-3 text-text-black" onclick="Add_Event(${Res.meals[0].idMeal})">
                                <img src="${Res.meals[0].strMealThumb}" />
                                <div class="Home-item-Layer d-flex justify-content-center align-items-center">
                                    <h5 class = "item-header">${Res.meals[0].strMeal}</h5>
                                </div>
                            </div>
                        `;
    }

    Add_Event();
}

$(".nav-item-list-5").click(function (e) {
    $(".ContactUs-5").show();
});

$(".nav-item-list-3").click(function (e) {
    $(".Area-3").show();
    City();
});

async function City() {

    var Url = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    var Res = await Url.json();

    var Result = ``;
    for (var i = 0; i < Res.meals.length; i++) {

        Result += `<div class="col-2" onclick="cat(${Res.meals[i].strArea})">
        <img src="Images/city.jpg" class="w-100" alt="">
        <h3 class="text-white">${Res.meals[i].strArea}</h3>
    </div>
    `
    }

    document.querySelector(".city").innerHTML = Result;
    console.log("sdscsdsvcsdc");

}

async function cat(word) {
    document.querySelector("#Show-Page").innerHTML = `<div class="row d-flex justify-content-center g-5">
    </div>`;

    let Show_Webside = document.querySelector("#Show-Page .row");


    for (var i = 0; i < 20; i++) {
        var Url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${word}`);
        var Res = await Url.json();

        Show_Webside.innerHTML += `
                                    <div class="item col-md-6 col-lg-3" onclick="Add_Event(${Res.meals[0].idMeal})">
                                <img src="${Res.meals[0].strMealThumb}" />
                                <div class="Home-item-Layer d-flex justify-content-center align-items-center">
                                    <h5 class = "item-header">${Res.meals[0].strMeal}</h5>
                                </div>
                            </div>
                        `;
    }
}



