import { useState } from 'react';

const SEARCH_RESULTS = [  
  {"id":"910eb5e3-906d-432f-afeb-7820d821cca7","text":"Company Identity"},  
  {"id":"13baeb9c-f4f6-4bee-be88-e3f68155e8f2","text":"Lucasfilm"},
  {"id":"401955a8-8703-43f1-bb38-84dc09e43277","text":"Lufthansa"},
  {"id":"a5080f53-a37e-4137-9137-97c7cc18a4fa","text":"Linkedin"},
  {"id":"4b7b24bb-698d-4269-a5b2-f1112955105b","text":"Lyft"},
  {"id":"4129ed83-7047-438a-b5e7-2d7d01afe860","text":"Company Labs"},
]

const filterResultsFromSelection = (suggestions, selections) => {
  return suggestions
    .filter(suggestion => {
      const found = selections.find(selection => selection.id === suggestion.id)
      return !Boolean(found);
    })
}

const filterResultsFromInput = (suggestions, selections, text) => {
  const regex = new RegExp(`^${text}`, `i`);
  return filterResultsFromSelection(suggestions, selections)
    .filter(suggestion => regex.test(suggestion.text));
}

export default function Typeahead() {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selections, setSelections] = useState([]);

  const onTextChange = (event) => {
    const value = event.target.value;
    let filteredSuggestions = [];
    if (value.length > 0) {
      filteredSuggestions = filterResultsFromInput(SEARCH_RESULTS, selections, value)
    }
    
    setText(value)
    setSuggestions(filteredSuggestions);
  }

  const onSuggestionListClick = (item) => {
    const newSelection = [...selections, item]
    setSelections(newSelection)

    const filteredSuggestions = filterResultsFromSelection(suggestions, newSelection);
    setSuggestions(filteredSuggestions)
  }

  return (<div>
    <h1>Typeahead</h1>
    {selections && selections.length > 0 && (<ul>
      {selections.map(entry => {
        return <li key={entry.id}>{entry.text}</li>
      })
    }
    </ul>)}
    <input value={text} onChange={onTextChange}/>
    {suggestions && suggestions.length > 0 && (
      <ul>{suggestions.map(result => {
        return (<li key={result.id} onClick={() => onSuggestionListClick(result)}>{result.text}</li>)})
        }
      </ul>
    )}
    </div>)
}