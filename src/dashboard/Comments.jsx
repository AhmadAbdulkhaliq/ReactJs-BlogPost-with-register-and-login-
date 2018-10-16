
import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import Layout from '../Layout';


class Comments extends Component {
  state = {
    comments: [],
    comment: {
        title:'',
        body:'',
        postId:'',
        userId:'',
        time:'',
        date:''
    },
    edit:false
  }

  //retrive input value to comment object
  bindInputToState = e => {
    let now = new Date()
    let time=now.toLocaleTimeString()
    let date=now.toDateString()
      this.setState({
        comment: {
        ...this.state.comment,
        time,
        date,
        [e.target.name]: e.target.value
      }
    })
  }
 
//find ID to use when we comment an item
  findId(){
       let commentsLength=this.state.comments.length;
       let id=commentsLength+1;
       return id
  }  

  //Get comment
  componentDidMount() {
      fetch('http://localhost:3000/comments')
      .then(res=>res.json())
         .then(allcomments => {
           this.setState({
             comments: allcomments
           })
         })
  }

  //Delete comment
  deletecomment = (id) => {
      axios.delete('http://localhost:3000/comments/' + id)
      .then(res => {
        this.setState({
          comments: this.state.comments.filter(comment => comment.id !== id)
        })
      })
  }
  
  addcomment(e){
       e.preventDefault();

       axios.post('http://localhost:3000/comments',this.state.comment)
       .then(res=>{
         this.setState({
            comments:[...this.state.comments,this.state.comment],
            comment:{
            title:'',
            body:'',
            postId:'',
            userId:''
            }
         })
         })
  }

  //update comment

  updatecomment=(e)=> {
   e.preventDefault();
      axios.put('http://localhost:3000/comments/' + this.state.comment.id,
         this.state.comment)
         .then(res => {
          this.setState({
          comments: this.state.comments.map(x => {
          if (x.id === res.data.id) {
               return res.data;
               }
               return x;
             }),
           comment: {title: '', body: ''}
           ,edit:false
           })
         })
   }

  
   getButtons(){
    let savebtn;
    let cancelbtn;
    let commentbtn;
    if (this.state.edit) {
      return[
        savebtn= <button type="submit" onClick={this.updatecomment} className="btn btn-warning">save</button> ,
       cancelbtn=<button type="submit" onClick={() => this.setState({comment:{title:'',body:''}
       ,edit:false})} className="btn btn-secondary">cancel</button>
      ]
    }
    else{
      return commentbtn=<button type="submit" onClick={this.addcomment.bind(this)} className="btn btn-info">comment</button>
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
                   <label>Title</label>
                   <input type="text" className="form-control" name="title" 
                   value={this.state.comment.title} 
                   onChange={this.bindInputToState} />
                </div>

                <div className="form-group">
                   <label >Post Id</label>
                   <input type="number" className="form-control" name="postId" 
                   value={this.state.comment.postId} 
                   onChange={this.bindInputToState}/>
                </div>
              
                <div className="form-group">
                   <label >Body</label>
                   <textarea type="text" className="form-control" name="body"
                   value={this.state.comment.body} 
                   onChange={this.bindInputToState}
                   rows="2" cols="30"></textarea>
                  </div>

               <div className="form-group">
                   <label >userId</label>
                   <input type="number" className="form-control" name="userId" 
                   value={this.state.comment.userId} 
                   onChange={this.bindInputToState}/>
                </div>

                {this.getButtons.apply(this)}

           </form>
          </div>

          <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Body</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
             {this.state.comments.map((x, i) => (
                <tr key={i} id={x.id}>
                  <td>{x.id}</td>
                  <td>{x.title}</td>
                  <td>{x.body}</td>
                   <td>

                     <button onClick={() => this.setState({comment: x ,edit:true})} className="btn btn-warning">
                     Edit
                     </button>

                     <button onClick={() => this.deletecomment(x.id)} className="btn btn-danger">
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
export default Comments;

