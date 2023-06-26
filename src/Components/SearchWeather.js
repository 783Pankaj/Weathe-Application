import React, { useEffect, useState } from 'react'
import city from '../Components/citys.json'
const SearchWeather = () => {
  const[SearchData, setSearchData] = useState([]);
  const[data, setData] = useState("")
  const[weatherDeatils, setWeatherDeatils] = useState(null);

  useEffect(()=>{
    getApiData("Jaipur")
  },[])
 
  const eventHeandler=(e)=>{
    setData(e.target.value);
      const filterdata=city.filter((value)=>{
        return(value.name.toLowerCase().includes(data.toLowerCase()));
      })
      setSearchData(filterdata)
  }
  const Search=(e)=>{
   getApiData(e,data);
  }

  const getApiData=(name)=>{
    let city_name = name;
    let API_key='00880af460ad9cae5b3ed30c41e488ff';
    let base_url=`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${API_key}`;
    fetch(base_url).then(res=>res.json())
    .then(function(data){
      let img="http://openweathermap.org/img/w/"+data.weather[0].icon+".png"
      let Data ={
        name:city_name,
        Temp:data.main.temp,
        maxtemp:data.main.temp_max,
        mintemp:data.main.temp_min,
        image:img,
        discription:data.weather[0].description,
      }
       setWeatherDeatils(Data);
       setData(city_name);
       setSearchData([]);
    })
    .catch(err=>console.log(err))
  }
const clear=()=>{
  setData('');
  setWeatherDeatils('');
  setSearchData([]);
}
  return (
    <>
     <div className="container">
       <div className="search">
         <input type="text" placeholder="Search City...." onChange={eventHeandler} value={data}/> 
         <i className="ri-search-line" onClick={Search}></i>
         <i className="ri-close-line" onClick={clear}></i>
       </div>
       <div className="SearchItem">
        {
          SearchData.slice(0,10).map((data,index)=>{
             return (<div className="Search" key={index} onClick={(e)=>getApiData(data.name)}>{data.name}</div>)
             })
        }
        
       </div>
       {
        weatherDeatils?
        <div className="show">
        <h1>{weatherDeatils.name}</h1>
         <h1> Tempratur = {weatherDeatils.Temp} °C </h1>
         <h3>Max Temp = {weatherDeatils.maxtemp} °C  | Min Temp =  {weatherDeatils.mintemp} °C</h3>
         <img src={weatherDeatils.image} alt="" />
         <h3>{weatherDeatils.discription}</h3>
       </div>
       :
       <h1>No City Search</h1>
       }
      
     </div>
   </>
  )
}

export default SearchWeather

