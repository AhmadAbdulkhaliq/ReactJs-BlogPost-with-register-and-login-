import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css"
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Collapse, NavbarToggler,Container, Col, Form,
    FormGroup, Label, Input,
    Button, } from 'reactstrap';
import $ from "jquery";



class MainPage extends Component {
    constructor(props){
     super(props)
     this.currentUser={
       name:'',
       email:'',
       image:'',
       password:'',
       id:''
     }
     
     this.state = {
        posts:[],
        comments:[],
        users:[],
        categories:[],
        viewProfileUser:{},
        showComments:false,
        isLogedin:false
      }
}
  

  componentDidMount() {
    fetch('http://localhost:3000/posts')
    .then(res=>res.json())
       .then(allPosts => {
         this.setState({
           posts: allPosts
         })
       })
       fetch('http://localhost:3000/comments')
       .then(res=>res.json())
          .then(allcomments => {
            this.setState({
              comments: allcomments
            })
          })

          fetch('http://localhost:3000/users')
       .then(res=>res.json())
          .then(allUsers => {
            this.setState({
              users:allUsers
            })
          })

          fetch('http://localhost:3000/categories')
          .then(res=>res.json())
             .then(allCategories => {
               this.setState({
                categories:allCategories
               })
             })
            }
      
    toggleComments=()=>{
      this.setState({
        showComments:!this.state.showComments
      })
    }
 
    tabPanel(categorieId){
        return (
          <TabPanel>
    {this.state.posts.map((x, i) => {
      if(x.categorie==categorieId){
             return(
          <div className="posts mt-5 mb-3">

          <div className="userImage">
          {this.state.users.map((user,i)=>{
            if(user.id==x.userId){
            return <img src={user.image} alt="userImage"
            height="50px" width="50px"/>;
            }
          })} 
          </div>

          <div className="postInfo ml-3">
       
          <h5>   {this.state.users.map((u,i)=>{
            if(u.id==x.userId){
            return u.name;
            }
          })}</h5>
          <div className="postHeader">
          <p>@{x.title}</p>
          <p>{x.date+"  "+x.time }</p>
          </div>
          <p>{x.body}</p>
          <img src={x.ImageAddress} alt="Post Image" className="postImage"/>
          <div className="btns">
          <button><i class="far fa-thumbs-up"></i></button>
          <button onClick={this.toggleComments}><i class="far fa-comment"></i></button>
          <button><i class="far fa-edit"></i></button>
          </div>
          <div className="comments">

         <div className="addComment">
          <input type="text" className="form-control commentBody" name="title"/>
          <button onClick={
            (e)=>{
              e.preventDefault()
                let now = new Date()
                let time=now.toLocaleTimeString()
                let date=now.toDateString()
               let comment={
                title:'noTitle',
                body:`${$(".commentBody").val()}`,
                postId:x.id,
                userId:this.currentUser.id,
                time:time,
                date:date
               }
                axios.post('http://localhost:3000/comments',comment)
                .then(res=>{
                  this.setState({
                    comments:[...this.state.comments , comment]
                  })
                  $(".commentBody").val('')
                })
            }
          }>Comment</button>
          </div>

          {this.state.comments.map((c,i)=>{
            if(this.state.showComments){
            if(c.postId==x.id){
              return(
              <div className="comment mt-3">
        
              <div className="userImage">
              {this.state.users.map((user,i)=>{
            if(user.id==c.userId){
            return <img src={user.image} alt="userImage"
            height="40px" width="40px"/>;
            }
          })}
             </div>
        
             <div className="commentInfo ml-3">
             <h5>{this.state.users.map((u,i)=>{
            if(u.id==c.userId){
            return u.name;
            }
          })}</h5>
             <p>{c.date+"  "+c.time }</p>
             <p>{c.body}</p>
             </div>
              </div>
          )
            }}
          })}
          </div>
        
          </div>
          </div>
         
    )}} )
            } 
    </TabPanel>
        )
      }
 
     
      logIn(e){
        e.preventDefault();
        fetch('http://localhost:3000/users')
        .then(res=>res.json())
           .then(u => {
               u.map((user,i)=>{
                if($(".loginEmail").val()==user.email && $(".loginPassword").val()==user.password){
                       if(user.isAdmin){
                        $(".dashbord").css("display","block")  
                      }
                        this.currentUser={
                          name:user.name,
                          email:user.email,
                          image:user.image,
                          password:user.password,
                          id:user.id
                        }
                        $(".addComment").css("display","flex")
                    $("#navContent").append([
                     ($("<NavItem>").append("<NavLink>").attr("to","/").addClass("nav-link").html(this.currentUser.name)),
                     (`<NavItem>
                      <img src=${this.currentUser.image}
                      className="mx-3 currentUserImage" height="40px"
                      width="40px"/> 
                     </NavItem>`)
                    ])
                    $(".homeNavbar").css("display","flex")
                    $("#sharePostBtn").css("display","block")
                    $(".homeDetail").css("display","block")
                    $(".form").css("display","none")
                }
               })
             }) 
      }
    
