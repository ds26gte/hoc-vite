import { useState, useRef, useEffect } from 'react';

import { hocBookBits } from './hocBookBits';

let parley;

const numHocPages = hocBookBits.length;

// function clearLoadingScreenAndRun() {
//   document.getElementById('righthand').style.opacity = 1;
//   document.getElementById('loadingScreen').classList.add('loaded');
//   parley.run();
// }

function createLeftPane(lessonText) {
  //console.log('doing createLeftPane of', lessonText);
  return <div dangerouslySetInnerHTML={{__html: lessonText}} />
}

function createEditorPane(editorCode) {
  //console.log('creating editorPane')

  // create a ref, so that we can render into the DOM
  const containerRef = useRef(null);

  // if the ref has been rendered (i.e. - has a current node),
  // render parley into it
  useEffect(() => {
    if (containerRef.current) {
      let parley = window.embedableParley.renderParley(containerRef.current);
      parley.resetChunks(editorCode.trim().split("\n") || [""]);
      parley.onReady(parley.run);
    }
  }, [containerRef]);

  return <div ref={containerRef} />
}

function createImagePane(imageConfig) {
  //console.log('creating imagePane')
  return <img src={imageConfig} />
}

function createVideoPane(videoConfig) {
  //console.log('creating videoPane')
  return <video src="{videoConfig}" />
}

export default function HocBook() {
  //console.log('making HocBook');
  const [index, setIndex] = useState(0);
  let twinPane = hocBookBits[0];

  function handleClickNext() {
    setIndex((index === (numHocPages - 1)) ? 0 : (index + 1));
  }

  function handleClickPrev() {
    setIndex((index === 0) ? (numHocPages - 1) : (index - 1));
  }

  let leftPane = createLeftPane(twinPane.lessonText);
  let rightPane;

  if (twinPane.editorCode) {
    rightPane = createEditorPane(twinPane.editorCode);
  } else if (twinPane.imageConfig) {
    rightPane = createImagePane(twinPane.imageConfig);
  } else if (twinPane.videoConfig) {
    rightPane = createVideoPane(twinPane.videoConfig);
  }

  //console.log('hc index is', index);
  //console.log('leftPane is', leftPane);
  //console.log('rightPane is', rightPane);

  return (
    <>
    <div id="banner">
      <img src="images/icon.png" height="50" />
      <span>Bootstrap :: Winter Hour of Code</span>
    </div>
    <div id="progressbar" style={{width: (index + 1) * (100 / numHocPages) + "%"}}></div>
    <h1>HoC Winter Parley</h1>
    <main>
      <div id="buttons">
        <button id="prev"
                onClick={handleClickPrev}
                disabled={index>0? '' : 'yes'}>
          «
        </button>
        <button id="next"
                onClick={handleClickNext}
                disabled={index < hocBookBits.length - 1? '' : 'yes'}>
          »
        </button>
      </div>
      <h2>({index+1} of {numHocPages})</h2>
      <div id="pages">
        <div id="leftPane">
          {leftPane}
        </div>
        <div id="rightPane">
          {rightPane}
        </div>
      </div>
    </main>
    <div id="footer">
      <a href="https://www.BootstrapWorld.org">Bootstrap</a> is brought to you by the <a href="https://www.BootstrapWorld.org/community">Bootstrap Team</a>. Special thanks to <a href="http://www.ProgramByDesign.org">Program by Design</a> and <a href="https://www.Brown.edu">Brown University</a>.
    </div>
    </>
  );

}
