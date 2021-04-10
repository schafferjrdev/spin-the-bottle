import { useState } from "react";
import logo from "./bottle.png";
import spin from "./bottle.mp3";
import _ from "lodash";
import "./App.scss";
import { Modal, Input, Button, Tag } from "antd";

function App() {
  const [rotate, setRotate] = useState(false);
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState([]);
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [currentPeople, setCurrentPeople] = useState([]);
  const [opened, setOpened] = useState(true);

  const audio = new Audio(spin);

  const handleClick = () => {
    if (!rotate) {
      setRotate(true);
      setSelected([]);
      audio.play();
      setTimeout(() => {
        setRotate(false);
        setSelected(_.sampleSize(people, 2));
      }, 2000);
    }
  };

  const splitText = (text) => {
    let str = text.trim();
    str = str
      .replace(/[.,;/\\]+/gim, ",")
      .replace(/\s{2,}/gim, " ")
      .replace(/\B\s+\B/gim, "");
    return _.compact(str.split(","));
  };

  const handleOk = () => {
    setPeople(splitText(input));
    setOpened(false);
  };

  const handleChange = (e) => {
    setCurrentPeople(splitText(e.target.value));

    const pattern = /\w+\W+\w+/gim;
    setDisabled(!Boolean(e.target.value.match(pattern)));
    setInput(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !disabled) handleOk();
  };

  const handleClose = () => {
    if (!disabled) setOpened(false);
  };

  return (
    <div className="App">
      <Modal
        title="Add peoples name separated by , . ;  or /"
        visible={opened}
        onCancel={handleClose}
        closable={people.length > 0}
        footer={[
          <Button type="primary" onClick={handleOk} disabled={disabled}>
            Ok
          </Button>,
        ]}
      >
        <div className="people-tags">
          {currentPeople.map((n, i) => (
            <Tag className="tag-name" key={`tag_name_${i}`}>
              {n}
            </Tag>
          ))}
        </div>
        <Input value={input} onChange={handleChange} onKeyDown={handleEnter} />
      </Modal>
      <div className="people-tags floated" onClick={() => setOpened(true)}>
        {people.map((n, i) => (
          <Tag
            color={selected.includes(n) ? "green" : "red"}
            key={`tag_name_people_${i}`}
            className="tag-name"
          >
            {n}
          </Tag>
        ))}
      </div>
      <div className="group">
        {selected.map((p) => (
          <span key={`people_${p}`} className="people">
            {p}
          </span>
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
