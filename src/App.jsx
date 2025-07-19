import { useState } from 'react';
import { Container } from 'react-bootstrap';
import InputField from './components/InputField/InputField';
import AddButton from './components/AddButton/AddButton';
import DeleteButton from './components/DeleteButton/DeleteButton';
import DeleteTaskButton from './components/DeleteTask/DeleteTaskButton';
import './App.css'

function App() {
  const [singleValue, setSingleValue] = useState("");

  const [tasks, setTasks] = useState([]);

  const HandlerAdd = () => {
    setTasks([...tasks, singleValue]);
    setSingleValue("");
    console.log(tasks)
  }

  const HandlerDelete = () => {
    setTasks([])
    setSingleValue("");
  }


  const DeleteTask = (key) => {
    let NewArr = tasks.filter((e, i) => i !== key)
    setTasks(NewArr);
    setSingleValue("");
  }

  const [EditScreen, setEditScreen] = useState(false)
  const [KeyValue, setKeyValue] = useState()
  const [DisableBtn, setDisableBtn] = useState(false);

  const EditTask = (key) => {
    setKeyValue(key)
    setEditScreen(true);
    setDisableBtn(true);
    setSingleValue(tasks[key])
  }

  const UpdatedValue = () => {
    const updatedTasks = tasks.map((e, i) => i === KeyValue ? singleValue : e);
    setTasks(updatedTasks);
    setDisableBtn(false);
    setEditScreen(false);
    setSingleValue("");
    setKeyValue(undefined);
  }

  const CancelEdit = () => {
    setDisableBtn(false);
    setEditScreen(false);
    setSingleValue("");
    setKeyValue(undefined);
  }

  return (
    <>
      <Container>
        <h1 className='text-center mt-5'>ToDo Application</h1>
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <InputField value={(e) => { setSingleValue(e.target.value) }} remover={singleValue} />
          {EditScreen === true ? <>
            <button onClick={UpdatedValue} className='btn btn-primary ms-2'>Confirm</button>
            <button onClick={CancelEdit} className='btn btn-danger ms-2'>Cancel</button>
          </> : <>
            <AddButton value={HandlerAdd} />
            <DeleteButton value={HandlerDelete} />
          </>}
        </div>

        <div className='mt-4'>
          {tasks.map((e, i) => {
            return (
              
              <div className='d-flex justify-content-center align-items-center bg-color my-1' key={i}>
                <div className='h-100 px-3 py-2 m-2 border_setting'>Task {i + 1}</div>
                <div className='version px-3 py-2 m-2 border_setting'>{e}</div>
                <div><button onClick={() => { EditTask(i) }} disabled={DisableBtn} className='btn btn-primary ms-2 '>Edit</button></div>
                <div><DeleteTaskButton value={() => { DeleteTask(i) }} /></div>

              </div>
            )
          })}
        </div>


      </Container>
    </>
  )
}

export default App
