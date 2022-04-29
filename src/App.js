import "./App.css";
import html2canvas from "html2canvas";
import { useState } from "react";
import Select from "./Select";
import Input from "./Input";
import BotonExportar from "./BotonExportar";
import Canva from "./Canva";
import FileComponent from "./FileComponent";
import { traerMemes } from "./servicio";
import { aBlob } from "./servicio";
import { useEffect } from "react";
import { buildArray } from "./servicio";

const App = () => {
  const [meme, setMeme] = useState({});

  const [memes, setMemes] = useState([]);

  const [lineas, setLineas] = useState([""]);

  const setIntinitalState = async () => {
    const imgFetch = await traerMemes(50);

     imgFetch.forEach(async (element, index, array) => {
      element.url = await aBlob(element.url);
 

      
      if (index === array.length - 1) {
        setMemes(imgFetch);
        debugger
        let { url, name, box_count, id, height } = imgFetch[0]

        setMeme({
          url,
          name,
          box_count,
          id,
          height,
        });

        if (height <= 880) {
          box_count = 2;
        }

        // setLineas(Array.from(Array(box_count), () => ""));
        setLineas(buildArray(box_count));
      }
    });
  };

  const onChangeLineas = ({
    target: {
      value,
      dataset: { indice },
    },
  }) => {
    const copiaLineas = [...lineas];
    copiaLineas[indice] = value;

    setLineas(copiaLineas);
  };

  const onChangeImage = ({ target: { value } }) => {
    const nuevoMeme = memes.find((m) => m.id == value);

    setMeme(nuevoMeme);

    let { height, box_count } = nuevoMeme;

    if (height <= 880) {
      box_count = 2;
    }
    //
    //funcion array from primer parametro es un array, segundo una funcion con parametros valor clave en este caso es esencial porque no tengo unarray sobre el que iterar

    setLineas(Array.from(Array(box_count), (v) => ""));
    //me aseguro que las nuevas lineas esten vacias peor el caso que el proximo meme tenga mas lineas

    document.querySelector("#input").value = "";
  };

  const onClickExportar = function () {
    html2canvas(document.querySelector("#meme")).then((canvas) => {
      let img = canvas.toDataURL("image/png");

      let link = document.createElement("a");
      link.download = "meme.png";

      link.href = img;
      link.click();
    });
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setMeme({ ...meme, url: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    setIntinitalState();
  }, []);

  return (
    <div className="App">
      <FileComponent imageHandler={imageHandler}></FileComponent>
      <Select onChangeImage={onChangeImage} memes={memes}></Select>

      <br />
      {/* para que funcione tengo que tener ya las lineas seteadas en la precarga pero lo puedo hacer connociendo las cajas del meme actual
        {Array.from(lineas, (linea, i) => (
            <Input
            linea={linea}
            key={i}
            onChangeLineas={onChangeLineas}
            placeholder={`linea ${i}`}
            indice={i}
          />
        ))} */}
      {lineas.map((linea, i) => (
        <Input
          linea={linea}
          key={i}
          onChangeLineas={onChangeLineas}
          placeholder={`linea ${i}`}
          indice={i}
        />
      ))}

      <BotonExportar onClickExportar={onClickExportar} />

      <Canva lineas={lineas} meme={meme}></Canva>
    </div>
  );
};

export default App;
