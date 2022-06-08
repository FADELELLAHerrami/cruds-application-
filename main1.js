let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');


let mode="create";
let tmp;

/*get total*/
function getTotal(){
	if(price.value!=''){
		let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
		total.innerHTML=result;
		total.style.background='#040';
	}
	else{
		total.innerHTML='';
		total.style.background='#a00d02';
	}
}
/*create product*/
let dataPro=[];
if(localStorage.product != null){
		try {
	  dataPro = JSON.parse(localStorage.product)
	} catch (err) {
	  // 👇️ This runs
	  console.log('Error: ', err.message);
	}
	
}else{
	let dataPro;
}


submit.onclick = function(){
	let newPro = {
		title : title.value,
		price : price.value,
		taxes : taxes.value,
		ads : ads.value,
		count:count.value,
		discount : discount.value,
		total : total.innerHTML,
		category : category.value,
	}
	if(newPro.title !='' && newPro.price !='' && newPro.count !='' && newPro.category !=''){
		if(mode === "create"){
			if(newPro.count>1){
				for(let j=0 ; j< newPro.count;j++){
				  dataPro.push(newPro);
				}
			}else{
			  	dataPro.push(newPro);
			}
		}else{
			dataPro[tmp]=(newPro);
			mode="create";
			submit.innerHTML="Create";
			count.style.display='block';
		}
	}
	
		
	
	
	/*save localstorage*/
	localStorage.setItem('product',JSON.stringify(dataPro))
	clearData();
	showData();
	}


/*clear inputs*/

function clearData(){
	title.value='';
	price.value='';
	taxes.value='';
	ads.value='';
	count.value='';
	total.innerHTML='';
	category.value='';
}

/*read*/

function showData(){
	getTotal();
	let table='';
	for (let i =0 ; i< dataPro.length ;i++) {
			table +=
				    `
				<tr>
					<td>${i}</td>
					<td>${dataPro[i].title}</td>
					<td>${dataPro[i].price}</td>
					<td>${dataPro[i].taxes}</td>
					<td>${dataPro[i].ads}</td>
					<td>${dataPro[i].discount}</td>
					<td>${dataPro[i].total}</td>
					<td>${dataPro[i].count}</td>
					<td>${dataPro[i].category}</td>
					<td><button onclick="updateData(${i})" id="update">update</button></td>
					<td><button id="delete" onclick="deleteData(${i})">delete</button></td>
				<tr>
					`	    
			}
		
		document.getElementById('tbody').innerHTML=table;
		let btnDelete=document.getElementById('deleteAll');
		if(dataPro.length > 0){
			btnDelete.innerHTML=`
			<td><button onclick="deleteAll()">delete All (${dataPro.length})</button></td>
			`
		}else{
			btnDelete.innerHTML='';
		}
	}
	

	showData();
/*count*/

/* delete and update*/
function deleteData(i){
	dataPro.splice(i,1);
	localStorage.product=JSON.stringify(dataPro);
	showData();
}
/* clean data*/
function deleteAll(){
	localStorage.clear();
	dataPro.splice(0);
	showData();
}
/*update*/
function updateData(i){
	title.value=dataPro[i].title;
	price.value=dataPro[i].price;
	taxes.value=dataPro[i].taxes;
	ads.value=dataPro[i].ads;
	discount.value=dataPro[i].discount;
	getTotal();
	count.style.display='none';
	category.value=dataPro[i].category;
	submit.innerHTML='update';
	mode="update";
	tmp=i;
	scroll({
		top:0,
		behavior:'smooth',
	});
}
/* search */
let searchMode='title';
let search=document.getElementById("search");
function getSearchMode(id){
	if(id=='searchTitle'){
		searchMode='title';
		search.placeholder="search by tilte";
	}
	else {
		searchMode='category';
		search.placeholder="search by category";
	}
	search.focus();
}

function searchData(value){
	let table='';
	if(searchMode == "title"){
		for(let i=0;i<dataPro.length;i++){
			if(dataPro[i].title.includes(value)){
				table +=
				    `
				<tr>
					<td>${i}</td>
					<td>${dataPro[i].title}</td>
					<td>${dataPro[i].price}</td>
					<td>${dataPro[i].taxes}</td>
					<td>${dataPro[i].ads}</td>
					<td>${dataPro[i].discount}</td>
					<td>${dataPro[i].total}</td>
					<td>${dataPro[i].count}</td>
					<td>${dataPro[i].category}</td>
					<td><button onclick="updateData(${i})" id="update">update</button></td>
					<td><button id="delete" onclick="deleteData(${i})">delete</button></td>
				<tr>
					`
			}
		}
	}else{
		for(let i=0;i<dataPro.length;i++){
			if(dataPro[i].category.includes(value)){
				table +=
				    `
				<tr>
					<td>${i}</td>
					<td>${dataPro[i].title}</td>
					<td>${dataPro[i].price}</td>
					<td>${dataPro[i].taxes}</td>
					<td>${dataPro[i].ads}</td>
					<td>${dataPro[i].discount}</td>
					<td>${dataPro[i].total}</td>
					<td>${dataPro[i].count}</td>
					<td>${dataPro[i].category}</td>
					<td><button onclick="updateData(${i})" id="update">update</button></td>
					<td><button id="delete" onclick="deleteData(${i})">delete</button></td>
				<tr>
					`
			}
		}
	}
	document.getElementById('tbody').innerHTML=table;
}
