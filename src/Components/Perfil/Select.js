import React, { Component } from 'react'

export default class Select extends Component {
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
          { this.props.valorinicial=="" &&
            <option value="" key="-1" hidden>Tria...</option>
            }

          {
              this.state.items.map((item,key)=>{
                  return <option value={item[this.props.clau]} key={key}>{item[this.props.display]}</option>
              })
          }
      </select>
    )
  }
}
