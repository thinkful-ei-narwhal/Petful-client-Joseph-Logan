import React, { Component } from 'react'
import People from './People';
import Loading from './loading';

export default class AdoptionWindow extends Component {

  render() {
    console.log(this.props)
    if (this.props.isLoading) return <Loading />;
    return (
      <section className="adoptionPage">
        <div className="adoptionWindow-container">
          <div className="adoptionWindow">
            <section className="adopt-animal">
              <ul className="adoptThis">
                <li>name: {this.props.adoptCat.name}</li>
                <li>Age:{this.props.adoptCat.age} </li>
                <li>Breed:{this.props.adoptCat.breed}</li>
                <li>{this.props.adoptCat.description}</li>
                <li>Gender:{this.props.adoptCat.gender} </li>
                <img src={this.props.adoptCat.imageURL} alt="a cat"></img>
                <li>Story:{this.props.adoptCat.story} </li>
              </ul>
              {
                (this.props.submittedName === this.props.people[0]) && <button onClick={() => this.adoptCat()}>Adopt this Cat</button>
              }

            </section>

            <section className="adopt-animal">
              <ul className="adoptThis">
                <li>name: {this.props.adoptDog.name}</li>
                <li>Age:{this.props.adoptDog.age} </li>
                <li>Breed:{this.props.adoptDog.breed}</li>
                <li>{this.props.adoptDog.description}</li>
                <li>Gender:{this.props.adoptDog.gender} </li>
                <img src={this.props.adoptDog.imageURL} alt="a cat"></img>
                <li>Story:{this.props.adoptDog.story} </li>
              </ul>
              {
                (this.props.submittedName === this.props.people[0]) && <button onClick={() => this.adoptDog()}>Adopt This Dog</button>
              }
              <button onClick={() => this.adoptDog()}>Adopt This Dog</button>
            </section>
          </div>
          <div className="people-container">
            <People adoptDog={this.adoptDog} />
          </div>
        </div >
        <div className="people-container">
          <div className="people-list">
            <h2>List of Adoptors</h2>
            {this.generatePeopleList()}
          </div>


          <form onSubmit={(ev) => {
            ev.preventDefault()
            this.handleAddPerson()
            this.handleDemo()
          }}>
            <label htmlFor="name">Enter Name</label>
            <input type="text" name="name" id="name" required placeholder="Enter full name..." onChange={(ev) => this.setState({ submittedName: ev.target.value })} />


            <button type="submit">Add to Queue</button>
          </form>
        </div>
      </section>

    )
  }
}