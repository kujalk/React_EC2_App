import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class UpdateEC2 extends Component {
    state = { 
        createdDate: ""
     }

    fetchData()
    {
        // Fetch Function   
        fetch("./data.json")
        .then(response => response.json())
        .then(data => this.setState({createdDate:data.Date}))
        .catch(error => console.log(error));
    }

    // Fetch Function   
    componentDidMount()
    {
        console.log("Hello")
        this.fetchData()
        setInterval(()=> this.fetchData(), 120000);
    }

    render() { 
        //this.getData()
        return ( 
            <React.Fragment>
                <a class="navbar-brand" href="#">
                    Updated Date : {this.state.createdDate}
                </a>
            </React.Fragment>                  
    
         );
    }
}
 
export default UpdateEC2;