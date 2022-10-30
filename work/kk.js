
const path = require("path")
const express=require("express")
const app = express()
const hbs= require("hbs")
const request=require("request")
const forcast = require("./utils/forcast")
const geocode = require("./utils/geocode")
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,"./public")))
const viewspath = path.join(__dirname,"./views")
const partialspath =path.join(__dirname,"./partials")

app.set('view engine','hbs')
app.set("views",viewspath)
hbs.registerPartials(partialspath)

app.get('',(req,res) => {
   res.render('index',{
    name:'Anjana',
    title:'Weather',
    content:'Know weather here !'
})
})
app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help",
        content:"Helpful text",
        name:"Anjana",
    })
})
app.get('/about',(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Anjana",
        content:"To know weather information"
    })
})
app.get("/help/*",(req,res)=>{
    res.render("notfound")
})
app.get("/about/*",(req,res)=>{
    res.render("notfound")
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return  res.send({
            error:"You must provide a search term"
         } )
    }
    geocode(req.query.address,({latitude,longitude,address}={},error)=>{
        if(error){
            res.send({
                error
            })
        }
        else{            
            forcast(latitude,longitude,({temperature,feelslike,description}={},error)=>{
                if(error){
                    res.send({
                        error
                    }) 
                }
                else{
                    res.send({
                        temperature,
                        feelslike,
                        description,
                        address
                    })
                }
            })
        }
    })
//     res.send({forcast:"it is snowing",
//     location:"kollam",
//     address:req.query.address
//  })
 })
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return  res.send({
            error:"You must provide a search term"
         } )
    }
    console.log(req.query.search)
    res.send(
       { products:{}}
    )
})


app.get("*",(req,res)=>{
    res.render("error")
    
})
app.listen(port,()=>{
    console.log("server up")
})