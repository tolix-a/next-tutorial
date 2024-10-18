import { useEffect, useState } from "react";
import Error from "./_error";
import ApiTest from "@/pages/ApiTest";
import {getClientToken} from "@/lib/firebase";
import axios from "axios";


export default function Home() {
  
  const [test, setTest] = useState(1000);
  const [error, setError] = useState();

  function err(){
    // fetch('http://aaaaa.com')
    // .catch((e)=>{
    //   setError(e)
    // })
  }
  if (error) return <Error statusCode={error}/>
  
  //fcm 토큰발행
  let token;

  async function clientToken(){
    token = await getClientToken();
    console.log(token)

    // Notification.requestPermission()
    // .then(permission=>{
    //   console.log(permission,'사용자권한 상태.....')
    // })
  }

  function pushTest(){
    const msg = {
      data:{
        title:'FCM TEST',
        body:'FCM 내용...',
        icon:'/icons/icon-192.png',
        image:'/backdr2.jpg',
        click_action:'https://www.naver.com'
      },
      token
    }
    axios.post('/api/fcm',msg)
  }

  return (
    <>
      <div><button onClick={err}>error</button></div>

      main page...<br/>
      {test}<br/>
      <img src="backdr2.jpg" onClick={()=>setTest(2000)}/>

      <article>
        <h2>구독하기 FCM</h2>
        <button onClick = {clientToken}> 구독하기 </button>
        <button onClick = {pushTest}> 푸시알림 </button>
      </article>
    
    </>
  );
}
