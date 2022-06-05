import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import MuiTestApp from './compnents/MuiTest';
function Headers(props){
  console.log('props',props, props.title);
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      console.log('click');
      props.onChangeMode();

    }}>{props.title}</a></h1>
  </header>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Nav(props){
  const lis = []
  for(let i =0; i < props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(event)=>{
        event.preventDefault();
        console.log('Nav mode1');
        console.log(event);
        props.onChangeMode(Number(event.target.id));
      }} >{t.title}</a></li>)
  }
  return <nav>
    <ol>
    {lis}
    </ol>
  </nav>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={(event) =>{
      event.preventDefault();
      const title = event.target.elements.title.value;
      const body = event.target.elements.body.value;
      console.log(title,body);
      props.onCreate(title,body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><input type="text" name="body" placeholder="body"/></p>
      <p><input type="submit" value="create"/></p>
    </form>
  </article>
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
      <form onSubmit={(e)=>{
          e.preventDefault();
          props.onUpdate(title,body);
        }}>      
        <p><input type="text" name="title" onChange={(e)=>{
          setTitle(e.target.value);
        }} value={title}/></p>
        <p><input type="text" name="body" onChange={(e)=>{
          setBody(e.target.value);
        }} value={body}/></p>
        <p><input type="submit" value="update"/></p>
      </form>
  </article>
}
function App() {
  // const _mode =useState('Welcome');
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('Welcome');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id : 1, title : "html", body : 'html is...'},
    {id : 2, title : "css", body : 'css is...'},
    {id : 3, title : "js", body : 'js is...'},    
  ])
  let content = null;
  let create = null;
  let update = null;
  let itemDelete = null;
  if(mode === 'Welcome'){
    content = <Article  title="Welcome" body="Hello, WEB" />
    create = <li><a href="/create" onClick={(event)=>{
      event.preventDefault();
      setMode('CREATE');
    }}>Create</a></li>
  }else if(mode === 'READ'){
    let title = null;
    let body = null;
    for(let i =0; i < topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    content = <Article  title={title} body={body} />   
    
    update = <li><a href={'/update' + id} onClick={(event)=>{
      event.preventDefault();
      console.log(event.target)
      setMode('UPDATE');
    }}>Update</a></li>

    itemDelete = <li><button onClick={(event)=>{
      event.preventDefault();
      console.log(id)
      setTopics(topics.filter(t => t.id !== id));
      setMode('Welcome');
    }}>Delete</button></li>
    
  }else if(mode === 'CREATE'){
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId, title:_title, body:_body};
      // topics.push(newTopic);
      // setTopics(topics);
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}/>
  }else if(mode === 'UPDATE'){
    let title = null;
    let body = null;
    for(let i =0; i < topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;        
        break;
      }
    }
    content = <Update title={title} body={body} onUpdate={(_title,_body)=>{      
      const newTopics = [...topics];
      const newTopic = {id:id, title:_title, body:_body};
      for(let i =0; i < newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = newTopic;
          console.log(newTopics[i]);
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}/>
  }

  return (
    <div className="App">
      <Headers title="Web" onChangeMode={()=>{
        setMode('Welcome');
      }}/>
      <Nav topics={topics} onChangeMode={(id)=>{
        setMode('READ');
        setId(id);
      }}/>
      {content}
      <ul><h2>Control</h2>
      {create}
      {update}
      {itemDelete}
      </ul>
      <MuiTestApp/>
    </div>
  );
}

export default App;
