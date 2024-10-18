import {db, storage} from '@/lib/firsebase'
import React, { useEffect, useRef, useState } from 'react'
import {ref, uploadBytes, getDownloadURL, listAll, list, deleteObject} from "firebase/storage";
import {
  collection, doc, getDocs, getDoc, addDoc, setDoc, deleteDoc
} from "firebase/firestore";
import { setLogLevel } from 'firebase/app';


const Firebase = () => {
  let [preview, setPreview] = useState();
  let [loading, setLoading] = useState(false);
  let [imgUrl, setImgUrl] = useState([]);

  let fileEle = useRef();

  function pre(e){
    let file = new FileReader();
    file.readAsDataURL(e.target.files[0])

    file.onload = (e)=>{
      setPreview(e.target.result)
    }
  }

  function save (e){
    e.preventDefault();
    const file = e.target.photo.files[0];
    let storageRef = ref(storage, file.name);
    // uploadBytes(위치,파일) 비동기 함수
    
    setLoading(true);

    uploadBytes(storageRef, file)
    .then(res=>{
      console.log(res);
      setLoading(false);
      setPreview('');
    })
  }

  function getImages(){
    listAll( ref(storage) )
    .then( async (res)=>{
      let url = [];
      for(let i=0; i<res.items.length; i++){
        let name = res.items[i].name;

        url.push(
          {name, url:await getDownloadURL(res.items[i])}
        )
      }
      setImgUrl(url);
    })
  };

  function delImage(name){
    setLoading(true);
    // deleteObject(서버접속, 삭제할 이미지명)
    deleteObject(ref(storage,name))
    .then(res=>{
      setLoading(false);
      getImages();
    })
  }


  return (
    <>
      <div>
        <div>이미지 미리보기</div>

        <div className='preview'>
          <img src={preview}/>
          <button onClick={()=>fileEle.current.click()}>카메라아이콘</button>
        </div>

        <form onSubmit={save}>
          <input
          style={{display: 'none'}}
          ref={fileEle}
          type='file' name='photo' onChange={pre} multiple/>

          <button>저장</button>
        </form>

        {
          loading &&
          <div className='loading'><img src='./Cartoon Snail Loading.gif'/></div>
        }

        <h2>
          Firebase Storage 가져오기
          <button onClick={getImages}>리스트</button>
        </h2>

        <ul className='firebase-list'>
          {
            imgUrl.map((item)=>
              <li>
                <figure><img src={item.url}/></figure>
                <button onClick={()=>delImage(item.name)}>삭제</button>
              </li>
            )
          }
        </ul>
      </div>

      <Firestore setLoading={setLoading}/>
    </>
  )
}

export default Firebase





export function Firestore({setLoading}){

  const [data,setData] = useState([]);
  const [mode,setMode] = useState(true);
  const [update,setUpdate] = useState({
    name:'', subject:'', content:'', url:'',
  });
  const updateFn = (edit)=>{
    {subject:e.target.value}
    {name:e.target.value}
    {subject:e.target.value}
    setUpdate(
      {...update, ...edit}
    )
  }

  const crud = {
    get:async ()=>{
    const querySnapshot = await getDocs(collection(db, 'test'));

    let dataArray = [];
    querySnapshot.forEach((doc) => {
      dataArray.push( {id:doc.id, ...doc.data()} )
      });
      setData(dataArray);
    },

    post:async (e)=>{
      e.preventDefault();
      let formdata = new FormData(e.target);
      setLoading(true)

      //storage
      const file = e.target.file.files[0];
      const fileName = 'board/'+file.name;

      const storageRef = ref(storage,fileName)
      // uploadBytes(저장위치, 파일)
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);

      //db
      formdata.append('date','2024-09-27');
      formdata.append('url',fileUrl);
      formdata.append('imgName',fileName);

      let obj = Object.fromEntries(formdata);
      delete obj.file;
      // addDoc(db접속해서 test 콜렉션에 접근, 추가할 내용)
      await addDoc(collection(db,'test'), obj)
      await crud.get();
      
      e.target.reset();
      setLoading(false);

      console.log( obj );
    },
    put:async(e)=>{
      e.preventDefault();
      if(update.file){
        const file = update.file;
        const fileName = 'board/'+file.name;

        const storageRef = ref(storage,fileName)
        await uploadBytes(storageRef, file);
        
        const fileUrl = await getDownloadURL(storageRef);
        
        let set = {...update};
        set.fileName = fileName;
        set.url = fileUrl;
        
        delete set.file;
        await setDoc(doc(db,'test', item.id),set);
      }
      else{
        let set = {...update};
        await setDoc(doc(db,'test', item.id),set);
      }

    },
    delete:async(item)=>{
      setLoading(true)
      await deleteDoc(doc(db,'test',item.id));
      await deleteObject(ref(storage,item.fileName));
      await crud.get();
      setLoading(false)
    }
  }

  useEffect(()=>{
    crud.get();
  },[])


  return(
    <div>
      <h2>No-Sql 활용</h2>

      <article>
        <h3>글쓰기</h3>
        {
          mode ? (
            <div>
              <form onSubmit={crud.post}>
                <p><input type='text' name='subject'/></p>
                <p><input type='text' name='name'/></p>
                <p><textarea cols='50' rows='10' name='content'></textarea></p>
                <p><input type='file' name='file'/></p>
                <p><input type='submit' value='저장'/></p>
              </form>
            </div>
          ) : (
            <div>
              <form onSubmit={crud.put}>
                <p><input type='text' name='subject'
                  defaultValue={update.subject}
                  onChange={(e)=>updateFn({subject:e.target.value})}
                  
                  /* onChange={(e)=>setUpdate(
                    {...update, subject:e.target.value}
                  )} */
                  /* onChange={(e)=>setData(state=>{
                    return {...state, subject:e.target.value}
                  })} */
                  /></p>

                <p><input type='text' name='name'
                  defaultValue={update.name}/>
                  onChange={(e)=>updateFn({name:e.target.value})}</p>

                <p><textarea cols='50' rows='10' name='content'
                  defaultValue={update.content}>
                  onChange={(e)=>updateFn({content:e.target.value})}</textarea></p>

                <p><input type='file' name='file'
                  onChange={(e)=>updateFn({file:e.target.files[0]})}/></p>

                <p><input type='submit' value='저장'/></p>
              </form>
            </div>
          )
        }
        
      </article>

      <article>
        <h3>리스트</h3>
        <ul>
          {
          data.map((item)=>
            <li key={item.id}>
            <img src={item.url} width={80} height={80} alt={item.name}/>
            <span>{item.subject}</span>
            <span>{item.content}</span>
            <span>{item.date}</span>

            <button onClick={()=>{
              setMode(false);
              setUpdate(item);}}>수정</button>
            <button onClick={()=>crud.delete(item)}>삭제</button>
          </li>
          )
          }
        </ul>
      </article>

    </div>
  )
}