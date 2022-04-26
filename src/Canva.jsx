import Texto from "./Texto";


const Canva = ({ meme: { url }, lineas }) => {



  return (
    <div className="meme" id="meme">

      <div className="span-flex">
  
        {lineas.map((l, i) => (



          <Texto key={i} linea={l} />
        ))}
   </div>
      <img alt="meme" src={url} />
    </div>
  );
};

export default Canva;
