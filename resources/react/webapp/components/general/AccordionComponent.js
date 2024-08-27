import React, {useState, useEffect} from 'react';
import {capitalizeFirstLetterOfEachWord} from "../../helpers/GlobalUtils";
import ReactDOM from 'react-dom';


export default function AccordionComponent({path}){

    const [isActive, setIsActive] = useState(false);
    const [seoData, setSeoData] = useState({});
    
    useEffect(() => {
      console.log(path)
      if(path){

          fetch('/api/v1/app/public-area/getSetData/'+path)
              .then((response) => response.json())
              .then((res) => {
                if(res.data && res.data.meta_title){
                  document.title = res.data.meta_title
                  console.log("-------------------------------------",res.data)
                  document.querySelector('meta[name="title"]').setAttribute("content", res.data.meta_title);
                  document.querySelector('meta[name="description"]').setAttribute("content", res.data.meta_description);
                }else{
                  document.title = capitalizeFirstLetterOfEachWord(path) + ' - Anticonceptivo';
                }
                if(res.data){
                  
                  setSeoData(res.data);
                }
              });
        
      }
    },[path]);

    return (
      
        <div className="accordion-footer">
          {
            seoData.title &&
            <div className="accordion-item">
              <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                {path == 'home' ?
                  <h1>{seoData.title}</h1>
                  :
                  <h2>{seoData.title}</h2>
                }
                <div>{isActive ? '-' : '+'}</div>
              </div>
                {
                    isActive && 
                    <div 
                        className="accordion-content" 
                        dangerouslySetInnerHTML={{__html: seoData.description}}
                    />
                }
            </div>
          }
        </div>
    );
};



