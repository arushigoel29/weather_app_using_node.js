const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.post('/',(req,resp)=>{
    
    const query=req.body.cityName;
    const apikey='&appid=82909f48e498d37727bf1d61cda4a5c8'
    const url='https://api.openweathermap.org/data/2.5/weather?q='+ query+apikey+'&units=metric'
    https.get(url,(response)=>{
       // console.log(response.statusCode);
       response.on('data',(data)=>{
        //console.log(data);
        const weatherData=JSON.parse(data);
       // console.log(weatherData);
       const temp=weatherData.main.temp;
       //console.log(temp);
       const description =weatherData.weather[0].description;
       resp.write("<h1>the temprature in "+query +"is "+ temp +"degree celcius</h1>");
       resp.write("<p>the weather description is "+ description+"</p>")

       })

    })
    //res.send("this is for checking our server")

})


    
app.listen(3000,()=>{
    console.log("our serve is running at port 3000");
})
