import './cadastrar.css'; 
import './esqueci.css';
import InputMask from 'react-input-mask'; 

function Esqueci() {
    return (
        <>
            <br/>
            <h1 id='h1'>ESQUECI!</h1>
            <div className="form_esqueci">
            <p id='p'>Informe o Email e Telefone cadastrado p/ recuperar!</p>

            </div>
            <br/>
            <br/>
            <div className="form-groupdois">
                
                <form className='form_esqueci' action="https://api.sheetmonkey.io/form/htwX9ZSEt4i8buykKzLNbJ" method="post">

                    <input type="text" name="Name" placeholder="Nome" required />
                    <input type="email" name="Email" placeholder="Email Registrado" required />
                    <InputMask
                        mask="(99) 99999-9999"
                        name="telefone"
                        placeholder="Telefone Registrado"
                        required
                    >
                        {(inputProps) => <input {...inputProps} type="text" />}
                    </InputMask>
                    <input type="hidden" name="Created" value="x-sheetmonkey-current-date-time" />
                    <input className='btn' type="submit" value="Enviar" />
                </form>
            </div>
        </>
    );
}

export default Esqueci;
