import React , {Component} from 'react';
import { BrowserRouter as Router , Route, Link,Switch } from 'react-router-dom';
import Table from './Table';
import projects from '../../jsonData/project.json';
import { connect } from 'react-redux';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      roles:props.roles,
      users:this.props.usersk,
      projects:this.props.projects,
      error:'',
      submitted:false,
      assignProjects:[],
      assignUser:{
          projectName:'',
          admin:'',
          editor:'',
          viewer:''
        },
      projectCheck:-1,
      selectedUser:[],
    };
    this.handleChange=this.handleChange.bind(this);
    this.addProject = this.addProject.bind(this);
  }

  // function for check user , role and assign temp state varaibales
  handleChange(event) {
      var name=event.target.name;
      var selectedUser=this.state.selectedUser;
      var assignUser=this.state.assignUser;
      const assignProjects=this.state.assignProjects;
      const error = this.state.error;
      var projectCheck=this.state.projectCheck;
      var user=this.state.user;
      if(name==='project'){
        assignProjects.map((assignProject,i)=>
         {
           if(assignProject.projectName==event.target.value)
             {
               projectCheck=i;
               this.setState({projectCheck});
             }
          }
        );
        assignUser.projectName=event.target.value;
        this.setState({assignUser});
      }else{
        const {name} = event.target;
        if(this.state.selectedUser.indexOf(event.target.value)>=0){
              this.setState({error:"user is arleady used"});
          }else{
          this.setState({error:""});
        if (name==='Admin') {
          assignUser.admin=event.target.value;
          this.setState({assignUser});
          selectedUser.push(event.target.value);
          this.setState({selectedUser});
        }
        if (name==='Editor') {
          assignUser.editor=event.target.value;
          this.setState({assignUser});
          selectedUser.push(event.target.value);
          this.setState({selectedUser});
        }
        if (name==='Viewer') {
          assignUser.viewer=event.target.value;
          this.setState({assignUser});
          selectedUser.push(event.target.value);
          this.setState({selectedUser});
        }
      }
    }
  }
  // function for add , edit assign data .
  addProject(event){
    event.preventDefault();
    const error = this.state.error;
    const assignUser=this.state.assignUser;
    const assignProjects = this.state.assignProjects;
    var projectCheck=this.state.projectCheck;
    //check value is empty or not
    if(assignUser.viewer ==='' || assignUser.admin ==='' || assignUser.editor ==='' || assignUser.projectName===''){
      this.setState({error:"All Field are required ."});
    }else{
      this.setState({error:""});
      if(projectCheck>=0){
         assignProjects[projectCheck]=this.state.assignUser;
         this.setState({assignProjects});
         this.refs.assignForm.reset();
      }else{
        assignProjects.push(this.state.assignUser);
        this.setState({assignProjects});
        this.refs.assignForm.reset();
      }
      this.setState({projectCheck:-1});
      console.log(this.state.projectCheck);
      const selectedUser=this.state.selectedUser;
      this.setState({selectedUser:[]});
      const assignUser={
          projectName:'',
          admin:'',
          editor:'',
          viewer:''
        };
      this.setState({assignUser});
    }
  }



  render(){
    const { assign , submitted } = this.state;
  
    return(
    <div className="container">
      <div className="row">
            <br />
            <button type="button" className="btn btn-info btn-xs" data-toggle="modal" data-target="#myModal">Assign Project</button>
            <hr/>
            <Table assignProjects={this.state.assignProjects} />
      </div>
        <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={ this.addProject } ref="assignForm">
                <div className="Form-group">
                     <label>Select Project</label>
                      <select className="form-control" ref="project" name="project" onChange={this.handleChange}  >
                         <option value="" >-</option>
                         {this.state.projects.map((index,i)=>
                           <option value={index.name} key={i}>{index.name}</option>
                         )}

                      </select>
                </div>
               <div className='form-group isShow'>
                  <label>Select User</label>
                  <select className="form-control" ref='Admin'  name="Admin" onChange={this.handleChange}  >
                    <option value="">-</option>
                      {this.state.users.map((index,i)=>
                        <option value={index.name} key={i}>{index.name}</option>
                      )}
                  </select>
               </div>
               <div className='form-group isShow'>
                  <label>Select User</label>
                  <select className="form-control"  name="Editor" onChange={this.handleChange}  >
                     <option value="">-</option>
                     {this.state.users.map((index,i)=>
                       <option value={index.name} key={i}>{index.name}</option>
                     )}
                  </select>
               </div>
               <div className='form-group isShow'>
                  <label>Select User</label>
                  <select className="form-control"  name="Viewer" onChange={this.handleChange}  >
                     <option value="">-</option>
                     {this.state.users.map((index,i)=>
                       <option value={index.name} key={i}>{index.name}</option>
                     )}
                  </select>
               </div>

              <p className="text text-danger">{this.state.error}</p>

               <hr />
               <div className="Form-group">
                   <input type="submit" className="btn btn-info pull-right" value="Assign" />
               </div>
               <br/><br/>
               </form>
            </div>

          </div>
        </div>
      </div>

      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    usersk:state.users,
    projects:state.projects,
    roles:state.roles
  }
}

export default connect(mapStateToProps)(ProjectForm);
