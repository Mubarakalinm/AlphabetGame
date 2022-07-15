import React, { useEffect, useState,useRef } from 'react'

const alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const getRandomAlpha = () => {
    return alpha[Math.floor(Math.random() * alpha.length)];
}


// get the score from localStorage
const getLocal = () => {
    let high = localStorage.getItem('score');
    if(high){
        return (high = JSON.parse(localStorage.getItem('score')))
    }else{
        return 0;
    }
}


function Game() {
    const [alpha, setAlpha] = useState(getRandomAlpha());
    const [miliSeconds, setMiliSeconds] = useState(0);
    const [second,setSecond] = useState(0);
    const [count, setCount] = useState(1);
    const [timing, setTiming] = useState(false)
    const [high, setHigh] = useState(getLocal());
    


    const inputRef = useRef(null)

     // To make the input/focus focus
     useEffect(()=> {
        inputRef.current.focus();
     },[])

    
// run the clock/timer

    var timer;
    useEffect(()=> {
        if(timing === true){
        timer = setInterval(() => {
            setMiliSeconds(miliSeconds +10);
            if(miliSeconds >= 1000){
                setSecond(second+1);
                setMiliSeconds(0);
            }
        },10)
        return ()=> clearInterval(timer);
    }})
  
      function incre(){
        setMiliSeconds(miliSeconds + 500);
      }



    // main logic of the game
    const handleChange= (e) => {
     let val = e.target.value;
        if(count === 1){
            setTiming(true);
        }
        if(val[val.length-1].toUpperCase() === alpha){
             
            if(count === 20 ){
                setTiming(false);
                setCount(count +1)
                setScore();
            }else{
                setCount(count+1);
            const randomAlpha = getRandomAlpha();
            setAlpha(randomAlpha);
            }
        }else if(count <=20){
           incre();
            
        }
    }



    // store the time
    const clock = `${second}.${miliSeconds/10}`




    // function to set the score
  function setScore(){
    if(JSON.parse(localStorage.getItem('score'))  == null){
        localStorage.setItem('score',JSON.stringify(clock));
        setHigh(clock)
        console.log(clock);
        setAlpha('SUCCESS!');
    }else if(JSON.parse(localStorage.getItem('score')) > clock){
        localStorage.removeItem('score')
        localStorage.setItem('score', JSON.stringify(clock))
        setHigh(clock)
        console.log(clock)
        setAlpha('SUCCESS!')
    }else if(JSON.parse(localStorage.getItem('score')) < clock){
        setAlpha('FAILURE')
    }

 
  }


const handleClick = ()=>{
    if(count === 21){
    window.location.reload(false);
    }
}
     

// Game UI

  return (
    <div className='container'>
        <div className='heading'>
            <h1 className='main'> Type The Alphabet</h1>
            <h3 className='head'>Typing game to see how fast you type.Timer starts when you do:</h3>
        </div>


        <div className='gamearea'>{alpha}</div>

        <div className='timer'>
            <h2 className='time'>Time: {second}.{miliSeconds < 10 ? "00"+miliSeconds : miliSeconds < 100 ? '0'+ miliSeconds : miliSeconds}s</h2>
            <h3 className='besttime'>My best Time: {high}s! </h3>
        </div>

        <div className='inp' >
            <input className='inpu' ref ={inputRef} type="text" placeholder='lets start Typing' onInput={handleChange}/>
            <button  className='btn' onClick={handleClick} >Reset</button>
        </div>
        
    </div>
  )
}

export default Game