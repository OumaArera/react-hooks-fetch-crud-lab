import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
const Url = "http://localhost:4000/questions"

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState(null)

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  }
  useEffect(() =>{
    const fetData = async () =>{
      try{
        const response = await fetch(Url)
        if (!response.ok){
          throw new console.error(`Error fetching data from server: ${response.status}`);
        }
        const data = await response.json()
        setQuestions(data)
      }catch(err){console.log(err)}
    }
    fetData()
  }, [])


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={addQuestion} /> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;


