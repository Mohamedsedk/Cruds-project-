let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let moode = "create";
let tmp ;

// console.log(title,price ,taxes,ads,discount,total,count,category,submit);

let tatalprice= function(){
   if(price.value !="" && price.value !=0){
      let result = (+price.value + +taxes.value + +ads.value)- +discount.value ;
      total.innerHTML = result ; 
      total.style.backgroundColor = "#040";
   }else{
      total.innerHTML = "";
      total.style.backgroundColor = "red";
   }

}


let datapro ; 
if(localStorage.getItem("product")!=null){
   datapro= JSON.parse(localStorage.getItem("product"))
}else{
   datapro=[];
}
submit.onclick= function(){
   let newpro = {
      title:title.value.toLowerCase(),
      price:price.value ,
      taxes:taxes.value,
      ads:ads.value ,
      discount: discount.value,
      total:total.innerHTML,
      count:count.value ,
      category:category.value.toLowerCase(),
   }
   
   if(title.value !="" && price.value !="" && category.value !="" &&newpro.count <100){
      if(moode ==="create"){
         if(newpro.count > 1){
            for(let i =0 ; i< newpro.count ; i++){
               datapro.push(newpro);
            }
         }else{
            datapro.push(newpro);
         }
      }else{
         datapro[tmp] = newpro ; 
         moode = "create";
         count.style.display= "block";
         submit.innerHTML = "Create";
         
      }
      cleardata();

}

   localStorage.setItem("product",JSON.stringify(datapro));
   showData();
   
}

function cleardata(){
   title.value = "";
   price.value="";
   taxes.value="";
   ads.value="";
   discount.value="";
   total.value="";
   count.value = "";
   category.value=""; 
}


function showData(){
   tatalprice();
   let table = "";
   for(let i= 0 ; i<datapro.length ; i++){
      table += `
      <tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
      `
   }
   document.getElementById("tbody").innerHTML = table ; 
   let btnDelete= document.getElementById("deleteAll");
   if(datapro.length >0){
      btnDelete.innerHTML = `
      <button onclick="deleteAll()">Delete All(${datapro.length})</button>
      `
   }else{
      btnDelete.innerHTML = ""
   }
}
showData();

function deleteData(i){
   datapro.splice(i,1);
   localStorage.product= JSON.stringify(datapro);
   showData();
}

function deleteAll(){
   datapro.splice(0);
   localStorage.clear(); 
   showData();
}

//////////////// updateData //////////////

function updateData(i){
   title.value = datapro[i].title;
   price.value = datapro[i].price; 
   taxes.value = datapro[i].taxes ; 
   ads.value = datapro[i].ads ; 
   discount.value = datapro[i].discount;
   tatalprice();
   count.style.display = "none";
   category.value = datapro[i].category ; 
   submit.innerHTML = "Update"
   tmp = i ;
   moode = "update";
   scroll({
      top:0,
      behavior:"smooth",
   })
}

//////////// Search /////////////

let searchMood = "title"; 

function getSearchMood(id){
   let search = document.getElementById("Search");
   if(id === "searchTitle"){
      searchMood ="title";
   }else{
      searchMood= "category";
   }
   search.focus();
   search.value="";
   showData();
}

function SearchData(value){
   let table=''
   if(searchMood == 'title'){
   for(let i = 0 ; i<datapro.length; i++){
      if(datapro[i].title.includes(value.toLowerCase())){
         table += `
         <tr>
         <td>${i}</td>
         <td>${datapro[i].title}</td>
         <td>${datapro[i].price}</td>
         <td>${datapro[i].taxes}</td>
         <td>${datapro[i].ads}</td>
         <td>${datapro[i].discount}</td>
         <td>${datapro[i].total}</td>
         <td>${datapro[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">update</button></td>
         <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
         </tr>
         `
      }
   }


}else{
      for(let i = 0 ; i<datapro.length; i++){
         if(datapro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
         }
      }

   }
   document.getElementById("tbody").innerHTML = table ; 

}
