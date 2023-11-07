import React, { useState, useEffect } from 'react';
// import {Html5QrcodeScanner} from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import Message from './Message';
import { useNavigate } from "react-router-dom";

import styles from './EWallet.module.css';

const qrConfig = { fps: 10, qrbox: { width: 400, height: 400 } };

let html5QrCode;

const EWallet = props => {

	const navigate = useNavigate();

	// We hard code the initial balance to 100
	const [balance, setBalance] = useState(0);
	// We have no initial topup value
	const [topup, setTopup] = useState(100);

	const [transhistory, setTransHistory] = useState([]);
	const [topuphistory, setTopupHistory] = useState([]);

	const [modal1, setModal1] = useState(false);
	const [modal2, setModal2] = useState(false);

	const [result, setResult] = useState('');

	const [msg, setMsg] = useState('');

	const [list, setList] = useState('trans');
	
	const { token, setToken } = props;

	useEffect(() => {
		// Put this reader to launch just once upon load
		html5QrCode = new Html5Qrcode("reader");
	}, []);

	const handleClickAdvanced = () => {
		setResult('');

		const qrCodeSuccessCallback = (decodedText, decodedResult) => {
			setResult(decodedText);
		  	let vproduct = getParameterByName('product', decodedText);
		  	let vprice = getParameterByName('price', decodedText);
			handleStop();
			setModal2(false);
			updateBalance(vproduct, vprice);
			// scanNPay(vproduct,vprice);
		};
		
		html5QrCode.start(
		  { facingMode: "environment" },
		  qrConfig,
		  qrCodeSuccessCallback
		);
	};
	
	const handleStop = () => {
		try {
			html5QrCode
			.stop()
			.then((res) => {
				html5QrCode.clear();
			})
			.catch((err) => {
				console.log(err.message);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const showModal1 = () => {
		setModal1(true); // This makes the topup modal appear
		setTopup(topup); // code to enable default topup 
		// setTopup(''); // original code
		setMsg('');
	}
	  
	const hideModal1 = () => {
		setModal1(false); // hides the Modal1
	}

	const showModal2 = () => {
		setModal2(true);
		setMsg('');
		handleClickAdvanced();
	}
	  
	const hideModal2 = () => {
		setModal2(false);
		handleStop();
	}

	const getParameterByName = (name, url) => {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	const topupAmount = (val) => {
		console.log('start const topupAmount')
		navigate("/wallet");
		if (val > 0) {
			// top up the balance with what is added
			// need to trigger the stripe transaction page or vv
			setBalance(balance + Number(val));
			console.log(balance + Number(val))
			// create obj item with two key-value pairs
			let item = {
				datetime : new Date().toLocaleString(),
				amount: val
			}
			// add obj item to prevArray using span cmd
			setTopupHistory(prevArray => [...prevArray, item])
			// set msg to indicate topup amt
			setMsg('added $' + val);
			hideModal1(false);
		} else {
			alert('Enter valid amount.')
		}
	}
	// update purchase info
	const updateBalance = (product, price) => {
		if (product && typeof Number(price) === 'number') {
			// if sufficient funds
			if (balance >= Number(price)) {
				// set new balance
				setBalance(balance - Number(price));
				console.log('balance1:',balance)
				// create a new purchase obj item
				let item = {
					datetime : new Date().toLocaleString(),
					product : product,
					price: price
				}
				setTransHistory(prevArray => [...prevArray, item])
				setMsg('deducted $' + price);

		const scanNPay = async (vproduct, vprice) => {
			console.log(vproduct,vprice,balance)
			
			axios({
				method: "POST",
				url: "http://127.0.0.1:5000/wallet",
				headers: {
					Authorization: 'Bearer ' + token
				},

				data: {
					topup: 0,
					product: vproduct,
					price: vprice,
					balance: balance - vprice,
					datetime: new Date().toLocaleString()
				}
				})			
			}
				scanNPay(product,price)
			} else {
				setMsg('insufficient balance.')
			}
		} else {
			setMsg('payment failed.');
		}
	}

	const toggleList = (val) => {
		setList(val);
	}

	//checkout fn does a http fetch to the server port
  //and checkout page, passing the std params and 
  //stringified cart.items dict
//   const cartItems = {
// 	sid: 'price_1NuQTyLNZCIg5vWkICyUd898',
// 	quantity: 1
//   }
	
  const onTopUp = async () => {

	console.log("topup:", topup, "balance:", balance)
	const newBalance = Number(balance) + Number(topup);
	console.log('newBalance:', newBalance)
	  
	// axios({
	// method: "POST",
	// 	url: "http://127.0.0.1:5000/wallet",
	// 	headers: {
	// 	Authorization: 'Bearer ' + token
	// 	},
	// 	data: {
	// 		topup: topup,
	// 		price: 0,
	// 		balance: Number(balance) + Number(topup),
	// 		product: "topup",
	// 		datetime: new Date().toLocaleString()
	// 	}
	// })
	//   topupAmount(topup);
	//   axios({
    //     // gets the user profile from flask dB
    //     method: "GET",
    //     url:`http://127.0.0.1:5000/profile/${email}`, 
    //     headers: {
    //       Authorization: 'Bearer ' + props.token
    //     }
    //   })  
    await fetch('http://localhost:4000/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
		body: JSON.stringify({
			items: [
				{ id: 1000, quantity: 1, name: 'Top Up', priceInCents: topup*100 },
                // { id: 2, quantity: 1}
			]
	})
    }).then((response) => {
    //   //jsonify the response
    return response.json();
    }).then((response) => {
    //   // if there is a key=url in the response dict
      if (response.url) {
    //     // forward user to stripe payment url
		  window.location.assign(response.url);
		  console.log('done checkout at:', response.url)
		  return true
        }
      }
	).then(() =>
		console.log('start post to dB'),
		axios({
			method: "POST",
				url: "http://127.0.0.1:5000/wallet",
				headers: {
				Authorization: 'Bearer ' + token
				},
				data: {
					topup: topup,
					price: 0,
					balance: Number(balance) + Number(topup),
					product: "topup",
					datetime: new Date().toLocaleString()
				}
		})

	).then((topup)=>topupAmount(topup))
  }

	return (
		<div className={styles.container}>

			<div className={styles.wrapper}>

				<div className={styles.header}>
					Payment
				</div>

				<div className={styles.card}>
					<div className={styles.walletheader}>
						My eWallet
					</div>
					<div className={styles.dollar}>
						{balance.toFixed(2)}
					</div>

					<div className={styles.message}>
						{/* if msg is true a message appears */}
						{msg &&
							<Message msg={msg} />
						}
					</div>
				
				</div>

				<div className={styles.action}>
					{/* scan & pay */}
					<button onClick={showModal2} className={styles.button}>Scan &amp; Pay</button>
					{/* top up */}
					<button onClick={showModal1} className={styles.button}>Top Up</button>
				</div>

				<hr className={styles.line} size="1" color="#d9d9d9" />

				<div className={styles.header}>
					History
				</div>

				<div className={styles.action}>
					<button onClick={()=>toggleList('trans')} className={`${styles.button} ${list === 'trans' ?  styles.green : ''}`}>Transaction</button>
					<button onClick={()=>toggleList('topup')} className={`${styles.button} ${list === 'topup' ?  styles.green : ''}`}>Top Up</button>
				</div>
				
				{/* card showing the latest transactions */}
				<div className={`${styles.card} ${styles.overflow}`}>
					<div className={styles.historyheader}>Latest</div>
					<ul>
						{ list === 'trans' ?
							transhistory.reverse().map( (item, i) =>
								<li key={i}>{item.datetime} - bought {item.product} @ ${item.price}</li>
							)
							:
							topuphistory.reverse().map( (item, i) =>
								<li key={i}>{item.datetime} - top up ${item.amount}</li>
							)
						}
					</ul>
				</div>

			</div>

			{/** MODAL **/}
			 
			<div className={`${styles.modal} ${modal1 ? styles.show : ""}`} >

				<div className={styles.modalheader}> 
					<div onClick={hideModal1} className={styles.closeicon}>
						<FontAwesomeIcon icon={faAngleLeft} />
					</div>
					<div className={styles.modaltitle}>
						Top Up
					</div>
					<div>
					
					</div>
				</div>

				<div className={styles.modalinput}>
					{/* if topup has a default value defined in state var it will appear here */}
					<input className={styles.input} type="number" placeholder="Top Amount" value={topup} onChange={(e) => setTopup(e.target.value)}/>
					<button className={styles.button} onClick={() => onTopUp(topup)}>Confirm</button>
					{/* <button className={styles.button} onClick={() => topupAmount(topup)}>Confirm</button> */}
				</div>	

			</div>

			<div className={`${styles.modal} ${modal2 ? styles.show : ""}`} >

				<div className={styles.modalheader}> 
					<div onClick={hideModal2} className={styles.closeicon}>
						<FontAwesomeIcon icon={faAngleLeft} />
					</div>
					<div className={styles.modaltitle}>
						Scan &amp; Pay
					</div>
					<div>
					
					</div>
				</div>

				<div className={styles.modalinput}>
					<div id="reader" className={styles.camera} />
					<div className={styles.result}>{result}</div>
				</div>	

			</div>


		</div>
	);
}

export default EWallet;