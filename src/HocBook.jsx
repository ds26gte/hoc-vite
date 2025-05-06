import { useState, useRef, useEffect } from 'react';
import { makeEmbed } from 'pyret-embed';
import { hocBookBits } from './hocBookBits';

let parley;

const numHocPages = hocBookBits.length;


function createLeftPane(lessonText) {
  //console.log('doing createLeftPane of', lessonText);
  return <div dangerouslySetInnerHTML={{__html: lessonText}} />
}

async function createEditorPane(editorCode) {
  console.log('creating editorPane')

  // return <div>{editorCode}</div>;

  // create a ref, so that we can render into the DOM
  const containerRef = useRef(null);
  
  // if the ref has been rendered (i.e. - has a current node),
  // render parley into it
  useEffect( () => {


    // const embed = makeEmbed("Embedded Editor", containerRef.current, "https://pyret-horizon.herokuapp.com/editor")

    const code = `use context starter2024\n\n`;

    const embed = await makeEmbed("Embedded Editor", containerRef.current);

    console.log('embed=', embed);

    embed.sendReset({
      definitionsAtLastRun: code,
      interactionsSinceLastRun: editorCode,
      editorContents: code,
      replContents: "",
    });



    // let iframeContainer = document.getElementById("hocbookid");
    // makeEmbed("Embedded Editor", iframeContainer)

  }, [containerRef, editorCode]);
  
  return <div id="hocbookid" ref={containerRef} />
}

function createImagePane(imageConfig) {
  // console.log('creating imagePane')
  return <img src={imageConfig} />
}

function createVideoPane(videoConfig) {
  // console.log('creating videoPane')
  return <video src="{videoConfig}" />
}

export default async function HocBook() {
  //console.log('making HocBook');
  const [index, setIndex] = useState(0);
  let twinPane = hocBookBits[index];

  function handleClickNext() {
    setIndex((index === (numHocPages - 1)) ? 0 : (index + 1));
  }

  function handleClickPrev() {
    setIndex((index === 0) ? (numHocPages - 1) : (index - 1));
  }

  let leftPane = createLeftPane(twinPane.lessonText);
  let rightPane = twinPane.editorCode ?
    await createEditorPane(twinPane.editorCode) :
    twinPane.imageConfig ?
    createImagePane(twinPane.imageConfig) :
    createVideoPane(twinPane.videoConfig);

  // console.log('hc index is', index);
  // console.log('lessonText is', twinPane.lessonText);
  // console.log('editorCode is', twinPane.editorCode);

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
