import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  //useState
  const [name, setName] = useState("Melike");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [categories, setCategories] = useState([2, 4]);
  const [rule, setRule] = useState(true);
  const [rules, setRules] = useState([
    { key: 1, value: "1. kuralı kabul ediyorum", checked: false },
    { key: 2, value: "2. kuralı kabul ediyorum", checked: false },
    { key: 3, value: "3. kuralı kabul ediyorum", checked: true },
  ]);
  const [level, setLevel] = useState("jr_developer");
  const [avatar, setAvatar] = useState(false);
  const [image, setImage] = useState(false);

  //Variables
  //const genders = ["Erkek", "Kadın"];
  const genders = [
    { key: "1", value: "Erkek" },
    { key: "2", value: "Kadın" },
  ];
  const categoryList = [
    { key: 1, value: "PHP" },
    { key: 2, value: "Javascript" },
    { key: 3, value: "HTML" },
    { key: 4, value: "CSS" },
  ];
  const levels = [
    { key: "beginner", value: "Başlangıç" },
    { key: "jr_developer", value: "Jr. Developer" },
    { key: "sr_developer", value: "Sr. Developer" },
  ];

  const selectedCategories =
    categories && categoryList.filter((c) => categories.includes(c.key));

  const enabled = rules.every((rule) => rule.checked);

  //actions
  const checkRule = (key, checked) => {
    setRules((rules) =>
      rules.map((rule) => {
        if (key === rule.key) {
          rule.checked = checked;
        }
        return rule;
      })
    );
  };

  const submitHandle = () => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: formData,
    });
  };

  //useEffect
  useEffect(() => {
    if (avatar) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", function () {
        setImage(this.result);
      });
      fileReader.readAsDataURL(avatar);
    }
  }, [avatar]);

  return (
    <div className="App">
      <input value={name} onChange={(e) => setName(e.target.value)} /> <br />
      {name} <br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />{" "}
      <br />
      {description} <br />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Seçiniz</option>
        {genders.map((gender) => (
          <option key={gender.key} value={gender.value}>
            {gender.value}
          </option>
        ))}
      </select>{" "}
      <br />
      {gender} <br />
      <select
        value={categories}
        multiple={true}
        onChange={(e) =>
          setCategories(
            [...e.target.selectedOptions].map((option) => +option.value)
          )
        }
      >
        {categoryList.map((category) => (
          <option key={category.key} value={category.key}>
            {category.value}
          </option>
        ))}
      </select>{" "}
      <br />
      <pre>{JSON.stringify(selectedCategories, null, 2)}</pre>
      <br />
      <label>
        <input
          type="checkbox"
          checked={rule}
          onChange={(e) => setRule(e.target.checked)}
        />
        Kuralları kabul ediyorum
      </label>
      <br />
      {rules.map((rule) => (
        <label key={rule.key}>
          <input
            type="checkbox"
            checked={rule.checked}
            onChange={(e) => checkRule(rule.key, e.target.checked)}
          />
          {rule.value}
        </label>
      ))}
      <pre>{JSON.stringify(rules, null, 2)}</pre>
      <br />
      {levels.map((item, index) => (
        <label key={index}>
          <input
            type="radio"
            value={item.key}
            checked={item.key == level}
            onChange={(e) => setLevel(e.target.value)}
          />
          {item.value}
        </label>
      ))}{" "}
      <br />
      {level}
      <br />
      <label>
        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
      </label>
      <br />
      {avatar && (
        <>
          <h3>{avatar.name}</h3>
          {image && <img src={image} alt="" />}
        </>
      )}
      <button onClick={submitHandle} disabled={!enabled}>
        Devam et
      </button>
    </div>
  );
}

export default App;
