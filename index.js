
const express=require('express')
const axios= require('axios')
const PORT = process.env.PORT
const cheerio=require('cheerio')
const cors= require('cors')
const { response } = require('express')
const app= express()
app.use(cors())

const tech=[]
const technews =[{
    name : "the news",
    address:"https://www.thenews.com.pk/latest-stories"
}]
const geonews=[]
const geo=[{
    name:"geo news",
    address:"https://www.geo.tv/latest-news"
}]



technews.forEach(news=>{
    axios.get(news.address)
.then(response=>{
    const html=response.data
    const $=cheerio.load(html)
    $('.writter-list-item-story',html).each(function(){
       const imgurl=$(this).find("img").attr("src")
        const heading=$(this).find('p').text()
        const ptag=$(this).find(".latest-right").text()
   
    tech.push({
        imgurl,
        heading,
        ptag
    })
})
})
})
geo.forEach(news=>{
    axios.get(news.address)
    .then(response=>{
        const html=response.data
        const $=cheerio.load(html)
        $('.border-box',html).each(function(){
            const imgurl=$(this).find("img").attr("data-src")
            const heading=$(this).find("h2").text()
            const date=$(this).find(".date").text()
            geonews.push({
                imgurl,
                heading,date
            })
        })
    })
})
app.get(("/"),(req,res)=>{
    res.json(tech)
})
app.get("/more",(req,res)=>{
    res.json(geonews)
})
app.listen(PORT,()=>{
    console.log("hello world")
})
