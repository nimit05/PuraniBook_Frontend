import React from 'react';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal'
import copy from '../img/copywriting.svg'
import { Link } from "react-router-dom";

export default class MyOrders extends React.Component {

	handleModal = () => {
		this.setState((prevState) => {
			return{
				open : !prevState.open
			}
		})
	}

	handlerefId = (ans) => {
		this.setState(() => {
			return{
				refId : ans
			}
		} )
	}

	getData = () => {
		fetch('/api/user/products').then((res) => res.json()).then((data) => {
			if (data) {
				this.setState(() => {
					return {
						orders: data
					};
				});
			}
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			orders: [],
			open : false,
			refId : null
		};
		this.getData()

	
	}
	render() {
		return (
			<div className="my_order_div">
			{this.state.orders.length == 0 ? (
				<div className = "empty_pro">
					<div className = "img">
						<img src = {copy} alt = " " />
					</div>
					<div className = "text">
						<div>You have'nt upload anything yet</div>
						<Link to = '/sell-your-product' className = "link">Launch your first one..</Link>
					</div>
				</div>
			) : (
			this.state.orders.map((e) =>(
					<div className="order_det">
						<div className = "bookDet">
							<div className = "cover">
								<img src = {`/covers/${e.cover_img}`} alt = " " />
							</div>
							<div className = "bookName">
								<div className = "title">
									{e.title} - {e.s_title}
								</div>
								<div className = "branch">
									{e.branch}
						 	  </div>
								<div className="price_pp">
								<span>
									{[ ...Array(5) ].map((star, i) => {
										const ratingValue = i + 1;
		
										return (
											<label>
											<span className = "for_pc">
												<FaStar
													color={ratingValue <= e.rating ? '#ffc107' : '#D3D3D3'}
													size={20}
												/>
												</span>
												<span className = "for_mob">
												<FaStar
													color={ratingValue <= e.rating ? '#ffc107' : '#D3D3D3'}
													size={10}
												/>
												</span>
											</label>
										);
									})}
								</span>
							</div>
							<div className = "copies">
								Copies Sold : {e.copies}
							</div>
							<div className = "btn">
								<button><Link to = "/My-Library">See in Library</Link></button>
							</div>	
							</div>
						</div>		
						<div className = "delete" onClick = { () => {
							this.handlerefId(e.refrenceId)
							this.handleModal()
						}}>
							<div>
								Delete
							</div>
						
						</div>

					
					</div>	
						
			))
			)}

					<Modal
					isOpen={this.state.open}
					className="delete_pop"
					onRequestClose={this.handleModal}
					>
						<div className = "ques">
								Are you sure you want to delete ?
						</div>
						<div className = "buttons">
							<div>
								<button onClick = {() => {
									fetch(`/api/products/delete/${this.state.refId}` )
									.then((res) => res.json())
									
									this.handleModal()
									this.getData()

								}} >Yes</button>
							</div>
							<div>
								<button onClick = {this.handleModal}>No</button>
							</div>
						</div>
					</Modal>

			

				</div>
		)
	}
}


