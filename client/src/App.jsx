import React from 'react'
import Tasks from './Components/Tasks'
import background from './assets/juskteez-vu-mwhklqGVzck-unsplash.jpg'

//detils about the page
/*
* The first div is the container for the whole page.
     * The classname is making the items to be centered and the bg-dark-blue is the color of the background.
     * The w-screen and h-screen are making the page to be full screen.
     * The flex is making the items to be in a row.
     * The flex-col is making the items to be in a column.
     * The items-center is making the items to be in the center of the page.
     * The h1 is the title of the page.
     * The text-white is the color of the text.
     * The text-4xl is the size of the text.
     * The h2 is the subtitle of the page.
     * The text-white is the color of the text.
     * The text-2xl is the size of the text.
     * The Tasks is the component that is being imported from the Tasks.jsx file.



*/

const App = () => {
  return (


    <div className=" bg-cover bg-center w-screen h-screen flex flex-col items-center justify-center "
    style={{backgroundImage: `url(${background})`}}
    >
      <h1 className="text-white text-4xl font-bold">Task Manager</h1>
      <br />
      <br />
      <h2 className="text-white text-2xl m-2">Welcome Youssef, here are your tasks for the day</h2>
      <Tasks />
    </div>
  )
}


export default App
