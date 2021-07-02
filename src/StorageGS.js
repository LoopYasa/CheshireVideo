    // 将数据存入本地
var localStorageSet = (name, data) => {
        const userinfo = {
            data,
            expire: new Date().getTime() + 1000 * 60 * 60 * 48
        }
        localStorage.setItem(name, JSON.stringify(userinfo))
    }

    // 从本地取出数据
var localStorageGet = name => {
        const storage = localStorage.getItem(name);
        const time = new Date().getTime();
        let result = null;
        if (storage) {
            const obj = JSON.parse(storage);
            if (time < obj.expire) {
                result = obj.data;
            } else {
                localStorage.removeItem(name);
            }
        }
        return result;
    };

export {localStorageGet, localStorageSet};