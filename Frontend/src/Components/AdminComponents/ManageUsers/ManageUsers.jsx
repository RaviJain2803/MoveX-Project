import axios from 'axios';
import "./ManageUsers.css";
import React,{useEffect,useState} from 'react';
import {__userapiurl} from '../../../API_URL';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash,faSearch} from '@fortawesome/free-solid-svg-icons';

const ManageUsers=()=>{

const [users,setUserDetails]=useState([]);


// 👇 search input value
const [search,setSearch]=useState("");


// 👇 name suggestions
const [suggestions,setSuggestions]=useState([]);


// 👇 active/inactive filter
const [filter,setFilter]=useState("all");


// 👇 latest oldest sorting
const [sort,setSort]=useState("latest");


// 👇 pagination
const [currentPage,setCurrentPage]=useState(1);


// 👇 loading
const [loading,setLoading]=useState(true);

const usersPerPage=5;



// 👇 fetch users
useEffect(()=>{

axios.get(
__userapiurl+"fetch",
{
params:{role:"user"}
}
)

.then((result)=>{

setUserDetails(
result.data.userList
);

setLoading(false);

})

.catch((error)=>{

console.log(error);

setLoading(false);

});

},[]);




// 👇 realistic suggestion logic
const handleSearch=(value)=>{

setSearch(value);

if(value.trim()===""){
setSuggestions([]);
return;
}

const filtered=users.filter((user)=>

user.name?.toLowerCase()
.startsWith(
value.toLowerCase()
)
);


// 👇 duplicate remove
const uniqueUsers=[

...new Map(

filtered.map(
(item)=>[
item.name,
item
]
)

).values()

];


// 👇 only 5 suggestion
setSuggestions(
uniqueUsers.slice(0,5)
);

};





const changeUserStatus=(_id,status)=>{

if(status==="active"){

axios.patch(
__userapiurl+"update",
{
condition:{"_id":_id},
data:{"status":1}
}
)

.then(()=>{

setUserDetails(

users.map((user)=>

user._id===_id
?{...user,status:1}
:user

)

);

});

}

else if(status==="inactive"){

axios.patch(
__userapiurl+"update",
{
condition:{"_id":_id},
data:{"status":0}
}
)

.then(()=>{

setUserDetails(

users.map((user)=>

user._id===_id
?{...user,status:0}
:user

)

);

});

}

else{


if(
!window.confirm(
"Delete User ?"
)
){
return;
}

axios.delete(
__userapiurl+"delete",
{
data:{_id}
}
)

.then(()=>{

setUserDetails(

users.filter(
(user)=>user._id!==_id
)

);

});

}

};




// 👇 search + filter
let filteredUsers=users.filter((user)=>{


const searchMatch= user.name ?.toLowerCase()
.includes(
search.toLowerCase()
);



const filterMatch=

filter==="all"

?true

:filter==="active"

?user.status===1

:user.status===0;



return(
searchMatch
&&
filterMatch
);

});




// 👇 latest oldest
filteredUsers.sort((a,b)=>{

return sort==="latest"

?new Date(b.createdAt)
-new Date(a.createdAt)

:new Date(a.createdAt)
-new Date(b.createdAt)

});




// 👇 pagination
const lastUser= currentPage*usersPerPage;

const firstUser= lastUser-usersPerPage;

const currentUsers=
filteredUsers.slice(
firstUser,
lastUser
);

const totalPages=
Math.ceil(
filteredUsers.length/
usersPerPage
);





return(

<main>

<section className='manageuser-home-section'>

<h2>
Manage Users Dashboard
</h2>


<div className='top-controls'>


<h3>
Total Users :
{users.length}
</h3>



<div className='search-container'>

<div className='search-input'>

<FontAwesomeIcon
icon={faSearch}
/>

<input
type="text"
placeholder='Search user...'
value={search}
onChange={(e)=>
handleSearch(
e.target.value
)
}
/>

</div>



{
suggestions.length>0
&&

<div
className='suggestion-box'
>

{
suggestions.map(
(user)=>(

<div

key={user._id}

className='suggestion-item'

onClick={()=>{

setSearch(
user.name
);

setSuggestions([]);

}}

>

{user.name}

</div>

))
}

</div>

}

</div>



<select
value={filter}
onChange={(e)=>
setFilter(
e.target.value
)
}
>

<option value="all">
All
</option>

<option value="active">
Active
</option>

<option value="inactive">
Inactive
</option>

</select>



<select
value={sort}
onChange={(e)=>
setSort(
e.target.value
)
}
>

<option value="latest">
Latest
</option>

<option value="oldest">
Oldest
</option>

</select>

</div>



{
loading
?
<h2>Loading...</h2>
:
<div className='table-wrapper'>

<table className='manageuser-table'>

<thead>

<tr>

<th>UserId</th>
<th>Name</th>
<th>Email</th>
<th>Mobile</th>
<th>Address</th>
<th>City</th>
<th>Gender</th>
<th>Info</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>


<tbody>

{
currentUsers.length>0

?

currentUsers.map((row)=>(

<tr key={row._id}>

<td>
USR-{String(row._id).slice(-6)}
</td>

<td>{row.name}</td>
<td>{row.email}</td>
<td>{row.mobile}</td>
<td>{row.address}</td>
<td>{row.city}</td>
<td>{row.gender}</td>

<td>
{new Date(
row.createdAt
).toLocaleDateString()}
</td>

<td>

{
row.status

?<span className='active'>
Active
</span>

:

<span className='inactive'>
Inactive
</span>

}

</td>

<td>

<p
className='status-btn'

onClick={()=>

changeUserStatus(
row._id,
row.status
?"inactive"
:"active"
)

}
>

Change

</p>


<p
className='delete-btn'

onClick={()=>

changeUserStatus(
row._id,
"delete"
)

}
>

<FontAwesomeIcon
icon={faTrash}
/>

</p>

</td>

</tr>

))

:

<tr>

<td colSpan="10">

No Users Found

</td>

</tr>

}

</tbody>

</table>


<div className='pagination'>

<button
disabled={
currentPage===1
}

onClick={()=>
setCurrentPage(
currentPage-1
)
}
>

Prev

</button>

<span>
{currentPage}
/
{totalPages}
</span>

<button

disabled={
currentPage===
totalPages
}

onClick={()=>
setCurrentPage(
currentPage+1
)
}
>

Next

</button>

</div>

</div>

}

</section>

</main>

)

}

export default ManageUsers;