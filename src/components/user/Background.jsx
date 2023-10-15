import React, { useEffect, useRef } from 'react'
import "./user_css/codegenerate.css"
import { render } from 'react-dom'

function Background() {

    const backgroundContainer = useRef(null)
    const snowCount = 6

    function generateRandomValues(){
        const width = Math.floor(20+Math.random()*40)
        // const height = width
        const leftPos = Math.floor(Math.random()*backgroundContainer.current.parentElement.getBoundingClientRect().width - width)
        const topPos = -width - Math.floor(Math.random()*40)
        const time = Math.floor(2 + Math.random()*4)
        return [width, leftPos, topPos, time]
    }

    function iterateSnow(snow){
        const values = generateRandomValues()
        snow.style.width = values[0] + "px"
        snow.style.height = values[0] + "px"
        snow.style.left = values[1] + "px"
        snow.style.top = 100 + values[2] + "px"
        snow.animate(
            [
                {
                    top: values[2] + "px",
                    opacity: 1
                },
                {
                    top: backgroundContainer.current.getBoundingClientRect().height + 60 + "px",
                    opacity: 0
                }
            ],
            {
                duration: values[3]*1000 + 200,
                iteration: 1
            }
        )

        setTimeout(()=>iterateSnow(snow), values[3]*1000)

    }
    
    useEffect(()=>{
        // setting background container
        backgroundContainer.current.style.width = backgroundContainer.current.parentElement.getBoundingClientRect().width + "px"
        backgroundContainer.current.style.height = backgroundContainer.current.parentElement.getBoundingClientRect().height + "px"


        window.addEventListener('resize',()=>{
            backgroundContainer.current.style.width = backgroundContainer.current.parentElement.getBoundingClientRect().width + "px"
            backgroundContainer.current.style.height = backgroundContainer.current.parentElement.getBoundingClientRect().height + "px"
        })

        // adding the snow boxes
        for(let i=0; i<snowCount; i++){
            const snow = document.createElement("span")
            snow.className = snow
            backgroundContainer.current.appendChild(snow)
            iterateSnow(snow)
            

            // console.log(values)
            // backgroundContainer.current.
        }

    },[])

  return (
    <div ref={backgroundContainer} className="snow-container">
        {/* <span className="snow"></span> */}
    </div>
  )
}

export default Background