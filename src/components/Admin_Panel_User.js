import React from 'react'
import propic from '../img/propic.svg';
import {FaStar} from 'react-icons/fa';


export default class User_details extends React.Component{
    constructor(props){
        super(props)

        this.state = {
			username: null,
			email: null,
			phone_Number: null,
			Address: null,
			name: null,
			coins: null,
			edited: false,
			pro_pic : null,
            Earnings : null,
            reviews : [],
            s_products : [],
            o_products : []
		};

       const {username} = this.props.match.params;
       fetch(`/api/user/getUser/${username}`).then((res) => res.json())
       .then((data) => {
           if(data){
            this.setState(() => {
                return {
                    username: data.username,
                    email: data.email,
                    phone_Number: data.phone_Number,
                    Address: data.Address,
                    name: data.name,
                    coins: data.Coins,
                    pro_pic : data.pro_img,
                    Earnings : data.Earnings
                };
            });
           }
       }) 
       fetch(`/api/review/getAll/${username}`).then((res) => res.json())
       .then((data) => {
           if(data) {
               this.setState(() => {
                   return {
                       reviews : data
                   }
               })
           }
       })
       fetch(`/api/products/Sold_products/${username}`).then((res) => res.json())
       .then((data) => {
           if(data) {
               this.setState(() => {
                   return {
                       s_products : data
                   }
               })
           }
       })
       fetch(`/api/products/Ordered_products/${username}`).then((res) => res.json())
       .then((data) => {
           if(data) {
               this.setState(() => {
                   return {
                       o_products : data
                   }
               })
           }
       })
   }
    render(){
        return (
            <div>
            <div className = "ap_user_det">
                <div className = "ap-user-value">name : {this.state.name}</div>
                <div className = "ap-user-value">username : {this.state.username}</div>
                <div className = "ap-user-value">email : {this.state.email}</div>
                <div className = "ap-user-value">phone_Number : {this.state.phone_Number}</div>
                <div className = "ap-user-value">Address : {this.state.Address}</div>
                <div className = "ap-user-value">coins : {this.state.coins}</div>
                <div className = "ap-user-value">Earnings : {this.state.Earnings}</div>
            </div>
            <div>
                <Comments_Ap 
                    reviews = {this.state.reviews}
                     />
            </div>
            <div >
            <h1>Sold Products</h1>
            <div className = "ap_product_cont">
                {this.state.s_products.map((product) => {
                    return(
                        <div >
                        <Products_ap 
                            tag = {product.tag}
                            bookimg = {`/covers/${product.cover_img}`}
                            stitle={product.BookAuthor}
							short_des={product.Edition}
							price={product.Value}
                            refId={product.refrenceId}
                            title = {product.BookName}
                            />
                            </div>
                    )
                })}
                </div>
            </div>
            <div >
            <h1>Ordered Products</h1>
            <div className = "ap_product_cont">
                {this.state.o_products.map((product) => {
                    return(
                        <div >
                        <Products_ap 
                            tag = {product.item.tag}
                            bookimg = {`/covers/${product.item.cover_img}`}
                            stitle={product.item.BookAuthor}
							short_des={product.item.Edition}
							price={product.item.Value}
                            refId={product.item.refrenceId}
                            title = {product.item.BookName}
                            />
                            </div>
                    )
                })}
                </div>
            </div>
            </div>
        )
    }
}

class Comments_Ap extends React.Component{
    render(){
        return (
            <div className = "review_section_ap">
			
            <div>
                {this.props.reviews.map((review) => {
                    return (
                        <div>
                            <div className = "user_det">
                            <img src = {propic}  />
                                <span className = "review_username">{review.userId}</span>
                            </div>
                            <div>
                                {review.comment}
                            </div>
                            
                            <br />
                            <br />
                        </div>
                    )
                })}
            </div>
        </div>
        )
    }
}
const Products_ap = (props) => {
    return(
        <div>
            <div className="productcont_for_profile">
				<div className="tag_for_profile">
					<strong>{props.tag}</strong>
				</div>
				<div
					className="product_img"
					onClick={() => {
						window.location.href = `/productpage/${props.refId}`
					}}
				>
					<img className="bookcover" src={props.bookimg} alt=" " />
				</div>
				<div className="product_body_for_profile">
					<h3>{props.title}</h3>
					<h6>({props.stitle})</h6>
					<p>{props.short_des}</p>
					<h1>
						{props.price} <span>coins</span>
					</h1>
				</div>
			</div>
        </div>
    )
}