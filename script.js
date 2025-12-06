// Signup
function signup(e){e.preventDefault();let n=document.querySelector("#name").value,e1=document.querySelector("#email").value;localStorage.setItem("user",JSON.stringify({name:n,email:e1}));alert(`Account created for ${n}!`);window.location.href="dashboard.html"}

// Transaction
function createTransaction(e){e.preventDefault();let a=document.querySelector("#amount").value,d=document.querySelector("#description").value,r=document.querySelector("#role").value,c=document.querySelector("#currency").value,b=document.querySelector("#buyerEmail").value;let tx={id:Date.now(),amount:a,description:d,role:r,currency:c,buyerEmail:b,status:"Pending"};let arr=JSON.parse(localStorage.getItem("transactions")||"[]");arr.push(tx),localStorage.setItem("transactions",JSON.stringify(arr)),alert(`Transaction created! ID: ${tx.id}`),window.location.href="dashboard.html"}

// Dashboard
function loadDashboard(){let t=document.querySelector("#txTable");t.innerHTML="<tr><th>ID</th><th>Amount</th><th>Status</th><th>Action</th></tr>";let a=JSON.parse(localStorage.getItem("transactions")||"[]");a.forEach(tx=>{let r=t.insertRow();r.insertCell(0).innerText=tx.id,r.insertCell(1).innerText=tx.amount,r.insertCell(2).innerText=tx.status;let c=r.insertCell(3),b=document.createElement("button");b.innerText="View",b.onclick=()=>{localStorage.setItem("currentTx",JSON.stringify(tx)),window.location.href="payment.html"},c.appendChild(b)})}

// Payment
function loadPayment(){let tx=JSON.parse(localStorage.getItem("currentTx"));if(!tx)return;document.querySelector("#txId").innerText=tx.id,document.querySelector("#txAmount").innerText=tx.amount,document.querySelector("#txBuyer").innerText=tx.buyerEmail,document.querySelector("#txStatus").innerText=tx.status}
function releaseFunds(){let tx=JSON.parse(localStorage.getItem("currentTx")),arr=JSON.parse(localStorage.getItem("transactions")||"[]");arr=arr.map(t=>t.id===tx.id?{...t,status:"Released"}:t),localStorage.setItem("transactions",JSON.stringify(arr)),alert("Funds Released!"),window.location.href="dashboard.html"}

// Chat
function loadChat(){let a=JSON.parse(localStorage.getItem("chat")||"[]"),b=document.querySelector("#chatBox");b.innerHTML="",a.forEach(m=>{let p=document.createElement("p");p.innerHTML=`<strong>${m.sender}:</strong> ${m.text}`,b.appendChild(p)})}
function sendMessage(){let i=document.querySelector("#chatInput"),t=i.value;if(!t)return;let a=JSON.parse(localStorage.getItem("chat")||"[]");a.push({sender:"You",text:t}),localStorage.setItem("chat",JSON.stringify(a)),i.value="",loadChat()}
