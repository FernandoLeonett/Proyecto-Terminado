import { Form } from "react-bootstrap";


const Input = ({placeholder, indice, onChangeLineas, linea}) => {

  return (



    <Form.Group className="mb-3" controlId="formBasicEmail">
   
    <Form.Control value ={linea} type="text"  onChange={onChangeLineas} data-indice ={indice} placeholder= {placeholder} name="lineas" />
    <Form.Text className="text-muted">
  
    </Form.Text>
  </Form.Group>
 
  )
}

export default Input