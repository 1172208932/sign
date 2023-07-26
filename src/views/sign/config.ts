
export const findArrValue = (list,str)=>{
  if(!str){return ''}
  let item = list.filter((item)=>{
    return item.text == str
  })
  return item[0]?.value
}