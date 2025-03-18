import { useSignal } from "@preact/signals";
import { FunctionComponent } from "preact";

type Data = {
    original_title : string,
    release_date:string,
    poster_path:string,
    popularity:number
  }
  
  type PeliculaArray = {
      results : Data[]
  }

const Menu: FunctionComponent<PeliculaArray> = ({ results }) => {
  var contador = useSignal(1);
  
  return (
    <>

    
    <div class="botones">
    <button class="btn" onClick={()=>{contador.value=1}}>1</button>
    <button class="btn" onClick={()=>{contador.value=2}}>2</button>
    <button class="btn" onClick={()=>{contador.value=3}}>3</button>
    <button class="btn" onClick={()=>{contador.value=4}}>4</button>
    <button class="btn" onClick={()=>{contador.value=5}}>5</button>
    </div>


    <div class={`grid-${contador.value}`}>
      {results.map((elem) => {
        const path = `https://image.tmdb.org/t/p/original/${elem.poster_path}`;
        return (
          <div class="contenedor">
            <h5>{elem.original_title}</h5>
            <p>{elem.release_date}</p>
            <img class="imagenes-2" src={path} />
            <progress max="10" value={elem.popularity}></progress>
          </div>
        );
      })}
    </div>


    </>
  );
};

export default Menu;
