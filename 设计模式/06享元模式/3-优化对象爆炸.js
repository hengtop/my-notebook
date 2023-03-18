let id = 0;

class Upload {
  constructor(uploadType) {
    this.uploadType = uploadType;
  }
  delFile(id) {
    uploadManager.setExternalState(id, this);
    if (this.fileSize < 3000) {
      return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm("确认要删除该文件吗? " + this.fileName)) {
      return this.dom.parentNode.removeChild(this.dom);
    }
  }
}

// 创建和保存享元对象的工厂类
class UpLoadFactory {
  constructor() {
    this.createFlyWeightObj = {};
  }
  create(uploadType) {
    if (this.createFlyWeightObj[uploadType]) {
      return this.createFlyWeightObj[uploadType];
    }
    return (this.createFlyWeightObj[uploadType] = new Upload(uploadType));
  }
}

// 保存外部环境的类
class UploadManager {
  constructor() {
    this.uploadDatabase = {};
  }
  add(id, uploadType, fileName, fileSize) {
    // 这里创建就只会创建特定类型数量的上传对象了
    let flyWeightObj = upLoadFactory.create(uploadType);
    const dom = document.createElement("div");
    dom.innerHTML = `
    <span>文件名称：${fileName}, 文件大小：${fileSize}</span>
    <button class="del-file">删除</button>
    `;
    dom.querySelector(".del-file").onclick = () => {
      flyWeightObj.delFile(id);
    };
    document.body.appendChild(dom);

    // 存储到上传管理对象中
    this.uploadDatabase[id] = {
      fileName,
      fileSize,
      dom,
    };
    return flyWeightObj;
  }
  // 给享元对象添加外部状态
  setExternalState(id, flyWeightObj) {
    const uploadData = this.uploadDatabase[id];
    for (const i in uploadData) {
      flyWeightObj[i] = uploadData[i];
    }
  }
}

const uploadManager = new UploadManager();
const upLoadFactory = new UpLoadFactory();

function startUpload(uploadType, files) {
  for (let i = 0, file; (file = files[i++]); ) {
    uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
  }
}

//分别创建插件上传对象和flash上传对象
startUpload("plugin", [
  {
    fileName: "1.txt",
    fileSize: 1000,
  },
  {
    fileName: "2.txt",
    fileSize: 3001,
  },
  {
    fileName: "3.txt",
    fileSize: 10000,
  },
  {
    fileName: "4.txt",
    fileSize: 2000,
  },
]);

startUpload("flash", [
  {
    fileName: "11.txt",
    fileSize: 1000,
  },
  {
    fileName: "22.txt",
    fileSize: 3001,
  },
  {
    fileName: "33.txt",
    fileSize: 10000,
  },
  {
    fileName: "44.txt",
    fileSize: 2000,
  },
]);

console.log(upLoadFactory.createFlyWeightObj);
