import { useEffect, useState } from "react"

export default function Horoscopes() {

    let zodiacs = [
        {
            "name": "Aries",
            "color": "red"
        },
        {
            "name": "Taurus",
            "color": "green"
        },
        {
            "name": "Gemini",
            "color": "yellow"
        },
        {
            "name": "Cancer",
            "color": "silver"
        },
        {
            "name": "Leo",
            "color": "gold"
        },
        {
            "name": "Virgo",
            "color": "navy blue"
        },
        {
            "name": "Libra",
            "color": "pink"
        },
        {
            "name": "Scorpio",
            "color": "black"
        },
        {
            "name": "Sagittarius",
            "color": "purple"
        },
        {
            "name": "Capricorn",
            "color": "brown"
        },
        {
            "name": "Aquarius",
            "color": "turquoise"
        },
        {
            "name": "Pisces",
            "color": "sea green"
        }
    ]


    const [horoscopes, setHoroscopes] = useState(null)
    const [currentSign, setcurrentSign] = useState(null)
    const [currentFortune, setCurrentFortune] = useState(null)
    console.log("jsx", horoscopes);
    console.log(currentFortune);
    const handleSignChange = (sign, index) => {

        console.log("Trying to change sign");
        if (sign != currentSign) {
            console.log("Sign changed");
            setcurrentSign(sign)
            setCurrentFortune(horoscopes[index])
        }

    }

    const fetchFortunes = async () => {
        const fortunes = await (await fetch("https://lacuna-horoscopes.onrender.com/api/horoscopes")).json()

        setHoroscopes(eval(fortunes))
    }

    useEffect(() => {
        fetchFortunes()
    }, [])


    return (
        <div id="horoscope-container" className="pb-80">
            <div id="sheet-block" className="flex justify-center mt-10 font-mono ">

                <div id="sheet-container" className="bg-amber-300 w-1/3   max-h-fit pb-9 p-5 " >
                    <h3 className="text-center font-semibold text-lg underline ">{currentSign}</h3>
                    <article id="horoscope" className="text-center text-lg">
                        {currentFortune}
                    </article>

                </div>

            </div>

            <div
                id="horoscope-ui-container wraper-layer"
                className="my-40 flex flex-col gap-y-24  bg-white bg-opacity-50 "
            >


                <div id="rail bg-layer" className="bg-yellow-100 h-2 w-full relative flex justify-around">
                    {zodiacs.slice(0, 3).map((sign, i) => { return <button id={sign.name} key={sign.name} onClick={() => handleSignChange(sign.name, i)} className="bg-orange-100 rounded-full w-20 h-20 flex justify-center items-center -my-9">{sign.name}</button> })}

                </div>
                <div id="rail bg-layer" className="bg-yellow-100 h-2 w-full relative flex justify-around">
                    {zodiacs.slice(3, 6).map((sign, i) => { return <button id={sign.name} key={sign.name} onClick={() => handleSignChange(sign.name, i + 3)} className="bg-orange-100 rounded-full w-20 h-20 flex justify-center items-center -my-9">{sign.name}</button> })}

                </div>
                <div id="rail bg-layer" className="bg-yellow-100 h-2 w-full relative flex justify-around">
                    {zodiacs.slice(6, 9).map((sign, i) => { return <button id={sign.name} key={sign.name} onClick={() => handleSignChange(sign.name, i + 6)} className="bg-orange-100 rounded-full w-20 h-20 flex justify-center items-center -my-9">{sign.name}</button> })}

                </div>
                <div id="rail bg-layer" className="bg-yellow-100 h-2 w-full relative flex justify-around    ">
                    {zodiacs.slice(9).map((sign, i) => { return <button id={sign.name} key={sign.name} onClick={() => handleSignChange(sign.name, i + +9)} className="bg-orange-100 rounded-full w-20 h-20 flex justify-center items-center -my-9">{sign.name}</button> })}

                </div>
            </div>

        </div>



    )
}