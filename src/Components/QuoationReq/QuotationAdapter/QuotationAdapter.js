import React, { useEffect, useRef, useState } from 'react'

const QuotationAdapter = ({pushelem,v}) => {
    const [checked, setchecked] = useState(false)
    const [open, setopen] = useState(false)
    const [val, setval] = useState()
    const ref = useRef(null)
    useEffect(() => {
      if(val!=null || val!=undefined){
        if(val){
            setchecked(true)
            setopen(false)
            pushelem(true,{type:v.type,val:`${v.val} (${val.perriod})`})
        }
        else{
          
        }
      }
    }, [val])
    
  return (
    <div className='flex items-center mt-3 md:mt-5'>
        <label>
            <input type="checkbox" ref={ref}  onChange={e=> {if(e.target.checked===false){
              pushelem(false,{type:v.type,val:`${v.val} (${val.perriod})`})
            }}} checked={checked} onClick={e=> {!checked ? setopen(true):(setchecked(false))}} value={v.val}/> <span className='ml-2'>{v.val}</span>
        </label><br/>

        <form className={`flex ${open ? 'comin':'comout'} transition-all ease-in-out duration-300`}>
                {v.options && v.options.map((valu,i)=> <><label className='mx-2' key={i}>
                  <input type="radio" name='check' onClick={e=> setval({type:v.type,val:v.val,perriod:valu})}  value={valu}/>
                  <span className='ml-2 text-xs'>{valu}</span>
                </label><br/></>)}
          
                <br/>
             </form>
    </div>
  )
}

export default QuotationAdapter