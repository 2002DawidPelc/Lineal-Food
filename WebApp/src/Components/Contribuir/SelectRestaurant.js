import React, { Component } from 'react';
import traduccions from '../traduccions.json';

export default class SelectRestaurant extends Component {
    state={
        items:[]
    }

    componentDidMount(){
        this.descarrega();
    }

    descarrega=()=> {
        fetch(this.props.url, {
            method: 'GET'
        })
            .then(resposta => {
                return resposta.json()
            })
            .then(respostajson => {
                this.setState({
                    items: respostajson
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChange=(event)=>{
        this.props.canviar(event.target.value);
    }

  render() {
    return (
      <select className="form-control" onChange={this.onChange} value={this.props.valorinicial}>
            {
              this.state.items.map((item,key)=>{
                  if(item[this.props.clau] == 6){
                    return <option value={item[this.props.clau]} key={key} selected>{traduccions[sessionStorage.getItem("idioma_id")][0].ns}</option>
                  } else {
                      return <option value={item[this.props.clau]} key={key}>{item[this.props.display]}</option>
                  }
              })
          }
      </select>
    )
  }
}
