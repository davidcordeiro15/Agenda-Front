import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { GoX } from "react-icons/go";

function Task({ taskId, taskTitle, taskDescription, taskLocal, taskDate }) {
    const [alertDeleteBox, setAlertDeleteBox] = useState("absolute invisible");
    const [alertEditBox, setAlertEditBox] = useState("absolute invisible");

    // Variáveis necessárias para criar uma tarefa
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [local, setLocal] = useState("");
    const [date, setDate] = useState("");

    // Função que manda para a API uma requisição de DELETE com o parâmetro Id
    const yesChoice = () => {
        fetch(`http://localhost:8090/task/${taskId}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao eliminar tarefa");
                }
                return;
            })
            .catch((error) => console.error("Erro:", error));
        location.reload(); // Reinicia a página para mostrar a nova lista
    };

    // Função que mostra a box para confirmar o apagamento da tarefa
    const deleteTask = () => {
        alertDeleteBox === "absolute invisible"
            ? setAlertDeleteBox("visible")
            : setAlertDeleteBox("absolute invisible");
    };

    // Função que alterna a exibição do formulário de edição
    const toggleEditBox = () => {
        alertEditBox === "absolute invisible"
            ? setAlertEditBox("visible flex justify-center")
            : setAlertEditBox("absolute invisible");
    };

    // Função que atualiza a tarefa
    const editTask = (event) => {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        // Criando um objeto para a tarefa com valores antigos ou novos
        const body = {
            id: taskId,
            title: title || taskTitle,
            description: description || taskDescription,
            local: local || taskLocal,
            date: date || taskDate,
        };

        fetch("http://localhost:8090/task", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: { "Content-type": "application/json" },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao editar tarefa");
                }
                return response.json();
            })
            .then(() => {
                
                location.reload(); // ou atualize o estado local da lista de tarefas
            })
            .catch((error) => console.error("Erro:", error));

        setAlertEditBox("absolute invisible");
    };

    return (
        <>
            {/* Box de confirmação para deletar */}
            <div className={`bg-gray-300 text-center p-2 m-5 rounded-md ${alertDeleteBox}`}>
                <h1 className="font-bold">Deseja mesmo apagar essa tarefa?</h1>
                <div className="flex justify-around m-2">
                    <button
                        onClick={yesChoice}
                        className="bg-red-200 border-red-300 border-2 rounded-md p-1 hover:bg-red-300 hover:text-white"
                    >
                        Sim
                    </button>
                    <button
                        onClick={deleteTask}
                        className="bg-green-400 border-green-300 border-2 rounded-md p-1 hover:bg-green-500 hover:text-white"
                    >
                        Não
                    </button>
                </div>
            </div>

            {/* Formulário de edição */}
            <div className={alertEditBox}>
                <form
                    onSubmit={editTask}
                    className="bg-blue-200 p-8 border-gray-900 flex flex-col gap-2 mb-4"
                >
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="ml-3"
                            onClick={toggleEditBox}
                        >
                            <GoX />
                        </button>
                    </div>
                    <h1 className="text-center text-2xl">Edite sua tarefa!</h1>
                    <div className="m-6 mt-0 mb-2 flex">
                        <div>
                            <h2>Título da tarefa:</h2>
                            <input
                                className="m-2 rounded-md"
                                type="text"
                                placeholder={taskTitle}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            <h2>Data e Horário da tarefa:</h2>
                            <input
                                className="m-2 rounded-md"
                                type="date"
                                placeholder={taskDate}
                                onChange={(event) => setDate(event.target.value)}
                            />
                        </div>
                        <div>
                            <h2>Local:</h2>
                            <input
                                className="m-2 rounded-md"
                                type="text"
                                placeholder={taskLocal}
                                onChange={(event) => setLocal(event.target.value)}
                            />
                            <h2>Descrição:</h2>
                            <input
                                className="m-2 rounded-md"
                                type="text"
                                placeholder={taskDescription}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        className="text-white bg-blue-500 border-solid border-4 border-blue-500 rounded-xl"
                        type="submit"
                    >
                        Edite sua tarefa
                    </button>
                </form>
            </div>

            {/* Tarefa */}
            <div key={taskId} className="mb-4 border-2 border-gray-300 rounded-lg p-5">
                <div className="flex justify-between mb-3">
                    <h2 className="text-lg font-bold mr-1">{taskTitle}</h2>
                    <p>{taskDate}</p>
                </div>
                <p>{`Local: ${taskLocal}`}</p>
                <div className="flex justify-between">
                    <p>{taskDescription}</p>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={toggleEditBox}
                            className="hover:bg-gray-300 rounded-md p-1"
                        >
                            <FiEdit />
                        </button>
                        <button
                            onClick={deleteTask}
                            className="hover:bg-gray-300 rounded-md p-1"
                        >
                            <MdDeleteOutline />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Task;
