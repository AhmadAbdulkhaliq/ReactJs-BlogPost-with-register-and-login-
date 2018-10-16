

  import React, { Component } from 'react';
  import '../App.css';
  import axios from "axios";
  import Layout from '../Layout';

  
  class Categories extends Component {
    state = {
      categories: [],
      categorie: {
          name:''
      },
      edit:false
    }
  
    //retrive input value to categorie object
    bindInputToState = e => {
        this.setState({
          categorie: {
            ...this.state.categorie,
          [e.target.name]: e.target.value
        }
      })
    }
   
  //find ID to use when we categorie an item
    findId(){
         let categoriesLength=this.state.categories.length;
         let id=categoriesLength+1;
         return id
    }  
  
    //Get categorie
    componentDidMount() {
        fetch('http://localhost:3000/categories')
        .then(res=>res.json())
           .then(allcategories => {
             this.setState({
               categories: allcategories
             })
           })
    }
  
    //Delete categorie
    deletecategorie = (id) => {
        axios.delete('http://localhost:3000/categories/' + id)
        .then(res => {
          this.setState({
            categories: this.state.categories.filter(categorie => categorie.id !== id)
          })
        })
    }
    
    addcategorie(e){
         e.preventDefault();
  
         axios.post('http://localhost:3000/categories',this.state.categorie)
         .then(res=>{
           this.setState({
              categories:[...this.state.categories,this.state.categorie],
              categorie:{
              name:''
              }
           })
           })
    }
  
    //update categorie
  
    updatecategorie=(e)=> {
     e.preventDefault();
        axios.put('http://localhost:3000/categories/' + this.state.categorie.id,
           this.state.categorie)
           .then(res => {
            this.setState({
            categories: this.state.categories.map(x => {
            if (x.id === res.data.id) {
                 return res.data;
                 }
                 return x;
               }),
             categorie: {title: '', body: ''}
             ,edit:false
             })
           })
     }
  
    
     getButtons(){
     
      let savebtn;
      let cancelbtn;
      let categoriebtn;
      if (this.state.edit) {
        return [
          savebtn= <button type="submit" onClick={this.updatecategorie} className="btn btn-warning">save</button>,
          cancelbtn=<button type="submit" onClick={() => this.setState({categorie:{title:'',body:''}
          ,edit:false})} className="btn btn-secondary">cancel</button>
        ] 
      }
      else{
         return categoriebtn=<button type="submit" onClick={this.addcategorie.bind(this)} className="btn btn-info">Add Categorie</button>
      }
     }
    
  
    
    render() {
      
      return (
        <div>
          <Layout></Layout>
        
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-12">
  
              <form>
                  <div className="form-group">
                     <label>Categorie Name</label>
                     <input type="text" className="form-control" name="name" 
                     value={this.state.categorie.name} 
                     onChange={this.bindInputToState} />
                  </div>

                  {this.getButtons.apply(this)}
             </form>
            </div>
  
            <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
  
            <tbody>
               {this.state.categories.map((x, i) => (
                  <tr key={i} id={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                     <td>
  
                       <button onClick={() => this.setState({categorie: x ,edit:true})} className="btn btn-warning">
                       Edit
                       </button>
  
                       <button onClick={() => this.deletecategorie(x.id)} className="btn btn-danger">
                       Delete
                       </button>
  
                     </td>
                  </tr>
                ))
              }
            </tbody>
        </table>
     </div>
   </div>
   </div>
          
      );
    }
  }
  export default Categories;
  
