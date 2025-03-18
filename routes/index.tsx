import { Handlers,PageProps,FreshContext } from "$fresh/server.ts";
import axios from "npm:axios";
import { signal } from "@preact/signals";
import Menu from "../islands/Menu.tsx";
type Data = {
  original_title : string,
  release_date:string,
  poster_path:string,
  popularity:number
}

type PeliculaArray = {
    results : Data[]
}

export const handler : Handlers = {
    GET : async (req: Request, ctx: FreshContext<unknown,PeliculaArray>)=> {
        const url = new URL(req.url)
        const pelicula = url.searchParams.get("pelicula") || undefined
        try {
            const resp = await axios.get<PeliculaArray>(
              `https://api.themoviedb.org/3/search/movie?query=${pelicula}&include_adult=true&language=en-US&page=1`
              ,{
                headers: {
                  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmZmYTcxYmU1ZGFhMDBlMTJjMWJjMTMxMjBlM2Q3NSIsIm5iZiI6MTY4NTM4MTkzNS4wMTYsInN1YiI6IjY0NzRlMzJmY2MyNzdjMDBhNzQ2MTYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.raEEljpmsGfGMENtPmE-LFWcBEiDUcFKG5B-8_WQABQ",
                  "Content-Type": "application/json",
                },
              }
            )
            
            return ctx.render(resp.data.results);
          } catch (error) {
            return new Response("Error al obtener los datos", { status: 500 });
          }
    }

}

const Home = (props : PageProps)=>{
      return(
       <>
       <div class="general">
            <form method="get" target="/index">
            <input type="text" name="pelicula"/>
            <button type="submit">Enviar</button>
            </form>
        
        <Menu results={props.data} />
        </div>
      </> 
    )
}

export default Home;