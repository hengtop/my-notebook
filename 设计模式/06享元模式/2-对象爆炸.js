let id = 0;

class Upload {
  constructor(uploadType, fileName, fileSize) {
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dom = null;
  }
  init(id) {
    this.id = id;
    this.dom = document.createElement("div");
    this.dom.innerHTML = `
    <span>文件名称：${this.fileName}, 文件大小：${this.fileSize}</span>
    <button class="del-file">删除</button>
    `;
    this.dom.querySelector(".del-file").onclick = () => {
      this.delFile();
    };

    document.body.appendChild(this.dom);
  }
  delFile() {
    if (this.fileSize < 3000) {
      return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm("确认要删除该文件吗? " + this.fileName)) {
      return this.dom.parentNode.removeChild(this.dom);
    }
  }
}

function startUpload(uploadType, files) {
  for (let i = 0, file; (file = files[i++]); ) {
    const uploadObj = new Upload(uploadType, file.fileName, file.fileSize);
    uploadObj.init(id++);
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
