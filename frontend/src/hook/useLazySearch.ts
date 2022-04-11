//_______________________________________________
// 通信
import { useEffect, useState } from 'react'
import {
  finishLoading,
  LoadingInit,
  ResetLoading,
  setFailLoading,
  setSuccessLoading,
} from '~/util/loading'
import { useInput } from './useInput'

//_______________________________________________
// メイン
let count = -999
let word = ""

export const useLazySearch = <T>(submitEvent: (keyword: string) => T) => {
  const { value, onChange } = useInput()
  function submit() {
    submitEvent(word)
    count = -999
  }

  const start =() => {
    count = 3
    interval()
  }

  const interval = () => {
    
    if (count <= 0) {
      submit()
      return
    }
    setTimeout(() => {
      count -= 1
      interval()
    }, 500)
  }

  useEffect(() => {
    if(count === -998){
      count = -999
      return 
    }
    if(count === -999){
      start()
    }else{
      count = 3
    }
    word = value
  }, [value])

  return {searchWord: value, handleChangeSearchWord: onChange}
}

export default useLazySearch
