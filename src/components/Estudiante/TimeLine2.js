import React from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import NavEstudiante from './NavEstudiante'
import Sidebar from '../Sidebar'
import {SidebarDataEstudiante} from '../sideBar/SidebarDataEstudiante';


const EXAMPLE = [
  {
    data: "2018",
    status: "Promedio 8,50",
  
  },
  {
    data: "2019",
    status: "Promedio 9,50",
  },
  {
    data: "2020",
    status: "Promedio 8,00"
  }
];

export default class Timeline2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: 0,      
      prevIdx: -1
    };
  }

  //state = { value: 0, previous: 0 };

  render() {    
    const {curIdx, prevIdx} = this.state;
    const curStatus = EXAMPLE[curIdx].status;
    const prevStatus = prevIdx >= 0 ? EXAMPLE[prevIdx].statusB : '';

    return (
      <div>
        <NavEstudiante />
      <div>
      <div className="d-flex mt-1 borde-tutor">
        <Sidebar data={SidebarDataEstudiante}/>
        <div className="container mt-2">
          <h2 className="font-weight-bold">Trayectoria Escolar</h2>
          <hr class="hr-color w-100" />
          <div className="row w-100">

      <div className="container mt-5">
        {/* Bounding box for the Timeline */}
        <div
          style={{
            width: "100%",
            height: "100px",
            margin: "0 auto",
            marginTop: "20px",
            fontSize: "15px"
          }}
        >
          <HorizontalTimeline
            styles={{
              background: "#f8f8f8",
              foreground: "#1A79AD",
              outline: "#dfdfdf"
            }}
            index={this.state.curIdx}
            indexClick={index => {
              const curIdx = this.state.curIdx;
              this.setState({ curIdx: index, prevIdx: curIdx });
            }}            
            values={EXAMPLE.map(x => x.data)}
            getLabel={function(date) { return date.slice(0, 4); }}
          />
        </div>
        <div className="text-center">
          {/* any arbitrary component can go here */}
          {curStatus}
    
      </div>
      </div>
      </div>
      </div>
      </div>   
      </div>
      </div>
    );
  }
}
