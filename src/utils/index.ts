export function isPromise(value: any): value is Promise<any> {
    return value instanceof Promise;
  }

  export const getRadioList = (res) => {
    let { extra, enroll } = res;
    let resList: any[] = [];

    var keys = Object.keys(extra)

    keys.forEach((item, index) => {
      if (item.indexOf('radio') != -1) {
        let itemObj = getRadioName(item, enroll.extra.param, extra[item])
        console.log(itemObj)
        resList.push(itemObj)
      }
    })
    return resList
  }

  const getRadioName = (name, param, value) => {
    let itemList = param.filter(item => {
      return item.column_name == name
    })

    return {
      name: itemList[0].name,
      value: itemList[0].data[Number(value)]
    }
  }
