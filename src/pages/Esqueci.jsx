import './cadastrar.css'
function Esqueci(){
    return(
        <>
<form action="https://api.sheetmonkey.io/form/htwX9ZSEt4i8buykKzLNbJ" method="post">
        <input type="text" name="Name" placeholder="Nome" />
        <input type="email" name="Email" placeholder="Email Registrado"/>
        <input type="telefone" name="telefone" placeholder="Telefone Registrado"/>
        <input type="hidden" name="Created" value="x-sheetmonkey-current-date-time" />
        <input type="submit" value="Submit" />
</form>
        </>
    )
}
export default Esqueci;