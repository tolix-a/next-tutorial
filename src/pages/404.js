import { useRouter } from 'next/router'
import React from 'react'

const NotFound = () => {
  const router = useRouter();
  function back(){
    router.back();
  }
  return (
    <>
      <div>해당 페이지를 찾을 수 없습니다.</div>
      <button onClick={back}>뒤로가기</button>
    </>
  )
}

export default NotFound