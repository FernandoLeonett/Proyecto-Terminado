
import { Form } from "react-bootstrap";
const Select = ({ memes, onChangeImage }) => {
  return (
    <Form.Select onChange={onChangeImage} name="url" aria-label="Elija">

      {memes.map((meme) => (
      
        <option  key={meme.id}  value ={meme.id}>{meme.name}</option>
      ))}
    </Form.Select>
  );
};

export default Select;
