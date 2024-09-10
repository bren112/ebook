import img from './sucess.png';
import './sucesso.css';
import { Link } from "react-router-dom";
function Sucesso(){
    return(
    <>
    <h1 id='h1'>SUCESSO!</h1>
 
    
    <br/>
    <div className="center">
    <img src={img} alt="" srcset="" />
    <Link to="/">
    <button>Home</button>
    </Link>
    </div>
    <br/>
    <br/>
    <br/>
    </>
    )
}
export default Sucesso;