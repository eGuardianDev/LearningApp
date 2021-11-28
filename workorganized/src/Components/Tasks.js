
import { useState,setState, useEffect, useCallback  } from 'react';

const data = [
    {
        text: "test1"
    },
    {
        text:"test2"
    }
]


var jsondata = null;
const Tasks = () => {
    const [data, Update] = useState(0);
    useEffect(()=>{
      const fetchTasks = async() => {
        const returnedRequest = await fetch('http://212.21.151.98:5000/ned')
        jsondata = await returnedRequest.json();
        Update();
      }
      fetchTasks();
    }, [])
    if(jsondata == null)
    {
        return(<>no data</>);
    }
    else {
        return (
            <>
                {jsondata.map((d) => (<p>{d.input}</p>))}
            </>
        )
}
}//{jsondata.students.map((d) => (<h3>{d.students}</h3>))}

export default Tasks
