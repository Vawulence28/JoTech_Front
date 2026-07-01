"use client";

import { useEffect,useState } from "react";

import {

getCertificates,

revokeCertificate

}

from "@/services/adminApi";

export default function CertificatesPage(){

const [certificates,setCertificates]=useState([]);

const [loading,setLoading]=useState(true);

async function load(){

setLoading(true);

try{

const res=await getCertificates();

setCertificates(res.data||[]);

}

finally{

setLoading(false);

}

}

useEffect(()=>{

load();

},[]);

async function revoke(id){

if(!confirm("Revoke this certificate?")) return;

await revokeCertificate(id);

load();

}

const total=certificates.length;

const revoked=certificates.filter(

c=>c.status==="Revoked"

).length;

const today=new Date().toDateString();

const todayIssued=certificates.filter(

c=>new Date(c.issued_at).toDateString()===today

).length;

const monthIssued=certificates.filter(c=>{

const d=new Date(c.issued_at);

const now=new Date();

return(

d.getMonth()===now.getMonth()

&&

d.getFullYear()===now.getFullYear()

);

}).length;

return(

<div className="space-y-8">

<h1 className="text-3xl font-bold">

Certificates

</h1>

<div className="grid grid-cols-2 xl:grid-cols-4 gap-6">

<Card title="Total" value={total}/>

<Card title="Issued Today" value={todayIssued}/>

<Card title="Issued This Month" value={monthIssued}/>

<Card title="Revoked" value={revoked}/>

</div>

<div className="bg-white rounded-xl shadow overflow-hidden">

<table className="w-full">

<thead>

<tr className="border-b">

<th className="p-4">Certificate</th>

<th>Name</th>

<th>Course</th>

<th>Date</th>

<th>Status</th>

<th></th>

</tr>

</thead>

<tbody>

{loading?

<tr>

<td colSpan="6" className="p-8">

Loading...

</td>

</tr>

:

certificates.map(cert=>(

<tr key={cert.id} className="border-b">

<td className="p-4">

{cert.certificate_number}

</td>

<td>

{cert.learn_users?.full_name}

</td>

<td>

{cert.learn_learning_paths?.title}

</td>

<td>

{new Date(cert.issued_at)

.toLocaleDateString()}

</td>

<td>

{cert.status}

</td>

<td>

<div className="flex gap-3">

<a

href={`${process.env.NEXT_PUBLIC_API_URL}/admin/certificates/download/${cert.id}`}

target="_blank"

className="text-blue-600"

>

Download

</a>

<button

onClick={()=>revoke(cert.id)}

className="text-red-600"

>

Revoke

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

);

}

function Card({title,value}){

return(

<div className="bg-white rounded-xl shadow p-6">

<p className="text-gray-500">

{title}

</p>

<p className="text-3xl font-bold mt-2">

{value}

</p>

</div>

);

}