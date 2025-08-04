import { useEffect, useState } from 'react';

const Search = () => {
      const [keyword, setKeyword] = useState(()=>{
        console.log('initialize');
        return window.localStorage.getItem('keyword')
      })
      //useEffect 두번째 인자에 dependency array를 넣어 줄때
      //아무것도(변하는것들) 배열안에 적지 않으면 최초 한번만 호출된다
      useEffect(()=>{
        console.log('effect');
        window.localStorage.setItem("keyword", keyword)
      },[keyword])
      const [result, setResult] =useState('')
      const [typing, setTyping] =useState(false)
      const handleChange = (event) => {
        //window.localStorage.setItem("keyword", keyword)
        setKeyword(event.target.value)
        setTyping(true)
      }
      const handleClick = () => {
        setTyping(false) //검색버튼을 누른 다음에는 변화가 있으면 안됨
        setResult(`검색 키워드는...${keyword}`)
      }
      return (
        <>
          <input onChange={handleChange} value={keyword} />
          <button type="button" onClick={handleClick}>검색</button>
          <p>
            {typing ? `Looking for ${keyword}...` : result}
          </p>
        </>
      )
    }//end of Search