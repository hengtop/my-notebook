const dataList = [
  {
    name: 1,
    title: '史蒂夫·乔布斯1',
    content: '史蒂夫·乔布斯1-1',
  },
  {
    name: 1,
    title: '史蒂夫·乔布斯1',
    content: '史蒂夫·乔布斯1-2',
  },
  {
    name: 1,
    title: '史蒂夫·乔布斯1',
    content: '史蒂夫·乔布斯1-3',
  },
  {
    name: 2,
    title: '史蒂夫·乔布斯2',
    content: '史蒂夫·乔布斯2-1',
  },
  {
    name: 3,
    title: '史蒂夫·乔布斯3',
    content: '史蒂夫·乔布斯3-1',
  },
  {
    name: 3,
    title: '史蒂夫·乔布斯3',
    content: '史蒂夫·乔布斯3-2',
  },
  {
    name: 3,
    title: '史蒂夫·乔布斯3',
    content: '史蒂夫·乔布斯3-3',
  },
  {
    name: 3,
    title: '史蒂夫·乔布斯3',
    content: '史蒂夫·乔布斯3-4',
  },
  {
    name: 3,
    title: '史蒂夫·乔布斯3',
    content: '史蒂夫·乔布斯3-5',
  },
  {
    name: 2,
    title: '史蒂夫·乔布斯2',
    content: '史蒂夫·乔布斯2-2',

  },
  {
    name: 2,
    title: '史蒂夫·乔布斯2',
    content: '史蒂夫·乔布斯2-3',
  }
]
const textList = [];
console.log(dataList)
        
dataList.forEach((data) => {
  
    for(let i = 0; i<textList.length; i++) {
        if (textList[i].name === data.name) {
            textList.push(data)
            return
        }
    }
    
    textList.push({
        name: data.name,
        title: data.title,
        content:data.content,
        contentList: [data]
    })
})
console.log(textList)



var arr = [
  {
    "xhcode": "ksxf011",     // 型号代码
    "modName": "基础型",     // 型号名称
    "preImg": "/upload/productcolor/image/20200831/20200831164212_92.jpg",      // 型号图片
    "price": 3880.00,     // 型号售价
    "oldPrice": 3880.00,     // 型号原价
    "quantity": 2,     // 购买数量
    "goodsId": 53,     // 商品id
    "goodName": "智能新风壁挂机",     // 商品名称
    "specialInfo": "正品保障",     // 商品服务
    "storeId": 1,     // 店铺id
    "storeName": "空山官方商铺",     // 店铺名称
    "offsetAmount": null,     // 抵扣券抵扣金额（到时候会以金额返回单位为元）
    "discountAmount": null     // 会员折扣金额（到时候会以金额返回单位为元）
  },
  {
    "xhcode": "ksxf031",
    "modName": "基础型",
    "preImg": "/upload/productcolor/image/20200901/20200901114453_471.jpg",
    "price": 3980.00,
    "oldPrice": 3980.00,
    "quantity": 1,
    "specialPrice": 0,
    "limitNum": null,
    "goodsId": 56,
    "goodName": "智能柜式新风机",
    "specialInfo": "正品保障",
    "storeId": 1,
    "storeName": "空山官方商铺",
    "offsetAmount": null,
    "discountAmount": null
  },
  {
    "xhcode": "ksxf031",
    "modName": "基础型",
    "preImg": "/upload/productcolor/image/20200901/20200901114453_471.jpg",
    "price": 3980.00,
    "oldPrice": 3980.00,
    "quantity": 1,
    "specialPrice": 0,
    "limitNum": null,
    "goodsId": 56,
    "goodName": "智能柜式新风机",
    "specialInfo": "正品保障",
    "storeId": 2,
    "storeName": "lianxiang官方商铺",
    "offsetAmount": null,
    "discountAmount": null
  },
  {
    "xhcode": "ksxf031",
    "modName": "基础型",
    "preImg": "/upload/productcolor/image/20200901/20200901114453_471.jpg",
    "price": 3980.00,
    "oldPrice": 3980.00,
    "quantity": 1,
    "specialPrice": 0,
    "limitNum": null,
    "goodsId": 56,
    "goodName": "智能柜式新风机",
    "specialInfo": "正品保障",
    "storeId": 2,
    "storeName": "lianxiang官方商铺",
    "offsetAmount": null,
    "discountAmount": null
  },
  {
    "xhcode": "ksxf031",
    "modName": "基础型",
    "preImg": "/upload/productcolor/image/20200901/20200901114453_471.jpg",
    "price": 3980.00,
    "oldPrice": 3980.00,
    "quantity": 1,
    "specialPrice": 0,
    "limitNum": null,
    "goodsId": 56,
    "goodName": "智能柜式新风机",
    "specialInfo": "正品保障",
    "storeId": 2,
    "storeName": "lianxiang官方商铺",
    "offsetAmount": null,
    "discountAmount": null
  },
  {
    "xhcode": "ksxf031",
    "modName": "基础型",
    "preImg": "/upload/productcolor/image/20200901/20200901114453_471.jpg",
    "price": 3980.00,
    "oldPrice": 3980.00,
    "quantity": 1,
    "specialPrice": 0,
    "limitNum": null,
    "goodsId": 56,
    "goodName": "智能柜式新风机",
    "specialInfo": "正品保障",
    "storeId": 3,
    "storeName": "jingdong官方商铺",
    "offsetAmount": null,
    "discountAmount": null
  }
];

var map = {},
  dest = [];
for(var i = 0; i < arr.length; i++){
  var ai = arr[i];
  if(!map[ai.storeId]){//保证加入的id不重复
      dest.push({
        storeId: ai.storeId,
        storeName: ai.storeName,
          data: [ai]
      });
      map[ai.storeId] = ai;
  }else{
      for(var j = 0; j < dest.length; j++){
          var dj = dest[j];
          if(dj.storeId == ai.storeId){
              dj.data.push(ai);
              break;
          }
      }
  }
}

console.log(dest);
console.log(map);
console.log(map['1004']);