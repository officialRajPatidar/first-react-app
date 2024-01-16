import React, { useState } from "react";

export default function Form(props) {
  const [text, setText] = useState("Enter text here ");
  const [translatedText, setTranslatedText] = useState('');

  const handleUpclick = (event) => {
    event.preventDefault();
    let newtext = text.toUpperCase();
    setText(newtext);
  };

  const handleLowclick = (event) => {
    event.preventDefault();
    let newtext = text.toLowerCase();
    setText(newtext);
  };

  const handleTranslateClick = async () => {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=YOUR_GOOGLE_TRANSLATE_API_KEY&q=${encodeURIComponent(
          text
        )}&source=en&target=hi`,
        {
          method: 'POST',
        }
      );

      const result = await response.json();
      const translated = result.data.translations[0].translatedText;
      setTranslatedText(translated);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const handleCopyText = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(translatedText || text);
    alert("Text copied to clipboard!");
  };

  const handleClearText = (event) => {
    event.preventDefault();
    setText("");
    setTranslatedText("");
    alert("Text clipboard is cleared!");
  };

  const handleDownloadText = (event) => {
    event.preventDefault();
    const content = translatedText || text;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "text.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFontFamilyChange = (fontFamily) => {
    setText((prevText) => `<span style="font-family: ${fontFamily}">${prevText}</span>`);
  };

  const handleFontSizeChange = (fontSize) => {
    setText((prevText) => `<span style="font-size: ${fontSize}px">${prevText}</span>`);
  };

  

  const handleonchange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="form-group my-4"  >
        <h1>{props.heading}</h1>
        <label htmlFor="exampleFormControlTextarea1"></label>
        <textarea
  className="form-control"
  value={text}
  onChange={handleonchange}
  id="myBox"
  rows="8"
></textarea>
        <button className="btn btn-primary my-2 mx-1" onClick={handleUpclick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary my-2 mx-1" onClick={handleLowclick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary my-2 mx-1" onClick={handleTranslateClick}>
          Translate to Hindi
        </button>
        <button className="btn btn-primary my-2 mx-1" onClick={handleCopyText}>
          Copy Text
        </button>
        <button className="btn btn-primary my-2 mx-1" onClick={handleClearText}>
          Clear Text
        </button>
        <button className="btn btn-primary my-2 mx-1" onClick={handleDownloadText}>
          Download Text
        </button>
        <button
          className="btn btn-primary my-2 mx-1"
          onClick={() => handleFontFamilyChange("Arial")}
        >
          Change Font Family
        </button>
        <button
          className="btn btn-primary my-2 mx-1"
          onClick={() => handleFontSizeChange("20")}
        >
          Change Font Size
        </button>
       
      </div>

      <div className="container mr-4" >
        <h1>Text Summary</h1>
        <p>{text.split(" ").length} words and {text.length} characters </p>
        <p>{0.008 * text.split(" ").length} Minutes Read</p>
        <h2>Preview</h2>
        <p dangerouslySetInnerHTML={{ __html: translatedText || text }}></p>
      </div>
      <br />
    </>
  );
}
