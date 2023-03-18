import React, { useEffect, useState } from 'react'
import contries from '../../countries'
import years from '../../years'
import axios from 'axios'
import apiurl from '../../apiurl'
import QuotationAdapter from './QuotationAdapter/QuotationAdapter'
const QuotationReq = () => {
  //contact information states
  const [first, setfirst] = useState('')
  const [last, setlast] = useState('')
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')
  //address states
  const [address, setaddress] = useState('')
  const [address2, setaddress2] = useState('')
  const [city, setcity] = useState('')
  const [zip, setzip] = useState('')
  const [country, setcountry] = useState('Unites States')
  //Boat information
  const [boatname, setboatname] = useState('')
  const [boatmanu, setboatmanu] = useState('')
  const [year, setyear] = useState('')
  const [boatcurloc, setboatcurloc] = useState('')
  const [hull, sethull] = useState('')
  const [enmanu, setenmanu] = useState('')
  const [enhours, setenhours] = useState('')
  const [starboard, setstarboard] = useState('')
  const [cor, setcor] = useState('')
  //services
  const [serreq, setserreq] = useState('')
  const [reqsers, setreqsers] = useState([])
  const [details, setdetails] = useState('')
  const [other, setother] = useState(false)
  const [othertext, setothertext] = useState('')
  const [ticks, setticks] = useState([])
  const [done, setdone] = useState(false)

  //useEffects
  useEffect(() => {
    axios.get(`${apiurl}quo`).then((res)=>{
     setticks(res.data.result[0].ticks)
    }).catch((err)=> console.log(err))
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if(serreq === "Other"){
      setother(true)
    }else{
      setother(false)
    }
  }, [serreq])
  
  
  const pushelem = (e,v)=>{
    if(e){
      if(reqsers.findIndex((obj)=> (obj.type == v.type) && (obj.val == v.val)) == -1){
        setreqsers((p)=> [...p,v])
      }
    }
    else{
        setreqsers((p)=> p.filter((f,i)=>{
          return v.type!==f.type && v.val!==f.val
        }))
    }
  }

  
  const sendtodb = ()=>{
    axios.post(`${apiurl}quotation`,{
      Headers:{
        'Content-Type':'application/json'
      },
      fullname: `${first} ${last}`,
      phone,
      email,
      street:address,
      address2,
      city,
      zip,
      cor,
      country,
      boatname,
      boatmanu,
      boatyear:year,
      presentloc:boatcurloc,
      boatloc:boatcurloc,
      boathull:hull,
      enginemanu:enmanu,
      engineHour:enhours,
      engineHour2:starboard,
      servReq:serreq==="Other"? othertext : serreq,
      sers:reqsers,
      details
    }).then((res)=> {console.log(res.data)
    setfirst('') 
    setlast('')
    setphone('')
    setemail('')
    setaddress('')
    setaddress2('')
    sethull('')
    setcity('')
    setzip('')
    setcountry('')
    setboatcurloc('')
    setstarboard('')
    setboatname('')
    setboatmanu('')
    setenmanu('')
    setenhours('')
    setdetails('')
    setyear('')
    setenmanu('')
    setenhours('')
    setserreq('')
    setreqsers([])
    setdetails('')
    setdone(true)
   }).catch((err)=> console.log(err))
  }

  return (
    <div>
      <div className={`${done ? 'fixed':'hidden'} flex items-center justify-center bg-opacity-50 bg-black h-full w-full top-0 left-0 right-0 bottom-0`}>
        <div className='bg-white rounded-md p-3 mx-3'>
          <p className='text-center text-2xl text-black uppercase'>Done!</p>
          <p className='text-gray-600'>We have received your response. We will contact with you soon.</p>
          <center>
            <button className='mt-3 px-5 py-2 rounded-md bg-blue-700 text-white' onClick={e=> setdone(false)}>Okay!</button>
          </center>
        </div>
      </div>
      <h1 className='text-center uppercase md:text-5xl text-3xl text-theme my-3'>Periodic Checks</h1>
      <p className='text-center text-gray-500'>We video all the work we carry out. View anytime and anywhere at your convenience!</p>
      <div className='md:m-5 m-3 md:p-5 p-3 ring-1 ring-gray-400 rounded-lg'>
          <h1 className='text-center text-theme text-xl md:text-3xl uppercase'>contact information</h1>
          <div className='grid md:grid-cols-2 grid-cols-1'>
            <div className='p-2'><label htmlFor='fname'>First Name*</label><br/><input required type="text" id='fname' value={first} onChange={e => setfirst(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
            <div className='p-2'><label htmlFor='lname'>Last Name*</label><br/><input required type="text" id='lname' value={last} onChange={e => setlast(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
            <div className='p-2'><label htmlFor='phone'>Phone*</label><br/><input required type="text" id='phone' value={phone} onChange={e=> setphone(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
            <div className='p-2'><label htmlFor='email'>Email*</label><br/><input required type="text" id='email' value={email} onChange={e => setemail(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
          </div>
            <p className='p-2 mt-4'>Address*</p>
            <div className='p-2 col-span-2'><label htmlFor='fname' className='text-gray-600'>Street Address</label><br/><input required type="text" id='fname' value={address} onChange={e => setaddress(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
            <div className='p-2 col-span-2'><label htmlFor='fname' className='text-gray-600'>Address Line 2</label><br/><input required type="text" id='fname' value={address2} onChange={e=> setaddress2(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
            <div className='grid md:grid-cols-2 grid-cols-1'>
            <div className='p-2'><label htmlFor='fname' className='text-gray-600'>City</label><br/><input required type="text" id='fname' value={city} onChange={e => setcity(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
            <div className='p-2'><label htmlFor='fname' className='text-gray-600'>ZIP/Postal Code</label><br/><input required type="text" value={zip} onChange={e => setzip(e.target.value)} id='fname' className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
      
            <div className='p-2'>
              <label>Country</label><br/> 
            <select className='ring-1 p-3 w-full ring-gray-400' value={country} onChange={e => setcountry(e.target.value)}>
                {contries.map((v,i)=>{
                  return <option>{v.name}</option>
                })}
              </select>
            </div>
          </div>
          <h1 className='text-left uppercase text-3xl mt-5 text-theme underline-offset-1'>boat information</h1>
          <div className='grid md:grid-cols-2 grid-cols-1'>
          <div className='p-2'><label htmlFor='fname' className='text-gray-600'>Boat Name*</label><br/><input required type="text" id='fname' value={boatname} onChange={e => setboatname(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
          <div className='p-2'><label htmlFor='fname' className='text-gray-600'>Boat Manufacturer*</label><br/><input required type="text" id='fname' value={boatmanu} onChange={e=> setboatmanu(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
          <div className='p-2'><label htmlFor='fname' className='text-gray-600'>Country of Registry*</label><br/><input required type="text" id='fname' value={cor} onChange={e=> setcor(e.target.value)} className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'/></div>
          <div className='p-2'>
              <label>Year</label><br/> 
            <select className='ring-1 p-3 w-full ring-gray-400' onChange={e=> setyear(e.target.value)} value={year}>
                <option>{new Date().getFullYear()}</option>
                {years.reverse().map((v,i)=> <option>{v}</option>)}
              </select>
            </div>
            <div className='p-2'><label htmlFor='fname' className='text-gray-600'>Hull ID</label><br/><input required type="text" id='fname' className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900' value={hull} onChange={e => sethull(e.target.value)}/></div>
            <div className='p-2'><label htmlFor='fname' className='text-gray-600'>Engine Manufacturer</label><br/><input required type="text" id='fname' className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900'  value={enmanu} onChange={e => setenmanu(e.target.value)}/></div>
            <div className='p-2'>
  
                <label htmlFor='fname' className='text-gray-600'>Engine Hours</label><br/>
                <div className=' items-center grid md:grid-cols-2 grid-cols-1'> 
                <input required type="text" 
                  id='fname' 
                  className='ring-1 p-2 ring-gray-400 w-50 my-2 md:my-0 transition-all ease-in-out duration-300 hover:ring-slate-900 mx-1'   
                  placeholder='PORT' value={enhours} onChange={e => setenhours(e.target.value)}   /> 
                <input required type="text" id='fname' 
                className='ring-1 p-2 ring-gray-400 w-50 my-2 md:my-0 transition-all ease-in-out duration-300 hover:ring-slate-900 mx-1' placeholder="STARBOARD" value={starboard} onChange={e => setstarboard(e.target.value)}  /></div></div>
            <div className='p-2'><label htmlFor='fname' className='text-gray-600'>Current Location</label><br/><input required type="text" id='fname' className='ring-1 p-2 ring-gray-400 w-full transition-all ease-in-out duration-300 hover:ring-slate-900' value={boatcurloc} onChange={e => setboatcurloc(e.target.value)}/></div>
          </div>
          <h1 className='text-left uppercase text-3xl mt-5'>services required</h1>
          <p className='text-gray-500 mt-3'>Check all that may apply.</p>
          <p className='text-gray-500 mb-3'>How often would you like the services performed?</p>
          <div className='mt-5'>
             {/* <p className='text-lg text-black'>Checks*</p>
             <form defaultValue={serreq} onChange={e => setserreq(e.target.value)}>
                <label>
                  <input type="radio" name='check' className='mt-3' value="Once"/>
                  <span className='ml-2'>Once</span>
                </label>
                <br/>
                <label>
                  <input type="radio" name='check' className='mt-3' value="Weekly"/>
                  <span className='ml-2'>Weekly</span>
                </label>
                <br/>
                <label>
                  <input type="radio" name='check' className='mt-3' value="Monthly"/>
                  <span className='ml-2'>Monthly</span>
                </label>
                <br/>
                <label>
                  <input type="radio" name='check' className='mt-3' value="Other"/>
                  <span className='ml-2'>Other</span>
                </label>
             </form> 
             {other &&
             <input type="text" placeholder="Type here.." onChange={e=> setothertext(e.target.value)} value={othertext} className='text-black ring-1 ring-gray-600 w-full md:w-52 p-2 mt-2'/>}*/}
          </div>
          <div className='grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 mt-3 md:mt-10'>
              <div>
                <h1 className='text-red-600 uppercase text-lg mt-5'>cleaning</h1>
                <div className='mt-5'>
                  {ticks.map((v,i)=>{
                    if(v.type === "clean"){
                      return <QuotationAdapter v={v} pushelem={pushelem}/>
                    }
                })}
                </div>
              </div>

              <div>
                <h1 className='text-red-600 uppercase text-lg mt-5'>repairs</h1>
                <div className='mt-5'>
                {ticks.map((v,i)=>{
                    if(v.type === "repair"){
                      return <QuotationAdapter v={v} pushelem={pushelem}/>
                    }
                })}
                </div>
              </div>
              
              <div>
                <h1 className='text-red-600 uppercase text-lg mt-5'>MISCELLANEOUS</h1>
                <div className='mt-5'>
                {ticks.map((v,i)=>{
                    if(v.type === "miscellaneous"){
                      return <QuotationAdapter v={v} pushelem={pushelem}/>
                    }
                })}
                </div>
              </div>
              

              <div>
                <h1 className='text-red-600 uppercase text-lg mt-5'>SPECIAL SERVICES</h1>
                <div className='mt-5'>
                {ticks.map((v,i)=>{
                    if(v.type === "special"){
                      return <QuotationAdapter v={v} pushelem={pushelem}/>
                    }
                })}
                </div>
              </div>
          </div>
          <textarea value={details} onChange={e => setdetails(e.target.value)} className='w-full ring-1 ring-gray-500 mt-5 p-3 rounded-lg' rows="5" placeholder='Details/Other Services' />
          <center>
          <button 
      disabled={!first || !last 
      || !phone || !email 
      || !address || !city } onClick={sendtodb} className='text-white uppercase bg-theme rounded-md shadow-sm transition-all ease-in-out duration-300 hover:shadow-md hover:bg-slate-900 disabled:bg-gray-500 disabled:cursor-not-allowed shadow-gray-600 px-10 py-2 mt-5'>Submit</button>
          </center>
      </div>
     
    </div>
  )
}

export default QuotationReq