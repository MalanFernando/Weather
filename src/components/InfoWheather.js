import axios from "axios";
import { useEffect, useState } from "react";
import Clock from "./Clock";
import Spinner from "./Spinner";

const InfoWheather = () => {

    const [cord, setCord] = useState({});
    const [tempe, setTempe] = useState(0);
    const [isCelsius, setIsCelsius] = useState(true);
    const[isLoad, setIsLoad] = useState(true)

    useEffect(()=>{
        function success(pos) {
            var crd = pos.coords;
            
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=333004b592194ff613ffd19741d788f6&lang={es}&units=metric`)
            .then(res => {
                setCord(res.data);
                setTempe(res.data.main.temp);
                setTimeout(()=>{
                    setIsLoad(false)
                },3000)
            })
        }
        
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        
        navigator.geolocation.getCurrentPosition(success, error);        
    },[]);

    const date = new Date();
    let dateFormat = `${date.toDateString().split(' ')[1]} ${String(date.getDate()).padStart(2, '0')} ${date.toDateString().split(' ')[0]}`;
   
    const changeTemp = ()=> setIsCelsius(!isCelsius);

    return (
        <div>
            {isLoad ? (
                <><Spinner/></>
            ):(
            <div className="wheather">
                <section className="date">
                        <article>
                            <Clock/>
                            <p>{cord.name} - {cord.sys?.country}</p>
                            <p>{dateFormat}</p>
                        </article>
                </section>
                <section className="clime">
                        <img src={`http://openweathermap.org/img/wn/${cord.weather?.[0].icon}@2x.png`} alt="" />
                        <p className="temp"><i className="icon-temp fa-solid fa-temperature-high"></i> {isCelsius ? `${tempe} °C` : `${((cord.main?.temp* 9/5) + 32).toFixed(2)} °F`}</p>
                        <p><i className="fa-solid fa-droplet"></i> {cord.main?.humidity} %</p>
                        <h3>{cord.weather?.[0].main}</h3>
                        <button onClick={changeTemp}><i className="fa-solid fa-temperature-three-quarters"></i></button>
                </section>            
            </div>
            )}
        </div>
    );
};

export default InfoWheather;