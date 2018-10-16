

import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import Layout from '../Layout';


class Posts extends Component {
  state = {
    posts: [],
    post: {
      title: '',
      body: '',
      categorie: '',
      userId: '',
      ImageAddress:'',
      time:'',
      date:''
    },
    edit: false
  }

  //retrive input value to post object
  bindInputToState = e => {
    let now = new Date()
    let time=now.toLocaleTimeString()
    let date=now.toDateString()
    this.setState({
      post: {
        ...this.state.post,
        time,
        date,
        [e.target.name]: e.target.value
      }
    })
  }

  //find ID to use when we post an item
  findId() {
    let postsLength = this.state.posts.length;
    let id = postsLength + 1;
    return id
  }

  //Get post
  componentDidMount() {
    fetch('http://localhost:3000/posts')
      .then(res => res.json())
      .then(allPosts => {
        this.setState({
          posts: allPosts
        })
      })
  }

  //Delete Post
  deletePost = (id) => {
    axios.delete(' http://localhost:3000/posts/' + id)
      .then(res => {
        this.setState({
          posts: this.state.posts.filter(post => post.id !== id)
        })
      })
  }

  
  addPost(e) {
    e.preventDefault();

    axios.post('http://localhost:3000/posts', this.state.post)
      .then(res => {
        this.setState({
          posts: [...this.state.posts, res.data],
          post: {
            id: '',
            title: '',
            body: '',
            categorie: '',
            userId: '',
            ImageAddress:''
          }
        })
      })
  }

  //update post

  updatePost = (e) => {
    e.preventDefault();

    axios.put('http://localhost:3000/posts/' + this.state.post.id,
      this.state.post)
      .then(res => {
        this.setState({
          posts: this.state.posts.map(x => {
            if (x.id === res.data.id) {
              return res.data;
            }
            return x;
          }),
          post: { title: '', body: '',ImageAddress:'' }
          , edit: false
        })
      })
  }



  getButtons() {
    let savebtn;
    let cancelbtn;
    let postbtn;
    if (this.state.edit) {
      return [savebtn = <button type="submit" onClick={this.updatePost} className="btn btn-warning">save</button>,
      cancelbtn = <button type="submit" onClick={() => this.setState({
        post: { title: '', body: '' }
        , edit: false
      })} className="btn btn-secondary">cancel</button>]
    }
    else {
      return <button type="submit" onClick={this.addPost.bind(this)} className="btn btn-info">post</button>
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
                  value={this.state.post.title}
                  onChange={this.bindInputToState} />
              </div>

              <div className="form-group">
                <label >User ID</label>
                <input type="number" className="form-control" name="userId"
                  value={this.state.post.userId}
                  onChange={this.bindInputToState} />
              </div>

              <div className="form-group">
                <label >Categorie Id</label>
                <input type="number" className="form-control" name="categorie"
                  value={this.state.post.categorie}
                  onChange={this.bindInputToState} />
              </div>

              <div className="form-group">
                <label >Image Address</label>
                <input type="text" className="form-control" name="ImageAddress"
                  value={this.state.post.address}
                  onChange={this.bindInputToState} />
              </div>

              <div className="form-group">
                <label >Body</label>
                <textarea type="text" className="form-control" name="body"
                  value={this.state.post.body}
                  onChange={this.bindInputToState}
                  rows="2" cols="30"></textarea>
              </div>

              {this.getButtons.apply(this)}
            </form>
          </div>

          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">User Id</th>
                <th scope="col">Body</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.posts.map((x, i) => (
                <tr key={i}>
                  <td>{x.id}</td>
                  <td>{x.title}</td>
                  <td>{x.userId}</td>
                  <td>{x.body}</td>
                  <td>

                    <button onClick={() => this.setState({ post: x, edit: true })} className="btn btn-warning">
                      Edit
                     </button>

                    <button onClick={() => this.deletePost(x.id)} className="btn btn-danger">
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
export default Posts;
