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
const INTARTVAL = 500
const MAX_COUNT = 2

export const useLazySearch = <T>(submitEvent: (keyword: string) => T) => {
  const { value, onChange } = useInput()
  function submit() {
    submitEvent(word)
    count = -999
  }

  const start =() => {
    count = MAX_COUNT
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
    }, INTARTVAL)
  }

  useEffect(() => {
    if(count === -998){
      count = -999
      return 
    }
    if(count === -999){
      start()
    }else{
      count = MAX_COUNT
    }
    word = value
  }, [value])

  return {searchWord: value, handleChangeSearchWord: onChange}
}

export default useLazySearch
