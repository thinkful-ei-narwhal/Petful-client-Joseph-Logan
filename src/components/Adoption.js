import React from 'react';
import AdoptionWindow from './AdoptionWindow';
import AdoptionForm from './AdoptionForm';
import PeopleItem from './PeopleItem';
import People from './People'
import Loading from './loading';
export default class Adoption extends React.Component {

  //go to server, make sure we requeue what we dequque
  //we shouldnt need to add any more than one name to the form
  //catsQ.enque( catsQ.deque() );

  //const dequeud = catsQ.dequeu();
  //catsQ.enqueue( dequeued );

  //compdidupdate -- we can use the same condition to show the form--
  //for rendering FORM:
  //if(this.state.submittedName !== '' || this.state.submittedName !== null || this.state.submittedName !== undefined)
  //ping alex if stuck again - DONT WAIT
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      people: [],
      pets: [],
      adoptCat: [],
      adoptDog: [],
      error: null,
      submittedName: null,
      success: null,
      animal: null,
    }
    this.interval = null;
  }

  componentDidMount() {

    fetch(`http://localhost:8000/api/people`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.setState({ people: data, isLoading: false })
      })
      .catch(error => console.log(error))


    fetch(`http://localhost:8000/api/pets/dogs`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) this.setState({ error: 'There are no more dogs to adopt!' })
        this.setState({ adoptDog: data, isLoading: false })
      })
      .catch(error => console.log(error))


    fetch(`http://localhost:8000/api/pets/cats`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) this.setState({ error: 'There are no more cats to adopt!' })
        this.setState({ adoptCat: data, isLoading: false })
      })
      .catch(error => console.log(error))

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.submittedName !== this.state.people[0]) {
      //set interval has an ID prop
      if (this.interval === null) {
        this.interval = setInterval(() => {
          this.handleDeletePerson();
          this.adoptDog();
        }, 1000);
      }
    }
    if (this.state.submittedName === this.state.people[0]) {

      clearInterval(this.interval)
      this.interval = null;
    }
  }

  adoptDog() {
    fetch(`http://localhost:8000/api/pets/dogs`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {

      })
      .catch(error => console.log(error))
  }
  adoptDog2() {
    //this is horrible.... too bad
    this.setState({ animal: this.state.adoptDog.name })
    console.log(this.state.adoptDog.name)
    //then make fetch.. again is bad but too bad
    fetch(`http://localhost:8000/api/pets/dogs`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        this.setState({ submittedName: null, success: true })
      })
      .catch(error => console.log(error))
  }



  adoptCat() {
    fetch(`http://localhost:8000/api/pets/cats`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {

      })
      .catch(error => console.log(error))
  }
  adoptCat2() {
    //again this is NOT best practice but we are out of time so too bad!
    this.setState({ animal: this.state.adoptCat.name })
    fetch(`http://localhost:8000/api/pets/cats`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        this.setState({ submittedName: null, success: true })
      })
      .catch(error => console.log(error))
  }
  generatePeopleList() {
    const people = this.state.people
    if (people.length !== 0) {
      return people.map(person => {
        return <PeopleItem key={person} name={person} />
      })
    }
    return <p>There is no one else in line!</p>
  }
  handleAddPerson = (person) => {
    fetch('http://localhost:8000/api/people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: person })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(res => {
        this.setState({
          people: [...this.state.people, res.name]
        })
      })
      .catch(error => console.log(error))
  }

  handleGetPeople() {
    fetch(`http://localhost:8000/api/people`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.setState({ people: data, isLoading: false })
      })
      .catch(error => console.log(error))
  }
  //when updated, check to stop the interval

  //work with context instead
  handleDemo = (ev) => {
    console.log('handler firing')
    //while do -- was not covered so we wont use it here
    this.setState({ submittedName: ev.target.name.value })
  }

  handleDeletePerson() {
    fetch(`http://localhost:8000/api/people`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(res => {
        this.setState({ people: [...res.remaining] })
      })
      .catch(error => console.log(error))
  }
  render() {

    return (
      <div className="adoption-container">
        <section className="adoptionPage">
          {
            (this.state.success) && <p>Congrats! You have adopted {this.state.animal}!</p>
          }
          <div className="adoptionWindow-container">
            {
              (this.state.submittedName === this.state.people[0]) && (
                <div className="adoptionWindow">
                  <section>
                    <ul className="adoptThis">
                      <li>name: {this.state.adoptCat.name}</li>
                      <li>Age:{this.state.adoptCat.age} </li>
                      <li>Breed:{this.state.adoptCat.breed}</li>
                      <li>{this.state.adoptCat.description}</li>
                      <li>Gender:{this.state.adoptCat.gender} </li>
                      <img src={this.state.adoptCat.imageURL} alt="a cat"></img>
                      <li>Story:{this.state.adoptCat.story} </li>
                    </ul>
                    {
                      (this.state.submittedName === this.state.people[0]) && <button onClick={() => this.adoptCat2()}>Adopt this Cat</button>
                    }
                  </section>

                  <section>
                    <ul className="adoptThis">
                      <li>name: {this.state.adoptDog.name}</li>
                      <li>Age:{this.state.adoptDog.age} </li>
                      <li>Breed:{this.state.adoptDog.breed}</li>
                      <li>{this.state.adoptDog.description}</li>
                      <li>Gender:{this.state.adoptDog.gender} </li>
                      <img src={this.state.adoptDog.imageURL} alt="a cat"></img>
                      <li>Story:{this.state.adoptDog.story} </li>
                    </ul>
                    {
                      (this.state.submittedName === this.state.people[0]) && <button onClick={() => this.adoptDog2()}>Adopt This Dog</button>
                    }

                  </section>
                </div>
              )

            }

            <div className="people-container">
              <People adoptDog={this.adoptDog} />
            </div>
          </div >
          <div className="people-container">
            <div className="people-list">
              {this.generatePeopleList()}
            </div>

            {
              (!this.state.submittedName) && (
                <form onSubmit={(ev) => {
                  ev.preventDefault()
                  this.handleAddPerson(ev.target.name.value)
                  this.handleDemo(ev)
                }}>
                  <label htmlFor="name">Enter Name</label>
                  <input type="text"
                    name="name"
                    id="name"
                    required placeholder="Enter full name..."
                  // onChange={(ev) => this.setState({ submittedName: ev.target.value })} 
                  />
                  <button type="submit">Add to Queue</button>
                </form>
              )
            }
          </div>
        </section><AdoptionForm props={this.state} />
      </div>
    )
  }
}