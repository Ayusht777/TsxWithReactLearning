import { useState } from "react";
import Select from "./Components/Select";
import { Option } from './Components/types'


function App() {
  const optionList = [
    { name: "ayush", id: 1 },
    { name: "Ravi", id: 2 },
    { name: "Deep", id: 3 },
    { name: "Rhoin", id: 4 },
    { name: "Vikram", id: 5 },
    { name: "jatin", id: 6 },
    { name: "divynashu", id: 7 },
    { name: "aarsh", id: 8 },
    { name: "ritivik", id: 9 },
    { name: "harshit", id: 10 },
    { name: "arun", id: 11 },
    { name: "rimpy", id: 12 },
    { name: "gagan", id: 13 },
    { name: "jaswant", id: 14 },
  ];

  const [selectedOption, setSelectedOption] = useState<Option | undefined>();

  return (
    <>
      <div className="w-full min-h-dvh bg-black flex justify-center items-center">
        <Select
          options={optionList}
          currentValue={selectedOption}
          onOptionChange={(value) => setSelectedOption(value)}
           aria-label="Select a person"
        />
      </div>
    </>
  );
}

export default App;
