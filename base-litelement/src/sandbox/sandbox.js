const sandbox=
{
  on(event,callback)
 {
   document.addEventListener(event,(e)=>callback(e.detail));
 },

 dispatch(event,data,ctx)
 {
   ctx= ctx || document;	
   ctx.dispatchEvent(new CustomEvent(event,{bubbles:true, composed:true, detail:data}));
 }

}


export default sandbox;
