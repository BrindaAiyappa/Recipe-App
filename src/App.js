
import './App.css';
import Axios from "axios";
import {useState} from "react";
import RecipeTile from './components/RecipeTile.js'

function App() {
  const [query,setquery] = useState("")
  const [recipes,setrecipes] = useState([])
  const [healthLabels, sethealthLabels] = useState("vegan")
  const YOUR_APP_ID="7c7c60b9";
  const YOUR_APP_KEY="a63cce5ed1bc5db62e1c49c3c25eb248";
  var url=`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`;
  async function getRecipes(){
    var result=await Axios.get(url);
    setrecipes(result.data.hits)
    console.log(result.data);
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    getRecipes();
  }
  return (
    <div className="App">
      
      <h1 onClick={getRecipes}>Food Recipe Plaza</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input type="text"className="app__input" placeholder="enter ingridient" value={query}onChange={(e)=>setquery(e.target.value)}/>
        <input className="app__submit" type="submit" value="Search"/>
        <select className="app___healthLabels">
          <option onClick={()=>sethealthLabels("vegan")}>vegan</option>
          <option onClick={()=>sethealthLabels("vegetarian")}>vegetarian</option>
          <option onClick={()=>sethealthLabels("dairy-free")}>dairy-free</option>
          <option onClick={()=>sethealthLabels("wheat-free")}>wheat-free</option>
          <option onClick={()=>sethealthLabels("low-sugar")}>low-sugar</option>
          <option onClick={()=>sethealthLabels("egg-free")}>egg-free</option>
          <option onClick={()=>sethealthLabels("peanut-free")}>peanut-free</option>
          <option onClick={()=>sethealthLabels("fish-free")}>fish-free</option>
        </select>
      </form>
      <div className="app__recipes">{
        recipes.map((recipe)=>{
          return <RecipeTile recipe={recipe}/>;
        })
        }

      </div>
    </div>
  );
}
export default App;