      signUp(e){
        e.preventDefault();
        let addUser={
          name: $(".signUpName").val(),
          email: $(".signUpEmail").val(),
          image:  $(".signUpImage").val(),
          password:  $(".signUpPassword").val()
        }
        axios.post('http://localhost:3000/users',addUser)
        .then(res=>{
          console.log(addUser)
          })
    }

      loginSignupBtn(){
          $(".homeDetail").css("display","none")
          $(".form").css("display","flex")
          $(".logoutBtn").css("display","block")
          $(".loginBtn").css("display","none")
          $(".homeNavbar").css("display","none")
          $(".profile").css("display","none")
    }
    logoutBtn(){
      this.currentUser=[]
      $(".logoutBtn").css("display","none")
      $(".loginBtn").css("display","block")
    }
    SharePost(e){
      $(".sharePostForm").css("display","block")
      $("#sharePostBtn").css("display","none")
    }
    
  render() {
      
    return (
     <div id="home">
     
     <div className="form">

      <div className="login">
      <h2 className="text-center">Log In</h2>
        <Form>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                className="loginEmail"
                placeholder="myemail@email.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                className="loginPassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Col>
          <Button onClick={this.logIn.bind(this)}>login</Button>
          </Col>
        </Form>
      </div>

      <div className="signup">
      <h2 className="text-center">Sign Up</h2>
        <Form>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                className="signUpEmail"
                placeholder="myemail@email.com"
                onChange={this.bindInputToState}
              />
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                className="signUpName"
                placeholder="Your full name"
                onChange={this.bindInputToState}
              />
            </FormGroup>
            </Col>
            <Col>
            <FormGroup>
              <Label>Your Photo</Label>
              <Input
                type="text"
                name="image"
                id="image"
                className="signUpImage"
                placeholder="Your photo link"
                onChange={this.bindInputToState}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                className="signUpPassword"
                placeholder="********"
                onChange={this.bindInputToState}
              />
            </FormGroup>
          </Col>
          <Col>
          <Button onClick={this.signUp}>Register</Button>
          </Col>
        </Form>
      </div>
        
      </div>
      <Navbar color="dark" dark expand="md" className="homeNavbar">
                    <NavLink className="navbar-brand" to="/">Re:Coded Blog</NavLink>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" id="navContent" navbar>
                            <NavItem className="loginBtn">
                                <NavLink to="./" className="nav-link" onClick={this.loginSignupBtn}>Login/SignUp</NavLink>
                            </NavItem>
                          
                            <NavItem className="logoutBtn">
                            <NavLink to="./" className="nav-link" onClick={this.logoutBtn}>Logut</NavLink>
                            </NavItem>

                            <NavItem className="dashbord">
                                <NavLink to="./posts" className="nav-link" >dashbord</NavLink>
                            </NavItem>
                          
                        </Nav>
                      
                     
                  
     </Collapse>
    </Navbar> 
     <div className="homeDetail">
    <Tabs>
      <div className="text-center">
      <TabList>
      <Tab>All</Tab>
      {this.state.categories.map((categorie,i)=>{
          return <Tab>{categorie.name}</Tab>
          })} 
       </TabList>
      </div>
    
      <button onClick={this.SharePost} className="btn btn-primary" id="sharePostBtn">Share post</button>
    <form className="sharePostForm container">
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control postTitle" name="title"
                  onChange={this.bindInputToState} />
              </div>

              <div className="form-group">
                <label >Categorie Id</label>
                <input type="number" className="form-control postCategorie" name="categorie"
                  onChange={this.bindInputToState} />
              </div>

              <div className="form-group">
                <label >Image Address</label>
                <input type="text" className="form-control postImage" name="ImageAddress"
                  onChange={this.bindInputToState} />
              </div>

              <div className="form-group">
                <label >Body</label>
                <textarea type="text" className="form-control postBody" name="body"
                  onChange={this.bindInputToState}
                  rows="2" cols="30"></textarea>
              </div>
        
              <button onClick={(e)=>{
                  e.preventDefault();
                  let now = new Date()
                  let time=now.toLocaleTimeString()
                  let date=now.toDateString()
                let post={
                  title: $(".postTitle").val(),
                  body: $(".postBody").val(),
                  categorie: $(".postCategorie").val(),
                  userId: this.currentUser.id,
                  ImageAddress:$(".postImage").val(),
                  time:time,
                  date:date
                }
                axios.post('http://localhost:3000/posts',post)
                .then(res=>{
                  this.setState({
                    posts:[...this.state.posts , post]
                  })
                  $(".postTitle").val('')
                  $(".postBody").val('')
                  $(".postCategorie").val('')
                  $(".postImage").val('')

                  $(".sharePostForm").css("display","none")
                  $(".sharePostBtn").css("display","block")
                })      
              }
              } className="btn btn-primary">Post</button>
              <button onClick={(e)=>{
                  e.preventDefault();
                  $(".sharePostForm").css("display","none")
                  $("#sharePostBtn").css("display","block")   
              }
              } className="btn btn-danger mx-3">Cancel</button>
            </form>   

    <TabPanel>
    {this.state.posts.map((x, i) => {
             return(
          <div className="posts mt-5 mb-3">

          <div className="userImage">

          {this.state.users.map((user,i)=>{
            if(user.id==x.userId){

            return <button onClick={(e)=>{
              e.preventDefault();
              this.setState({
                viewProfileUser:{
                  name:user.name,
                  email:user.email,
                  image:user.image,
                  password:user.password,
                  id:user.id
                }
              })
                              $(".homeDetail").css("display","none")
                              $(".profile").css("display","block")
            }}
            ><img src={user.image} alt="userImage"
            height="50px" width="50px"/></button>;
            }
          })} 
          </div>

          <div className="postInfo ml-3">
       
          <h5>   {this.state.users.map((u,i)=>{
            if(u.id==x.userId){
            return u.name;
            }
          })}</h5>
          <div className="postHeader">
          <p>@{x.title}</p>
          <p>{x.date+"  "+x.time }</p>
          </div>
          <p>{x.body}</p>
          <img src={x.ImageAddress} alt="Post Image" className="postImage"/>
          <div className="btns">
          <button><i class="far fa-thumbs-up"></i></button>
          <button onClick={this.toggleComments}><i class="far fa-comment"></i></button>
          <button><i class="far fa-edit"></i></button>
          </div>
          <div className="comments">

          <div className="addComment">
          <input type="text" className="form-control commentBody" name="title"/>
          <button onClick={
            (e)=>{
              e.preventDefault()
                let now = new Date()
                let time=now.toLocaleTimeString()
                let date=now.toDateString()
               let comment={
                title:'noTitle',
                body:`${$(".commentBody").val()}`,
                postId:x.id,
                userId:this.currentUser.id,
                time:time,
                date:date
               }
                axios.post('http://localhost:3000/comments',comment)
                .then(res=>{
                  this.setState({
                    comments:[...this.state.comments , comment]
                  })
                  $(".commentBody").val('')
                })
            }
          }>Comment</button>
          </div>
          
          {this.state.comments.map((c,i)=>{
            if(this.state.showComments){
            if(c.postId==x.id){
              return(
              <div className="comment mt-3">
        
              <div className="userImage">
              {this.state.users.map((user,i)=>{
            if(user.id==c.userId){
            return <img src={user.image} alt="userImage"
            height="40px" width="40px"/>;
            }
          })}
             </div>
             <div className="commentInfo ml-3">
             <h5>{this.state.users.map((u,i)=>{
            if(u.id==c.userId){
            return u.name;
            }
          })}</h5>
             <p>{c.date+"  "+c.time }</p>
             <p>{c.body}</p>
             </div>
              </div>
          )
            }}
          })}
          </div>
        
          </div>
          </div>
         
    )} )
            } 
    </TabPanel>
   {this.state.categories.map((c,i)=>{
     return this.tabPanel(c.id)
   }) }

  </Tabs> 
     </div>


     <div className="profile">
     <button onClick={(e)=>{
       $(".homeDetail").css("display","block")
       $(".profile").css("display","none")
     }
     }>Back To Home</button>
     <img src={this.state.viewProfileUser.image} alt="" className="profileUserImage"/>
     <h2 className="text-center">{this.state.viewProfileUser.name}</h2>
     <h6 className="text-center">{this.state.viewProfileUser.email}</h6>

     {this.state.posts.map((x, i) => {
       if(x.userId==this.state.viewProfileUser.id){
             return(
          <div className="posts mt-5 mb-3">

          <div className="userImage">
            <img src={this.state.viewProfileUser.image} alt="userImage"
            height="50px" width="50px"/>;
          </div>

          <div className="postInfo ml-3">
       
          <h5>{this.state.viewProfileUser.name}</h5>
          <div className="postHeader">
          <p>@{x.title}</p>
          <p>{x.date+"  "+x.time }</p>
          </div>
          <p>{x.body}</p>
          <img src={x.ImageAddress} alt="Post Image" className="postImage"/>
          <div className="btns">
          <button><i class="far fa-thumbs-up"></i></button>
          <button onClick={this.toggleComments}><i class="far fa-comment"></i></button>
          <button><i class="far fa-edit"></i></button>
          </div>
          <div className="comments">

          <div className="addComment">
          <input type="text" className="form-control commentBody" name="title"/>
          <button onClick={
            (e)=>{
              e.preventDefault()
                let now = new Date()
                let time=now.toLocaleTimeString()
                let date=now.toDateString()
               let comment={
                title:'noTitle',
                body:`${$(".commentBody").val()}`,
                postId:x.id,
                userId:this.currentUser.id,
                time:time,
                date:date
               }
                axios.post('http://localhost:3000/comments',comment)
                .then(res=>{
                  this.setState({
                    comments:[...this.state.comments , comment]
                  })
                  $(".commentBody").val('')
                })
            }
          }>Comment</button>
          </div>
          
          {this.state.comments.map((c,i)=>{
            if(this.state.showComments){
            if(c.postId==x.id){
              return(
              <div className="comment mt-3">
        
              <div className="userImage">
              {this.state.users.map((user,i)=>{
            if(user.id==c.userId){
            return <img src={user.image} alt="userImage"
            height="40px" width="40px"/>;
            }
          })}
             </div>
             <div className="commentInfo ml-3">
             <h5>{this.state.users.map((u,i)=>{
            if(u.id==c.userId){
            return u.name;
            }
          })}</h5>
             <p>{c.date+"  "+c.time }</p>
             <p>{c.body}</p>
             </div>
              </div>
          )
            }}
          })}
          </div>
        
          </div>
          </div>
         
    )} })
            } 
     
           </div>
                  
        </div>
     
       
    );
  }
}

export default MainPage;
