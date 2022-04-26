export const traerMemes = async function (cant) {
  let res = await fetch("https://api.imgflip.com/get_memes");

  res = await res.json();
  let num = Math.random() * 9;

  let misMemes =res.data.memes.filter(meme=>meme.box_count<=2 && meme.height <=600)
   let nuevos = misMemes.slice(num, cant);

  let finales = nuevos.map(({ id, name, url, box_count , height}) => ({
    name,
    url,
    box_count,
    id,
    height

    // lineas: Array.from(Array(box_count), (_e, i) => `linea ${i}`),
  }));


  return finales;
};

export const aBlob = async (url) => {
  let cada = await fetch(url);
  let cadaBlob = await cada.blob();
  let obj = URL.createObjectURL(cadaBlob);

  return obj;
};

export const maxLoop = function (hasta = this.length) {
  const nuevoArray = [];

  for (let index = 0; index < hasta; index++) {
    const elem = this[index];

    nuevoArray.push(elem);
  }
  return nuevoArray;
};

export const buildArray = function (longitud, contenido = "") {
  const nuevoArray = [];

  for (let index = 0; index < longitud; index++) {
    nuevoArray.push(contenido);
  }
  return nuevoArray;
};
