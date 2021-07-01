import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from 'react-collapsible';
import '../css/EC2.css';

class EC2View extends Component {
    state = { 
        createdDate: "",
        details: [],
        all_states : ["On","Off","Pending"]
     }

     fetchData()
     {  
         fetch("./data.json")
         .then(response => response.json())
         .then(data => {
                this.setState({details:data.Details}); 
                this.setState({createdDate:data.Date});
            })
         .catch(error => console.log(error));
     }
   
     componentDidMount()
     {
         this.fetchData()
         setInterval(()=> this.fetchData(), 120000);
     }

    countEC2(ec2_state)
    {
        let count = 0
        this.state.details.map(x => x.State===ec2_state ? count++:null)
        return count
    }

    getBorderColor(ec2_state)
    {
        switch(ec2_state)
        {
            case "On":
                return "success";
            case "Off":
                return "danger";
            case "Pending":
                return "warning"
            default:
                return "warning"
        }
    }

    renderDetails(ec2_state)
    {
        return(   
            
            <React.Fragment>

                <div className="container-fluid" style={{height: '90px', backgroundColor:'cyan'}}>
                    <div className="row">
                        <div className="col">
                            <p style={{color: 'blue',fontSize: '40px',textAlign: 'left',paddingTop: '30px',fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', 'sans-serif'"}}>EC2 Information</p>
                        </div >
                        <div className="col">
                            <p style={{color: 'blue',fontSize: '20px',textAlign: 'right',paddingTop: '50px',fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', 'sans-serif'"}}>Updated Date : {this.state.createdDate}</p>
                        </div >
                    </div>
                </div>
                    <p></p>

                    {this.state.all_states.map(ec2_state => 
                    <Collapsible trigger={"Power " + ec2_state + " EC2 => "+ this.countEC2(ec2_state)} >
                    
                        <table className="table table-bordered">
                            <thead key="{ec2_state}-thead">
                                <tr className={"table-" + this.getBorderColor(ec2_state)}>
                                <th>Region</th>
                                <th>Availability Zone</th>
                                <th>Instance ID</th>
                                <th>Size</th>
                                <th>State</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.details.map(x => x.State ===ec2_state ?
                                <tr className={"bg-" + this.getBorderColor(ec2_state)}>
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
            )}
            </React.Fragment>
        
        );
    }

    render() { 
        return ( 
        this.renderDetails()
         );
    }
}
 
export default EC2View;