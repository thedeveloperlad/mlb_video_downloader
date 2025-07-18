import { React, useState} from 'react';
import './App.css';

function App() {

  /*class DownloadForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A URL was submitted: ' + this.state.value);
      event.preventDefault();
    }
  }*/

  const [nameURL, setURL] = useState("");
  const [error, setError] = useState(false);

  console.log(nameURL);
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      
      console.log(nameURL);

      if(nameURL.length == 0)
      {
        console.log("Empty field")
        setError(true);
      } 
      
      let result = await fetch(
      'http://localhost:4000/downloader', {
            method: "post",
            body: JSON.stringify({ nameURL }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
        })

        result = await result.json();
        console.warn(result);

        if (result) {
            alert("Data saved successfully");
            setURL("");
        }
    }

    return(
          <>
          <div class="col-lg-6 col-md-8 col-sm-9 mx-auto text-center ">
              <div class="container-xxl col-lg-12 pb-2">
				            <h1 class="display-6">MLB Video Downloader</h1>
				            <h2 class="lead text-muted">Download MLB videos</h2>
		    	    </div>
              <div class="container-fluid pt-3 pb-3 px-0 bg-light" id="inputContainer">
                  <form onSubmit={handleSubmit}>
                  <div class="input-group input-group-lg mb-3 shadow-sm rounded-1">
                        <input type="url" id="mlbURL" name="mlbURL" placeholder="MLB URL link" class="border border-end-0 form-control shadow-none fs-6" aria-describedby="button-addon2" value={nameURL} onChange={(e) => setURL(e.target.value)} />
                        { /** <input type="submit" class="border border-end-0 form-control shadow-none fs-6" value="Submit" onClick={handleSubmit}/> **/}
                    {/** error && nameURL.value <= 0 ? "ERROR LABEL" : "" **/}
                  </div>
                  { <button id="submitBtn" type="submit" class="btn btn-block w-100 btn-dark btn-lg shadow-sm rounded-1 fw-bold fs-5">Download</button> }
                  </form>
              </div>
              
          </div>
          </>
    );
}

export default App;
