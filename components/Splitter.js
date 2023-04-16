import React, { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css';

const Splitter = ({msg, sendDisabled, setSendDisabled}) => {
  function divideSentences(str, maxLength) {
    const sentences = str.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g);
    const groups = [];
  
    let group = "";
    let groupLength = 0;
  
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const sentenceLength = sentence.length + (i > 0 ? 1 : 0);
  
      if (groupLength + sentenceLength <= maxLength) {
        group += (i > 0 ? " " : "") + sentence;
        groupLength += sentenceLength;
      } else {
        groups.push(group);
        group = sentence;
        groupLength = sentenceLength;
      }
    }
  
    if (groupLength > 0 && group.trim().length > 0) {
      groups.push(group);
    }


    return groups.filter(str => str.trim().length > 0);
  }

  const [sentences, setSentences] = useState([]);
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    if (index != sentences.length - 1) {
      setIndex(index + 1);
    }
  }

  useEffect(() => {
    setIndex(0);
    setSentences(divideSentences(msg, 98));
    //at last line bc there's only one
    if (divideSentences(msg, 98).length == 1 && divideSentences(msg, 98)[0] != "...") {
      setSendDisabled(false);
    }
    else {
      setSendDisabled(true);
    }
  }, [msg])

  useEffect(() => {
    //if we aren't at the last line in the sentences
    console.log("sentences is", sentences);
    if (sentences[0] != "...") {
      if (index != sentences.length - 1) {
        setSendDisabled(true);
      }
      else {
        setSendDisabled(false);
      }
    }
  }, [index, sentences])

  //style button in bottom right
  return (
	<div>
    <p style={{color: 'black', fontSize: 24}}>{sentences[index]}</p>
	  <button className={styles.button2} style={index != sentences.length - 1 ? {position: 'absolute', bottom: '5%', left:'95%', background: 'white', border: '2px solid black', height: '30px', paddingTop: 4, paddingBottom: 0, paddingLeft: 2, paddingRight: 2} : {display: 'none'}} onClick={handleClick}><img src='/images/arrow.gif'></img></button>
	</div>
  );
}

export default Splitter;