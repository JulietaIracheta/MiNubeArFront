import React, { Component } from 'react';
import Game from './Game';
import Board from './Board';
import PubNubReact from 'pubnub-react';
import Swal from "sweetalert2";  
import shortid  from 'shortid';
import './Game.css';
import NavEstudiante from "../../NavEstudiante";
import Sidebar from "../../../Sidebar";
import { SidebarDataEstudiante } from "../../../sideBar/SidebarDataEstudiante";
 
class App extends Component {
  constructor(props) {  
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: "pub-c-aa7899cb-1ef2-4911-bb96-e4759b3f9149", 
      subscribeKey: "sub-c-ec2fd878-d6d8-11eb-9280-fa77d5b6609d"    
    });
    
    this.state = {
      piece: '',
      isPlaying: false,
      isRoomCreator: false,
      isDisabled: false,
      myTurn: false,
    };

    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;    
    this.pubnub.init(this);
  }  
  
  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels : [this.lobbyChannel, this.gameChannel]
    });
  }
  
  componentDidUpdate() {
    // Check that the player is connected to a channel
    if(this.lobbyChannel != null){
      this.pubnub.getMessage(this.lobbyChannel, (msg) => {
        // Start the game once an opponent joins the channel
        if(msg.message.notRoomCreator){
          // Create a different channel for the game
          this.gameChannel = 'tictactoegame--' + this.roomId;

          this.pubnub.subscribe({
            channels: [this.gameChannel]
          });

          this.setState({
            isPlaying: true
          });  

          // Close the modals if they are opened
          Swal.close();
        }
      }); 
    }
  }

  // Create a room channel
  onPressCreate = (e) => {
    // Create a random name for the channel
    this.roomId = shortid.generate().substring(0,5);
    this.lobbyChannel = 'tictactoelobby--' + this.roomId;


    this.pubnub.subscribe({
      channels: [this.lobbyChannel],
      withPresence: true
    });

  // Open the modal
  Swal.fire({
    position: 'top',
    allowOutsideClick: false,
    title: 'Compartí esta sala con tu amigo',
    text: this.roomId,
    width: "80%",
    // Custom CSS
    customClass: {
      height:"258px",
        heightAuto: false,
        title: 'title-class',
        popup: 'popup-class',
        confirmButton: 'button-class'
    }
  })

    this.setState({
      piece: 'X',
      isRoomCreator: true,
      isDisabled: true, // Disable the 'Create' button
      myTurn: true, // Room creator makes the 1st move
    });   
  }
  
  // The 'Join' button was pressed
  onPressJoin = (e) => {
    Swal.fire({
      position: 'top',
      input: 'text',
      allowOutsideClick: false,
      inputPlaceholder: 'Ingresar sala Id',
      showCancelButton: true,
      confirmButtonColor: 'rgb(208,33,41)',
      confirmButtonText: 'OK',
      width: "80%",
      height:"100%",
      customClass: {
        heightAuto: false,
        popup: 'popup-class',
        confirmButton: 'join-button-class ',
        cancelButton: 'join-button-class'
      } 
    }).then((result) => {
      // Check if the user typed a value in the input field
      if(result.value){
        this.joinRoom(result.value);
      }
    })
  }

  // Join a room channel
  joinRoom = (value) => {
    this.roomId = value;
    this.lobbyChannel = 'tictactoelobby--' + this.roomId;

    // Check the number of people in the channel
    this.pubnub.hereNow({
      channels: [this.lobbyChannel], 
    }).then((response) => { 
        if(response.totalOccupancy < 2){
          this.pubnub.subscribe({
            channels: [this.lobbyChannel],
            withPresence: true
          });
          
          this.setState({
            piece: 'O',
          });  
          
          this.pubnub.publish({
            message: {
              notRoomCreator: true,
            },
            channel: this.lobbyChannel
          });
        } 
        else{
          // Game in progress
          Swal.fire({
            position: 'top',
            allowOutsideClick: false,
            title: 'Error',
            text: 'Juego en progreso. Intente con otra sala',
            width: "80%",
      height:"100%",
            customClass: {
                heightAuto: false,
                title: 'title-class',
                popup: 'popup-class',
                confirmButton: 'button-class'
            }
          })
        }
    }).catch((error) => { 
      console.log(error);
    });
  }

  // Reset everything
  endGame = () => {
    this.setState({
      piece: '',
      isPlaying: false,
      isRoomCreator: false,
      isDisabled: false,
      myTurn: false,
    });

    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;  

    this.pubnub.unsubscribe({
      channels : [this.lobbyChannel, this.gameChannel]
    });
  }
  
  render() {  
    return (  
      <div>
      <NavEstudiante />
      <div className="flex">
          <Sidebar data={SidebarDataEstudiante} />
          <div className="container-fluid">
          <div className="title">
            <p>Ta Te Tí</p>
          </div>

          {
            !this.state.isPlaying &&
            <div className="game">
              <div className="board">
                <Board
                    squares={0}
                    onClick={index => null}
                  />  
                  
                <div className="button-container">
                  <button 
                    className="btn btn-primary mt-4 "
                    disabled={this.state.isDisabled}
                    onClick={(e) => this.onPressCreate()}
                    > Crear
                  </button>
                  <button 
                    className="btn btn-warning mt-4 ml-2"
                    onClick={(e) => this.onPressJoin()}
                    > Unirse
                  </button>
                </div>                        
          
              </div>
            </div>
          }

          {
            this.state.isPlaying &&
            <Game 
              pubnub={this.pubnub}
              gameChannel={this.gameChannel} 
              piece={this.state.piece}
              isRoomCreator={this.state.isRoomCreator}
              myTurn={this.state.myTurn}
              xUsername={this.state.xUsername}
              oUsername={this.state.oUsername}
              endGame={this.endGame}
            />
          }
        </div></div></div>
    );  
  } 
}

export default App;
