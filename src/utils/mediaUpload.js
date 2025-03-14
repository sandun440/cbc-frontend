import { createClient } from "@supabase/supabase-js"

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZ3VoZnZqb3JtZG9xbHl1dnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4OTM0ODEsImV4cCI6MjA1NzQ2OTQ4MX0.9JHe54OJt766SPfHejId98N7lAEKZb5n0CsF2HzDmHo"

const url = "https://egguhfvjormdoqlyuvpo.supabase.co"

const supabase = createClient(url, key);


export default function uploadMediaToSupabase(file){
    return new Promise((resolve, reject)=>{
        if(File == null){
            reject("File not added")
        }
        let fileName = file.name;

        const extention = fileName.split(".")[fileName.split(".").length - 1];

        const timestamp = new Date().getTime();

        fileName = timestamp + fileName + "." + extention ;

        supabase.storage.from("images").upload(fileName, file,{
            cacheControl : "3600",
            upsert : false,
        }).then(()=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl)
        }).catch((err)=>{
            reject(err)
        })

    })
}