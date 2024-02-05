import React from "react";
import logo from "./images/logo.png";
// import MemeData from "./data";


export function Header(){
    return(
        <header>
            <div className="left">
                <img src={logo} alt="logo"/>
                <h1>Meme Generator</h1>
            </div>
            <div class="right">
                <h2>React Project</h2>
            </div>
        </header>
    )
}

export function Component(){
    
    const[meme ,setMeme]=React.useState(
        {topText:"",
        bottomText:"",
        randomImage:"https://i.imgflip.com/39t1o.jpg"}
        )
    // const [memeImage,setMemeImage]=React.useState("")
    
    const [allMemeImg, setAllMemeImg]=React.useState({});
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMemeImg(data))
    },[])
    function getImage(){
        
        const memesArray=allMemeImg.data.memes;
        const randomNum=Math.floor(Math.random()*memesArray.length)
        const url = memesArray[randomNum].url;
        setMeme( prevMeme=>({
            ...prevMeme,
            randomImage:url
        }))
        
        
    }
    function imgText(e){
        const{name,value}=e.target
        setMeme(prevMeme=>({
            ...prevMeme,
            [name]:value
        }))
        console.log(meme);
        // console.log(url)
    }
   
    return(
        <main>
            <form className="meme" id="form">
                <input type="text" placeholder="Top Text" name="topText" value={meme.topText} onChange={imgText}/>
                <input type="text" placeholder="Bottom Text" name="bottomText" value={meme.bottomText} onChange={imgText} />
            </form>
          
            <button onClick={getImage} >Get a new meme image 🖼</button>
            <div className="MemeElement">
            <h2 className="topText"> {meme.topText}</h2>
              <img src={meme.randomImage} className="memeImage"/>           
              <h2 className="bottomText"> {meme.bottomText}</h2>
              </div>
        </main>
    )
}