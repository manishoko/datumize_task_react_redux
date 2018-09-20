import React , { Component } from 'react';
class Table extends Component {
  constructor(props) {
    super(props);
    this.state={
      assignProjects:this.props.assignProjects,
   };
  }
render(){
  return(
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
             <th>Project Name</th>
             <th>Admin</th>
             <th>Editor</th>
             <th>Viewer</th>

          </tr>
        </thead>
        <tbody>
          { this.state.assignProjects.length >=1 &&
          this.state.assignProjects.map((index,i)=>
            <tr key={i}>
              <td >{index.projectName}</td>
              <td>{index.admin}</td>
              <td>{index.editor}</td>
              <td>{index.viewer}</td>

            </tr>

          ) }
          {this.state.assignProjects.length == 0 ? ( <tr><td colSpan='4'>No data in table</td></tr> ) : ( <tr></tr> )}
        </tbody>
      </table>
    );
  }
}

export default Table;
