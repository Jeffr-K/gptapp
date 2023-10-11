import Head from 'next/head';
import { useState } from "react";
import styles from '../styles/index.module.css';

export default function Home() {
  const [count, setCount] = useState(0);
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      if (count === 10) {
        return console.log('You have reached your limit.');
      } //

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({animal: animalInput})
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status: ${response.status}`);
      }

      setResult(data.response);
      setCount(count + 1);
      setAnimalInput("");

    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }

  return (
    <>
      <div className={styles.body}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <img className={styles.icon} src='/favicon.ico'  alt="image"/>
          <h3>Name My Pet</h3>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              name='animal'
              value={animalInput}
              onChange={(e) => {
                setAnimalInput(e.target.value);
                console.log(animalInput);
              }}
              placeholder='Enter an animal'
            />
            <input
              type='submit'
              value='Generate value'
              onClick={onSubmit}
            />
          </form>
          <div>{result}</div>
        </main>
      </div>
    </>
  )
}
