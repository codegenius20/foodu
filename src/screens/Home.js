import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'

export default function Home() {

    const [search, setsearch] = useState('') 
    const [foodCat, setfoodCat] = useState([])
    const [foodItem, setfoodItem] = useState([])

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response = await response.json();
        // console.log(response[0],response[1]);
        setfoodItem(response[0])
        setfoodCat(response[1])
    }


    useEffect(() => {
        loadData()
    }, [])

    // console.log(foodItem);
    // console.log(foodCat);






    return (
        <div>
            <div> <Navbar /> </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }} data-bs-ride="carousel">
                    <div className="carousel-inner" id='carousel' >
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodCat != []
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3 font-italic font-weight-bold'>{data.CategoryName}</div>
                                <hr />
                                {/* console.log(foodItem); */}
                                {foodItem != [] ?
                                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) )
                                        .map(filteritems => {
                                            // console.log(filteritems)
                                            return (
                                                <div key={filteritems._id} className='col-auto col-md-auto col-lg-auto m-3'>
                                                    <Card foodItem={filteritems}
                                                        options={filteritems.options[0]}
                                                       ></Card>
                                                </div>
                                            )
                                        })
                                    : "no such data found"}
                            </div>
                            )

                        }) : <div>""""""""""""""</div>
                }



                <Card />
            </div>
            <div><Footer /></div>
        </div>
    )
}
