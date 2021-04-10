import { useState } from "react";
import logo from "./bottle.png";
import _ from "lodash";
import "./App.scss";
import { Modal, Input, Button } from "antd";

function App() {
  const [rotate, setRotate] = useState(false);
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState([]);
  const [input, setInput] = useState("");

  const handleClick = () => {
    if (!rotate) {
      setRotate(true);
      setSelected([]);
      setTimeout(() => {
        setRotate(false);
        setSelected(_.sampleSize(people, 2));
      }, 1000);
    }
  };

  const handleOk = () => {
    let str = input.replace(/\s+/gim, "").trim();
    if (str.includes(";")) {
      str = str.replace(/\W+/gim, ",");
    }
    setPeople(str.split(","));
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      {people.length === 0 && (
        <Modal
          title="Add peoples name separated by , . ;  or /"
          visible={true}
          footer={[
            <Button
              type="primary"
              onClick={handleOk}
              disabled={input.length <= 0}
            >
              Ok
            </Button>,
          ]}
        >
          <Input value={input} onChange={handleChange} />
        </Modal>
      )}
      <div className="group">
        {selected.map((p) => (
          <span className="people">{p}</span>
        ))}
      </div>
      <img
        src={logo}
        className={`bottle${rotate ? " rotate" : ""}`}
        alt="bottle"
        onClick={handleClick}
      />
    </div>
  );
}

export default App;
