import React from "react";
import { grabCats } from "./api-adapters/adapters";
import { useState, useEffect } from "react";

const Cats = () => {


    //copied from Users

    const [cats, setCats] = useState([]);

    useEffect(() => { //without useEffect surrounding, causes infinite loop. frameworks are magic
        const lol = async () => { //force async. i cant use await without sticking it in an async function, even if it looks silly
            try {
                const results = await grabCats()
                const result2 = await results.json()
                setCats(result2)
            } catch (error) {
                console.log(error);
            }
        };
        lol() //now that i think about it, most of react is just this same goofy format of using state inside async functions.
    }, []);

    console.log(cats) //logs an array of ~4 objects but could be hundreds.

    return (
        <div className={`cats`}>
            <ul>
                {cats.length > 0 ? (
                    cats.map((u) => (
                        <>
                            <li className="cname">{u.name}</li>
                            <li >{"id: " + u.id}</li>
                            <li >{"description: " + u.description}</li>
                            <li >{"dangerous: " + u.dangerous}</li>
                        </>
                    ))
                ) : (
                    <li>loading</li>
                )}
            </ul>
        </div>
    )


}

export default Cats;