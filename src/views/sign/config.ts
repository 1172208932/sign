export const timeColumns = [
    { text: '2023年7月28日', value: 0 },
    { text: '2023年7月29日', value: 1 },
  ]

export const placeColumn = [
  { text: 'DK灌篮公园', value: 0 },
  { text: '东赞球馆奥体店', value: 1 },
  { text: '硬核公园-博雅城馆', value: 2 },
  { text: '飞动篮球公园', value: 3 },
  { text: '硬核公园-滨江RMB CENTER', value: 4 },
  { text: '钱唐健身工场', value: 5 },
  { text: '硬核-数字体验馆', value: 6 },
  { text: '硬核-中电万谷馆', value: 7 },
  { text: '新青牛篮球馆', value: 8 },
  { text: '硬核公园-古墩印象城馆', value: 9 },
  { text: '政星体育运动馆', value: 10 },
  { text: '博燚体育国际击剑中心', value: 11 }
]

export const findArrValue = (list,str)=>{
  if(!str){return ''}
  let item = list.filter((item)=>{
    return item.text == str
  })
  return item[0]?.value
}