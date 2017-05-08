let payLoad = document.querySelector('#payload');
let baseURL = 'https://young-badlands-16070.herokuapp.com/userdb';

var counter=0
function readAllItems(e) {
  e.preventDefault();
  console.log(baseURL);
  axios.get(baseURL)
    .then(function(res) {
      console.log(res.data.data);
      payLoad.innerHTML = "";
      res.data.data.forEach(function(d, c) {
        console.log(++counter);
        payLoad.innerHTML += 
        `<tr id=itemid_${d.id}>
          <td>${d.id}</td>
          <td id=item_${d.id}>${d.item}</td> 
          <td id=note_${d.id} >${d.note}</td> 
          <td id=rating_${d.id}>${d.rating}</td> 
          <td id=time_${d.id}>${d.time}</td> 
          <td id=spicy_${d.id}>${d.spicy}</td> 
          <td id=cost_${d.id} >${d.cost}</td> 
          <td>    
            <button type="button" id=update_${d.id} data-toggle="modal" data-target="#myModal" class="update">📝</button>
            <button type="button" id=dlt_${d.id} class="delete">🗑</button>
          </td>
        </tr>`
      })
    })
    .catch(function(err) {
      console.log(err)
    })
}

function readItem(e) {
  console.log('read one item');
  console.log(baseURL);
  let ss=$('#ss').val();
  payLoad.innerHTML=" "
  if( isNaN(ss)==true){
    payLoad.innerHTML="Enter A valid number please";
  $('.form-control').val(" ");}
  else{
    let string=baseURL+"/"+ss;
    axios.get(string)
  .then(function(res) {
    if(res.data.status=='success'){
    let d= res.data.data;
  console.log(d);
  payLoad.innerHTML = "";
        payLoad.innerHTML += 
        `<ul>
          <li><span>Name:</span> ${d.first} ${d.last}</li>
          <li><span>Social Security:</span> ${ss}</td> 
          <li><span>Application received:</span> ${d.startdate}</li> 
          <li><span>Application status:</span> ${d.status}</li> 
          <li><span>Last update on</span> ${d.finishdate}</li> 
        </ul>`}
        else
        {
          payLoad.innerHTML += 
        `Social Security number ${ss} is not in our Datebase , Check the Social Security and try again `
        }

  })
    .catch(function(err) {
      console.log(err)

    })
}
}


document.getElementById('read_btn').addEventListener('click', readItem);
//document.getElementsByClassName('form-control').addEventListener('', readItem);
$('.form-control').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    readItem(e);
    return false;  
  }
});   
