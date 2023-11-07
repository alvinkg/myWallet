import  { useRef, useState, useEffect } from 'react'
import axios from "axios"
// import { format } from "date-fns";
import './StockCount.css';
const baseUrl = "https://konvergentgroup.com/braek"
// const baseUrl = "https://redpillsage.com"
// const baseUrl = "http://redpillsage.com:5000"
// const baseUrl = "http://localhost:5000"

function AddItem() {
  //state var
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [reorder, setReorder] = useState("");
  const [editReorder, setEditReorder] = useState("");
  const [safety, setSafety] = useState("");
  const [editSafety, setEditSafety] = useState("");

  const [eventsList, setEventsList] = useState([]);
  const [eventId, setEventId] = useState(null);

  const [errMsg, setErrMsg] = useState('');

  // sets the focus on user input when loading component
  const userRef = useRef();
  // focus on error when it occurs
  const errRef = useRef();
  const [formData, setFormData] = useState({
    description: "" ,
    quantity: "",
    reorder: "",
    safety:""
  });

  const fetchEvents = async () => {
    const data = await axios.get(`${baseUrl}/events`)
    console.log(`${baseUrl}`)
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

  // every time we click submit we update our webpage stateVar eventsList
  const handleSubmit = async (e) => {
    // we prevent any other page refresh
    e.preventDefault();
    try {
      // need to know what is the trigger here
      if (editDescription) {
        // add editQuantity
        const data = await axios.put(`${baseUrl}/events/${eventId}`,
          {
            description: editDescription,
            quantity: editQuantity,
            reorder: editReorder,
            safety: editSafety
          })
        const updatedEvent = data.data.event;
        console.log(`${baseUrl}/events/${eventId}`)
        console.log(data)
        console.log('status:', data.status)
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
        console.log(`${baseUrl}`)
        const data = await axios.post(`${baseUrl}/events`, { description: description, quantity: quantity, reorder: reorder, safety: safety })
        setFormData(data.data)
        console.log('formData:', formData) // confirm info is passed to state
        // we use the span fn to update the stateVar eventsList with the latest data
        setEventsList([...eventsList, data.data])
        //we clear out the stateVar description
        // TODO: remove console.logs before deployment
        console.log(JSON.stringify(data?.data));
        console.log(JSON.stringify(data))
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
      if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 409) {
        setErrMsg('Duplicate Name');
    } else {
        setErrMsg('Add Item Failed')
    }
    }
  };

  return (
    <div className="App">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleSubmit}>

          <label htmlFor="description">Description</label>
          <input
            onChange={(e)=> handleChange(e, 'description')}
            type="text"
            name="description"
            id="description"
            placeholder='Product'
            value={description}
            required
        />
        
          <label htmlFor="quantity">Quantity</label>
          <input
          onChange={(e) => handleChange(e, 'quantity')}
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          placeholder='What we have'
          required
        />
        
          <label htmlFor="reorder">Reorder</label>
          <input
            onChange={(e)=> handleChange(e, 'reorder')}
            type="number"
            name="reorder"
            id="reorder"
            placeholder='Max we need'
            value={reorder}
            required
        />
        
          <label htmlFor="description">Safety</label>
          <input
            onChange={(e)=> handleChange(e, 'safety')}
            type="number"
            name="safety"
            id="safety"
            placeholder='Min we need'
            value={safety}
            required
          />

          <button
            className='btn btn-success'
            type="submit">Submit</button>
        </form>

    </div>
  );
}


export default AddItem;
