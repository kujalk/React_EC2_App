import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from 'react-collapsible';
import '../css/EC2.css';

class EC2OnView extends Component {
    state = { 
        createdDate: "",
        details: []
     }

     fetchData()
     {
         // Fetch Function   
         fetch("./data.json")
         .then(response => response.json())
         .then(data => this.setState({details:data.Details}))
         .catch(error => console.log(error));
     }
 
     // Fetch Function   
     componentDidMount()
     {
          this.fetchData()
         setInterval(()=> this.fetchData(), 120000);
     }

    countEC2()
    {
        let count = 0
        this.state.details.map(x => x.State==='On' ? count++:null)
        return count
    }

    renderDetails()
    {
        //this.getData()
        return(   
            
            <React.Fragment>

                <Collapsible trigger={"Powered ON EC2 => "+ this.countEC2()} >
                
                    <table class="table table-bordered">
                        <thead>
                            <tr class="table-success">
                            <th>Region</th>
                            <th>Availability Zone</th>
                            <th>Instance ID</th>
                            <th>Size</th>
                            <th>State</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.details.map(x => x.State ==='On' ?
                            <tr class="bg-success">
                                <td>{x.Region}</td>
                                <td>{x.AZ}</td>
                                <td>{x.ID}</td>
                                <td>{x.Size}</td>
                                <td>{x.State}</td>
                            </tr>
                            :null
                            )}
                        </tbody>
                    </table>
                    </Collapsible>

            </React.Fragment>
        
        );
    }

    render() { 
        return ( 
        this.renderDetails()
         );
    }
}
 

export default EC2OnView;