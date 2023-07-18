import React from "react";
import { deleteCatById, grabCatById } from "./api-adapters/adapters";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import UpdateCat from "./UpdateCat";
import Reviews from './Reviews';



const SingleCat = ({ user }) => {


    const [cats, setCats] = useState([]);
    const [parnum, setParnum] = useState(0);
    const [toggle, setToggle] = useState(false)
    const [toggle2, setToggle2] = useState(false)
    const [magic, setMagic] = useState([])


    let perry = useParams();

    const navigate = useNavigate()

    async function doNext() {

        let newpar = parnum + 1
        navigate(`/cat/${newpar}`)
        setParnum(newpar)
    }
    async function doPrev() {

        let newpar = parnum - 1
        navigate(`/cat/${newpar}`)
        setParnum(newpar)
    }




    useEffect(() => {
        const lol = async () => {
            try {
                console.log(magic)
                const kittylol = perry.catId
                console.log(perry.catId)
                const results = await grabCatById(kittylol) //we are sending the page number as a number :) this number is made of number
                console.log(results)
                const result2 = await results.json()
                console.log(result2)
                setCats(result2)
                let newkittylol = Number(kittylol)
                console.log(newkittylol)
                setParnum(newkittylol)
            } catch (error) {
                console.log(error);
            }
        };
        lol()
    }, [parnum, magic]);



    console.log(cats)
    console.log(cats[0])

    const letThereBeUpdates = async () => {
        try {
            if (toggle === false) {
                setToggle(true)
            }
            else { setToggle(false) }
        } catch (error) {
            console.log(error);
        }
    };
    const letThereBeReviews = async () => {
        try {
            if (toggle2 === false) {
                setToggle2(true)
            }
            else { setToggle2(false) }
        } catch (error) {
            console.log(error);
        }
    };
    const doDelete = async () => {
        try {

            console.log(magic)
            deleteCatById(parnum, user)
            console.log(magic)
            setMagic(['hocus pocus updatus my componentus']) //to force rerender. breaks sometimes. idk how it works anymore.
            console.log(magic)
        } catch (error) {
            console.log(error);
        }
    };

    return (


        //display cat
        <div className={`singlecat`}>

            <button onClick={doPrev}>prev</button> <button onClick={doNext}>next</button>

            <ul>
                {cats.length > 0 ? (
                    cats.map((u) => ( //this was made for an array. it should have an array of 1 object.
                        <>
                            <li className="cname">{u.catname}</li>
                            <li >{"id: " + u.id}</li>
                            <li >{"description: " + u.description}</li>
                            <li >{"dangerous: " + u.dangerous}</li>
                            <li >{"uploader: " + u.uploader}</li>
                        </>
                    ))
                ) : (
                    <li>this cat doesnt exist</li>
                )}


            </ul>



            <h1>
                <button onClick={letThereBeUpdates}>update</button>
                <button onClick={doDelete}>delete</button>
                <button onClick={letThereBeReviews}>review</button>
            </h1>
            <div>
                {toggle ? (//this makes the updater menu visible or invisible
                    <>
                        <UpdateCat user={user} super_mario={perry.catId} setMagic={setMagic} />
                    </>
                ) : (
                    <>

                    </>
                )}
            </div>

            <div>
                {toggle2 ? (//this makes the updater menu visible or invisible
                    <>
                        this will have a review creation menu soon!
                    </>
                ) : (
                    <>

                    </>
                )}
            </div>

            <Reviews user={user} super_mario={perry.catId} />

        </div>
    )


}

export default SingleCat;
//