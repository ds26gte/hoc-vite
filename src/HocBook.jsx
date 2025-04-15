import { useState } from 'react';

import { hocBookBits } from './hocBookBits';

let parley;

const numHocPages = hocBookBits.length;

// function clearLoadingScreenAndRun() {
//   document.getElementById('righthand').style.opacity = 1;
//   document.getElementById('loadingScreen').classList.add('loaded');
//   parley.run();
// }

function createLeftPane(lessonText) {
  console.log('doing createLeftPane of', lessonText);
  return (
    <div id="lefthand">
    <div dangerouslySetInnerHTML={{__html: lessonText}} />
    </div>
  )
}

function createEditorPane(editorCode) {
  let div = document.createElement('div');
  div.setAttribute('id', 'righthand');
  let parley = window.embedableParley.renderParley(div);
  parley.resetChunks(editorCode.trim().split("\n") || [""]);
  parley.onReady(function() {
    //
    parley.run();
  });

  return div;
}

function createImagePane(imageConfig) {
  return (
    <div id="righthand">
    <img src="{imageConfig}" />
    </div>
  )
}

function createVideoPane(videoConfig) {
  return (
    <div id="righthand">
    <video src="{videoConfig}" />
    </div>
  )
}

export default function HocBook() {
  const [index, setIndex] = useState(0);
  let twinPane = hocBookBits[index];

  console.log('embedableParley', window.embedableParley);

  function handleClickNext() {
    setIndex((index === (numHocPages - 1)) ? 0 : (index + 1));
  }

  function handleClickPrev() {
    setIndex((index === 0) ? (numHocPages - 1) : (index - 1));
  }

  // console.log('hc index is', index);

  let leftPane = createLeftPane(twinPane.lessonText);
  let rightPane;

  if (twinPane.editorCode) {
    rightPane = createEditorPane(twinPane.editorCode);
  } else if (twinPane.imageConfig) {
    rightPane = createImagePane(twinPane.imageConfig);
  } else if (twinPane.videoConfig) {
    rightPane = createVideoPane(twinPane.videoConfig);
  }

  console.log('leftPane is', leftPane);
  console.log('rightPane is', rightPane);

  return (
    <>
    <h1>HoC Winter Parley</h1>
    <button onClick={handleClickPrev}>Prev</button>
    <button onClick={handleClickNext}>Next</button>
    <h2>({index+1} of {numHocPages})</h2>
    {leftPane}
    {rightPane}
    </>
  );

}
