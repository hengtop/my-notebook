const prettier = require("prettier/standalone");
const typescriptParser = require("prettier/parser-typescript");
const fs = require("fs");
const path = require("path");
const jsonTest = require("./index.json");

type KV = Record<string | number | symbol, unknown>;
/**
 * 获取json类型
 * @param jsonString json字符串
 * @param space 自定义缩进
 * @returns typescript类型
 */
export default function json2Type(jsonString?: string) {
  const json = jsonTest;
  let typeArray: string[] = [`interface resData`];
  let childArray: any[] = [];
  walk(json);
  /**
   * 遍历节点
   * @param node 节点
   * @param propsName 节点名称
   * @param level 当前层级, 用来控制缩进
   */
  function walk(
    node: unknown,
    propsName?: string,
    parentType?: string,
    level = 0
  ) {
    if (!parentType) {
      typeArray[0] = "type ResData = ";
    } else {
      typeArray[0] = `interface resData`;
    }
    // 对象
    if (isObject(node)) {
      // 判断是不是空对象
      if (Object.keys(node).length === 0) {
        if (!parentType) {
          typeArray.push(`{};`);
        } else {
          typeArray.push(
            `${propsName}:Record<string | number | symbol, unknown>;`
          );
        }

        return;
      }
      // 左中括号添加
      if (void 0 === propsName) {
        typeArray.push(`{`);
      } else {
        typeArray.push(`${propsName}:{`);
        // 属性是一个对象
      }

      for (let key in node) {
        walk(node[key], key, propsName, level + 1);
      }
      //替换子类型
      if (propsName) {
        // 添加子类型变量
        if (!childArray.includes(`type ${titleizeOrTuofeng(propsName)} = {`)) {
          childArray.push(
            ...[
              `type ${titleizeOrTuofeng(propsName)} = {`,
              ...typeArray
                .slice(typeArray.findIndex((item) => item === `${propsName}:{`))
                .slice(1),
            ],
            "};\n\n"
          );
        }
        // 将类型字面量类型替换为类型变量
        typeArray = typeArray.slice(
          0,
          typeArray.findIndex((item) => item === `${propsName}:{`)
        );
        //
        typeArray.push(
          `${propsName}:${titleizeOrTuofeng(propsName)}` +
            (void 0 === propsName || "array" === parentType ? "" : ";")
        );
      } else {
        typeArray.push(
          `}` + (void 0 === propsName || "array" === parentType ? "" : ";\n\n")
        );
      }
    }
    // 数组
    else if (isArray(node)) {
      /**
       * 对于数组里的类型，这里定义标准
       * 1. 如果都是基本类型就正常判断
       * 2. 如果类型不同
       *   2-1. 如果存在基本类型和对象类型就unknow
       *   2-2. 如果都是对象类型就判断是否每个对象类型是否相等否则就以数组第一项为准
       */
      // true就是数组
      // false就是元组
      let isAllSameChildNode = true;
      let prevNode;
      // 数组中所有的类型是否是对象或者数组
      let isAllObjectType = true;
      let isAllBaseType = true;

      for (let currentNode of node) {
        if (!isObject(currentNode)) {
          isAllObjectType = false;
        } else {
          isAllBaseType = false;
        }
        if (void 0 !== prevNode) {
          isAllSameChildNode = isSameScheme(prevNode, currentNode);
          if (!isAllSameChildNode) {
            break;
          }
        }
        prevNode = currentNode;
      }
      // 所有元素相同, 数组
      // 结构: xxx[]
      if (isAllSameChildNode) {
        walk(node[0], propsName, "array", level + 1);
        typeArray.push("[]");
      } else {
        if (isAllObjectType) {
          walk(node[0], propsName, "array", level + 1);
          typeArray.push("[]");
        } else if (isAllBaseType) {
          typeArray.push(void 0 !== propsName ? `${propsName}:[` : "[");
          for (let childNode of node) {
            walk(childNode, void 0, "array", level + 1);
            typeArray.push(`,`);
          }
          // 删除尾部","
          typeArray.pop();
          typeArray.push(`]`);
        } else {
          walk("unknown", propsName, "array", level + 1);
          typeArray.push("[]");
        }
      }
      if (propsName) typeArray.push(";");
    }
    // 简单类型
    else if (node === "unknown") {
      if (propsName) {
        typeArray.push(
          `${propsName}: unknown` + ("array" === parentType ? "" : ";")
        );
      } else {
        typeArray.push(`unknown`);
      }
    } else if (isNull(node)) {
      if (void 0 === propsName) {
        typeArray.push(`null`);
      } else {
        typeArray.push(
          `${propsName}: null` + ("array" === parentType ? "" : ";")
        );
      }
    }
    // 简单类型
    else {
      const type = typeof node;
      if (void 0 === propsName) {
        typeArray.push(`${type}`);
      } else {
        typeArray.push(
          `${propsName}: ${type}` + ("array" === parentType ? "" : ";")
        );
      }
    }
  }

  const typeString = childArray.concat(typeArray).join("");
  return prettier.format(typeString, {
    parser: "typescript",
    plugins: [typescriptParser],
  });
}

function isObject(node: unknown): node is KV {
  return "[object Object]" === Object.prototype.toString.call(node);
}

function isArray(node: unknown): node is unknown[] {
  return "[object Array]" === Object.prototype.toString.call(node);
}

function isNull(node: unknown): node is null {
  return typeof node === "object" && !node;
}

export function isSameScheme(input1: unknown, input2: unknown) {
  const type = [getType(input1), getType(input2)];
  // 类型相同,
  // 继续判断引用类型的值
  if (type[0] === type[1]) {
    if ("object" === type[0]) {
      const obj1 = input1 as KV;
      const obj2 = input2 as KV;
      const isSameKeysLength =
        Object.keys(obj1).length === Object.keys(obj2).length;

      // 键值数量不同
      if (!isSameKeysLength) return false;

      // 键值数量相同
      // 判断值的类型是否相同
      for (const key in obj1) {
        // 有不同的键值
        if (void 0 === obj2[key]) {
          return false;
        }
        // 判断值的类型是否相同
        else if (!isSameScheme(obj1[key], obj2[key])) {
          return false;
        }
      }
      return true;
    } else if ("array" === type[0]) {
      const length1 = type[0].length;
      const length2 = type[1].length;
      if (length1 !== length2) {
        return false;
      } else {
        const length = Math.max(length1, length2);
        for (let i = 0; i < length; i++) {
          const isSame = isSameScheme(
            (input1 as unknown[])[i],
            (input2 as unknown[])[i]
          );
          if (!isSame) {
            return false;
          }
        }
        return true;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function getType(input: unknown): string {
  const type = typeof input;
  if ("object" === type) {
    if (isArray(input)) {
      return "array";
    } else if (null === input) {
      return "null";
    } else {
      return "object";
    }
  } else {
    return type;
  }
}

function titleizeOrTuofeng(str: string) {
  return str.includes("_") ? tuofeng(titleize(str)) : titleize(str);
}

function tuofeng(text: string) {
  const reg1 = /[-_\s]+(\w)/g;
  return text.replace(reg1, function (match, c: string) {
    return c ? c.toUpperCase() : "";
  });
}

function titleize(str: string) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
    return c.toUpperCase();
  });
}

//@ts-ignore
console.log((process as any).argv);
fs.writeFile(
  path.resolve(__dirname, (process as any).argv[2]),
  json2Type(),
  (err: any) => {
    console.log(!err ?? "转换完成～");
  }
);
