function TaskList({ taskTitle, taskDescription, taskLocal, taskDate }) {
    return ( 
        <>
            <h1>Suas Tarefas: </h1>
            <ul>
                <li>
                    <h1>{taskTitle}</h1>
                    <h2>{taskDate}</h2>
                    <h3>{taskLocal}</h3>
                    <p>{taskDescription}</p>
                </li>
            </ul>
        </>
     );
}

export default TaskList;