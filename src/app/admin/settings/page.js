"use client";

import { useEffect, useState } from "react";

import {
    getSettings,
    updateSettings,
} from "@/services/adminApi";

export default function SettingsPage() {

    const [loading,setLoading]=useState(true);

    const [saving,setSaving]=useState(false);

    const [settings,setSettings]=useState({});

    useEffect(()=>{
        load();
    },[]);

    async function load(){

        setLoading(true);

        try{

            const res=await getSettings();

            setSettings(res.data);

        }finally{

            setLoading(false);

        }

    }

    async function save(){

        setSaving(true);

        try{

            await updateSettings(settings);

            alert("Settings saved.");

        }finally{

            setSaving(false);

        }

    }

    function change(name,value){

        setSettings(prev=>({

            ...prev,

            [name]:value

        }));

    }

    if(loading){

        return(
            <div className="p-8">
                Loading...
            </div>
        )

    }

    return(

<div className="space-y-8">

<h1 className="text-3xl font-bold">
Platform Settings
</h1>

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-semibold mb-5">
General
</h2>

<div className="grid md:grid-cols-2 gap-6">

<input

className="border rounded-lg p-3"

value={settings.platform_name||""}

onChange={e=>change("platform_name",e.target.value)}

placeholder="Platform Name"

/>

<input

className="border rounded-lg p-3"

value={settings.support_email||""}

onChange={e=>change("support_email",e.target.value)}

placeholder="Support Email"

/>

<textarea

className="border rounded-lg p-3 md:col-span-2"

rows="4"

value={settings.platform_description||""}

onChange={e=>change("platform_description",e.target.value)}

/>

</div>

</div>

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-semibold mb-5">

Learning

</h2>

<div className="grid md:grid-cols-4 gap-6">

<input

type="number"

className="border rounded-lg p-3"

value={settings.daily_xp||0}

onChange={e=>change("daily_xp",Number(e.target.value))}

/>

<input

type="number"

className="border rounded-lg p-3"

value={settings.streak_xp||0}

onChange={e=>change("streak_xp",Number(e.target.value))}

/>

<input

type="number"

className="border rounded-lg p-3"

value={settings.max_daily_xp||0}

onChange={e=>change("max_daily_xp",Number(e.target.value))}

/>

<input

type="number"

className="border rounded-lg p-3"

value={settings.passing_score||70}

onChange={e=>change("passing_score",Number(e.target.value))}

/>

</div>

</div>

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-semibold mb-6">

Features

</h2>

<div className="space-y-5">

<label className="flex justify-between">

Registration

<input

type="checkbox"

checked={settings.registration_enabled||false}

onChange={e=>change("registration_enabled",e.target.checked)}

/>

</label>

<label className="flex justify-between">

Maintenance Mode

<input

type="checkbox"

checked={settings.maintenance_mode||false}

onChange={e=>change("maintenance_mode",e.target.checked)}

/>

</label>

<label className="flex justify-between">

Allow Retakes

<input

type="checkbox"

checked={settings.allow_retakes||false}

onChange={e=>change("allow_retakes",e.target.checked)}

/>

</label>

<label className="flex justify-between">

Auto Unlock Lessons

<input

type="checkbox"

checked={settings.auto_unlock||false}

onChange={e=>change("auto_unlock",e.target.checked)}

/>

</label>

<label className="flex justify-between">

Telegram Enabled

<input

type="checkbox"

checked={settings.telegram_enabled||false}

onChange={e=>change("telegram_enabled",e.target.checked)}

/>

</label>

</div>

</div>

<div className="flex justify-end">

<button

onClick={save}

disabled={saving}

className="bg-blue-700 text-white rounded-lg px-8 py-3"

>

{saving?"Saving...":"Save Settings"}

</button>

</div>

</div>

);

}