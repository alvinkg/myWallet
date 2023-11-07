import  { useState, useEffect } from 'react'
import axios from "axios"
import { format } from "date-fns";
import './StockCount.css';


const baseUrl = "https://konvergentgroup.com/braek"
// const baseUrl = "https://redpillsage.com"
// const baseUrl = "https://redpillsage.com:5000"
// const baseUrl = "http://localhost:5000"

function StockCount() {
  //state var
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [editQuantity, setEditQuantity] = useState(0);
  const [reorder, setReorder] = useState(0);
  const [editReorder, setEditReorder] = useState(0);
  const [safety, setSafety] = useState(0);
  const [editSafety, setEditSafety] = useState(0);

  const [eventsList, setEventsList] = useState([]);
  const [eventId, setEventId] = useState(null);
  
  const [formData, setFormData] = useState({
    description: "" ,
    quantity: 0,
    reorder: 0,
    safety: 0
  });

  const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToast')

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
      toastBootstrap.show()
    })
  }

  const fetchEvents = async () => {
    const data = await axios.get(`${baseUrl}/events`)
    console.log("DATA: ", data)
    const { events } = data.data
    setEventsList(events);
  }
  useEffect(() => {
    fetchEvents();
  }, [])

  const handleChange = (e, field) => {
    if (field === "edit") {
      // console.log(e.target.name)
      // set the edit state var
      if (e.target.name === 'editDescription') {
        setEditDescription(e.target.value)
      }
      if (e.target.name === 'description') {
        setDescription(e.target.value)
      }
      if (e.target.name === 'editQuantity') {
        setEditQuantity(e.target.value)
      }
      if (e.target.name === 'quantity') {
        setQuantity(e.target.value)
      }
      if (e.target.name === 'editReorder') {
        setEditReorder(e.target.value)
      }
      if (e.target.name === 'reorder') {
        setReorder(e.target.value)
      }
      if (e.target.name === 'editSafety') {
        setEditSafety(e.target.value)
      }
      if (e.target.name === 'safety') {
        setSafety(e.target.value)
      }

    } else {
      // New Entry
      if (e.target.name === 'quantity') {
        setQuantity(e.target.value)
      }    
      if (e.target.name === 'description') {
        setDescription(e.target.value)
      }     
      if (e.target.name === 'reorder') {
        setReorder(e.target.value)
      }     
      if (e.target.name === 'safety') {
        setSafety(e.target.value)
      }     
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [e.target.name]: e.target.value
        }
      })
    }
  };

  const handleDelete = async (id) => {
    try { 
      await axios.delete(`${baseUrl}/events/${id}`)
      // filter to pass all but the event with the id
      const updatedList = eventsList.filter((event) => event.id !== id)
      setEventsList(updatedList)
    }
    catch (err) {
      console.error(err.message)
     }
    
  }
  // pass an event and extract to state the id and description
  const toggleEdit = (event) => {
    setEventId(event.id);
    setEditDescription(event.description);
    setEditQuantity(event.quantity);
    setEditReorder(event.reorder);
    setEditSafety(event.safety);
    // added for event obj
    setFormData(event)
    console.log('formData:', formData)
  }

  // every time we click submit we update our webpage stateVar eventsList
  const handleSubmit = async (e) => {
    // we prevent any other page refresh
    e.preventDefault();
    try {
      // need to know what is the trigger here
      if (editDescription) {
        // add editQuantity
        const data = await axios.put(`${baseUrl}/events/${eventId}`, {description: editDescription, quantity: editQuantity, reorder: editReorder, safety: editSafety})
        const updatedEvent = data.data.event;
        // console.log(data)
        // console.log('updatedEvent:', updatedEvent)
        setFormData(updatedEvent)
        // console.log('formData:', formData)
        const updatedList = eventsList.map((event) => {
          if (event.id === eventId) {
            return event = updatedEvent
          }
          return event
        })
        setEventsList(updatedList)

        // if we did not edit
      } else {
        // we post the latest data to the api endpt
        const data = await axios.post(`${baseUrl}/events`, { description: description, quantity: quantity, reorder: reorder, safety: safety })
        setFormData(data.data)
        console.log('formData:', formData)
        // we use the span fn to update the stateVar eventsList with the latest data
        setEventsList([...eventsList, data.data])
        //we clear out the stateVar description
      }
      // clear fields after update
      setEventId(null);
      setDescription('');
      setEditDescription('');
      setQuantity(0);
      setEditQuantity('');
      setReorder('');
      setEditReorder('');
      setSafety('');
      setEditSafety('');
    }
    //pass the error to catch fn
    catch (err) {
      //share the message in err
      console.error(err.message)
    }
  };

  return (
    <div className="container">

      <div className='container' style={{ display: "flex", margin: 10, padding: 10, overflow:'auto' }}>
      <ul className="list-group" style={{ display: "flex", margin: 10, padding: 10 }}>
          {/* map each event in the list into form */}
          {eventsList.map(event => {
            // if we click 'edit' we load the selected event and pass eventId to form
            if (eventId === event.id) {
              return (     
                    <li key={event.id}>
                <form onSubmit={handleSubmit}>

                    <input
                      onChange={(e)=> handleChange(e, 'edit')}
                      type="text"
                      name="editDescription"
                      id="editDescription"
                      value={editDescription}
                    />
            
                    <input
                      onChange={(e)=> handleChange(e, 'edit')}
                      type="text"
                      name="editQuantity"
                      id="editQuantity"
                      value={editQuantity}
                    />

                    {/* <input
                      onChange={(e)=> handleChange(e, 'edit')}
                      type="text"
                      name="editReorder"
                      id="editReorder"
                      value={editReorder}
                    />

                    <input
                      onChange={(e)=> handleChange(e, 'edit')}
                      type="text"
                      name="editSafety"
                      id="editSafety"
                        value={editSafety}
                    /> */}
          
             
                    <button className='btn btn-primary' type='submit'>Submit</button>


                  </form>
                </li>
              )
            }
            else{
              return (
                  <li className='list-group-item justify-content-between align-items-center' style={ { display: "flex", margin:1, gap: 5 }} key={event.id}>
                    {format(new Date(event.created_at), "MM/dd, p")}:{""}
                  <span>{event.description}</span>
                    <span className="badge bg-primary rounded-pill">
                      {event.quantity}
                    </span >
                    <span className="badge bg-success rounded-pill">
                      {event.buy}
                    </span>
                      {/* {event.reorder} */}
                      {/* {event.safety} */}
                      {/* {event.created_at} */}
                      <button  className="btn btn-warning" onClick={() => toggleEdit(event)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(event.id)}>X</button>
                  </li>
              )              
            }
          })}
        </ul>

      {/* <div className='container'  style={{margin:"20px"}}>
        {eventsList.map(event => {
          if (event.buy !== 0) {
            return (
              <span  key={event.id} style={{ display: "inline" }}>
                <nobr>
                  {event.description}&nbsp;{event.buy},
                </nobr>
              </span>
            )
          }
        })
      }*/}
      </div> 

      <button type="button" className="btn btn-primary" id="liveToastBtn">What to Buy</button>

<div className="toast-container position-fixed center-0 center-0 p-3">
  <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <img src="./braek1.png" className="rounded me-2" alt="..."/>
      <strong className="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body"  style={{ color: "blue" }}>
    {eventsList.map(event => {
          if (event.buy !== 0) {
            return (
              <span  key={event.id} style={{ display: "inline" }}>
                <nobr>
                  {event.description}&nbsp;{event.buy},
                </nobr>
              </span>
            )
          }
        })
      }
    </div>
  </div>
</div>

    </div>
  );
}

export default StockCount;
