import './Noticias.css';
import img from './R.jpg';
function Noticias() {
 
  return (
    <>
      <br />
      <div className="busca">
      <div className="buscar">
        
          </div>
          </div>
      <h1 id='recados-title'>RECADOS</h1>
      <br />
      <div className="recados">
       
       {[...Array(6)].map((_, index) => (
         <div id="card-recado" key={index}>
           <br />
           <img src={img} />
           <h1>"NOTÍCIA"</h1>
           <p id='p'>Quisque ligula magna, suscipit in finibus id, sodales sed erat. Nullam a tempus nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer risus augue, maximus at blandit vitae, vestibulum quis tellus. Duis quam felis, venenatis sit amet porta venenatis, mattis fringilla est. Quisque semper ante ut diam varius, ac tincidunt sapien tempus. Suspendisse varius nisl vitae nibh interdum varius. Donec commodo ullamcorper eros, ut tristique diam laoreet in. Suspendisse volutpat augue a eros viverra finibus.</p>
            <br />
         
         </div>
       ))}
          
     </div>
     <br />
     <br />

    </>
  );
}

export default Noticias;
