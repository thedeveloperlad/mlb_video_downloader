import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// import { Button, Form } from "semantic-ui-react";

const centerDivStyle = {
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      height: '100vh'
};

function App()
{

  const [inputValue, setInputValue] = useState(''); // Initialize state for the input value
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');
  const [jsonRes, setJsonRes] = useState('');
  const [dataName, setDataName] = useState('');
  const [dataSource, setDataSource] = useState('');
  const handleChange = (event) => {
        setInputValue(event.target.value); // Update state on every input change
  };

  //return message to the host (client) page
  useEffect(() => {
      fetch('http://localhost:5050/api/hello') // Match your Express server port
          .then(response => response.json())
          .then(data => setMessage(data.message))
          .catch(error => console.error('Error fetching data:', error));
  }, []);

   useEffect(() => {
      fetch('http://localhost:5050/api/datatest') // Match your Express server port
          .then(response => response.json())
          .then(data => setMessage(data.message))
          .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const checkURL = async (event) => {
  //async function checkURL (){

    console.log("input value: " + inputValue);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
                name: inputValue, // Use your own property name / key
          })
    };

    try
    {

      const response = await fetch('http://localhost:5050/api/checkURLvideo',requestOptions);

      // Check for HTTP errors (e.g., 404, 500)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json(); // Parse the JSON response body
      setJsonRes(data); // Update the component state with the response data
      // setError(null); // Clear any previous errors
      console.log('Received JSON response:', data);
      console.log('name', data.name )
      console.log('source', data.source )
      setDataName(data.name);
      setDataSource(data.source);
      //videoInformation.name = ogvideoTitle;
      //  videoInformation.source  = ogvideoMp4Source;
      //const jsonResponse = await response.json(); // Parse the JSON response
      //setJsonRes(jsonResponse);
      //console.log('Received JSON response:', jsonRes);

      /* if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } */

    } catch (error)
    {
      console.error('Error sending data:', error);
    }
  }

  /*async function  checkURL (){

    console.log("input value: " + inputValue);

     fetch('http://localhost:5050/api/checkURLvideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputValue, // Use your own property name / key
      }),
    }).then((request) => {
        request.json()
        const receivedData = request.json;
        console.log(receivedData.data);
        //console.log("Not valid URL");
        //console.log(request.json());
      })
      .then((result) => setData(result.rows))
      .catch((err) => console.log('error'))
  }*/

  const handleClick = () => {
    // alert('Button was clicked!');
    console.log(inputValue);
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    width: '40%',
  };
  
  return(
  <>
  <div class="flex flex-col md:flex-row mx-auto xs:gap-y-2 md:gap-y-0">
    <div class="max-w-4xl mx-auto">
        
      <Row>
        <div className="container">
            <div class="item item-grow-3"> 
              <label htmlFor="myInput">Enter URL:</label> 
              {" "}
              <input type="text" id="myInput" style={inputStyle}  placeholder="Insert link" value={inputValue}  onChange={handleChange} />
              {" "} <Button onClick={checkURL}>Download</Button> 
            </div>
        </div>
      </Row>
      <Row>
       {/*<div>
        <p>You typed: {inputValue}</p>
      </div>*/}
      </Row>
      </div>
    <h2>Flex Grow Relative Example</h2>
    <div class="container">
        {/*<div>NAME: {dataName}</div>*/}
        {/*<div>Source: {dataSource}</div>*/}
        <div class="item item-grow-1">Name: {dataName}</div>
        <div class="item item-grow-1">Source: {dataSource}</div>
        <div class="item item-grow-1">
          <a href={dataSource} download={dataName+".mp4"}>
            <button> Download Video File </button>
          </a>
        </div>
        <video src={dataSource} width="800" height="400" controls />
        {/*<div>Source: {jsonRes.data.originalData.source}</div>*/}
        {/*<div class="item item-grow-1">Item 1 (grow: 1)</div>
        <div class="item item-grow-2">Item 2 (grow: 2)</div>
        <div class="item item-grow-3">Item 3 (grow: 3)</div>
        <div class="item item-grow-3"><p>Message from server: {message}</p></div>*/}
    </div>
  </div>

    </> 
  );
}

export default App;
